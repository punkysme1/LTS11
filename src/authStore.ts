// src/authStore.ts
import { supabase } from './supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { UserProfileData, UserProfileStatus, UserRole } from '../types';
import { getUserProfile } from './services/userService';

type AuthStoreListener = (state: AuthStoreState) => void;

interface AuthStoreState {
  session: Session | null;
  user: User | null;
  userProfile: UserProfileData | null;
  role: UserRole;
  loading: boolean;
  isInitialized: boolean;
}

class AuthStore {
  private state: AuthStoreState = {
    session: null,
    user: null,
    userProfile: null,
    role: 'guest',
    loading: true,
    isInitialized: false,
  };

  private listeners: AuthStoreListener[] = [];
  
  constructor() {
    this.setupAuthListener();
  }

  public getState(): AuthStoreState {
    return { ...this.state };
  }

  public subscribe(listener: AuthStoreListener): () => void {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private setState(newState: Partial<AuthStoreState>) {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  private async fetchUserProfileAndSetRole(userId: string): Promise<{ profile: UserProfileData | null, role: UserRole }> {
    const profile = await getUserProfile(userId);
    let newRole: UserRole = 'guest';
    if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) {
      newRole = 'admin';
    } else if (profile?.status === UserProfileStatus.VERIFIED) {
      newRole = 'verified_user';
    } else if (profile?.status === UserProfileStatus.PENDING) {
      newRole = 'pending';
    }
    return { profile, role: newRole };
  }

  private setupAuthListener() {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!this.state.isInitialized) {
        this.setState({ loading: true });
      }

      const currentUser = session?.user ?? null;
      let newProfile: UserProfileData | null = null;
      let newRole: UserRole = 'guest';
      
      if (currentUser) {
        const { profile, role } = await this.fetchUserProfileAndSetRole(currentUser.id);
        newProfile = profile;
        newRole = role;
      }

      this.setState({
        session: session,
        user: currentUser,
        userProfile: newProfile,
        role: newRole,
        isInitialized: true,
        loading: false,
      });
    });
  }

  public async signOut() {
    this.setState({ loading: true }); 
    await supabase.auth.signOut();
  }
}

export const authStore = new AuthStore();
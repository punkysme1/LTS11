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
  private loadingTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    console.log('AUTH_STORE: Constructor called. Setting up listener.');
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
      console.log('AUTH_STORE: State updated:', this.state);
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  private startLoading() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
    }
    this.setState({ loading: true });
    console.log('AUTH_STORE: Loading started');
  }

  private finishLoading() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }

    // Delay minimal untuk UX yang smooth
    this.loadingTimeout = setTimeout(() => {
      this.setState({ loading: false });
      console.log('AUTH_STORE: Loading finished');
    }, 300); // 300ms delay untuk transisi yang smooth
  }

  private async fetchUserProfileAndSetRole(userId: string): Promise<{ profile: UserProfileData | null, role: UserRole }> {
    console.log('AUTH_STORE: Fetching user profile for userId:', userId);
    try {
      const profile = await getUserProfile(userId);
      console.log('AUTH_STORE: Profile data fetched:', profile);
      
      let newRole: UserRole = 'guest';
      if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) {
        newRole = 'admin';
        console.log('AUTH_STORE: Role set to ADMIN.');
      } else if (profile && profile.status === UserProfileStatus.VERIFIED) {
        newRole = 'verified_user';
        console.log('AUTH_STORE: Role set to VERIFIED_USER.');
      } else if (profile && profile.status === UserProfileStatus.PENDING) {
        newRole = 'pending';
        console.log('AUTH_STORE: Role set to PENDING.');
      } else { 
        newRole = 'guest';
        console.log('AUTH_STORE: Role set to GUEST (no profile or unknown status).');
      }
      return { profile, role: newRole };
    } catch (err: any) {
      console.error("AUTH_STORE_ERROR: Error fetching user profile:", err.message || err);
      return { profile: null, role: 'guest' };
    }
  }

  private setupAuthListener() {
    supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      console.log('AUTH_STORE_LISTENER: Auth state change detected. Event:', _event, 'Session user ID:', currentSession?.user?.id);

      // Mulai loading untuk semua event
      this.startLoading();

      // Set initialized untuk semua event pertama kali
      if (!this.state.isInitialized) {
        this.setState({ isInitialized: true });
      }

      const currentUser = currentSession?.user ?? null;
      let newProfile: UserProfileData | null = null;
      let newRole: UserRole = 'guest';
      
      // Fetch profil pengguna jika ada user
      if (currentUser) {
        const { profile, role: fetchedRole } = await this.fetchUserProfileAndSetRole(currentUser.id);
        newProfile = profile;
        newRole = fetchedRole;
      }

      // Update state
      this.setState({
        session: currentSession,
        user: currentUser,
        userProfile: newProfile,
        role: newRole,
      });

      // Selalu selesaikan loading
      this.finishLoading();
    });
  }

  public async signOut() {
    this.startLoading();
    console.log('AUTH_STORE: Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AUTH_STORE_ERROR: Error during sign out:", error.message);
      } else {
        console.log('AUTH_STORE: Supabase signOut successful.');
      }
    } catch (err: any) {
      console.error("AUTH_STORE_ERROR: Error during sign out catch block:", err.message || err);
    }
    // Loading akan diselesaikan oleh listener
  }
}

export const authStore = new AuthStore();
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
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  private async fetchUserProfileAndSetRole(userId: string): Promise<{ profile: UserProfileData | null, role: UserRole }> {
    // 1. Cek apakah admin
    if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) {
        const profile = await getUserProfile(userId);
        return { profile, role: 'admin' };
    }

    // 2. Jika bukan admin, coba ambil profilnya
    const profile = await getUserProfile(userId);

    // 3. Tentukan role berdasarkan profil yang ada
    if (profile) {
        if (profile.status === UserProfileStatus.VERIFIED) {
            return { profile, role: 'verified_user' };
        }
        if (profile.status === UserProfileStatus.PENDING) {
            return { profile, role: 'pending' };
        }
    }

    // 4. FIX: Jika user ada tapi profil TIDAK ditemukan, beri role 'authenticated'
    // Ini adalah status untuk user yang baru konfirmasi email dan perlu melengkapi profil.
    return { profile: null, role: 'authenticated' };
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

  /**
   * BARU: Fungsi untuk me-refresh data profil pengguna secara manual.
   * Ini dipanggil setelah pengguna berhasil membuat profil untuk pertama kalinya.
   */
  public async refreshUserProfile() {
    if (!this.state.user) return; // Hanya jalankan jika ada user yang login

    this.setState({ loading: true });
    const { profile, role } = await this.fetchUserProfileAndSetRole(this.state.user.id);
    this.setState({
      userProfile: profile,
      role: role,
      loading: false,
    });
  }

  public async signOut() {
    this.setState({ loading: true }); 
    await supabase.auth.signOut();
  }
}

export const authStore = new AuthStore();
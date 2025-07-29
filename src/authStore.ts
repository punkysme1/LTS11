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
  isInitialized: boolean; // Menunjukkan apakah listener pertama dari Supabase sudah selesai diproses
  loadingStartTime?: number; 
  minDelayOverride?: number | null;
}

class AuthStore {
  private state: AuthStoreState = {
    session: null,
    user: null,
    userProfile: null,
    role: 'guest',
    loading: true, // Diatur true pada awalnya untuk menunjukkan bahwa proses autentikasi sedang berjalan
    isInitialized: false, // Penting: Mulai sebagai false
    loadingStartTime: undefined, 
    minDelayOverride: undefined,
  };

  private listeners: AuthStoreListener[] = [];
  private loadingTimeout: ReturnType<typeof setTimeout> | null = null;
  private minLoadingTime = 500; // Default minimal waktu loading

  constructor() {
    console.log('AUTH_STORE: Constructor called. Setting up listener.');
    this.setupAuthListener();
  }

  public getState(): AuthStoreState {
    return { ...this.state };
  }

  public subscribe(listener: AuthStoreListener): () => void {
    this.listeners.push(listener);
    listener(this.getState()); // Segera panggil listener dengan state saat ini
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private setState(newState: Partial<AuthStoreState>) {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };
    // Hanya panggil listener jika ada perubahan state yang signifikan
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      console.log('AUTH_STORE: State updated:', this.state);
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  private startLoading(minDelayOverride: number | null = null) {
    if (!this.state.loading) {
      this.setState({ loading: true, loadingStartTime: Date.now(), minDelayOverride: minDelayOverride });
      console.log(`AUTH_STORE: Loading started. Min delay override: ${minDelayOverride}ms`);
    } else if (minDelayOverride !== null && this.state.minDelayOverride !== minDelayOverride) {
      this.setState({ minDelayOverride: minDelayOverride });
      console.log(`AUTH_STORE: Loading already active, updated min delay override: ${minDelayOverride}ms`);
    }
  }

  private finishLoading() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);

    if (!this.state.loading) {
        console.log('AUTH_STORE: finishLoading called but not in loading state. Skipping.');
        return;
    }

    const actualMinLoadingTime = this.state.minDelayOverride !== undefined && this.state.minDelayOverride !== null
        ? this.state.minDelayOverride
        : this.minLoadingTime;

    const elapsed = Date.now() - (this.state.loadingStartTime || 0);
    const remainingTime = actualMinLoadingTime - elapsed;

    if (remainingTime > 0) {
      console.log(`AUTH_STORE: Delaying finishLoading by ${remainingTime}ms (actual min: ${actualMinLoadingTime}ms).`);
      this.loadingTimeout = setTimeout(() => {
        this.setState({ loading: false, loadingStartTime: undefined, minDelayOverride: undefined });
        console.log('AUTH_STORE: Loading finished after delay.');
      }, remainingTime);
    } else {
      this.setState({ loading: false, loadingStartTime: undefined, minDelayOverride: undefined });
      console.log('AUTH_STORE: Loading finished immediately.');
    }
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

      const currentUser = currentSession?.user ?? null;
      let newProfile: UserProfileData | null = null;
      let newRole: UserRole = 'guest';
      
      let shouldShowLoadingScreen = false;
      let delayOverride: number | null = null;

      if (_event === 'INITIAL_SESSION') {
          // INITIAL_SESSION adalah event pertama saat aplikasi dimuat atau direfresh keras.
          // Kita selalu harus memprosesnya untuk mendapatkan state awal.
          // isInitialized diatur di sini untuk menandai bahwa pemeriksaan sesi awal telah selesai.
          this.setState({ isInitialized: true }); 
          
          if (!currentUser) { // Jika tidak ada user pada INITIAL_SESSION (belum login)
            shouldShowLoadingScreen = false; // Tidak perlu loading screen, langsung tunjukkan konten public
            delayOverride = 0; // Pastikan loading selesai segera
          } else { // Jika ada user pada INITIAL_SESSION (sudah login dari sesi sebelumnya)
            shouldShowLoadingScreen = true; // Tampilkan loading sebentar selagi fetch profil
            delayOverride = this.minLoadingTime; // Beri delay normal
          }
      } else if (_event === 'SIGNED_IN') {
          // Signed_In bisa berarti login baru atau refresh token.
          if (this.state.user && currentUser?.id === this.state.user.id) {
              console.log('AUTH_STORE_LISTENER: Same user signed in again (session refresh). No loading screen needed.');
              shouldShowLoadingScreen = false;
              delayOverride = 0; // Pastikan loading selesai segera jika ada
          } else {
              // Ini adalah login baru atau user yang berbeda, tampilkan loading.
              shouldShowLoadingScreen = true;
          }
      } else if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') {
          shouldShowLoadingScreen = true; // Selalu tampilkan loading untuk sign-out/deletion
          delayOverride = this.minLoadingTime; // Beri waktu loading normal untuk efek sign out
      } else {
          // Untuk event lain seperti PASSWORD_RECOVERY, USER_UPDATED, TOKEN_REFRESHED, MFA_CHALLENGE_VERIFIED
          // umumnya TIDAK perlu menampilkan loading screen.
          shouldShowLoadingScreen = false;
          delayOverride = 0; // Pastikan loading yang mungkin ada segera diselesaikan
      }

      // --- Mulai loading jika diperlukan ---
      if (shouldShowLoadingScreen) {
          this.startLoading(delayOverride);
      } else if (this.state.loading) {
          // Jika tidak seharusnya menampilkan loading screen, TAPI state saat ini masih loading,
          // segera selesaikan loading (misal dari INITIAL_SESSION yang belum selesai).
          console.log('AUTH_STORE_LISTENER: Not supposed to show loading, but state is loading. Finishing immediately.');
          this.finishLoading();
      }
      
      // --- Fetch profil pengguna dan tentukan peran (asynchronous) ---
      if (currentUser) {
          const { profile, role: fetchedRole } = await this.fetchUserProfileAndSetRole(currentUser.id);
          newProfile = profile;
          newRole = fetchedRole;
      } else {
          newProfile = null;
          newRole = 'guest';
      }

      // --- Perbarui state utama di store ---
      this.setState({
          session: currentSession,
          user: currentUser,
          userProfile: newProfile,
          role: newRole,
          // 'loading' diatur oleh startLoading/finishLoading, tidak di sini
      });

      // --- Selesaikan loading jika diperlukan. Ini dipanggil setelah state diperbarui
      // untuk memastikan komponen bereaksi terhadap data yang sudah lengkap.
      if (shouldShowLoadingScreen || this.state.loading) {
          this.finishLoading();
      }
    });
  }

  public async signOut() {
    this.startLoading(); // Gunakan penundaan default untuk sign out
    console.log('AUTH_STORE: Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AUTH_STORE_ERROR: Error during sign out:", error.message);
      } else {
        console.log('AUTH_STORE: Supabase signOut successful. Listener will handle state reset.');
      }
    } catch (err: any) {
      console.error("AUTH_STORE_ERROR: Error during sign out catch block:", err.message || err);
    } finally {
      // Sebagai fallback, pastikan loading selesai jika listener tidak memicu
      if (this.state.loading) {
          this.finishLoading();
      }
      console.log('AUTH_STORE: Sign out process initiated.');
    }
  }
}

export const authStore = new AuthStore();
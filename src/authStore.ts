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
  loadingStartTime?: number; 
  minDelayOverride?: number | null; // PERBAIKAN: Tambahkan properti ini ke interface
}

class AuthStore {
  private state: AuthStoreState = {
    session: null,
    user: null,
    userProfile: null,
    role: 'guest',
    loading: true,
    isInitialized: false,
    loadingStartTime: undefined, 
    minDelayOverride: undefined, // Inisialisasi juga di sini
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

  private startLoading(minDelayOverride: number | null = null) {
    // Hanya mulai loading jika saat ini tidak dalam proses loading, atau jika ada override
    //
    if (!this.state.loading || minDelayOverride !== null) {
      //
      this.setState({ loading: true, loadingStartTime: Date.now(), minDelayOverride: minDelayOverride }); //
      console.log(`AUTH_STORE: Loading started. Min delay override: ${minDelayOverride}ms`); //
    }
  }

  private finishLoading() {
    //
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout); //

    //
    const actualMinLoadingTime = this.state.minDelayOverride !== undefined && this.state.minDelayOverride !== null //
        ? this.state.minDelayOverride //
        : this.minLoadingTime; //

    //
    const elapsed = Date.now() - (this.state.loadingStartTime || 0); //
    //
    const remainingTime = actualMinLoadingTime - elapsed; //

    //
    if (remainingTime > 0) { //
      //
      console.log(`AUTH_STORE: Delaying finishLoading by ${remainingTime}ms (actual min: ${actualMinLoadingTime}ms).`); //
      //
      this.loadingTimeout = setTimeout(() => { //
        //
        this.setState({ loading: false }); //
        //
        console.log('AUTH_STORE: Loading finished after delay.'); //
        //
      }, remainingTime); //
    } else {
      //
      this.setState({ loading: false }); //
      //
      console.log('AUTH_STORE: Loading finished immediately.'); //
      //
    }
    //
    this.setState({ loadingStartTime: undefined, minDelayOverride: undefined }); //
  }

  private async fetchUserProfileAndSetRole(userId: string): Promise<{ profile: UserProfileData | null, role: UserRole }> {
    console.log('AUTH_STORE: Fetching user profile for userId:', userId); //
    try {
      const profile = await getUserProfile(userId); //
      console.log('AUTH_STORE: Profile data fetched:', profile); //
      
      let newRole: UserRole = 'guest'; //
      if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) { //
        newRole = 'admin'; //
        console.log('AUTH_STORE: Role set to ADMIN.'); //
      } else if (profile && profile.status === UserProfileStatus.VERIFIED) { //
        newRole = 'verified_user'; //
        console.log('AUTH_STORE: Role set to VERIFIED_USER.'); //
      } else if (profile && profile.status === UserProfileStatus.PENDING) { //
        newRole = 'pending'; //
        console.log('AUTH_STORE: Role set to PENDING.'); //
      } else { 
        newRole = 'guest'; //
        console.log('AUTH_STORE: Role set to GUEST (no profile or unknown status).'); //
      }
      return { profile, role: newRole }; //
    } catch (err: any) {
      console.error("AUTH_STORE_ERROR: Error fetching user profile:", err.message || err); //
      return { profile: null, role: 'guest' }; //
    }
  }

  private setupAuthListener() {
    supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      console.log('AUTH_STORE_LISTENER: Auth state change detected. Event:', _event, 'Session user ID:', currentSession?.user?.id); //

      const currentUser = currentSession?.user ?? null; //
      let newProfile: UserProfileData | null = null; //
      let newRole: UserRole = 'guest'; //
      
      let shouldStartLoading = false; // PERBAIKAN: Deklarasi di scope terluar if/else if

      // Tentukan apakah harus ada penundaan minimal (MIN_LOADING_TIME)
      let delayOverride: number | null = null; // Default: gunakan minLoadingTime biasa (500ms)

      // Logika khusus untuk INITIAL_SESSION
      //
      if (_event === 'INITIAL_SESSION') { //
          //
          if (this.state.isInitialized) { //
              //
              console.log('AUTH_STORE_LISTENER: INITIAL_SESSION already processed globally. Skipping.'); //
              //
              shouldStartLoading = false; // Jangan mulai loading jika sudah diinisialisasi
              //
          } else {
              //
              this.setState({ isInitialized: true }); //
              //
              shouldStartLoading = true; // Ini adalah inisialisasi awal, mulai loading
              //
          }
          //
      } else {
          // Untuk event lain, jika user sama dan sudah login, hindari loading penuh
          //
          const isSameUser = currentUser?.id === this.state.user?.id; //
          //
          const isLogoutEvent = (_event === 'SIGNED_OUT' || _event === 'USER_DELETED'); //
          //
          const isNotLogoutEvent = !isLogoutEvent; //

          //
          if (isSameUser && isNotLogoutEvent && this.state.user && this.state.role !== 'guest') { //
              //
              console.log('AUTH_STORE_LISTENER: User is already logged in and ID matched. Forcing 0ms delay.'); //
              //
              delayOverride = 0; // KUNCI PERBAIKAN: Set delay menjadi 0ms
              //
              shouldStartLoading = true; // TETAP MULAI LOADING untuk menunda komponen
              //
          } else if (_event === 'SIGNED_IN' && !this.state.user) {
              // Ini adalah login baru dari form, yang memicu SIGNED_IN pertama kali
              shouldStartLoading = true; // Mulai loading dengan delay normal (500ms)
          } else if (isLogoutEvent) {
              // Logout atau user dihapus, juga mulai loading
              shouldStartLoading = true;
          }
          //
      }

      //
      if (shouldStartLoading) { //
          //
          this.startLoading(delayOverride); //
          //
      }
      
      //
      if (currentUser) { //
          //
          const { profile, role: fetchedRole } = await this.fetchUserProfileAndSetRole(currentUser.id); //
          //
          newProfile = profile; //
          //
          newRole = fetchedRole; //
          //
      } else {
          // Jika tidak ada user atau logout
          //
          newProfile = null; //
          //
          newRole = 'guest'; //
          //
      }

      //
      this.setState({ //
          //
          session: currentSession, //
          //
          user: currentUser, //
          //
          userProfile: newProfile, //
          //
          role: newRole, //
          //
          // loading akan diatur oleh finishLoading
          //
      });

      //
      if (shouldStartLoading) { // Hanya finishLoading jika kita memulainya
          //
          this.finishLoading(); //
          //
      } else if (this.state.loading) { //
          // Jika kita tidak memulai loading, tapi state saat ini masih loading,
          //
          // artinya ada proses yang belum selesai, maka paksa finish loading segera.
          //
          this.finishLoading(); //
          //
      }
    });
  }

  public async signOut() {
    this.startLoading(); // Gunakan delay default untuk sign out
    console.log('AUTH_STORE: Signing out...'); //
    try {
      const { error } = await supabase.auth.signOut(); //
      if (error) { //
        console.error("AUTH_STORE_ERROR: Error during sign out:", error.message); //
      } else {
        //
        console.log('AUTH_STORE: Supabase signOut successful, resetting local state.'); //
        //
        this.setState({ session: null, user: null, userProfile: null, role: 'guest' }); //
        //
      }
    } catch (err: any) {
      //
      console.error("AUTH_STORE_ERROR: Error during sign out catch block:", err.message || err); //
    } finally {
      //
      this.finishLoading(); //
      //
      console.log('AUTH_STORE: Sign out process finished.'); //
      //
    }
  }
}

export const authStore = new AuthStore(); //
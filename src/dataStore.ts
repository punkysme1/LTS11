// src/dataStore.ts
import { supabase } from './supabaseClient';
// --- PERBAIKAN 1: Impor kembali 'BlogStatus' ---
import { Manuskrip, BlogPost, GuestBookEntry, BlogStatus } from '../types';

interface DataStoreState {
    manuscripts: Manuskrip[];
    blogPosts: BlogPost[];
    guestBookEntries: GuestBookEntry[];
    loading: boolean;
    error: string | null;
}

type DataStoreListener = (state: DataStoreState) => void;

class DataStore {
    private state: DataStoreState = {
        manuscripts: [],
        blogPosts: [],
        guestBookEntries: [],
        loading: true,
        error: null,
    };

    private listeners: DataStoreListener[] = [];
    private hasFetched = false;

    public getState(): DataStoreState {
        return { ...this.state };
    }

    public subscribe(listener: DataStoreListener): () => void {
        this.listeners.push(listener);
        listener(this.getState());
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(newState: Partial<DataStoreState>) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener(this.state));
    }

    public async initialize() {
        if (this.hasFetched) return;
        this.hasFetched = true;

        this.setState({ loading: true, error: null });

        try {
            const today = new Date().toISOString().split('T')[0];
            
            // --- PERBAIKAN 2: Gunakan enum BlogStatus.PUBLISHED yang nilainya "Published" ---
            const blogPostsQuery = supabase
                .from('blog')
                .select('*')
                .eq('status', BlogStatus.PUBLISHED) // Menggunakan enum yang benar
                .lte('tanggal_publikasi', today) 
                .order('tanggal_publikasi', { ascending: false });

            const [manuscriptsRes, blogPostsRes, guestBookRes] = await Promise.all([
                supabase.from('manuskrip').select('*').order('created_at', { ascending: false }),
                blogPostsQuery,
                supabase.from('buku_tamu').select('*').eq('is_approved', true).order('created_at', { ascending: false })
            ]);

            if (manuscriptsRes.error || blogPostsRes.error || guestBookRes.error) {
                console.error('Manuscripts Error:', manuscriptsRes.error);
                console.error('Blog Posts Error:', blogPostsRes.error);
                console.error('Guest Book Error:', guestBookRes.error);
                throw new Error('Gagal mengambil sebagian data publik.');
            }

            this.setState({
                manuscripts: manuscriptsRes.data || [],
                blogPosts: blogPostsRes.data || [],
                guestBookEntries: guestBookRes.data || [],
                error: null,
            });

        } catch (error: any) {
            this.setState({ error: error.message });
            console.error("DataStore Error:", error);
        } finally {
            this.setState({ loading: false });
        }
    }
}

export const dataStore = new DataStore();
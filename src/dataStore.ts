// src/dataStore.ts
import { supabase } from './supabaseClient';
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
        // Hanya fetch data jika belum pernah sama sekali
        if (this.hasFetched) return;
        this.hasFetched = true;

        this.setState({ loading: true });

        try {
            const [manuscriptsRes, blogPostsRes, guestBookRes] = await Promise.all([
                supabase.from('manuskrip').select('*').order('created_at', { ascending: false }),
                supabase.from('blog').select('*').eq('status', BlogStatus.PUBLISHED).eq('published', true).order('tanggal_publikasi', { ascending: false }),
                supabase.from('buku_tamu').select('*').eq('is_approved', true).order('created_at', { ascending: false })
            ]);

            if (manuscriptsRes.error || blogPostsRes.error || guestBookRes.error) {
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
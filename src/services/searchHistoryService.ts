// src/services/searchHistoryService.ts
import { supabase } from '../supabaseClient';
import { SearchHistoryEntry } from '../../types'; // Path relatif ke types.ts

export const saveSearchHistory = async (userId: string, query: string) => {
    if (!userId || !query.trim()) {
        // console.warn('Tidak dapat menyimpan query pencarian kosong atau tanpa autentikasi.');
        return null;
    }
    
    // Opsional: Cek apakah query yang sama baru saja disimpan untuk menghindari duplikasi berlebihan
    // const { data: existing, error: existingError } = await supabase
    //     .from('search_history')
    //     .select('id')
    //     .eq('user_id', userId)
    //     .eq('query', query.trim())
    //     .order('timestamp', { ascending: false })
    //     .limit(1);

    // if (existing && existing.length > 0) {
    //     // console.log('Query sudah ada, tidak perlu disimpan ulang.');
    //     return null;
    // }

    const { data, error } = await supabase
        .from('search_history')
        .insert([{ user_id: userId, query: query.trim() }]);
    
    if (error) {
        console.error('Error saving search history:', error);
        return null;
    }
    console.log('Histori pencarian disimpan:', data);
    return data;
};

export const getSearchHistory = async (userId: string): Promise<SearchHistoryEntry[]> => {
    if (!userId) {
        // console.warn('Tidak dapat mengambil histori pencarian tanpa ID pengguna.');
        return [];
    }
    const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(50); // Batasi jumlah histori untuk performa

    if (error) {
        console.error('Error fetching search history:', error);
        return [];
    }
    return data as SearchHistoryEntry[];
};

export const deleteSearchHistoryEntry = async (id: number) => {
    const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting search history entry:', error);
        return false;
    }
    console.log('Histori pencarian dihapus:', id);
    return true;
};
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file: File, collection: string, docId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${collection}/${docId}/${fileName}`;

    const { error } = await supabase.storage
        .from('kross_backend')
        .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from('kross_backend')
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
};
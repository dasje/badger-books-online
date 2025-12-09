import { supabase } from "../client";

export const fetchById = async (table: string, id: string) => {
  try {
    //   setError(null)
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    console.log(data);
    if (error) throw error;
    return data;
  } catch (err) {
    return err;
  }
};

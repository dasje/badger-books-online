import { supabase } from "../client";

export const fetchAll = async (table: string) => {
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (data) {
      return data;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

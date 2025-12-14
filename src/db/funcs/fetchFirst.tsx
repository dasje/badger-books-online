import { supabase } from "../client";

export const fetchFirst = async (table: string) => {
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
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

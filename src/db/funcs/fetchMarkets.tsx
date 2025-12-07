import { supabase } from "../client";

export const fetchMarkets = async () => {
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from("markets")
      .select("*")
      .order("created_at", { ascending: false });
    console.log(data);
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

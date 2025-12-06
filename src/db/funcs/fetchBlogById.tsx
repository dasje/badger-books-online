import { supabase } from "../client";

export const fetchBlogById = async (id: string) => {
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id);
    console.log(data);
    if (error) throw error;
    return data;
  } catch (err) {
    return err;
  }
};

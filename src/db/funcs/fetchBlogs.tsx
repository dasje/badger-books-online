import { supabase } from "../client";

export const fetchBlogs = async () => {
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    console.log(data);
    if (error) throw error;
    return data;
  } catch (err) {
    return err;
  }
};

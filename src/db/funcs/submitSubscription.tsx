import { supabase } from "../client";

export const subsmitSubscription = async (email: string, name: string) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!email || !name) throw new Error("All fields are required");
    const { error } = await supabase.from("subscribers").insert({
      name,
      email,
      created_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    // setLoading(false);
    return true;
  }
};

import { supabase } from "../client";

export const deleteEntry = async (id: string, table: string) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!id || !table) throw new Error("All fields are required");
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    return true;
  }
};

import { supabase } from "../client";

export const updateRow = async (
  table: string,
  id: string,
  updates: { [key: string]: any },
) => {
  try {
    console.log("Updating row:", { table, id, updates });
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!table || !id || !updates) throw new Error("All fields are required");
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq("id", id)
      .select();
    console.log(data, error);
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    return true;
  }
};

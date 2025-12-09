import { supabase } from "../client";

export const createEntry = async (
  table: string,
  inputData: { [key: string]: any },
) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!table || !inputData) throw new Error("All fields are required");
    const { error } = await supabase.from(table).insert({
      ...inputData,
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

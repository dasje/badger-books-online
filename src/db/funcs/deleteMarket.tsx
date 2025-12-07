import { supabase } from "../client";

export const deleteMarket = async (market_id: string) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!market_id) throw new Error("All fields are required");
    const { error } = await supabase
      .from("markets")
      .delete()
      .eq("id", market_id);
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    return true;
  }
};

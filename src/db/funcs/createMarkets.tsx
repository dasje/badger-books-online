import { supabase } from "../client";

export const createMarkets = async (
  market: string,
  dates: string,
  marketLink?: string,
  marketImg?: string,
) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!market || !dates) throw new Error("All fields are required");
    const { error } = await supabase.from("markets").insert({
      market,
      dates,
      market_img: marketImg,
      created_at: new Date().toISOString(),
      market_link: marketLink,
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    // setLoading(false);
  }
};

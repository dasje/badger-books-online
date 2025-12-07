import { supabase } from "../client";

export const updateMarket = async (
  market_id: string,
  market: string,
  dates: string,
  marketLink?: string,
  marketImg?: string,
) => {
  try {
    console.log(market_id, market, dates, marketLink, marketImg);
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!market || !dates) throw new Error("All fields are required");
    const { data, error } = await supabase
      .from("markets")
      .update({
        market: market,
        dates: dates,
        market_link: marketLink,
        market_img: marketImg,
      })
      .eq("id", market_id)
      .select();
    console.log(data, error);
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    return true;
  }
};

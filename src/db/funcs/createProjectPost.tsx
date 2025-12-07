import { supabase } from "../client";

export const createBlogPost = async (
  title: string,
  content: string,
  imageUrl: string,
  description: string,
) => {
  try {
    // const user = (await supabase.auth.getUser()).data.user;
    // if (!user) throw new Error("You must be logged in to create a post");
    if (!title || !content || !imageUrl)
      throw new Error("All fields are required");
    const { error } = await supabase.from("blogs").insert({
      title,
      content,
      img: imageUrl,
      created_at: new Date().toISOString(),
      description,
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
  } finally {
    // setLoading(false);
  }
};

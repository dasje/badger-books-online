import { supabase } from "../client";

export async function uploadFileToBucket(file: File) {
  const filePath = `${Date.now()}_${file.name}`; // prevents overwrite

  console.log("Uploading file:", file);

  const { data, error } = await supabase.storage
    .from("image_bucket")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("image_bucket")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl; // <-- USE THIS
}

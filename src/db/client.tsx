import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your databaseconst

// const supabaseUrl = "http://127.0.0.1:54321"; //process.env.SUPABASE_URL;
// const supabaseKey = "sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz"; // process.env.SUPABASE_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(
  supabaseUrl ? supabaseUrl : "",
  supabaseKey ? supabaseKey : "",
);

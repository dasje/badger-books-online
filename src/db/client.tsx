import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your databaseconst

require("dotenv").config();

const supabaseUrl = "https://abjjzmjuscnpjsybtmfz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

import { supabase } from "../client";

export const fetchById = async (
  table: string,
  id: string,
  columnName?: string,
) => {
  const column = columnName ? columnName : "id";
  try {
    //   setError(null)
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, id);
    console.log(data);
    if (error) throw error;
    return data;
  } catch (err) {
    return err;
  }
};

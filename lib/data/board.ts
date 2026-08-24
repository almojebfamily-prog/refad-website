import { createClient } from "@/lib/supabase/server";

export async function getBoardMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("board_members")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}

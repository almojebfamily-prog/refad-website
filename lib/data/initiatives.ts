import { createClient } from "@/lib/supabase/server";

export { initiativeCategoryLabels } from "@/lib/labels/initiatives";

export async function getInitiatives() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("initiatives")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type FamilyMemberRow = Database["public"]["Tables"]["family_members"]["Row"];

export type FamilyTreeNode = {
  name: string;
  attributes?: Record<string, string>;
  children?: FamilyTreeNode[];
};

export async function getFamilyMembers(): Promise<FamilyMemberRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("family_members").select("*");

  if (error) throw error;
  return data;
}

export function buildFamilyTree(members: FamilyMemberRow[]): FamilyTreeNode[] {
  const byId = new Map(members.map((m) => [m.id, m]));
  const childrenByFather = new Map<string, FamilyMemberRow[]>();

  for (const member of members) {
    if (!member.father_id) continue;
    const list = childrenByFather.get(member.father_id) ?? [];
    list.push(member);
    childrenByFather.set(member.father_id, list);
  }

  function toNode(member: FamilyMemberRow): FamilyTreeNode {
    const children = childrenByFather.get(member.id);
    return {
      name: member.full_name,
      attributes: {
        الميلاد: member.birth_date ?? "غير معروف",
      },
      ...(children && children.length > 0
        ? { children: children.map(toNode) }
        : {}),
    };
  }

  const roots = members.filter(
    (m) => !m.father_id || !byId.has(m.father_id)
  );

  return roots.map(toNode);
}

import { sql } from "@/lib/db";
import type { FamilyMember } from "@/types/db";

export type FamilyTreeNode = {
  name: string;
  attributes?: Record<string, string>;
  children?: FamilyTreeNode[];
};

export async function getFamilyMembers(): Promise<FamilyMember[]> {
  return (await sql`SELECT * FROM family_members`) as FamilyMember[];
}

export function buildFamilyTree(members: FamilyMember[]): FamilyTreeNode[] {
  const byId = new Map(members.map((m) => [m.id, m]));
  const childrenByFather = new Map<string, FamilyMember[]>();

  for (const member of members) {
    if (!member.father_id) continue;
    const list = childrenByFather.get(member.father_id) ?? [];
    list.push(member);
    childrenByFather.set(member.father_id, list);
  }

  function toNode(member: FamilyMember): FamilyTreeNode {
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

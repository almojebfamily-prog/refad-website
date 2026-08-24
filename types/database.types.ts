/**
 * Hand-written to match supabase/migrations/0001_init.sql.
 * Once the Supabase project is live, regenerate with:
 *   npx supabase gen types typescript --project-id <id> > types/database.types.ts
 */

export type ProfileRole = "member" | "admin";
export type ReportType = "financial" | "performance" | "minutes";
export type InitiativeCategory =
  | "social_support"
  | "scientific_excellence"
  | "gatherings"
  | "investment";
export type SubscriptionStatus = "active" | "pending" | "expired";
export type SupportRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";
export type ContactMessageStatus = "new" | "read" | "archived";
export type Gender = "male" | "female";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          avatar_url: string | null;
          role: ProfileRole;
          family_member_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: ProfileRole;
          family_member_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      family_branches: {
        Row: { id: string; name: string; parent_branch_id: string | null };
        Insert: {
          id?: string;
          name: string;
          parent_branch_id?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["family_branches"]["Insert"]
        >;
        Relationships: [];
      };
      family_members: {
        Row: {
          id: string;
          profile_id: string | null;
          full_name: string;
          gender: Gender;
          birth_date: string | null;
          death_date: string | null;
          father_id: string | null;
          mother_id: string | null;
          branch_id: string | null;
          photo_url: string | null;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          full_name: string;
          gender: Gender;
          birth_date?: string | null;
          death_date?: string | null;
          father_id?: string | null;
          mother_id?: string | null;
          branch_id?: string | null;
          photo_url?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["family_members"]["Insert"]
        >;
        Relationships: [];
      };
      board_members: {
        Row: {
          id: string;
          full_name: string;
          role_title: string;
          photo_url: string | null;
          order_index: number;
          bio: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          role_title: string;
          photo_url?: string | null;
          order_index?: number;
          bio?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["board_members"]["Insert"]
        >;
        Relationships: [];
      };
      initiatives: {
        Row: {
          id: string;
          category: InitiativeCategory;
          title: string;
          description: string;
          icon: string | null;
          order_index: number;
        };
        Insert: {
          id?: string;
          category: InitiativeCategory;
          title: string;
          description: string;
          icon?: string | null;
          order_index?: number;
        };
        Update: Partial<Database["public"]["Tables"]["initiatives"]["Insert"]>;
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          type: ReportType;
          title: string;
          file_url: string;
          period_label: string | null;
          published_date: string;
        };
        Insert: {
          id?: string;
          type: ReportType;
          title: string;
          file_url: string;
          period_label?: string | null;
          published_date?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          profile_id: string;
          plan_name: string;
          amount: number;
          status: SubscriptionStatus;
          start_date: string;
          end_date: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          plan_name: string;
          amount: number;
          status?: SubscriptionStatus;
          start_date?: string;
          end_date?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["subscriptions"]["Insert"]
        >;
        Relationships: [];
      };
      support_requests: {
        Row: {
          id: string;
          profile_id: string;
          initiative_id: string | null;
          description: string;
          status: SupportRequestStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          initiative_id?: string | null;
          description: string;
          status?: SupportRequestStatus;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["support_requests"]["Insert"]
        >;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          mobile: string;
          subject: string;
          message: string;
          status: ContactMessageStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          mobile: string;
          subject: string;
          message: string;
          status?: ContactMessageStatus;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["contact_messages"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          account_owner: string | null
          Address: string | null
          "Annual Revenue": string | null
          "Annual Revenue Range": string | null
          annual_revenue: string | null
          "Business Phone": string | null
          city: string | null
          City: string | null
          company: string | null
          Company: string | null
          "Company Description": string | null
          "Company Industry": string | null
          "Company LinkedIn": string | null
          "Company Name": string | null
          "Company Size": string | null
          "Company Website": string | null
          company_address: string | null
          company_city: string | null
          company_country: string | null
          company_linkedin_url: string | null
          company_name_for_emails: string | null
          company_phone: string | null
          company_state: string | null
          "Contact Name": string | null
          "Contact Owner": string | null
          corporate_phone: string | null
          country: string | null
          Country: string | null
          "Created Date": string | null
          created_at: string
          "Date Added": string | null
          Department: string | null
          "Department/Function": string | null
          departments: string | null
          email: string | null
          Email: string | null
          "Email Address": string | null
          "Email Deliverability": string | null
          "Email Status": string | null
          email_status: string | null
          "Employee Count": number | null
          "Employee Size Range": string | null
          Facebook: string | null
          facebook_url: string | null
          Fax: string | null
          "First Name": string | null
          first_name: string | null
          first_phone: string | null
          "Full Name": string | null
          "Funding Stage": string | null
          "Home Phone": string | null
          id: string
          industry: string | null
          Industry: string | null
          Instagram: string | null
          "Job Level": string | null
          "Job Title": string | null
          keywords: string | null
          "Last Activity": string | null
          "Last Contact Date": string | null
          "Last Name": string | null
          last_contacted: string | null
          last_name: string | null
          "Lead Score": number | null
          "Lead Source": string | null
          "Lead Status": string | null
          LinkedIn: string | null
          Location: string | null
          "Location (City)": string | null
          "Location (Country)": string | null
          "Location (State)": string | null
          "Mobile Phone": string | null
          Name: string | null
          Notes: string | null
          num_employees: number | null
          "Number of Employees": number | null
          Organization: string | null
          other_phone: string | null
          person_linkedin_url: string | null
          "Personal LinkedIn": string | null
          Phone: string | null
          "Phone Number": string | null
          "Phone Number (Mobile)": string | null
          "Phone Number (Work)": string | null
          Position: string | null
          "Postal Code": string | null
          Revenue: string | null
          seniority: string | null
          Seniority: string | null
          seo_description: string | null
          "Snapshot Date": string | null
          Source: string | null
          stage: string | null
          state: string | null
          State: string | null
          Status: string | null
          "Street Address": string | null
          Tags: string | null
          technologies: string | null
          "Technology Stack": string | null
          TikTok: string | null
          title: string | null
          Title: string | null
          total_funding: string | null
          Twitter: string | null
          twitter_url: string | null
          "Updated Date": string | null
          updated_at: string
          website: string | null
          Website: string | null
          "Work Phone": string | null
          YouTube: string | null
          "Zip Code": string | null
        }
        Insert: {
          account_owner?: string | null
          Address?: string | null
          "Annual Revenue"?: string | null
          "Annual Revenue Range"?: string | null
          annual_revenue?: string | null
          "Business Phone"?: string | null
          city?: string | null
          City?: string | null
          company?: string | null
          Company?: string | null
          "Company Description"?: string | null
          "Company Industry"?: string | null
          "Company LinkedIn"?: string | null
          "Company Name"?: string | null
          "Company Size"?: string | null
          "Company Website"?: string | null
          company_address?: string | null
          company_city?: string | null
          company_country?: string | null
          company_linkedin_url?: string | null
          company_name_for_emails?: string | null
          company_phone?: string | null
          company_state?: string | null
          "Contact Name"?: string | null
          "Contact Owner"?: string | null
          corporate_phone?: string | null
          country?: string | null
          Country?: string | null
          "Created Date"?: string | null
          created_at?: string
          "Date Added"?: string | null
          Department?: string | null
          "Department/Function"?: string | null
          departments?: string | null
          email?: string | null
          Email?: string | null
          "Email Address"?: string | null
          "Email Deliverability"?: string | null
          "Email Status"?: string | null
          email_status?: string | null
          "Employee Count"?: number | null
          "Employee Size Range"?: string | null
          Facebook?: string | null
          facebook_url?: string | null
          Fax?: string | null
          "First Name"?: string | null
          first_name?: string | null
          first_phone?: string | null
          "Full Name"?: string | null
          "Funding Stage"?: string | null
          "Home Phone"?: string | null
          id?: string
          industry?: string | null
          Industry?: string | null
          Instagram?: string | null
          "Job Level"?: string | null
          "Job Title"?: string | null
          keywords?: string | null
          "Last Activity"?: string | null
          "Last Contact Date"?: string | null
          "Last Name"?: string | null
          last_contacted?: string | null
          last_name?: string | null
          "Lead Score"?: number | null
          "Lead Source"?: string | null
          "Lead Status"?: string | null
          LinkedIn?: string | null
          Location?: string | null
          "Location (City)"?: string | null
          "Location (Country)"?: string | null
          "Location (State)"?: string | null
          "Mobile Phone"?: string | null
          Name?: string | null
          Notes?: string | null
          num_employees?: number | null
          "Number of Employees"?: number | null
          Organization?: string | null
          other_phone?: string | null
          person_linkedin_url?: string | null
          "Personal LinkedIn"?: string | null
          Phone?: string | null
          "Phone Number"?: string | null
          "Phone Number (Mobile)"?: string | null
          "Phone Number (Work)"?: string | null
          Position?: string | null
          "Postal Code"?: string | null
          Revenue?: string | null
          seniority?: string | null
          Seniority?: string | null
          seo_description?: string | null
          "Snapshot Date"?: string | null
          Source?: string | null
          stage?: string | null
          state?: string | null
          State?: string | null
          Status?: string | null
          "Street Address"?: string | null
          Tags?: string | null
          technologies?: string | null
          "Technology Stack"?: string | null
          TikTok?: string | null
          title?: string | null
          Title?: string | null
          total_funding?: string | null
          Twitter?: string | null
          twitter_url?: string | null
          "Updated Date"?: string | null
          updated_at?: string
          website?: string | null
          Website?: string | null
          "Work Phone"?: string | null
          YouTube?: string | null
          "Zip Code"?: string | null
        }
        Update: {
          account_owner?: string | null
          Address?: string | null
          "Annual Revenue"?: string | null
          "Annual Revenue Range"?: string | null
          annual_revenue?: string | null
          "Business Phone"?: string | null
          city?: string | null
          City?: string | null
          company?: string | null
          Company?: string | null
          "Company Description"?: string | null
          "Company Industry"?: string | null
          "Company LinkedIn"?: string | null
          "Company Name"?: string | null
          "Company Size"?: string | null
          "Company Website"?: string | null
          company_address?: string | null
          company_city?: string | null
          company_country?: string | null
          company_linkedin_url?: string | null
          company_name_for_emails?: string | null
          company_phone?: string | null
          company_state?: string | null
          "Contact Name"?: string | null
          "Contact Owner"?: string | null
          corporate_phone?: string | null
          country?: string | null
          Country?: string | null
          "Created Date"?: string | null
          created_at?: string
          "Date Added"?: string | null
          Department?: string | null
          "Department/Function"?: string | null
          departments?: string | null
          email?: string | null
          Email?: string | null
          "Email Address"?: string | null
          "Email Deliverability"?: string | null
          "Email Status"?: string | null
          email_status?: string | null
          "Employee Count"?: number | null
          "Employee Size Range"?: string | null
          Facebook?: string | null
          facebook_url?: string | null
          Fax?: string | null
          "First Name"?: string | null
          first_name?: string | null
          first_phone?: string | null
          "Full Name"?: string | null
          "Funding Stage"?: string | null
          "Home Phone"?: string | null
          id?: string
          industry?: string | null
          Industry?: string | null
          Instagram?: string | null
          "Job Level"?: string | null
          "Job Title"?: string | null
          keywords?: string | null
          "Last Activity"?: string | null
          "Last Contact Date"?: string | null
          "Last Name"?: string | null
          last_contacted?: string | null
          last_name?: string | null
          "Lead Score"?: number | null
          "Lead Source"?: string | null
          "Lead Status"?: string | null
          LinkedIn?: string | null
          Location?: string | null
          "Location (City)"?: string | null
          "Location (Country)"?: string | null
          "Location (State)"?: string | null
          "Mobile Phone"?: string | null
          Name?: string | null
          Notes?: string | null
          num_employees?: number | null
          "Number of Employees"?: number | null
          Organization?: string | null
          other_phone?: string | null
          person_linkedin_url?: string | null
          "Personal LinkedIn"?: string | null
          Phone?: string | null
          "Phone Number"?: string | null
          "Phone Number (Mobile)"?: string | null
          "Phone Number (Work)"?: string | null
          Position?: string | null
          "Postal Code"?: string | null
          Revenue?: string | null
          seniority?: string | null
          Seniority?: string | null
          seo_description?: string | null
          "Snapshot Date"?: string | null
          Source?: string | null
          stage?: string | null
          state?: string | null
          State?: string | null
          Status?: string | null
          "Street Address"?: string | null
          Tags?: string | null
          technologies?: string | null
          "Technology Stack"?: string | null
          TikTok?: string | null
          title?: string | null
          Title?: string | null
          total_funding?: string | null
          Twitter?: string | null
          twitter_url?: string | null
          "Updated Date"?: string | null
          updated_at?: string
          website?: string | null
          Website?: string | null
          "Work Phone"?: string | null
          YouTube?: string | null
          "Zip Code"?: string | null
        }
        Relationships: []
      }
      email_signups: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string
          custom_keywords: string | null
          hashtags: string[] | null
          id: string
          phrases: string[] | null
          search_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_keywords?: string | null
          hashtags?: string[] | null
          id?: string
          phrases?: string[] | null
          search_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_keywords?: string | null
          hashtags?: string[] | null
          id?: string
          phrases?: string[] | null
          search_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string
          custom_keywords: string | null
          hashtags: string[] | null
          id: string
          phrases: string[] | null
          search_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_keywords?: string | null
          hashtags?: string[] | null
          id?: string
          phrases?: string[] | null
          search_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          custom_keywords?: string | null
          hashtags?: string[] | null
          id?: string
          phrases?: string[] | null
          search_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          action_type: string
          created_at: string
          id: string
          search_count: number | null
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          search_count?: number | null
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          search_count?: number | null
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_potential_duplicates: {
        Args: Record<PropertyKey, never>
        Returns: {
          id1: string
          id2: string
          similarity_score: number
          match_reason: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

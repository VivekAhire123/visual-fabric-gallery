export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          check_in_time: string | null
          check_out_time: string | null
          created_at: string
          date: string
          hours_worked: number | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["attendance_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          date?: string
          hours_worked?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          date?: string
          hours_worked?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          head_id: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          head_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          head_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_head_id_fkey"
            columns: ["head_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fabric_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      fabric_items: {
        Row: {
          category: string | null
          color: string | null
          created_at: string
          description: string
          discount: number | null
          fabric_type: string | null
          featured: boolean | null
          id: string
          image_url: string
          instagram_url: string | null
          material: string | null
          name: string
          pattern: string | null
          pinterest_url: string | null
          price: number
          stock_quantity: number | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string
          description: string
          discount?: number | null
          fabric_type?: string | null
          featured?: boolean | null
          id?: string
          image_url: string
          instagram_url?: string | null
          material?: string | null
          name: string
          pattern?: string | null
          pinterest_url?: string | null
          price: number
          stock_quantity?: number | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string
          description?: string
          discount?: number | null
          fabric_type?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string
          instagram_url?: string | null
          material?: string | null
          name?: string
          pattern?: string | null
          pinterest_url?: string | null
          price?: number
          stock_quantity?: number | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      festival_banners: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          applied_at: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          end_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          rejection_reason: string | null
          start_date: string
          status: Database["public"]["Enums"]["leave_status"] | null
          total_days: number
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          end_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          rejection_reason?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          total_days: number
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          end_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string
          rejection_reason?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["leave_status"] | null
          total_days?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payroll: {
        Row: {
          allowances: number | null
          basic_salary: number
          created_at: string
          days_worked: number | null
          deductions: number | null
          gross_salary: number
          id: string
          month: number
          net_salary: number
          overtime_hours: number | null
          overtime_rate: number | null
          processed_at: string | null
          processed_by: string | null
          tax_deduction: number | null
          total_working_days: number | null
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          allowances?: number | null
          basic_salary: number
          created_at?: string
          days_worked?: number | null
          deductions?: number | null
          gross_salary: number
          id?: string
          month: number
          net_salary: number
          overtime_hours?: number | null
          overtime_rate?: number | null
          processed_at?: string | null
          processed_by?: string | null
          tax_deduction?: number | null
          total_working_days?: number | null
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          allowances?: number | null
          basic_salary?: number
          created_at?: string
          days_worked?: number | null
          deductions?: number | null
          gross_salary?: number
          id?: string
          month?: number
          net_salary?: number
          overtime_hours?: number | null
          overtime_rate?: number | null
          processed_at?: string | null
          processed_by?: string | null
          tax_deduction?: number | null
          total_working_days?: number | null
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      performance_reviews: {
        Row: {
          areas_of_improvement: string | null
          comments: string | null
          created_at: string
          goals_achieved: string | null
          id: string
          performance_score: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          areas_of_improvement?: string | null
          comments?: string | null
          created_at?: string
          goals_achieved?: string | null
          id?: string
          performance_score?: number | null
          review_period_end: string
          review_period_start: string
          reviewer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          areas_of_improvement?: string | null
          comments?: string | null
          created_at?: string
          goals_achieved?: string | null
          id?: string
          performance_score?: number | null
          review_period_end?: string
          review_period_start?: string
          reviewer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          bank_account: string | null
          created_at: string
          date_of_birth: string | null
          department_id: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          employee_id: string | null
          first_name: string
          hire_date: string | null
          id: string
          is_active: boolean | null
          last_name: string
          phone: string | null
          profile_picture_url: string | null
          salary: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          bank_account?: string | null
          created_at?: string
          date_of_birth?: string | null
          department_id?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          employee_id?: string | null
          first_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name: string
          phone?: string | null
          profile_picture_url?: string | null
          salary?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          bank_account?: string | null
          created_at?: string
          date_of_birth?: string | null
          department_id?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          employee_id?: string | null
          first_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          phone?: string | null
          profile_picture_url?: string | null
          salary?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "hr" | "employee"
      attendance_status: "present" | "absent" | "half_day" | "late"
      leave_status: "pending" | "approved" | "rejected"
      leave_type:
        | "casual"
        | "sick"
        | "earned"
        | "maternity"
        | "paternity"
        | "emergency"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "hr", "employee"],
      attendance_status: ["present", "absent", "half_day", "late"],
      leave_status: ["pending", "approved", "rejected"],
      leave_type: [
        "casual",
        "sick",
        "earned",
        "maternity",
        "paternity",
        "emergency",
      ],
    },
  },
} as const

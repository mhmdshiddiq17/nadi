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
      agencies: {
        Row: {
          agency_id: string
          code: string
          created_at: string
          is_active: boolean
          kind: Database["public"]["Enums"]["agency_kind"]
          name: string
          short_name: string | null
          updated_at: string
        }
        Insert: {
          agency_id?: string
          code: string
          created_at?: string
          is_active?: boolean
          kind: Database["public"]["Enums"]["agency_kind"]
          name: string
          short_name?: string | null
          updated_at?: string
        }
        Update: {
          agency_id?: string
          code?: string
          created_at?: string
          is_active?: boolean
          kind?: Database["public"]["Enums"]["agency_kind"]
          name?: string
          short_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      integration_sources: {
        Row: {
          adapter_key: string
          agency_id: string
          base_url: string | null
          code: string
          created_at: string
          integration_source_id: string
          is_enabled: boolean
          last_synced_at: string | null
          name: string
          schedule_cron: string
          source_type: Database["public"]["Enums"]["integration_source_type"]
          status: Database["public"]["Enums"]["integration_source_status"]
          timezone: string
          updated_at: string
        }
        Insert: {
          adapter_key: string
          agency_id: string
          base_url?: string | null
          code: string
          created_at?: string
          integration_source_id?: string
          is_enabled?: boolean
          last_synced_at?: string | null
          name: string
          schedule_cron?: string
          source_type?: Database["public"]["Enums"]["integration_source_type"]
          status?: Database["public"]["Enums"]["integration_source_status"]
          timezone?: string
          updated_at?: string
        }
        Update: {
          adapter_key?: string
          agency_id?: string
          base_url?: string | null
          code?: string
          created_at?: string
          integration_source_id?: string
          is_enabled?: boolean
          last_synced_at?: string | null
          name?: string
          schedule_cron?: string
          source_type?: Database["public"]["Enums"]["integration_source_type"]
          status?: Database["public"]["Enums"]["integration_source_status"]
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_sources_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      periods: {
        Row: {
          code: string
          created_at: string
          ends_on: string
          fiscal_year: number
          is_closed: boolean
          label: string
          month: number | null
          period_id: string
          period_type: Database["public"]["Enums"]["period_type"]
          quarter: number | null
          starts_on: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          ends_on: string
          fiscal_year: number
          is_closed?: boolean
          label: string
          month?: number | null
          period_id?: string
          period_type: Database["public"]["Enums"]["period_type"]
          quarter?: number | null
          starts_on: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          ends_on?: string
          fiscal_year?: number
          is_closed?: boolean
          label?: string
          month?: number | null
          period_id?: string
          period_type?: Database["public"]["Enums"]["period_type"]
          quarter?: number | null
          starts_on?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agency_id: string | null
          created_at: string
          full_name: string | null
          id: string
          is_active: boolean
          role_id: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_active?: boolean
          role_id: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          role_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_agency_fk"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "profiles_role_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      program_agencies: {
        Row: {
          agency_id: string
          created_at: string
          program_id: string
          role: Database["public"]["Enums"]["program_agency_role"]
        }
        Insert: {
          agency_id: string
          created_at?: string
          program_id: string
          role: Database["public"]["Enums"]["program_agency_role"]
        }
        Update: {
          agency_id?: string
          created_at?: string
          program_id?: string
          role?: Database["public"]["Enums"]["program_agency_role"]
        }
        Relationships: [
          {
            foreignKeyName: "program_agencies_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["agency_id"]
          },
          {
            foreignKeyName: "program_agencies_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      program_allocations: {
        Row: {
          allocation_id: string
          allocation_method: string
          allocation_weight: number
          budget_amount: number
          created_at: string
          fetched_at: string
          fiscal_year: number
          metadata: Json
          program_id: string
          region_id: string
          source_ref: string
          source_system: string
          updated_at: string
        }
        Insert: {
          allocation_id?: string
          allocation_method?: string
          allocation_weight: number
          budget_amount: number
          created_at?: string
          fetched_at: string
          fiscal_year: number
          metadata?: Json
          program_id: string
          region_id: string
          source_ref: string
          source_system: string
          updated_at?: string
        }
        Update: {
          allocation_id?: string
          allocation_method?: string
          allocation_weight?: number
          budget_amount?: number
          created_at?: string
          fetched_at?: string
          fiscal_year?: number
          metadata?: Json
          program_id?: string
          region_id?: string
          source_ref?: string
          source_system?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_allocations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "program_allocations_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "program_allocations_source_system_fkey"
            columns: ["source_system"]
            isOneToOne: false
            referencedRelation: "integration_sources"
            referencedColumns: ["code"]
          },
        ]
      }
      program_realisation_snapshots: {
        Row: {
          allocation_id: string
          created_at: string
          cumulative_realised_value: number
          fetched_at: string
          metadata: Json
          period_id: string
          period_realised_value: number
          snapshot_id: string
          source_ref: string
          source_system: string
          updated_at: string
        }
        Insert: {
          allocation_id: string
          created_at?: string
          cumulative_realised_value: number
          fetched_at: string
          metadata?: Json
          period_id: string
          period_realised_value: number
          snapshot_id?: string
          source_ref: string
          source_system: string
          updated_at?: string
        }
        Update: {
          allocation_id?: string
          created_at?: string
          cumulative_realised_value?: number
          fetched_at?: string
          metadata?: Json
          period_id?: string
          period_realised_value?: number
          snapshot_id?: string
          source_ref?: string
          source_system?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_realisation_snapshots_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: false
            referencedRelation: "program_allocations"
            referencedColumns: ["allocation_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: false
            referencedRelation: "program_performance_monthly"
            referencedColumns: ["allocation_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["period_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_source_system_fkey"
            columns: ["source_system"]
            isOneToOne: false
            referencedRelation: "integration_sources"
            referencedColumns: ["code"]
          },
        ]
      }
      programs: {
        Row: {
          active_from: string | null
          active_to: string | null
          code: string
          cost_bearer: Database["public"]["Enums"]["cost_bearer"]
          created_at: string
          family: Database["public"]["Enums"]["program_family"]
          full_name: string
          is_active: boolean
          legal_basis: string | null
          name: string
          program_id: string
          steward_agency_id: string
          unit_label: string | null
          updated_at: string
        }
        Insert: {
          active_from?: string | null
          active_to?: string | null
          code: string
          cost_bearer: Database["public"]["Enums"]["cost_bearer"]
          created_at?: string
          family: Database["public"]["Enums"]["program_family"]
          full_name: string
          is_active?: boolean
          legal_basis?: string | null
          name: string
          program_id?: string
          steward_agency_id: string
          unit_label?: string | null
          updated_at?: string
        }
        Update: {
          active_from?: string | null
          active_to?: string | null
          code?: string
          cost_bearer?: Database["public"]["Enums"]["cost_bearer"]
          created_at?: string
          family?: Database["public"]["Enums"]["program_family"]
          full_name?: string
          is_active?: boolean
          legal_basis?: string | null
          name?: string
          program_id?: string
          steward_agency_id?: string
          unit_label?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_steward_agency_fk"
            columns: ["steward_agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["agency_id"]
          },
        ]
      }
      regions: {
        Row: {
          bps_code: string | null
          code: string
          created_at: string
          is_active: boolean
          name: string
          parent_id: string | null
          region_id: string
          region_type: Database["public"]["Enums"]["region_type"]
          sort_order: number
          updated_at: string
        }
        Insert: {
          bps_code?: string | null
          code: string
          created_at?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          region_id?: string
          region_type: Database["public"]["Enums"]["region_type"]
          sort_order?: number
          updated_at?: string
        }
        Update: {
          bps_code?: string | null
          code?: string
          created_at?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          region_id?: string
          region_type?: Database["public"]["Enums"]["region_type"]
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region_id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string
          description: string | null
          is_system: boolean
          name: string
          priority: number
          role_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          is_system?: boolean
          name: string
          priority?: number
          role_id?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          is_system?: boolean
          name?: string
          priority?: number
          role_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      portfolio_year_summary: {
        Row: {
          achievement_pct: number | null
          budget_amount: number | null
          fiscal_year: number | null
          gap_value: number | null
          program_count: number | null
          realised_value: number | null
        }
        Relationships: []
      }
      program_performance_monthly: {
        Row: {
          achievement_pct: number | null
          allocation_id: string | null
          allocation_method: string | null
          allocation_source_ref: string | null
          allocation_source_system: string | null
          allocation_weight: number | null
          budget_amount: number | null
          cumulative_realised_value: number | null
          fiscal_year: number | null
          gap_value: number | null
          month: number | null
          period_code: string | null
          period_id: string | null
          period_label: string | null
          period_realised_value: number | null
          program_code: string | null
          program_id: string | null
          program_name: string | null
          realisation_fetched_at: string | null
          realisation_source_ref: string | null
          realisation_source_system: string | null
          region_code: string | null
          region_id: string | null
          region_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_allocations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "program_allocations_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "program_allocations_source_system_fkey"
            columns: ["allocation_source_system"]
            isOneToOne: false
            referencedRelation: "integration_sources"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["period_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_source_system_fkey"
            columns: ["realisation_source_system"]
            isOneToOne: false
            referencedRelation: "integration_sources"
            referencedColumns: ["code"]
          },
        ]
      }
      program_period_summary: {
        Row: {
          achievement_pct: number | null
          budget_amount: number | null
          cumulative_realised_value: number | null
          fiscal_year: number | null
          gap_value: number | null
          month: number | null
          period_code: string | null
          period_id: string | null
          period_label: string | null
          period_realised_value: number | null
          program_code: string | null
          program_id: string | null
          program_name: string | null
          province_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_allocations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["period_id"]
          },
        ]
      }
      program_year_summary: {
        Row: {
          achievement_pct: number | null
          budget_amount: number | null
          fiscal_year: number | null
          gap_value: number | null
          latest_period_code: string | null
          latest_period_id: string | null
          latest_period_label: string | null
          program_code: string | null
          program_id: string | null
          program_name: string | null
          province_count: number | null
          realised_value: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_allocations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "program_realisation_snapshots_period_id_fkey"
            columns: ["latest_period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["period_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      agency_kind: "KL" | "BUMN" | "BANK" | "AUDITOR" | "INTERNAL" | "OTHER"
      cost_bearer: "APBN" | "APBN_CBP" | "PELAKU_USAHA" | "OTHER"
      integration_source_status:
        | "MOCK"
        | "READY"
        | "ACTIVE"
        | "DEGRADED"
        | "FAILED"
        | "DISABLED"
      integration_source_type: "MOCK" | "REST" | "SFTP" | "WEBHOOK" | "FILE"
      period_type: "MONTHLY" | "QUARTERLY" | "YEARLY"
      program_agency_role:
        | "STEWARD"
        | "DATA_PROVIDER"
        | "REGULATOR"
        | "PAYER"
        | "SUPERVISOR"
        | "OPERATOR"
      program_family: "SUBSIDI" | "DMO" | "BANTUAN"
      region_type: "COUNTRY" | "PROVINCE" | "REGENCY" | "DISTRICT" | "VILLAGE"
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
      agency_kind: ["KL", "BUMN", "BANK", "AUDITOR", "INTERNAL", "OTHER"],
      cost_bearer: ["APBN", "APBN_CBP", "PELAKU_USAHA", "OTHER"],
      integration_source_status: [
        "MOCK",
        "READY",
        "ACTIVE",
        "DEGRADED",
        "FAILED",
        "DISABLED",
      ],
      integration_source_type: ["MOCK", "REST", "SFTP", "WEBHOOK", "FILE"],
      period_type: ["MONTHLY", "QUARTERLY", "YEARLY"],
      program_agency_role: [
        "STEWARD",
        "DATA_PROVIDER",
        "REGULATOR",
        "PAYER",
        "SUPERVISOR",
        "OPERATOR",
      ],
      program_family: ["SUBSIDI", "DMO", "BANTUAN"],
      region_type: ["COUNTRY", "PROVINCE", "REGENCY", "DISTRICT", "VILLAGE"],
    },
  },
} as const


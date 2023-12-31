export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          id: string
          order: number
          owner_id: string
          priority: string
          start_date: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          id: string
          order: number
          owner_id: string
          priority?: string
          start_date: string
          status?: string
          title?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          order?: number
          owner_id?: string
          priority?: string
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

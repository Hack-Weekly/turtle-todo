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
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          created_at: string
          id: string
          priority: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          id: string
          priority?: string
          status?: string
          title?: string
        }
        Update: {
          created_at?: string
          id?: string
          priority?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          id: string
          isPrivate: boolean | null
          notes_id: string
          status: boolean
          title: string
        }
        Insert: {
          created_at?: string
          id: string
          isPrivate?: boolean | null
          notes_id: string
          status: boolean
          title?: string
        }
        Update: {
          created_at?: string
          id?: string
          isPrivate?: boolean | null
          notes_id?: string
          status?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_notes_id_fkey"
            columns: ["notes_id"]
            referencedRelation: "notes"
            referencedColumns: ["id"]
          }
        ]
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

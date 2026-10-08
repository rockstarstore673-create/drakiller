// types/database.ts
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          email: string;
          role: 'user' | 'admin' | 'super_admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          email: string;
          role?: 'user' | 'admin' | 'super_admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          avatar_url?: string | null;
          role?: 'user' | 'admin' | 'super_admin';
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      project_files: {
        Row: {
          id: string;
          project_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          file_url: string;
          file_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          file_name: string;
          file_type: string;
          file_size: number;
          file_url: string;
          file_path: string;
          created_at?: string;
        };
        Update: {
          file_name?: string;
        };
      };
      processing_jobs: {
        Row: {
          id: string;
          user_id: string;
          tool_type: string;
          input_file_url: string | null;
          output_file_url: string | null;
          status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
          progress: number;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_type: string;
          input_file_url?: string | null;
          output_file_url?: string | null;
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
          progress?: number;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
          progress?: number;
          output_file_url?: string | null;
          error_message?: string | null;
          updated_at?: string;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          model: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          model?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          updated_at?: string;
        };
      };
      ai_messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant';
          content: string;
          model: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: 'user' | 'assistant';
          content: string;
          model?: string | null;
          created_at?: string;
        };
        Update: never;
      };
      github_history: {
        Row: {
          id: string;
          user_id: string;
          repository_url: string;
          repository_name: string;
          owner: string;
          search_query: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          repository_url: string;
          repository_name: string;
          owner: string;
          search_query: string;
          created_at?: string;
        };
        Update: never;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'tool' | 'project' | 'repository';
          item_id: string;
          item_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'tool' | 'project' | 'repository';
          item_id: string;
          item_name: string;
          created_at?: string;
        };
        Update: never;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          resource: string;
          details: string | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          resource: string;
          details?: string | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: never;
      };
      system_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          value?: string;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          type: 'info' | 'warning' | 'success';
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          type?: 'info' | 'warning' | 'success';
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          type?: 'info' | 'warning' | 'success';
          active?: boolean;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          user_id: string | null;
          category: string;
          description: string;
          status: 'open' | 'in_progress' | 'resolved' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          category: string;
          description: string;
          status?: 'open' | 'in_progress' | 'resolved' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'open' | 'in_progress' | 'resolved' | 'closed';
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

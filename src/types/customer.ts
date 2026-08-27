export interface Customer {
  created_at?: string | null;
  email: string;
  first_name?: string | null;
  id: string;
  last_name?: string | null;
  metadata?: Record<string, unknown> | null;
  phone?: string | null;
}

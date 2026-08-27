export interface ApiErrorPayload {
  error?: string;
  message?: string;
  status?: number;
}

export interface ApiResponse<TData> {
  data: TData;
  message?: string;
}

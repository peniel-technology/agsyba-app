export interface ApiErrorPayload {
  message: string;
  status: number;
}

export interface ApiResponse<TData> {
  data: TData;
  message?: string;
}

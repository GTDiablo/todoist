export interface IApiResponse<PayloadType> {
  status: number;
  error?: string;
  payload: PayloadType | Record<string, never>;
}

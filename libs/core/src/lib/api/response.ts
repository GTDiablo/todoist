import { IApiResponse } from '@todoist/api-interfaces';

export class ApiResponse<PayloadType> implements IApiResponse<PayloadType> {
  public status!: number;
  public error?: string | undefined = '';
  public payload: PayloadType | Record<string, never> = {};
}

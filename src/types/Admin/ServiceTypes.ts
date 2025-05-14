export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
} 
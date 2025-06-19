export interface AuthError {
  isAuthError: boolean;
  shouldRedirect: boolean;
  message: string;
}

export interface ErrorWithResponse {
  response?: {
    status: number;
  };
} 
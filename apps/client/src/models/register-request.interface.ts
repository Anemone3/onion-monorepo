export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}


export interface RefreshTokenResponse{
  accessToken: string;
  message: string;
}
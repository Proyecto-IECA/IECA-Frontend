export class AuthResponseI {
  status: boolean;
  message: string;
  data: any;
  token?: string;
  refreshToken?: string;
}

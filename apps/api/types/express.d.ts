declare namespace Express {
  interface Request {
    user?: User;
  }
  interface User {
    sub: string;
    role: string;
  }
}

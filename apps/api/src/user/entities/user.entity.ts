import { Role } from "../interfaces/role.enum";

export class User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  profile: string;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}

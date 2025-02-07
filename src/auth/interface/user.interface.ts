import { UserRole } from "../../entity";

export interface UserDetails {
  userId: number;
  role: UserRole;
  email: string;
}

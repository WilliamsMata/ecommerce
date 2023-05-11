import { Role } from "@prisma/client";

export interface UserContext {
  name: string;
  email: string;
  role: Role;
}

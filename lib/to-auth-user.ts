import type { User } from "next-auth";

export function toAuthUser(user: {
  id: string;
  email: string;
  name: string | null;
}): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

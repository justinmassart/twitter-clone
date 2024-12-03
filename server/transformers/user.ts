import type { User } from "@prisma/client";
import type { TransformedUser } from "~/shared/types";

export const userTransformer = (user: User): TransformedUser => {
  const handle = "@" + user.username;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    handle: handle,
  };
};

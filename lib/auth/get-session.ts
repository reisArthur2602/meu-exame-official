import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, verifyToken } from "@/lib/auth/token";
import prisma from "@/lib/prisma";

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      omit: { passwordHash: true },
    });

    if (!user || !user.isActive) return null;

    return user;
  } catch {
    return null;
  }
};

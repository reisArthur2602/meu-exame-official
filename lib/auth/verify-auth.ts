import { getSession } from "@/lib/auth/get-session";

export const verifyAuth = async () => {
  const user = await getSession();

  if (!user) {
    throw new Error("Não autenticado");
  }

  return user;
};

export const verifyAdmin = async () => {
  const user = await verifyAuth();

  if (!user.isAdmin) {
    throw new Error("Acesso restrito a administradores");
  }

  return user;
};

"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, signToken } from "@/lib/auth/token";
import prisma from "@/lib/prisma";
import {
  type ClinicLoginInput,
  clinicLoginSchema,
} from "@/schema/clinic-login-schema";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const loginClinic = async (input: ClinicLoginInput) => {
  const parsed = clinicLoginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Preencha corretamente o usuário e a senha para continuar.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username.trim().toLowerCase() },
  });

  if (!user || !user.isActive) {
    return {
      ok: false,
      message: "Usuário ou senha inválidos.",
    };
  }

  const isValidPassword = await bcrypt.compare(
    parsed.data.password,
    user.passwordHash,
  );

  if (!isValidPassword) {
    return {
      ok: false,
      message: "Usuário ou senha inválidos.",
    };
  }

  const token = signToken({ userId: user.id });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: parsed.data.remember ? SESSION_MAX_AGE_SECONDS : undefined,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    ok: true,
    message: "Acesso liberado. Abrindo o painel...",
    data: {
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
    },
  };
};

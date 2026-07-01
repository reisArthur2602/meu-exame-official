import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/get-session";

type RedirectAuthOptions = {
  mode: "protect" | "guest";
};

export const redirectAuth = async ({ mode }: RedirectAuthOptions) => {
  const user = await getSession();

  if (mode === "protect" && !user) {
    redirect("/auth");
  }

  if (mode === "guest" && user) {
    redirect("/exams");
  }

  return user;
};

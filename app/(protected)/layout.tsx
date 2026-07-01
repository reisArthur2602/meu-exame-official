import type { PropsWithChildren } from "react";

import { redirectAuth } from "@/lib/auth/redirect-auth";
import { ProtectedHeader } from "./feature/protected-header";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const user = await redirectAuth({ mode: "protect" });

  if (!user) return null;

  return (
    <>
      <ProtectedHeader user={{ name: user.name, isAdmin: user.isAdmin }} />
      <main className=" mx-auto  max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </main>
    </>
  );
};

export default ProtectedLayout;

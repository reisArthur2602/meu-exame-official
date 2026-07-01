"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginClinic } from "@/app/auth/actions/login-clinic";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  type ClinicLoginInput,
  clinicLoginSchema,
} from "@/schema/clinic-login-schema";

export const ClinicLoginForm = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClinicLoginInput>({
    resolver: zodResolver(clinicLoginSchema),
    defaultValues: { username: "", password: "", remember: false },
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await loginClinic(data);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/exams");
  });

  return (
    <>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-700">
          Acesso restrito
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-900">
          Entrar no Portal da Clínica
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Use seu usuário e sua senha para continuar.
        </p>
      </div>

      <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
        <Input
          type="text"
          label="Usuário"
          placeholder="Digite seu usuário"
          autoComplete="username"
          icon={
            <User className="size-5" strokeWidth={1.7} aria-hidden="true" />
          }
          errorMessage={errors.username?.message}
          {...register("username")}
        />

        <div>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Senha
          </span>

          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            icon={
              <Lock className="size-5" strokeWidth={1.7} aria-hidden="true" />
            }
            errorMessage={errors.password?.message}
            trailing={
              <button
                type="button"
                aria-label={
                  isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
                }
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                className="grid w-12 place-items-center text-slate-400 hover:text-sky-900 focus-visible:ring-2 focus-visible:ring-sky-900"
              >
                {isPasswordVisible ? (
                  <EyeOff
                    className="size-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    className="size-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                )}
              </button>
            }
            {...register("password")}
          />
        </div>

        <label
          htmlFor="remember"
          className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600"
        >
          <Checkbox id="remember" {...register("remember")} />
          <span>Manter acesso neste dispositivo</span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verificando acesso..." : "Entrar no portal"}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs leading-5 text-slate-500">
        O acesso é exclusivo para profissionais autorizados pela clínica.
      </p>
    </>
  );
};

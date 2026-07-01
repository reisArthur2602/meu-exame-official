"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { type DragEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createExam } from "@/app/(protected)/exams/new/actions/create-exam";
import { Input } from "@/components/ui/input";
import {
  formatBytes,
  formatCpf,
  formatPhone,
  isValidExamFile,
} from "@/lib/utils";
import {
  type CreateExamInput,
  createExamSchema,
} from "@/schema/create-exam-schema";

const todayIsoDate = () => new Date().toISOString().split("T")[0];

export const NewExamForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateExamInput>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      patientName: "",
      patientCpf: "",
      patientPhone: "",
      protocol: "",
      examName: "",
      examDate: todayIsoDate(),
    },
  });

  const patientCpfField = register("patientCpf");
  const patientPhoneField = register("patientPhone");
  const protocolField = register("protocol");

  const watchedName = watch("patientName");
  const watchedCpf = watch("patientCpf");
  const watchedProtocol = watch("protocol");

  const selectFile = (file: File | null) => {
    if (!isValidExamFile(file)) {
      setSelectedFile(null);
      setFileError(true);
      return;
    }

    setSelectedFile(file);
    setFileError(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    selectFile(event.dataTransfer.files[0] ?? null);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!selectedFile) {
      setFileError(true);
      return;
    }

    const result = await createExam(data, selectedFile);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/exams");
  });

  return (
    <form
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
      onSubmit={onSubmit}
      noValidate
    >
      <section
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="data-title"
      >
        <div className="border-b border-slate-200 pb-6">
          <h2 id="data-title" className="text-xl font-bold text-slate-900">
            Dados deste exame
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Cada envio gera um registro próprio, sem criar uma ficha permanente
            de paciente.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="Nome completo do paciente *"
              autoComplete="name"
              placeholder="Ex.: Mariana da Silva"
              errorMessage={errors.patientName?.message}
              {...register("patientName")}
            />
          </div>

          <Input
            label="CPF *"
            inputMode="numeric"
            maxLength={14}
            placeholder="000.000.000-00"
            errorMessage={errors.patientCpf?.message}
            {...patientCpfField}
            onChange={(event) => {
              event.target.value = formatCpf(event.target.value);
              patientCpfField.onChange(event);
            }}
          />

          <Input
            label="Telefone do paciente *"
            inputMode="tel"
            placeholder="+55 (21) 99999-0000"
            helperText="Informe com o código do país (ex.: +55)."
            autoComplete="tel"
            errorMessage={errors.patientPhone?.message}
            {...patientPhoneField}
            onChange={(event) => {
              event.target.value = formatPhone(event.target.value);
              patientPhoneField.onChange(event);
            }}
          />

          <Input
            label="Protocolo *"
            autoComplete="off"
            placeholder="Ex.: ML-2026-1048"
            className="font-semibold uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal"
            errorMessage={errors.protocol?.message}
            {...protocolField}
            onChange={(event) => {
              event.target.value = event.target.value.toUpperCase();
              protocolField.onChange(event);
            }}
          />

          <Input
            label="Nome do exame *"
            placeholder="Ex.: Hemograma completo"
            errorMessage={errors.examName?.message}
            {...register("examName")}
          />

          <Input
            label="Data de realização *"
            type="date"
            errorMessage={errors.examDate?.message}
            {...register("examDate")}
          />
        </div>

        <div className="mt-7">
          <p className="mb-2 text-sm font-bold text-slate-700">
            Arquivo do exame *
          </p>

          {/* biome-ignore lint/a11y/useSemanticElements: a native button can't contain the hidden file input while remaining a valid drop target */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Selecionar arquivo do exame"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDraggingOver(false);
            }}
            onDrop={handleDrop}
            className={`group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
              fileError
                ? "border-rose-600 bg-rose-50"
                : isDraggingOver
                  ? "border-sky-700 bg-sky-50"
                  : "border-slate-300 bg-slate-50 hover:border-sky-700 hover:bg-sky-50/70"
            } focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.dcm,application/pdf,application/dicom"
              onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
            />

            <span className="grid size-16 place-items-center rounded-3xl bg-white text-sky-900 shadow-sm transition group-hover:-translate-y-1">
              <UploadCloud
                className="size-8"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
            <p className="mt-5 text-base font-bold text-slate-900">
              Arraste e solte o arquivo aqui
            </p>
            <p className="mt-2 text-sm text-slate-500">
              ou clique para selecionar
            </p>
            <span className="mt-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm">
              PDF ou DICOM · até 100 MB
            </span>
          </div>

          {fileError ? (
            <p className="mt-2 text-xs font-semibold text-rose-600">
              Selecione um arquivo PDF ou DICOM.
            </p>
          ) : null}

          {selectedFile ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-900">
                  <FileText
                    className="size-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(selectedFile.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  Remover
                </button>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full bg-emerald-600 transition-all duration-700 ${
                    isSubmitting ? "w-1/3" : "w-full"
                  }`}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                {isSubmitting
                  ? "Enviando arquivo..."
                  : "Arquivo pronto para envio"}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-3xl bg-sky-900 p-6 text-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">
            Como o acesso funciona
          </p>
          <ol className="mt-5 space-y-5 text-sm">
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 font-bold">
                1
              </span>
              <span>Cadastre os dados somente deste exame.</span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 font-bold">
                2
              </span>
              <span>Envie o arquivo PDF ou DICOM.</span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 font-bold">
                3
              </span>
              <span>O paciente consulta com CPF + protocolo.</span>
            </li>
          </ol>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Resumo do envio
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Paciente</dt>
              <dd className="max-w-40 truncate font-bold text-slate-800">
                {watchedName.trim() || "Não informado"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">CPF</dt>
              <dd className="font-bold text-slate-800">
                {watchedCpf || "Não informado"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Protocolo</dt>
              <dd className="font-bold text-slate-800">
                {watchedProtocol.trim().toUpperCase() || "Não informado"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-500">Arquivo</dt>
              <dd className="max-w-40 truncate font-bold text-slate-800">
                {selectedFile?.name ?? "Não selecionado"}
              </dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-900 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Enviando exame" : "Enviar exame"}
            {isSubmitting ? (
              <Loader2
                className="size-5 animate-spin"
                strokeWidth={3}
                aria-hidden="true"
              />
            ) : null}
          </button>
        </section>
      </aside>
    </form>
  );
};

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export type ExamRow = {
  id: string;
  name: string;
  cpf: string;
  protocol: string;
  exam: string;
  uploadDate: string;
  hasError: boolean;
};

export const getExamsColumns = (): ColumnDef<ExamRow>[] => [
  {
    accessorKey: "name",
    header: "Paciente",
    cell: ({ row }) => (
      <Link
        href={`/exams/${row.original.id}`}
        className="font-bold text-slate-900 hover:text-sky-900 hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-slate-600">
        {row.original.cpf}
      </span>
    ),
  },
  {
    accessorKey: "protocol",
    header: "Protocolo",
    cell: ({ row }) => (
      <span className="text-sm font-bold text-sky-900">
        {row.original.protocol}
      </span>
    ),
  },
  {
    accessorKey: "exam",
    header: "Exame",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700">{row.original.exam}</span>
    ),
  },
  {
    accessorKey: "uploadDate",
    header: "Upload",
    cell: ({ row }) => (
      <span className="text-sm text-slate-500">{row.original.uploadDate}</span>
    ),
  },
  {
    id: "status",
    accessorFn: (row) => (row.hasError ? "erro" : "disponivel"),
    header: "Status",
    cell: ({ row }) =>
      row.original.hasError ? (
        <Badge variant="error">Erro de envio</Badge>
      ) : (
        <Badge variant="success">Disponível</Badge>
      ),
    filterFn: "equalsString",
  },
];

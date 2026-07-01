"use client";

import {
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  type ExamRow,
  getExamsColumns,
} from "@/app/(protected)/exams/feature/exams-columns";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { normalizeText } from "@/lib/utils";

const examsGlobalFilterFn: FilterFn<ExamRow> = (
  row,
  _columnId,
  filterValue,
) => {
  const term = normalizeText(String(filterValue));
  const haystack = normalizeText(
    `${row.original.name} ${row.original.cpf} ${row.original.protocol}`,
  );
  return haystack.includes(term);
};

type ExamsTableProps = {
  data: ExamRow[];
};

export const ExamsTable = ({ data }: ExamsTableProps) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const columns = useMemo(() => getExamsColumns(), []);

  const columnFilters: ColumnFiltersState = useMemo(
    () =>
      statusFilter === "todos" ? [] : [{ id: "status", value: statusFilter }],
    [statusFilter],
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnFilters },
    globalFilterFn: examsGlobalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const pageRows = table.getRowModel().rows;

  const clearFilters = () => {
    setGlobalFilter("");
    setStatusFilter("todos");
    table.resetPagination();
  };

  return (
    <section
      className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="table-title"
    >
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 id="table-title" className="text-xl font-bold text-slate-900">
              Registros recentes
            </h2>
            <p className="mt-1 text-sm text-slate-500" aria-live="polite">
              {filteredRows.length}{" "}
              {filteredRows.length === 1
                ? "exame encontrado"
                : "exames encontrados"}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_220px_auto]">
            <Input
              type="search"
              aria-label="Pesquisar por nome, CPF ou protocolo"
              placeholder="Nome, CPF ou protocolo"
              icon={
                <Search
                  className="size-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              }
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
                table.resetPagination();
              }}
            />

            <Select
              aria-label="Filtrar por status"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                table.resetPagination();
              }}
            >
              <option value="todos">Todos os status</option>
              <option value="disponivel">Disponível</option>
              <option value="erro">Erro de envio</option>
            </Select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:border-sky-700 hover:text-sky-900"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {pageRows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pageRows.map((row) => (
                <tr key={row.id} className="transition hover:bg-slate-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={
            <Search className="size-8" strokeWidth={1.7} aria-hidden="true" />
          }
          title="Nenhum resultado encontrado"
          description="Nenhum exame corresponde aos filtros aplicados."
          action={
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-sky-700 hover:text-sky-900"
            >
              Limpar filtros
            </button>
          }
        />
      )}

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:px-6">
        <span>
          {pageRows.length > 0
            ? `Mostrando ${pageRows.length} de ${filteredRows.length} exames`
            : "Nenhum exame encontrado"}
        </span>
        {pageRows.length > 0 ? (
          <div className="flex items-center gap-3">
            <span>
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="grid size-8 place-items-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Página anterior"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="grid size-8 place-items-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Próxima página"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export const cn = (...classes: Array<string | false | null | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const maskCpf = (value: string) => {
  const digits = value.replace(/\D/g, "").padStart(11, "*");
  return `***.***.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
};

export const formatCpf = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");

/**
 * Formats a phone number always keeping the leading country calling code
 * (e.g. "+55 (21) 99999-0000"). The country code is mandatory: the first
 * two digits typed are always treated as the country code, never dropped.
 */
export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (!digits) return "";

  const country = digits.slice(0, 2);
  const area = digits.slice(2, 4);
  const number = digits.slice(4);

  let formatted = `+${country}`;
  if (area) formatted += ` (${area})`;
  if (number) {
    formatted +=
      number.length > 4
        ? ` ${number.slice(0, -4)}-${number.slice(-4)}`
        : ` ${number}`;
  }

  return formatted;
};

export const isValidPhoneWithCountryCode = (value: string) =>
  value.replace(/\D/g, "").length >= 12;

export const formatBytes = (bytes: number) => {
  if (!bytes) return "0 KB";

  const units = ["bytes", "KB", "MB", "GB"];
  let size = bytes;
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }

  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

export const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const dateFormatter = new Intl.DateTimeFormat("pt-BR");
const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export const formatDate = (date: Date | null, fallback = "Não informada") =>
  date ? dateFormatter.format(date) : fallback;

export const formatDateTime = (
  date: Date | null,
  fallback = "Nunca acessou",
) => (date ? dateTimeFormatter.format(date) : fallback);

export const ALLOWED_EXAM_FILE_EXTENSIONS = ["pdf", "dcm"];
export const MAX_EXAM_FILE_SIZE = 100 * 1024 * 1024;

export const isValidExamFile = (
  file: { name: string; size: number } | null | undefined,
) => {
  const extension = file?.name.split(".").pop()?.toLowerCase();
  return Boolean(
    file &&
      extension &&
      ALLOWED_EXAM_FILE_EXTENSIONS.includes(extension) &&
      file.size <= MAX_EXAM_FILE_SIZE,
  );
};

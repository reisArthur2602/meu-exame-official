import { env } from "@/lib/env";

const baseUrl = env.NEXT_PUBLIC_URL.replace(/\/$/, "");

export const getSiteUrl = (path = "/") =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const getPatientExamUrl = (examId: string) =>
  getSiteUrl(`/patient/${examId}`);

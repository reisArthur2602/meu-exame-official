import { NextResponse } from "next/server";

import { verifyAuth } from "@/lib/auth/verify-auth";
import { downloadExamFile } from "@/lib/ftp";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ exam_id: string }> },
) => {
  let user: Awaited<ReturnType<typeof verifyAuth>>;

  try {
    user = await verifyAuth();
  } catch {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const { exam_id } = await params;
  const isInline = new URL(request.url).searchParams.get("view") === "1";

  const exam = await prisma.exam.findUnique({ where: { id: exam_id } });

  if (!exam || exam.uploadedById !== user.id) {
    return NextResponse.json(
      { message: "Exame não encontrado." },
      { status: 404 },
    );
  }

  try {
    const buffer = await downloadExamFile(exam.filePath);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": exam.fileMimeType,
        "Content-Disposition": `${isInline ? "inline" : "attachment"}; filename="${exam.originalFileName}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Não foi possível recuperar o arquivo do exame." },
      { status: 502 },
    );
  }
};

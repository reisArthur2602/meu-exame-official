import type { Metadata } from "next";
import { Suspense } from "react";

import { ExamDetailData } from "./feature/exam-detail-data";
import { ExamDetailLoading } from "./feature/exam-detail-loading";

export const metadata: Metadata = {
  title: "Detalhes do exame",
  description: "Consulte os dados, arquivo e status de envio deste exame.",
  robots: { index: false, follow: false },
};

type ExamDetailPageProps = {
  params: Promise<{ exam_id: string }>;
};

const ExamDetailPage = async ({ params }: ExamDetailPageProps) => {
  const { exam_id } = await params;

  return (
    <Suspense fallback={<ExamDetailLoading />}>
      <ExamDetailData examId={exam_id} />
    </Suspense>
  );
};

export default ExamDetailPage;

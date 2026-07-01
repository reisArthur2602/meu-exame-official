-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientCpf" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "examDate" TIMESTAMP(3),
    "filePath" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "fileMimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "whatsappFailed" BOOLEAN NOT NULL DEFAULT false,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_isAdmin_idx" ON "users"("isAdmin");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE INDEX "exams_patientName_idx" ON "exams"("patientName");

-- CreateIndex
CREATE INDEX "exams_patientCpf_idx" ON "exams"("patientCpf");

-- CreateIndex
CREATE INDEX "exams_patientPhone_idx" ON "exams"("patientPhone");

-- CreateIndex
CREATE INDEX "exams_protocol_idx" ON "exams"("protocol");

-- CreateIndex
CREATE INDEX "exams_whatsappFailed_idx" ON "exams"("whatsappFailed");

-- CreateIndex
CREATE INDEX "exams_uploadedById_idx" ON "exams"("uploadedById");

-- CreateIndex
CREATE INDEX "exams_createdAt_idx" ON "exams"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "exams_patientCpf_protocol_key" ON "exams"("patientCpf", "protocol");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

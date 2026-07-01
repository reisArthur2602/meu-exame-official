import { PassThrough, Readable } from "node:stream";
import { Client } from "basic-ftp";

import { env } from "@/lib/env";

export const ftpConfig = {
  host: env.FTP_HOST,
  port: env.FTP_PORT,
  user: env.FTP_USER,
  password: env.FTP_PASSWORD,
  secure: env.FTP_SECURE,
};

export const createFtpClient = async () => {
  const client = new Client();
  client.ftp.verbose = process.env.NODE_ENV !== "production";

  await client.access(ftpConfig);

  return client;
};

const EXAMS_REMOTE_DIR = "/exams";

export const uploadExamFile = async (file: Buffer, remoteFileName: string) => {
  const client = await createFtpClient();

  try {
    await client.ensureDir(EXAMS_REMOTE_DIR);

    const remotePath = `${EXAMS_REMOTE_DIR}/${remoteFileName}`;
    await client.uploadFrom(Readable.from(file), remoteFileName);

    return remotePath;
  } finally {
    client.close();
  }
};

export const downloadExamFile = async (remotePath: string) => {
  const client = await createFtpClient();

  try {
    const chunks: Buffer[] = [];
    const stream = new PassThrough();
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));

    await client.downloadTo(stream, remotePath);

    return Buffer.concat(chunks);
  } finally {
    client.close();
  }
};

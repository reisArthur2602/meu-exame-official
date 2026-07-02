import { env } from "@/lib/env";

export const evolutionApiConfig = {
  baseUrl: env.EVOLUTION_API_URL,
  apiKey: env.EVOLUTION_API_KEY,
  instanceName: env.EVOLUTION_INSTANCE_NAME,
};

type EvolutionApiRequest = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

export const evolutionApi = async <T>({
  path,
  method = "GET",
  body,
}: EvolutionApiRequest): Promise<T> => {
  const response = await fetch(`${evolutionApiConfig.baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: evolutionApiConfig.apiKey ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Evolution API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
};

type SendWhatsappMessageInput = {
  phone: string;
  message: string;
};

export const sendWhatsappMessage = async ({
  phone,
  message,
}: SendWhatsappMessageInput) => {
  await evolutionApi({
    path: `/message/sendText/${evolutionApiConfig.instanceName}`,
    method: "POST",
    body: {
      number: phone,
      text: message,
    },
  });
};

type SendWhatsappImageInput = {
  phone: string;
  caption: string;
  imageBase64: string;
  fileName: string;
};

export const sendWhatsappImage = async ({
  phone,
  caption,
  imageBase64,
  fileName,
}: SendWhatsappImageInput) => {
  await evolutionApi({
    path: `/message/sendMedia/${evolutionApiConfig.instanceName}`,
    method: "POST",
    body: {
      number: phone,
      mediatype: "image",
      mimetype: "image/png",
      caption,
      media: imageBase64,
      fileName,
    },
  });
};

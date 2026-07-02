import { ImageResponse } from "next/og";

type ExamNotificationImageInput = {
  patientName: string;
  examName: string;
  protocol: string;
};

export const generateExamNotificationImage = async ({
  patientName,
  examName,
  protocol,
}: ExamNotificationImageInput) => {
  const imageResponse = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#0c4a6e",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "rgba(255,255,255,0.15)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 3.75h7.25L18 7.5v12.75H7V3.75Z"
              stroke="#fff"
              strokeWidth={1.9}
              strokeLinejoin="round"
            />
            <path
              d="M14 3.75V7.5h4"
              stroke="#fff"
              strokeWidth={1.9}
              strokeLinejoin="round"
            />
            <path
              d="M9.25 13h1.5l1-2.25 1.5 4 1-2h1.5"
              stroke="#fff"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>
          MeuLaudo
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(16,185,129,0.2)",
            color: "#6ee7b7",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Exame disponível
        </div>
        <span style={{ fontSize: 48, fontWeight: 800, color: "#fff" }}>
          {patientName}
        </span>
        <span style={{ fontSize: 28, color: "#bae6fd" }}>{examName}</span>
        <span style={{ fontSize: 24, color: "#7dd3fc" }}>
          Protocolo {protocol}
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );

  const arrayBuffer = await imageResponse.arrayBuffer();

  return Buffer.from(arrayBuffer).toString("base64");
};

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const AppleIcon = () => {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c4a6e",
        borderRadius: 40,
      }}
    >
      <svg
        width="108"
        height="108"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 3.75h7.25L18 7.5v12.75H7V3.75Z"
          stroke="#fff"
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
        <path
          d="M14 3.75V7.5h4"
          stroke="#fff"
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
        <path
          d="M9.25 13h1.5l1-2.25 1.5 4 1-2h1.5"
          stroke="#fff"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { ...size },
  );
};

export default AppleIcon;

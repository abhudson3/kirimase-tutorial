"use client";
import React from "react";
import { useQRCode } from "next-qrcode";

export default function Page() {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={"https://team-2-innovate.vercel.app/sign-up"}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }}
    />
  );
}

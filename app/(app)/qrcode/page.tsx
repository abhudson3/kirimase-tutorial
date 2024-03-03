"use client";
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// @ts-ignore
import { useQRCode } from "next-qrcode";

export default function Page() {
  const { Canvas } = useQRCode();

  return (
  <Card className="w-[350px]">
  <CardHeader>
    <CardTitle> QR Code  </CardTitle>
    <CardDescription>Scan this to make an account with CGI.</CardDescription>
  </CardHeader>
  <CardContent>
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
  </CardContent>

</Card>
 );
}

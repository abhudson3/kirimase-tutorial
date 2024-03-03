"use client";

import { SetResume } from "@/app/actions/candidateActions";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { Link, Upload } from "lucide-react";
import { link } from "fs";

export default function CandidateUpload({
  userId,
  currentResumeUrl,
}: {
  userId: string;
  currentResumeUrl: string;
}) {
  // console.log("HEREJE");

  // console.log(currentResumeUrl);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1 className="text-2xl font-bold my-2">Upload Your Resume</h1>
      <div className="bg-secondary p-4 rounded-lg my-2">
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/avatar/upload?filename=${file.name}`,
              {
                method: "POST",
                body: file,
              }
            );

            const newBlob = (await response.json()) as PutBlobResult;
            console.log(newBlob.url);
            // @ts-ignore
            const serverRes = await SetResume(userId, newBlob.url);
            console.log(currentResumeUrl);

            setBlob(newBlob);
          }}
        >
          <input name="file" ref={inputFileRef} type="file" required />

          <a className="mx-auto" href={currentResumeUrl}>
            See your Resume
          </a>
          <button type="submit">
            <Upload />
          </button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </div>
    </>
  );
}

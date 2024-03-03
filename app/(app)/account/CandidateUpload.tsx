"use client";

import { SetResume } from "@/app/actions/candidateActions";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { Link, Upload } from "lucide-react";
import { link } from "fs";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

export default function CandidateUpload({
  userId,
  currentResumeUrl,
}: {
  userId: string;
  currentResumeUrl: string;
}) {
  console.log(userId);
  console.log(currentResumeUrl);
  
  
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
            console.log("HERE");
            

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
            console.log("LOOK");
            
            console.log(userId);
            
            // @ts-ignore
            const serverRes = await SetResume(userId, newBlob.url);
            console.log(currentResumeUrl);

            setBlob(newBlob);
          }}
        >
          <div>
            <Label htmlFor="email" className="text-muted-foreground">
              Upload File
            </Label>
            <input name="file" ref={inputFileRef} type="file" />



          </div>

          <div>

            <Label htmlFor="email" className="text-muted-foreground">
              Upload Picture
            </Label>
            <input name="file" accept="image/*" capture="user" ref={inputFileRef} type="file" />
          </div>
          {
            currentResumeUrl && <a className="mx-auto decoration-cyan-400" href={currentResumeUrl}>
              Download Resume
            </a>

          }
          <br />
          <br />
          <Button type="submit">
            Upload Resume
            <Upload />
          </Button>
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


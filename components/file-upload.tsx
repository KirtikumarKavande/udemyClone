"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
type MyFileRouter = typeof ourFileRouter;

export default function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone<MyFileRouter, keyof MyFileRouter>
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          // Do something with the response 
          
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error?.message}`);
        }}
      />
    </main>
  );
}

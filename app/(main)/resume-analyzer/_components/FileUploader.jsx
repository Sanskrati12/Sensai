"use client";

import { useDropzone } from "react-dropzone";

export default function FileUploader({ file, setFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:border-primary transition"
    >
      <input {...getInputProps()} />

      {file ? (
        <>
          <h3 className="font-semibold">
            {file.name}
          </h3>

          <p className="text-muted-foreground mt-2">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">
            Drag & Drop Resume
          </h3>

          <p className="text-muted-foreground mt-2">
            or click to upload a PDF
          </p>
        </>
      )}
    </div>
  );
}
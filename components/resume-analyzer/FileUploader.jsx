"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib/utils";

const FileUploader = ({ onFileSelect }) => {
  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0] || null;
      if (onFileSelect) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="cursor-pointer space-y-4">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/images/pdf.png"
                alt="PDF"
                className="size-10"
              />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="max-w-xs truncate text-sm font-medium text-gray-700">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFileSelect) {
                    onFileSelect(null);
                  }
                }}
              >
                <img
                  src="/icons/cross.svg"
                  alt="Remove"
                  className="h-4 w-4"
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center">
                <img
                  src="/icons/info.svg"
                  alt="Upload"
                  className="size-20"
                />
              </div>

              <p className="text-lg text-gray-500">
                <span className="font-semibold">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-lg text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
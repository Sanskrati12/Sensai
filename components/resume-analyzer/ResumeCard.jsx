"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }) => {
  const {
    id,
    companyName,
    jobTitle,
    feedback,
    imagePath,
  } = resume;

  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    if (imagePath) {
      setResumeUrl(imagePath);
    }
  }, [imagePath]);

  return (
    <Link
      href={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName ? (
            <h2 className="font-bold text-black break-words">
              {companyName}
            </h2>
          ) : jobTitle ? (
            <>
              <h2 className="font-bold text-black">Resume</h2>
              <h3 className="text-lg text-gray-500 break-words">
                {jobTitle}
              </h3>
            </>
          ) : (
            <h2 className="font-bold text-black">Resume</h2>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback?.overallScore ?? 0} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <img
            src={resumeUrl}
            alt="Resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
"use client";

import React from "react";

const ATS = ({ score = 0, suggestions = [] }) => {
  // Background gradient based on score
  const gradientClass =
    score >= 70
      ? "from-green-100"
      : score >= 50
      ? "from-yellow-100"
      : "from-red-100";

  // Icon based on score
  const iconSrc =
    score >= 70
      ? "/icons/ats-good.svg"
      : score >= 50
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  // Subtitle based on score
  const subtitle =
    score >= 70
      ? "Great Job!"
      : score >= 50
      ? "Good Start"
      : "Needs Improvement";

  return (
    <div
      className={`w-full rounded-2xl bg-gradient-to-b ${gradientClass} to-white p-6 shadow-md`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={iconSrc}
          alt="ATS Score"
          className="h-12 w-12"
        />

        <div>
          <h2 className="text-2xl font-bold">
            ATS Score - {score}/100
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold">
          {subtitle}
        </h3>

        <p className="mb-4 text-gray-600">
          This score represents how well your resume is likely to
          perform in Applicant Tracking Systems (ATS) used by
          employers.
        </p>

        {/* Suggestions */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={
                  suggestion.type === "good"
                    ? "Check"
                    : "Warning"
                }
                className="mt-1 h-5 w-5"
              />

              <p
                className={
                  suggestion.type === "good"
                    ? "text-green-700"
                    : "text-yellow-700"
                }
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="italic text-gray-700">
        Keep refining your resume to improve your chances of getting
        past ATS filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
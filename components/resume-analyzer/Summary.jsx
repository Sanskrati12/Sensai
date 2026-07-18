"use client";

import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score = 0 }) => {
  const textColor =
    score >= 70
      ? "text-green-600"
      : score >= 50
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex items-center justify-center gap-2">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>

        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <div className="flex items-center gap-8 p-4">
        <ScoreGauge score={feedback?.overallScore ?? 0} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            Your Resume Score
          </h2>

          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category
        title="Tone & Style"
        score={feedback?.toneAndStyle?.score ?? 0}
      />

      <Category
        title="Content"
        score={feedback?.content?.score ?? 0}
      />

      <Category
        title="Structure"
        score={feedback?.structure?.score ?? 0}
      />

      <Category
        title="Skills"
        score={feedback?.skills?.score ?? 0}
      />
    </div>
  );
};

export default Summary;
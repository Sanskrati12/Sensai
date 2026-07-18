"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score = 0 }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-0.5",
        score >= 70
          ? "bg-green-100"
          : score >= 40
          ? "bg-yellow-100"
          : "bg-red-100"
      )}
    >
      <img
        src={score >= 70 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="status"
        className="size-4"
      />

      <p
        className={cn(
          "text-sm font-medium",
          score >= 70
            ? "text-green-600"
            : score >= 40
            ? "text-yellow-600"
            : "text-red-600"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore = 0 }) => (
  <div className="flex items-center gap-4 py-2">
    <p className="text-2xl font-semibold">{title}</p>
    <ScoreBadge score={categoryScore} />
  </div>
);

const CategoryContent = ({ tips = [] }) => (
  <div className="flex w-full flex-col gap-4">
    <div className="grid w-full grid-cols-2 gap-4 rounded-lg bg-gray-50 px-5 py-4">
      {tips.map((tip, index) => (
        <div key={index} className="flex items-center gap-2">
          <img
            src={
              tip.type === "good"
                ? "/icons/check.svg"
                : "/icons/warning.svg"
            }
            alt=""
            className="size-5"
          />

          <p className="text-xl text-gray-500">
            {tip.tip}
          </p>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-4">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={cn(
            "rounded-2xl border p-4",
            tip.type === "good"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-yellow-200 bg-yellow-50 text-yellow-700"
          )}
        >
          <div className="mb-2 flex items-center gap-2">
            <img
              src={
                tip.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt=""
              className="size-5"
            />

            <p className="text-xl font-semibold">
              {tip.tip}
            </p>
          </div>

          <p>{tip.explanation}</p>
        </div>
      ))}
    </div>
  </div>
);

const Details = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback?.toneAndStyle?.score ?? 0}
            />
          </AccordionHeader>

          <AccordionContent itemId="tone-style">
            <CategoryContent
              tips={feedback?.toneAndStyle?.tips ?? []}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback?.content?.score ?? 0}
            />
          </AccordionHeader>

          <AccordionContent itemId="content">
            <CategoryContent
              tips={feedback?.content?.tips ?? []}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback?.structure?.score ?? 0}
            />
          </AccordionHeader>

          <AccordionContent itemId="structure">
            <CategoryContent
              tips={feedback?.structure?.tips ?? []}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback?.skills?.score ?? 0}
            />
          </AccordionHeader>

          <AccordionContent itemId="skills">
            <CategoryContent
              tips={feedback?.skills?.tips ?? []}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
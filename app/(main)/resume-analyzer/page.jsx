"use client";

import { useState } from "react";
import ScoreCard from "./_components/ScoreCard";
import AnalysisSection from "./_components/AnalysisSection";
import FileUploader from "./_components/FileUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { convertPdfToImage } from "@/lib/pdf2img";
import { analyzeResume } from "@/actions/resume-analyzer";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleAnalyze = async () => {
  if (!file) {
    alert("Please upload a resume");
    return;
  }

  if (!companyName.trim()) {
    alert("Please enter company name");
    return;
  }

  if (!jobTitle.trim()) {
    alert("Please enter job title");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please paste job description");
    return;
  }

    setLoading(true);

    const image = await convertPdfToImage(file);

    if (!image) {
      alert("Unable to convert PDF.");
      return;
    }

    setPreview(URL.createObjectURL(image));

    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);
    formData.append("resume", image);

    const result = await analyzeResume(formData);

    if (!result.success) {
      setLoading(false);
      alert(result.error);
      return;
    }

    setFeedback(result.feedback);

    setLoading(false);
};

  return (
    <div className="container mx-auto py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-muted-foreground mt-4 text-lg">
          Upload your resume and receive an ATS score, keyword analysis,
          strengths, weaknesses, and personalized AI suggestions.
        </p>
      </div>

      <Card className="border border-border">
        <CardContent className="p-8 space-y-6">

          <div>
            <label className="font-semibold">
              Company Name
            </label>

            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              placeholder="Google"
              className="w-full mt-2 rounded-lg border bg-background p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Job Title
            </label>

            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              placeholder="Software Engineer"
              className="w-full mt-2 rounded-lg border bg-background p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              placeholder="Paste the complete job description..."
              className="w-full mt-2 rounded-lg border bg-background p-3"
            />
          </div>

          <FileUploader
            file={file}
            setFile={setFile}
          />

          <Button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full h-12 text-lg"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>

          {feedback && (
            <div className="mt-8 space-y-8">

              <ScoreCard
                title="Overall Score"
                score={feedback.overallScore}
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                <ScoreCard
                  title="ATS"
                  score={feedback.ATS.score}
                />

                <ScoreCard
                  title="Tone"
                  score={feedback.toneAndStyle.score}
                />

                <ScoreCard
                  title="Content"
                  score={feedback.content.score}
                />

                <ScoreCard
                  title="Structure"
                  score={feedback.structure.score}
                />

                <ScoreCard
                  title="Skills"
                  score={feedback.skills.score}
                />

              </div>

              <AnalysisSection
                title="ATS Analysis"
                section={feedback.ATS}
              />

              <AnalysisSection
                title="Tone & Style"
                section={feedback.toneAndStyle}
              />

              <AnalysisSection
                title="Content"
                section={feedback.content}
              />

              <AnalysisSection
                title="Structure"
                section={feedback.structure}
              />

              <AnalysisSection
                title="Skills"
                section={feedback.skills}
              />

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
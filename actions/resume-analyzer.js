"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prepareInstructions } from "@/lib/resumePrompt";
import { fileToBase64 } from "@/lib/fileToBase64";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
});

export async function analyzeResume(formData) {
  try {
    console.log("Starting Gemini...");

    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const resume = formData.get("resume");

    const base64Image = await fileToBase64(resume);
    console.log("Converted image");

    const result = await model.generateContent([
      prepareInstructions({
        jobTitle,
        jobDescription,
      }),
      {
        inlineData: {
          mimeType: resume.type,
          data: base64Image,
        },
      },
    ]);

    console.log("Gemini finished");

    const response = await result.response;
    console.log("Got response");

    const text = response.text();

    console.log(text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const feedback = JSON.parse(cleanedText);

    return {
      success: true,
      feedback,
    };
  } catch (err) {
    console.error("Gemini Error:");
    console.error(err);

    return {
      success: false,
      error: err.message,
    };
  }
}
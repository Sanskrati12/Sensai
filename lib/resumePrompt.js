export const AIResponseFormat = `
interface Feedback {
  overallScore:number;

  ATS:{
    score:number;
    tips:{
      type:"good"|"improve";
      tip:string;
    }[];
  };

  toneAndStyle:{
    score:number;
    tips:{
      type:"good"|"improve";
      tip:string;
      explanation:string;
    }[];
  };

  content:{
    score:number;
    tips:{
      type:"good"|"improve";
      tip:string;
      explanation:string;
    }[];
  };

  structure:{
    score:number;
    tips:{
      type:"good"|"improve";
      tip:string;
      explanation:string;
    }[];
  };

  skills:{
    score:number;
    tips:{
      type:"good"|"improve";
      tip:string;
      explanation:string;
    }[];
  };
}
`;

export function prepareInstructions(jobTitle, jobDescription) {
  return `
You are an ATS and Resume Expert.

Analyze the resume honestly.

Give low scores if required.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Return ONLY valid JSON.

Use this schema:

${AIResponseFormat}
`;
}
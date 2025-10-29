import { GoogleGenAI } from "@google/genai";
import { SectionData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const callGemini = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a response from the AI. Please check the console for more details.");
    }
};

export const analyzeExcelData = async (data: string): Promise<string> => {
  const prompt = `
You are a world-class financial and data analyst. You have been given a textual representation of an Excel spreadsheet, including cell addresses, values, and formulas.

Your task is to perform a deep analysis. This includes:
1.  **Overall Summary:** Briefly explain the likely purpose of this spreadsheet based on its content and structure.
2.  **Data Analysis:** Identify any significant trends, key data points, or potential outliers in the values provided.
3.  **Formula Breakdown:** Explain the logic behind the most important formulas. What are they calculating and what is their business purpose?
4.  **Error Checking & Suggestions:** Look for potential errors in formulas, logical inconsistencies, or areas for improvement. Suggest better formulas or approaches if applicable.
5.  **Actionable Insights:** Provide a few key, actionable insights or recommendations based on your complete analysis.

Present your analysis in a clear, structured, and professional format using Markdown. Use headings for each section.

Here is the spreadsheet data:
\`\`\`
${data}
\`\`\`
`;

 return callGemini(prompt);
};

export const getInsightsFromData = async (productData: SectionData, processData: SectionData): Promise<string> => {
    const formattedData = `
## Product Data
${JSON.stringify(productData, null, 2)}

## Process Data
${JSON.stringify(processData, null, 2)}
`;
    
    const prompt = `
You are a world-class sustainability consultant and data analyst. You have been provided with sustainability assessment scores for a company's 'Product' and 'Process'. The scores range from 0 (High Negative Impact) to 6 (High Positive Impact). The data is structured into three pillars: People, Planet, and Profit.

Your task is to provide a high-level analysis and generate actionable insights based on the provided JSON data. Structure your response in Markdown as follows:

1.  **Executive Summary:** A brief, high-level overview of the company's overall sustainability performance, mentioning the key takeaways from your analysis.

2.  **Strengths:** Identify 2-3 areas where the company is performing exceptionally well. Refer to specific categories (e.g., 'Labor Practices' under 'People' for the 'Product') and their scores to support your claims.

3.  **Areas for Improvement:** Identify 2-3 areas that require attention. These could be low-scoring categories or areas with significant discrepancies between Product and Process. Explain the potential risks associated with these weaknesses.

4.  **Actionable Recommendations:** Provide 3-4 concrete, actionable recommendations. For each recommendation, state what should be done, why it's important, and which specific metrics it would likely improve.

5.  **Strategic Outlook:** Conclude with a brief strategic outlook, suggesting how improving sustainability in the identified areas could benefit the company in the long term (e.g., market position, brand reputation, operational efficiency).

Analyze the data holistically. Look for patterns, trade-offs, and connections between the different pillars and sections.

Here is the sustainability assessment data:
\`\`\`json
${formattedData}
\`\`\`
`;
    return callGemini(prompt);
};
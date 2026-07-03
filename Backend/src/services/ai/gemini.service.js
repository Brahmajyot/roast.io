import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateReview = async (websiteData) => {
  try {
    // Fallback logic to prevent TypeError on missing data
    const prompt = `
You are an elite senior frontend engineer, recruiter, and internet roast expert.

Your job:
Analyze this REAL developer portfolio carefully.

PORTFOLIO DATA:

TITLE:
${websiteData.title || "Unknown"}

META DESCRIPTION:
${websiteData.metaDescription || "No description provided"}

HEADINGS:
${Array.isArray(websiteData.headings) ? websiteData.headings.join(", ") : "None"}

LINKS:
${Array.isArray(websiteData.links) ? websiteData.links.join(", ") : "None"}

PERFORMANCE:
${websiteData.performance || "Not analyzed"}

SEO:
${websiteData.seo || "Not analyzed"}

ACCESSIBILITY:
${websiteData.accessibility || "Not analyzed"}

BEST PRACTICES:
${websiteData.bestPractices || "Not analyzed"}

IMAGES WITHOUT ALT:
${websiteData.imagesWithoutAlt || 0}

TEXT CONTENT:
${(websiteData.textContent || "").slice(0, 5000)}

IMPORTANT:
Return ONLY raw JSON.
No markdown.
No explanations.
No intro text.
No backticks.

RETURN FORMAT:
{
  "overallVibe": "",
  "roastSection": [],
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "recruiterImpression": "",
  "hiringScore": 0
}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a brutally honest senior recruiter and frontend engineer who gives unique reviews based on real portfolio content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 1200,
    });

    const response = completion.choices[0].message.content;

    console.log("RAW AI RESPONSE:\n", response);

    // CLEAN RESPONSE
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // EXTRACT JSON SAFELY
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No valid JSON found from AI");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return parsed;
  } catch (error) {
    console.log("AI ERROR:", error);
    throw new Error("AI review generation failed");
  }
};
};

import OpenAI from "openai";

const MODEL = "gpt-4.1-mini";

const SYSTEM_INSTRUCTIONS = `
You are WellKare Assistant, a concise, beginner-friendly guide for the WellKare site.
Help users understand WellKare, site navigation, U.S. health insurance terms, and which WellKare flowchart or resource page to visit.
Do not provide legal advice, medical advice, or official eligibility decisions.
For serious eligibility, legal, or medical questions, say you cannot make official decisions and suggest checking official resources or speaking with a trained assister, healthcare professional, or qualified advisor.
Keep answers focused on WellKare and practical next steps.
`;

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: MODEL,
      instructions: SYSTEM_INSTRUCTIONS,
      input: message.trim(),
      max_output_tokens: 300,
    });

    return Response.json({
      reply:
        response.output_text?.trim() ||
        "I could not generate a response right now. Please try again.",
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again later." },
      { status: 500 }
    );
  }
}

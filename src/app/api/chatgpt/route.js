import { NextResponse } from "next/server";
import openai from "@/src/utils/openAI/openAi";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    console.log(prompt);
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt, maxtokens: 200 }],
      model: "gpt-4o",
    });
    return NextResponse.json({
      text: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "error.message" }, { status: 500 });
  }
}

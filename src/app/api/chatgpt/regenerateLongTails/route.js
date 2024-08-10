import { NextResponse } from "next/server";
import openai from "@/src/utils/openAI/openAi";
import { buildLongtailRegeneratorPrompt } from "@/src/utils/prompts/allInOne/longtailPrompts";

export async function POST(request) {
  try {
    const { matrixData, configData } = await request.json();
    console.log(matrixData, configData);
    if (!matrixData) {
      throw new Error("No matrix data provided");
    }
    const longtailPrompt = buildLongtailRegeneratorPrompt(
      configData.websiteContext
    );

    const matrixJSONString = JSON.stringify(matrixData);
    console.log(matrixJSONString);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: longtailPrompt },
        {
          role: "user",
          content: `
          """${matrixJSONString}"""
          ${
            configData.extraInfoLongtail
              ? `Extra Information: ${configData.extraInfoLongtail}`
              : ""
          }
          `,
          maxtokens: 300000,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });
    console.log(chatCompletion.choices[0].message.content);
    const responseJSON = JSON.parse(chatCompletion.choices[0].message.content);

    return NextResponse.json({ data: responseJSON.content });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

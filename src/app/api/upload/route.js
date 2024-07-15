import { NextResponse } from "next/server";
import openai from "@/src/utils/openAI/openAi";
import { readFile, utils, set_fs } from "xlsx";
import fs from "fs";
import path from "path";
import { longtailGenerationPrompt } from "@/src/utils/openAI/prompts";
set_fs(fs);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("excelFile");
    console.log(file);

    if (!file) throw new Error("No file uploaded");

    const filePath = path.join(uploadsDir, file.name);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const workbook = readFile(filePath);
    const sheetName = "URL Generation Sheet";

    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheed named "${sheetName}" not found`);
    }

    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

    const columns = jsonData[0];
    console.log("Columns:", columns);

    const data = {};

    columns.forEach((column) => {
      data[column] = [];
    });

    jsonData.slice(1).forEach((row) => {
      columns.forEach((column, index) => {
        if (row[index] !== undefined) {
          data[column].push(row[index]);
        }
      });
    });
    // console.log(data);
    const stringData = JSON.stringify(data);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: longtailGenerationPrompt.system },
        { role: "user", content: `"""${stringData}"""`, maxtokens: 1000 },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const responseJSON = JSON.parse(chatCompletion.choices[0].message.content);

    return NextResponse.json({
      text: responseJSON,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "fuck." });
  }
}

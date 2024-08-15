import openai from "./openAi";

// FUNCTION THAT MAKES THE API CALL TO CHATGPT WITH THE PROMPT.
export const queryChatGptContent = async (prompt) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt, maxtokens: 5000 }],
    model: "gpt-4o-2024-08-06",
    response_format: { type: "json_object" },
  });
  const responseJSON = JSON.parse(chatCompletion.choices[0].message.content);

  return responseJSON.content;
};

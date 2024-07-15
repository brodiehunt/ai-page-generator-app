import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // This is the default and can be omitted
});

export default openai;

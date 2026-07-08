import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini Client
// WARNING: process.env.API_KEY must be set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({
      message: message,
    });

    return result.text || "متاسفم، مشکلی در دریافت پاسخ پیش آمد.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "در حال حاضر ارتباط با سرور قطع شده است. لطفا بعدا تلاش کنید.";
  }
};
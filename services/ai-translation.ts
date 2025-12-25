
import { GoogleGenAI, Type } from "@google/genai";
import { i18nConfig } from "../i18n.config.ts";

// Use named parameter for apiKey and strictly refer to process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  context?: string;
  namespace?: string;
}

export class AITranslationService {
  /**
   * Translates a single text string while respecting the brand glossary.
   */
  static async translate(req: TranslationRequest): Promise<string> {
    const prompt = `
      Translate the following text from ${req.sourceLang} to ${req.targetLang}.
      Text: "${req.text}"
      Context: ${req.context || 'General corporate website content'}
      Namespace: ${req.namespace || 'common'}
      
      RULES:
      1. DO NOT translate any of these brand terms: ${i18nConfig.glossary.join(', ')}.
      2. Maintain the tone: Professional, corporate, innovative.
      3. Return ONLY the translated string.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text?.trim() || req.text;
    } catch (error) {
      console.error("AI Translation Error:", error);
      return req.text; // Fallback to source
    }
  }

  /**
   * Batch translate multiple keys for efficiency.
   */
  static async batchTranslate(texts: Record<string, string>, targetLang: string): Promise<Record<string, string>> {
    const entries = Object.entries(texts);
    
    const prompt = `
      Translate these UI keys to ${targetLang}.
      Glossary (DO NOT TRANSLATE): ${i18nConfig.glossary.join(', ')}
      
      JSON Input: ${JSON.stringify(texts)}
      
      Return a JSON object with the exact same keys but translated values.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: entries.reduce((acc: any, [key]) => {
              acc[key] = { type: Type.STRING };
              return acc;
            }, {})
          }
        }
      });
      
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Batch Translation Error:", error);
      return texts;
    }
  }
}

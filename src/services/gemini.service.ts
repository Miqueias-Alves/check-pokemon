import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  async generate(imageBase64: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const mimeType = imageBase64.split(',')[0].split(':')[1].split(';')[0];
    const base64Data = imageBase64.replace(/^data:image\/jpeg;base64,/, '');

    const prompt = 'What is the name of the pokemon in the picture?';
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);
    return result.response.text();
  }
}

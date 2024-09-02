import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  generate(imageBase64: string): any {
    const genAI = new GoogleGenerativeAI(
      'AIzaSyAsx3rTgh7EpqdY8F_SheNQ24WFZQ2q9Hs',
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const mimeType = imageBase64.split(',')[0].split(':')[1].split(';')[0];
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const prompt = 'What is the name of the pokemon in the picture?';
      return model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
      ]);
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  }

  isBase64(image: string): boolean {
    const regex = /^data:image\/[a-z]+;base64,/;
    return regex.test(image);
  }
}

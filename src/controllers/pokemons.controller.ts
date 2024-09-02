import { BadRequestException, Body, Controller, Get } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';
import { ImageDTO } from '../dtos/image.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('find')
  async findPokemon(@Body() image: ImageDTO): Promise<any> {
    if (!this.geminiService.isBase64(image.image)) {
      throw new BadRequestException('Imagem não é base64');
    }

    try {
      const resp = await this.geminiService.generate(image.image);

      return {
        name: resp.response.text(),
      };
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }
}

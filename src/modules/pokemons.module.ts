import { Module } from '@nestjs/common';
import { PokemonController } from '../controllers/pokemons.controller';
import { GeminiService } from '../services/gemini.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [GeminiService],
})
export class PokemonModule {}

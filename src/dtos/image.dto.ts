import { IsNotEmpty } from 'class-validator';

export class ImageDTO {
  @IsNotEmpty()
  image: string;
}

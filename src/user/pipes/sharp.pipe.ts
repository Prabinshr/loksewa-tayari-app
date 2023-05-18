import {
  ArgumentMetadata,
  BadRequestException,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(
    profile: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Promise<string> {
    const filename = `${profile.originalname.split('.')[0]}-${Date.now()}.webp`;

    await sharp(profile.buffer)
      .resize(170)
      .webp({ effort: 3 })
      .toFile(path.join('uploads/profile-pictures', filename));

    return filename;
  }
}

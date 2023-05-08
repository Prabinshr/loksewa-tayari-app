import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { SewaserviceService } from './sewaservice.service';
import { SewaserviceController } from './sewaservice.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [SewaserviceController],
  providers: [SewaserviceService],
})
export class SewaserviceModule {}

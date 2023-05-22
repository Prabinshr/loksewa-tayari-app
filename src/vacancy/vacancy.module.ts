import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports:[NotificationModule],
  controllers: [VacancyController],
  providers: [VacancyService]
})
export class VacancyModule {}

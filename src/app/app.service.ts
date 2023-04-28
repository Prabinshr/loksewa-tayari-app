import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerDetails() {
    return {
      name: 'Loksewa Taiyari App server',
      version: '0.0.1 + nighty',
      company: 'Neptechpal Pvt. Ltd.',
      company_url: 'https://neptechpal.com',
      mail: 'admin@neptechpal.com',
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}

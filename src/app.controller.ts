import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JwsService } from './core/jws.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwsService: JwsService,
  ) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('secure/status')
  async getStatusSecure() {
    const data = await this.appService.getStatus();
    console.log('---> ', data);
    const result = await this.jwsService.sign(data);
    return result;
  }
}

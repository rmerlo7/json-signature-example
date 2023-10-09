import { Module } from '@nestjs/common';
import { JwsService } from './jws.service';

@Module({
  imports: [],
  exports: [JwsService],
  controllers: [],
  providers: [JwsService],
})
export class CoreModule {}

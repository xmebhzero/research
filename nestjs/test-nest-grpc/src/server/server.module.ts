import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ServerController],
  exports: [],
})
export class ServerModule {}

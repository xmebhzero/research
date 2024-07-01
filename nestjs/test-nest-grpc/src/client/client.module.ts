import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController],
  providers: [],
})
export class ClientModule {}

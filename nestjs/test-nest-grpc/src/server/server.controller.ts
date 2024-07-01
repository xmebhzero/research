import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('hero')
export class ServerController {
  @GrpcMethod('HeroService', 'FindOne')
  async FindOne(params: { id: number }): Promise<{ id: number; name: string }> {
    return { id: 1, name: 'Harry' };
  }
}

import { Controller, OnModuleInit, Get, Param } from '@nestjs/common';
import {
  GrpcMethod,
  ClientGrpc,
  Client,
  Transport,
} from '@nestjs/microservices';
import { HeroById, Hero } from './interfaces/client.interface';
import { Observable } from 'rxjs';
import { join } from 'path';

interface HeroService {
  FindOne(data: { id: number }): Observable<any>;
}

@Controller('hero')
export class ClientController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'hero',
      protoPath: join(__dirname, '../server.proto'),
    },
  })
  private readonly client: ClientGrpc;
  private heroService: HeroService;

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get(':id')
  call(@Param() params): Observable<any> {
    return this.heroService.FindOne({ id: +params.id });
  }
}

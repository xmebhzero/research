import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`🚀 ~ bootstrap ~ __dirname`, __dirname);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, './server.proto'),
      url: 'localhost:50051',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();

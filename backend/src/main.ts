import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.setGlobalPrefix('api')

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //CORS habilitado (si usas frontend)
  const config = new DocumentBuilder()
    .setTitle('API de ejemplo')
    .setDescription('Documentación de la API de ejemplo')
    .setVersion('1.0')
    .addTag('usuarios')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
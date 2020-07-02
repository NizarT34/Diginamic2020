import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Cette méthode autorise les requêtes des autres utilisateurs (d'autres navigateurs), 

  const options = new DocumentBuilder()
    .setTitle('Nest Customer')
    .setDescription('The Nest customers API description')
    .setVersion('1.0')
    .addTag('customers')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(3000);
}
bootstrap();

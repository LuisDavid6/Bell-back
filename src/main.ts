import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const PORT = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  //validations
  app.useGlobalPipes(new ValidationPipe())

  //configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('BELL`S FOOD API')
    .setDescription('API REST de Bell´s Food')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)

  //ruta para la documentación
  SwaggerModule.setup('docs', app, document)

  await app.listen(PORT)
}
bootstrap()

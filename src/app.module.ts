import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './google.strategy';
import { EmailModule } from './email/email.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AttachmentFileModule } from './attachment-file/attachment-file.module';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './components/interceptors/transform.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        USER_MAIL: Joi.string().required(),
        SEND_GRID_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    UserModule,
    AuthModule,
    EmailModule,
    AlbumModule,
    PhotoModule,
    AttachmentFileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}

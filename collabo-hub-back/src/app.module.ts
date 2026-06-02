import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    // Env vars
    ConfigModule.forRoot({ isGlobal: true }),
    // Database connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    // Mailer
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_EMAIL'),
          port: configService.get<number>('PORT_EMAIL'),
          auth: {
            user: configService.get<string>('USER_EMAIL'),
            pass: configService.get<string>('PASSWORD_EMAIL'),
          },
        },
        defaults: {
          from: '"Collabo Hub" <noreply@collabohub.com>',
        },
      }),
      inject: [ConfigService],
    }),
    // Our business logic
    IamModule,
  ]
})

export class AppModule { }
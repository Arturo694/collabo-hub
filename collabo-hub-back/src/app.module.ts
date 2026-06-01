import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';

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
    // Our business logic
    SignupModule
  ]
})

export class AppModule { }
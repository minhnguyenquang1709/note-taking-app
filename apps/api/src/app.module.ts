import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load env variables
      isGlobal: true, // module is global, no need to import in other modules
      envFilePath: `../.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory(...args) {
        return {
          type: 'postgres',
          host: process.env.DATABASE_WRITE_HOST,
          port: parseInt(process.env.DATABASE_WRITE_PORT || '5432'),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

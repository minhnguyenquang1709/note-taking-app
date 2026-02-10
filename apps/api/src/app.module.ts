import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load env variables
      isGlobal: true, // module is global, no need to import in other modules
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(...args) {
        const postgreEnvVars: TypeOrmModuleOptions = {
          type: 'postgres',
          host: process.env.DATABASE_WRITE_HOST,
          port: parseInt(process.env.DATABASE_WRITE_PORT || '5432'),
          username: process.env.DATABASE_USERNAME,
          password: String(process.env.DATABASE_PASSWORD),
          database: process.env.DATABASE_NAME,
          synchronize: true, // auto create tables, disable in production
          autoLoadEntities: true, // auto load entities from TypeOrmModule.forFeature()
          logging: true, // enable query logging
        };
        console.log('Connecting to database with config:\n', postgreEnvVars);
        return {
          ...postgreEnvVars,
        };
      },
    }),
    NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

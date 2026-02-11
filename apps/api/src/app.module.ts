import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // get http context
    const response = ctx.getResponse(); // get response object to manually define response data

    const status = exception.getStatus(); // get http status code
    const exceptionResponse = exception.getResponse(); // get response body

    response.status(status).json({
      success: false,
      code: exceptionResponse['error_code'] || status,
      message: exceptionResponse['message'] || exceptionResponse,
    });
  }
}

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
    NoteModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

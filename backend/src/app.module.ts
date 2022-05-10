import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './word/word.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Word } from './word/entities/word.entity';
import { Category } from './category/entities/category.entity';

dotenv.config();
@Module({
  imports: [
    WordModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Word, Category],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

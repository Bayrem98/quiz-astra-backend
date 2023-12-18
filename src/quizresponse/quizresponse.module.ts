import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizresponseService } from './quizresponse.service';
import { QuizResponseSchema } from './schemas/quizresponse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'QuizResponse', schema: QuizResponseSchema },
    ]),
  ],
  providers: [QuizresponseService],
  exports: [QuizresponseService],
})
export class QuizresponseModule {}

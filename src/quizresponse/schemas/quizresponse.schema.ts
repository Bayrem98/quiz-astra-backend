import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from 'src/question/schemas/question.schema';

export type QuizResponseDocument = QuizResponse & Document;

@Schema()
export class QuizResponse {
  @Prop({ type: [Question] })
  quizType: string;

  @Prop({ type: [Question] })
  category: string;

  @Prop({ type: [Question] })
  question: string;

  @Prop({ type: String })
  value: string;
}

export const QuizResponseSchema = SchemaFactory.createForClass(QuizResponse);

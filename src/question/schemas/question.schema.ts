import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true, type: String })
  category: string;
  @Prop({ required: true, type: String })
  question: string;
  @Prop({ required: true, type: String })
  quizType: string;
  @Prop({ required: true, type: String })
  correct_answer: string;
  @Prop({ type: String })
  incorrect_answer1?: string;
  @Prop({ type: String })
  incorrect_answer2?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

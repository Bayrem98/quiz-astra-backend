import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizResponseDocument = QuizResponse & Document;

@Schema()
export class QuizResponse {
  @Prop({ type: String })
  _id?: string;

  @Prop({ type: String })
  quizType: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  question: string;

  @Prop({ type: String })
  value: string;
}

export const QuizResponseSchema = SchemaFactory.createForClass(QuizResponse);

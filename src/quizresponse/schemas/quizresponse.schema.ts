import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizResponseDocument = QuizResponse & Document;

@Schema()
export class QuizResponse {
  @Prop({ type: String })
  _id?: string;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  quizType: string;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  question: string;

  @Prop({ type: String })
  value: string;

  @Prop({ type: String })
  correctionQuestion?: string;

  @Prop({ type: Number })
  note?: number;
}

export const QuizResponseSchema = SchemaFactory.createForClass(QuizResponse);

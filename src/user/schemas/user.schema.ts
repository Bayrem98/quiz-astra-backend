import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { QuizResponse } from 'src/quizresponse/schemas/quizresponse.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'QuizResponse' })
  quizResponses?: QuizResponse[];

  @Prop({ type: Number })
  noteGlobal?: number;

  @Prop({ type: String })
  correcteur?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

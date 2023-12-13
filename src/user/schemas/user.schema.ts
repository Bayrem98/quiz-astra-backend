import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: [String], default: [] }) // Ajoutez cette ligne pour stocker les réponses du quiz
  quizResponses: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { IsMongoId, IsOptional } from 'class-validator';
import { QuizResponse } from 'src/quizresponse/quizresponse.interface';

export default class UpdateUserDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  username?: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  quizResponses?: QuizResponse[];
  @IsOptional()
  noteGlobal?: string;
}

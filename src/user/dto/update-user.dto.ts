import { IsMongoId, IsOptional } from 'class-validator';
import { Quizresponse } from 'src/quizresponse/quizresponse.interface';

export default class UpdateUserDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  username?: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  quizResponses?: Quizresponse[];
}

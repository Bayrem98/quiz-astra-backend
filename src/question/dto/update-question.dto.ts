import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  category?: string;
  @IsOptional()
  question?: string;
  @IsOptional()
  quizType?: string;
  @IsOptional()
  correct_answer?: string;
  @IsOptional()
  incorrect_answer1?: string;
  @IsOptional()
  incorrect_answer2?: string;
}

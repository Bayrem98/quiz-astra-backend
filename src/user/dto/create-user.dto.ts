import { QuizResponse } from 'src/quizresponse/schemas/quizresponse.schema';

export default class CreateUserDto {
  username: string;
  password: string;
  quizResponses?: QuizResponse[];
  noteGlobal?: number;
  correcteur?: string;
}

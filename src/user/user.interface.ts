import { QuizResponse } from 'src/quizresponse/quizresponse.interface';

export interface User {
  username: string;
  password: string;
  quizResponses?: QuizResponse[];
  noteGlobal?: number;
  correcteur?: string;
}

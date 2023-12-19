import { Quizresponse } from 'src/quizresponse/quizresponse.interface';

export interface User {
  username: string;
  password: string;
  quizResponses?: Quizresponse[];
}

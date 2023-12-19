import { Quizresponse } from 'src/quizresponse/quizresponse.interface';

export default class CreateUserDto {
  username: string;
  password: string;
  quizResponses?: Quizresponse[];
}

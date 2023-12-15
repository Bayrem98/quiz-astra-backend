export interface Question {
  category: string;
  question: string;
  quizType: string;
  correct_answer: string;
  incorrect_answer1?: string;
  incorrect_answer2?: string;
}

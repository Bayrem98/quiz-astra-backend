export interface QuizResponse {
  quizType: string;
  category: string;
  question: string;
  value: string;
  correctionQuestion?: string;
  note?: number;
}

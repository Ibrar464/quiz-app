export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  token: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer (0-3)
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizResult {
  quizId: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
}

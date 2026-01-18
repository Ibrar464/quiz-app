import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge on various topics',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'What is the smallest prime number?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: 'Which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Science & Technology Quiz',
    description: 'Explore the world of science and technology',
    questions: [
      {
        id: 11,
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Unit'],
        correctAnswer: 0,
      },
      {
        id: 12,
        question: 'What is the speed of light in vacuum?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
        correctAnswer: 0,
      },
      {
        id: 13,
        question: 'Which programming language is known as the "language of the web"?',
        options: ['Python', 'Java', 'JavaScript', 'C++'],
        correctAnswer: 2,
      },
      {
        id: 14,
        question: 'What is the smallest unit of matter?',
        options: ['Molecule', 'Atom', 'Electron', 'Proton'],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: 'Who invented the telephone?',
        options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Guglielmo Marconi'],
        correctAnswer: 1,
      },
      {
        id: 16,
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
        correctAnswer: 2,
      },
      {
        id: 17,
        question: 'What does HTML stand for?',
        options: ['Hypertext Markup Language', 'High Tech Modern Language', 'Hyperlink Text Markup Language', 'Home Tool Markup Language'],
        correctAnswer: 0,
      },
      {
        id: 18,
        question: 'What is the main gas found in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 2,
      },
      {
        id: 19,
        question: 'What year was the first iPhone released?',
        options: ['2005', '2006', '2007', '2008'],
        correctAnswer: 2,
      },
      {
        id: 20,
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
        correctAnswer: 1,
      },
    ],
  },
];

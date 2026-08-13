import type { Quiz } from '@/types/quiz'

/**
 * MOCK QUIZ DATA
 *
 * This is mock data and will be replaced in Phase 12.
 * Quizzes are tied to enrolled student courses so results can be surfaced on
 * the dashboard and within each course.
 */
export const quizzes: Quiz[] = [
  {
    id: 'general-english-basics',
    courseSlug: 'general-english',
    courseTitle: 'General English',
    title: 'General English Basics',
    description: 'Test your grasp of everyday English fundamentals, from greetings to basic sentence structure.',
    duration: 5,
    passingScore: 70,
    questions: [
      {
        id: 'ge-1',
        question: 'Choose the correct greeting for the morning:',
        options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'],
        correctAnswer: 1,
        explanation: '“Good morning” is the correct greeting used in the morning.',
      },
      {
        id: 'ge-2',
        question: 'Which sentence is grammatically correct?',
        options: [
          'She go to school.',
          'She goes to school.',
          'She going to school.',
          'She gone to school.',
        ],
        correctAnswer: 1,
        explanation: 'For third-person singular (she), the verb takes an -s: “She goes.”',
      },
      {
        id: 'ge-3',
        question: 'Select the correct article: “___ apple a day keeps the doctor away.”',
        options: ['A', 'An', 'The', 'No article'],
        correctAnswer: 1,
        explanation: '“An” is used before vowel sounds, and “apple” begins with a vowel sound.',
      },
      {
        id: 'ge-4',
        question: 'What does “excuse me” most commonly express?',
        options: [
          'A polite apology or request for attention',
          'An expression of surprise',
          'A way to say goodbye',
          'An invitation to eat',
        ],
        correctAnswer: 0,
        explanation: '“Excuse me” is used politely to get attention or apologize for interrupting.',
      },
      {
        id: 'ge-5',
        question: 'Choose the correct plural form of “child”:',
        options: ['Childs', 'Childes', 'Children', 'Child'],
        correctAnswer: 2,
        explanation: '“Children” is the irregular plural of “child.”',
      },
    ],
  },
  {
    id: 'english-conversation-speaking',
    courseSlug: 'english-conversation',
    courseTitle: 'English Conversation',
    title: 'Conversation & Speaking',
    description: 'Practice understanding common conversational phrases and speaking strategies.',
    duration: 6,
    passingScore: 70,
    questions: [
      {
        id: 'ec-1',
        question: 'When someone says “How is it going?”, what is an appropriate reply?',
        options: [
          'I am fine, thank you.',
          'Good night.',
          'Nice to meet you.',
          'Excuse me.',
        ],
        correctAnswer: 0,
        explanation: '“How is it going?” is a friendly greeting, and “I am fine, thank you” is a natural reply.',
      },
      {
        id: 'ec-2',
        question: 'What does “small talk” refer to?',
        options: [
          'A formal business presentation',
          'Light, casual conversation',
          'A written report',
          'An academic lecture',
        ],
        correctAnswer: 1,
        explanation: 'Small talk is light, informal conversation about everyday topics.',
      },
      {
        id: 'ec-3',
        question: 'To keep a conversation going, which phrase is useful?',
        options: [
          'That is a good point.',
          'Goodbye.',
          'No, thank you.',
          'See you later.',
        ],
        correctAnswer: 0,
        explanation: '“That is a good point” acknowledges the speaker and encourages further discussion.',
      },
      {
        id: 'ec-4',
        question: '“Could you say that again, please?” is used to:',
        options: [
          'End a conversation',
          'Ask someone to repeat what they said',
          'Say goodbye',
          'Give directions',
        ],
        correctAnswer: 1,
        explanation: 'This phrase politely asks the speaker to repeat their message.',
      },
    ],
  },
  {
    id: 'business-english-communication',
    courseSlug: 'business-english',
    courseTitle: 'Business English',
    title: 'Business Communication',
    description: 'Evaluate your knowledge of professional email etiquette and workplace communication.',
    duration: 6,
    passingScore: 80,
    questions: [
      {
        id: 'be-1',
        question: 'Which salutation is most appropriate for a formal business email?',
        options: ['Hey!', 'Yo', 'Dear Mr. Smith,', 'Hi there,'],
        correctAnswer: 2,
        explanation: '“Dear Mr. Smith,” is the formal, professional salutation for business correspondence.',
      },
      {
        id: 'be-2',
        question: 'What should a professional subject line do?',
        options: [
          'Be vague and general',
          'Clearly state the email’s purpose',
          'Include emoticons',
          'Be written in all capital letters',
        ],
        correctAnswer: 1,
        explanation: 'A clear subject line summarizes the purpose and helps the recipient prioritize.',
      },
      {
        id: 'be-3',
        question: 'Which closing is professional for a business email?',
        options: ['Cheers,', 'Later,', 'Yours faithfully,', 'TTYL,'],
        correctAnswer: 2,
        explanation: '“Yours faithfully,” is a formal, professional closing.',
      },
      {
        id: 'be-4',
        question: 'In the workplace, “agenda” refers to:',
        options: [
          'A list of topics to discuss in a meeting',
          'A type of office chair',
          'An email attachment',
          'A formal contract',
        ],
        correctAnswer: 0,
        explanation: 'An agenda lists the topics and order of a meeting.',
      },
    ],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id)
}

export function getQuizByCourse(courseSlug: string): Quiz | undefined {
  return quizzes.find((q) => q.courseSlug === courseSlug)
}

export function getQuizzesByCourses(courseSlugs: string[]): Quiz[] {
  return quizzes.filter((q) => courseSlugs.includes(q.courseSlug))
}
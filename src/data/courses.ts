import type { CourseData } from '@/types/card'

export const courses: CourseData[] = [
  {
    id: 'general-english',
    slug: 'general-english',
    title: 'General English',
    shortDescription:
      'Build a strong foundation in everyday English with practical vocabulary and grammar.',
    description:
      'This course helps you build a strong foundation in everyday English. You will learn core vocabulary, essential grammar, and practical communication skills through interactive lessons and real-world examples, guided by an experienced tutor.',
    level: 'Beginner',
    category: 'General English',
    tutor: 'Sarah Johnson',
    tutorRole: 'General English Specialist',
    rating: 4.8,
    reviewCount: 1240,
    duration: '8 weeks',
    lessons: 24,
    price: 89,
    originalPrice: 119,
    popular: true,
    students: 3400,
    features: ['Video lessons', 'Downloadable materials', 'Progress tracking', 'Certificate upon completion'],
    learningOutcomes: [
      'Hold basic everyday conversations with confidence',
      'Understand and use common grammar structures',
      'Expand your core English vocabulary',
      'Improve reading, writing, listening, and speaking skills',
    ],
    requirements: ['No prior English knowledge required', 'A computer or mobile device', 'Commitment of 3–5 hours per week'],
    curriculum: [
      {
        title: 'Module 1 — English Foundations',
        lessons: ['Lesson 1: Introductions & Greetings', 'Lesson 2: The Alphabet & Pronunciation', 'Lesson 3: Basic Sentence Structure'],
      },
      {
        title: 'Module 2 — Daily Conversation',
        lessons: ['Lesson 4: Introducing Yourself', 'Lesson 5: Talking About Your Day', 'Lesson 6: Ordering Food & Asking Directions'],
      },
      {
        title: 'Module 3 — Practical English',
        lessons: ['Lesson 7: Shopping & Numbers', 'Lesson 8: Making Plans with Friends'],
      },
    ],
  },
  {
    id: 'english-conversation',
    slug: 'english-conversation',
    title: 'English Conversation',
    shortDescription:
      'Practice real-world conversations and improve your speaking fluency with confidence.',
    description:
      'Designed for learners who want to speak more fluently and naturally. You will practice everyday dialogues, role-play common situations, and improve pronunciation and listening through guided conversation practice.',
    level: 'Intermediate',
    category: 'Conversation',
    tutor: 'Michael Chen',
    tutorRole: 'Speaking & Fluency Coach',
    rating: 4.9,
    reviewCount: 980,
    duration: '6 weeks',
    lessons: 18,
    price: 99,
    popular: true,
    students: 2100,
    features: ['Live conversation practice', 'Pronunciation drills', 'Role-play scenarios', 'Weekly speaking feedback'],
    learningOutcomes: [
      'Speak with greater fluency and natural rhythm',
      'Handle common social and professional situations',
      'Improve pronunciation and intonation',
      'Build confidence in real conversations',
    ],
    requirements: ['Basic understanding of English', 'Willingness to speak and practice', 'Microphone or headset for practice'],
    curriculum: [
      {
        title: 'Module 1 — Everyday Topics',
        lessons: ['Lesson 1: Small Talk', 'Lesson 2: Sharing Opinions', 'Lesson 3: Describing Experiences'],
      },
      {
        title: 'Module 2 — Real-Life Situations',
        lessons: ['Lesson 4: At the Workplace', 'Lesson 5: Travel Conversations', 'Lesson 6: Social Gatherings'],
      },
      {
        title: 'Module 3 — Fluency Building',
        lessons: ['Lesson 7: Extended Speaking', 'Lesson 8: Group Discussion'],
      },
    ],
  },
  {
    id: 'business-english',
    slug: 'business-english',
    title: 'Business English',
    shortDescription:
      'Master professional English for meetings, presentations, emails, and negotiations.',
    description:
      'Advance your career by learning professional English. This course covers business vocabulary, effective email writing, presentations, and meeting participation so you can communicate clearly in any professional setting.',
    level: 'Upper Intermediate',
    category: 'Business',
    tutor: 'Emily Davis',
    tutorRole: 'Corporate Communication Trainer',
    rating: 4.7,
    reviewCount: 760,
    duration: '10 weeks',
    lessons: 30,
    price: 129,
    originalPrice: 159,
    popular: true,
    students: 1800,
    features: ['Business vocabulary builder', 'Email writing templates', 'Presentation training', 'Mock negotiations'],
    learningOutcomes: [
      'Write clear, professional business emails',
      'Present ideas and report progress confidently',
      'Participate actively in meetings',
      'Negotiate and persuade professionally',
    ],
    requirements: ['Intermediate English level', 'Some professional experience desirable', 'Laptop or desktop for assignments'],
    curriculum: [
      {
        title: 'Module 1 — Professional Fundamentals',
        lessons: ['Lesson 1: Business Vocabulary', 'Lesson 2: Writing Professional Emails', 'Lesson 3: Workplace Communication'],
      },
      {
        title: 'Module 2 — Meetings & Presentations',
        lessons: ['Lesson 4: Leading a Meeting', 'Lesson 5: Delivering a Presentation', 'Lesson 6: Handling Q&A'],
      },
      {
        title: 'Module 3 — Advanced Professional Skills',
        lessons: ['Lesson 7: Negotiation Skills', 'Lesson 8: Business Discussions'],
      },
    ],
  },
  {
    id: 'ielts-preparation',
    slug: 'ielts-preparation',
    title: 'IELTS Preparation',
    shortDescription:
      'Targeted test strategies and practice to help you reach your desired IELTS band score.',
    description:
      'A complete preparation program covering all four IELTS sections: Listening, Reading, Writing, and Speaking. Learn test strategies, practice with model questions, and receive feedback to reach your target band score.',
    level: 'Intermediate',
    category: 'IELTS',
    tutor: 'David Miller',
    tutorRole: 'IELTS Examiner & Coach',
    rating: 4.8,
    reviewCount: 640,
    duration: '12 weeks',
    lessons: 36,
    price: 149,
    originalPrice: 189,
    popular: true,
    students: 1500,
    features: ['Full test simulations', 'Band score assessments', 'Speaking mock interviews', 'Writing feedback'],
    learningOutcomes: [
      'Understand the IELTS format and scoring',
      'Apply strategies to each test section',
      'Improve time management during the test',
      'Increase your expected band score',
    ],
    requirements: ['Intermediate English or above', 'Access to practice materials', 'Self-discipline for regular practice'],
    curriculum: [
      {
        title: 'Module 1 — Test Overview',
        lessons: ['Lesson 1: Understanding IELTS', 'Lesson 2: Listening Strategies', 'Lesson 3: Reading Strategies'],
      },
      {
        title: 'Module 2 — Core Skills',
        lessons: ['Lesson 4: Academic Writing Task 1', 'Lesson 5: Academic Writing Task 2', 'Lesson 6: Speaking Test Practice'],
      },
      {
        title: 'Module 3 — Full Practice',
        lessons: ['Lesson 7: Full Mock Test', 'Lesson 8: Feedback & Review'],
      },
    ],
  },
  {
    id: 'toefl-preparation',
    slug: 'toefl-preparation',
    title: 'TOEFL Preparation',
    shortDescription:
      'Build the skills and confidence you need to excel across all TOEFL sections.',
    description:
      'Prepare for the TOEFL iBT with structured lessons covering Reading, Listening, Speaking, and Writing. Focus on academic English, test techniques, and scoring to help you achieve your target score.',
    level: 'Upper Intermediate',
    category: 'TOEFL',
    tutor: 'Sophia Lee',
    tutorRole: 'Academic English & TOEFL Expert',
    rating: 4.7,
    reviewCount: 520,
    duration: '10 weeks',
    lessons: 32,
    price: 139,
    originalPrice: 169,
    students: 1100,
    features: ['Section-by-section training', 'Practice exams', 'Integrated skill exercises', 'Score improvement plan'],
    learningOutcomes: [
      'Master all four TOEFL sections',
      'Improve academic reading and listening',
      'Write organized, coherent responses',
      'Speak clearly during the integrated tasks',
    ],
    requirements: ['Upper intermediate or advanced English', 'Interest in academic English', 'Reliable internet access'],
    curriculum: [
      {
        title: 'Module 1 — Getting Started',
        lessons: ['Lesson 1: TOEFL iBT Overview', 'Lesson 2: Reading Skills', 'Lesson 3: Listening Skills'],
      },
      {
        title: 'Module 2 — Building Skills',
        lessons: ['Lesson 4: Speaking Tasks', 'Lesson 5: Writing Tasks', 'Lesson 6: Integrated Practice'],
      },
      {
        title: 'Module 3 — Final Review',
        lessons: ['Lesson 7: Full Practice Test', 'Lesson 8: Strategy Review'],
      },
    ],
  },
  {
    id: 'english-for-kids',
    slug: 'english-for-kids',
    title: 'English for Kids',
    shortDescription:
      'Fun, engaging lessons that help young learners build vocabulary and confidence in English.',
    description:
      'A playful and engaging program for young learners. Through songs, games, and interactive activities, kids build vocabulary, basic grammar, and confidence in speaking English in a fun and supportive environment.',
    level: 'Beginner',
    category: 'Kids',
    tutor: 'Rachel Green',
    tutorRole: 'Young Learners Educator',
    rating: 4.9,
    reviewCount: 430,
    duration: '8 weeks',
    lessons: 20,
    price: 59,
    originalPrice: 79,
    popular: true,
    students: 900,
    features: ['Interactive games', 'Colorful animations', 'Parent progress reports', 'Child-friendly materials'],
    learningOutcomes: [
      'Learn basic vocabulary through play',
      'Understand simple instructions in English',
      'Say basic greetings and phrases',
      'Develop confidence in speaking',
    ],
    requirements: ['Ages 6–12 recommended', 'Parent or guardian guidance', 'A device with internet access'],
    curriculum: [
      {
        title: 'Module 1 — Fun with Words',
        lessons: ['Lesson 1: Colors & Numbers', 'Lesson 2: Animals & Nature', 'Lesson 3: Food & Drinks'],
      },
      {
        title: 'Module 2 — Everyday English',
        lessons: ['Lesson 4: Greetings & Introductions', 'Lesson 5: My Family', 'Lesson 6: School & Play'],
      },
      {
        title: 'Module 3 — Let\'s Talk',
        lessons: ['Lesson 7: Simple Sentences', 'Lesson 8: Story Time'],
      },
    ],
  },
  {
    id: 'english-for-teens',
    slug: 'english-for-teens',
    title: 'English for Teens',
    shortDescription:
      'Confident, practical English lessons designed for teenage learners and their goals.',
    description:
      'Built for teenagers who want to improve their English for school, travel, or future careers. Lessons are relevant, modern, and interactive, covering school subjects, social media English, and everyday conversation.',
    level: 'Intermediate',
    category: 'Teens',
    tutor: 'James Brown',
    tutorRole: 'Teen Learner Mentor',
    rating: 4.7,
    reviewCount: 310,
    duration: '8 weeks',
    lessons: 22,
    price: 69,
    originalPrice: 89,
    students: 700,
    features: ['Modern, relevant topics', 'Social media vocabulary', 'School English support', 'Interactive quizzes'],
    learningOutcomes: [
      'Improve school-level English performance',
      'Use modern, informal and formal English appropriately',
      'Discuss topics teens care about',
      'Gain confidence for exams and travel',
    ],
    requirements: ['Ages 13–17 recommended', 'Basic English foundation', 'A device with internet access'],
    curriculum: [
      {
        title: 'Module 1 — Foundations',
        lessons: ['Lesson 1: School English', 'Lesson 2: Describing Yourself', 'Lesson 3: Using Language Styles'],
      },
      {
        title: 'Module 2 — Real-World English',
        lessons: ['Lesson 4: Social Media English', 'Lesson 5: Ordering & Shopping', 'Lesson 6: Making Plans'],
      },
      {
        title: 'Module 3 — Confidence Building',
        lessons: ['Lesson 7: Presentations', 'Lesson 8: Group Conversations'],
      },
    ],
  },
  {
    id: 'private-english',
    slug: 'private-english',
    title: 'Private English Course',
    shortDescription:
      'One-on-one lessons tailored entirely to your learning needs and pace.',
    description:
      'Get personalized 1-on-1 lessons designed entirely around your goals, level, and pace. Work directly with a dedicated tutor who adapts each session to your needs, with flexible scheduling and complete attention to your progress.',
    level: 'Advanced',
    category: 'Private',
    tutor: 'Elena Garcia',
    tutorRole: 'Senior Private Tutor',
    rating: 5.0,
    reviewCount: 210,
    duration: 'Flexible',
    lessons: 16,
    price: 199,
    originalPrice: 249,
    popular: true,
    students: 500,
    features: ['Fully personalized lessons', 'Flexible scheduling', 'Dedicated personal tutor', 'Custom learning plan'],
    learningOutcomes: [
      'Receive lessons tailored to your goals',
      'Improve specific skills you choose',
      'Learn at your own comfortable pace',
      'Get direct, personal feedback',
    ],
    requirements: ['Any English level', 'Clear learning goals', 'Flexible availability for lessons'],
    curriculum: [
      {
        title: 'Module 1 — Assessment & Goals',
        lessons: ['Lesson 1: Level Assessment', 'Lesson 2: Setting Your Goals'],
      },
      {
        title: 'Module 2 — Personalized Lessons',
        lessons: ['Lesson 3: Custom Lesson 1', 'Lesson 4: Custom Lesson 2', 'Lesson 5: Custom Lesson 3'],
      },
      {
        title: 'Module 3 — Review & Progress',
        lessons: ['Lesson 6: Progress Check', 'Lesson 7: Custom Lesson 4', 'Lesson 8: Final Review'],
      },
    ],
  },
]

export const courseCategories = courses
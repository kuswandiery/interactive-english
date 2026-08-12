export const Levels = ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced'] as const
export type Level = (typeof Levels)[number]

export const Programs = [
  'General English',
  'English Conversation',
  'Business English',
  'IELTS Preparation',
  'TOEFL Preparation',
  'English for Kids',
  'English for Teens',
  'Private English Course',
] as const
export type Program = (typeof Programs)[number]

export const Roles = ['student', 'admin'] as const
export type Role = (typeof Roles)[number]
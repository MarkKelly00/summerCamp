import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database';
import User from '../models/User';
import Lesson from '../models/Lesson';
import Badge from '../models/Badge';

dotenv.config();

const seedUsers = async () => {
  await User.deleteMany({});
  
  const users = [
    {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      profile: {
        name: 'Parent Admin',
        age: 35,
        gradeLevel: 12
      }
    },
    {
      username: 'son',
      password: 'son123',
      role: 'student',
      profile: {
        name: 'Son',
        age: 6,
        gradeLevel: 2
      }
    },
    {
      username: 'daughter',
      password: 'daughter123',
      role: 'student',
      profile: {
        name: 'Daughter',
        age: 9,
        gradeLevel: 4
      }
    }
  ];

  for (const userData of users) {
    const user = new User(userData);
    await user.save();
    console.log(`Created user: ${userData.username}`);
  }
};

const seedBadges = async () => {
  await Badge.deleteMany({});
  
  const badges = [
    // Grade 2 Badges
    {
      name: 'Math Master',
      description: 'Complete all math lessons for the week with 80% or higher',
      icon: '🧮',
      category: 'weekly',
      subject: 'math',
      gradeLevel: 2,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 50,
      rarity: 'common'
    },
    {
      name: 'Science Explorer',
      description: 'Complete all science lessons for the week with 80% or higher',
      icon: '🔬',
      category: 'weekly',
      subject: 'science',
      gradeLevel: 2,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 50,
      rarity: 'common'
    },
    {
      name: 'Reading Star',
      description: 'Complete all reading lessons for the week with 80% or higher',
      icon: '📚',
      category: 'weekly',
      subject: 'reading',
      gradeLevel: 2,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 50,
      rarity: 'common'
    },
    {
      name: 'History Detective',
      description: 'Complete all history lessons for the week with 80% or higher',
      icon: '🕵️',
      category: 'weekly',
      subject: 'history',
      gradeLevel: 2,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 50,
      rarity: 'common'
    },
    // Grade 4 Badges
    {
      name: 'Math Genius',
      description: 'Complete all math lessons for the week with 80% or higher',
      icon: '🧮',
      category: 'weekly',
      subject: 'math',
      gradeLevel: 4,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 75,
      rarity: 'common'
    },
    {
      name: 'Science Investigator',
      description: 'Complete all science lessons for the week with 80% or higher',
      icon: '🔬',
      category: 'weekly',
      subject: 'science',
      gradeLevel: 4,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 75,
      rarity: 'common'
    },
    {
      name: 'Literature Lover',
      description: 'Complete all reading lessons for the week with 80% or higher',
      icon: '📖',
      category: 'weekly',
      subject: 'reading',
      gradeLevel: 4,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 75,
      rarity: 'common'
    },
    {
      name: 'History Scholar',
      description: 'Complete all history lessons for the week with 80% or higher',
      icon: '🏛️',
      category: 'weekly',
      subject: 'history',
      gradeLevel: 4,
      requirements: { type: 'weekly-completion', target: 5 },
      funMoneyReward: 75,
      rarity: 'common'
    },
    // Special Badges
    {
      name: 'Perfect Score',
      description: 'Get 100% on any lesson quiz',
      icon: '⭐',
      category: 'special',
      gradeLevel: 2,
      requirements: { type: 'perfect-score', target: 100 },
      funMoneyReward: 100,
      rarity: 'rare'
    },
    {
      name: 'Perfect Score',
      description: 'Get 100% on any lesson quiz',
      icon: '⭐',
      category: 'special',
      gradeLevel: 4,
      requirements: { type: 'perfect-score', target: 100 },
      funMoneyReward: 100,
      rarity: 'rare'
    }
  ];

  for (const badgeData of badges) {
    const badge = new Badge(badgeData);
    await badge.save();
  }
  console.log('Created badges');
};

const grade2Lessons = [
  // Week 1
  {
    title: 'Addition Adventures',
    subject: 'math',
    gradeLevel: 2,
    week: 1,
    day: 1,
    content: {
      introduction: 'Welcome to math adventures! Today we\'ll explore addition with numbers up to 20.',
      mainContent: 'Addition means putting numbers together to make a bigger number. When we see 3 + 4, we start with 3 and count 4 more: 4, 5, 6, 7. So 3 + 4 = 7!',
      activities: [
        'Use your fingers to add 2 + 3',
        'Draw circles to show 5 + 2',
        'Practice with objects around you - add apples and oranges!'
      ],
      funFacts: [
        'Did you know that addition is like building with blocks?',
        'The plus sign (+) was invented over 500 years ago!'
      ]
    },
    quiz: [
      {
        question: 'What is 4 + 3?',
        type: 'multiple-choice',
        options: ['6', '7', '8', '5'],
        correctAnswer: '7',
        explanation: 'When we start with 4 and count 3 more (5, 6, 7), we get 7!',
        points: 10
      },
      {
        question: 'What is 6 + 2?',
        type: 'multiple-choice',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        explanation: 'Starting with 6 and counting 2 more gives us 8.',
        points: 10
      }
    ],
    estimatedTime: 30,
    difficulty: 'easy'
  },
  {
    title: 'Animal Habitats',
    subject: 'science',
    gradeLevel: 2,
    week: 1,
    day: 2,
    content: {
      introduction: 'Let\'s explore where different animals live! Every animal has a special home called a habitat.',
      mainContent: 'A habitat is where an animal lives and finds everything it needs: food, water, shelter, and space. Fish live in water, birds build nests in trees, and bears live in forests or caves.',
      activities: [
        'Draw your favorite animal in its habitat',
        'Match animals to their homes: fish → water, bird → nest, rabbit → burrow',
        'Look outside and see what animal habitats you can spot!'
      ],
      funFacts: [
        'Polar bears have black skin under their white fur!',
        'Some birds fly thousands of miles to find the perfect habitat!'
      ]
    },
    quiz: [
      {
        question: 'Where do fish live?',
        type: 'multiple-choice',
        options: ['In trees', 'In water', 'In caves', 'In the sky'],
        correctAnswer: 'In water',
        explanation: 'Fish need water to breathe and swim!',
        points: 10
      },
      {
        question: 'What do animals find in their habitat?',
        type: 'multiple-choice',
        options: ['Only food', 'Food, water, shelter, and space', 'Only water', 'Only shelter'],
        correctAnswer: 'Food, water, shelter, and space',
        explanation: 'Animals need all these things to survive in their habitat.',
        points: 10
      }
    ],
    estimatedTime: 30,
    difficulty: 'easy'
  }
  // Continue with more lessons...
];

const grade4Lessons = [
  // Week 1
  {
    title: 'Multiplication Mastery',
    subject: 'math',
    gradeLevel: 4,
    week: 1,
    day: 1,
    content: {
      introduction: 'Welcome to multiplication mastery! Multiplication is repeated addition that helps us solve problems faster.',
      mainContent: 'When we multiply 4 × 3, we\'re adding 4 three times: 4 + 4 + 4 = 12. Multiplication has many real-world uses, like calculating area, counting groups, and solving word problems.',
      activities: [
        'Create arrays with objects to show 3 × 4 = 12',
        'Solve word problems: "If each box has 6 apples and there are 4 boxes, how many apples total?"',
        'Practice times tables 1-5 with flashcards'
      ],
      funFacts: [
        'Ancient Egyptians used multiplication over 4000 years ago!',
        'The word "multiply" comes from Latin meaning "many folds"'
      ]
    },
    quiz: [
      {
        question: 'What is 7 × 4?',
        type: 'multiple-choice',
        options: ['24', '28', '32', '21'],
        correctAnswer: '28',
        explanation: '7 × 4 = 7 + 7 + 7 + 7 = 28',
        points: 10
      },
      {
        question: 'If there are 5 bags with 8 marbles each, how many marbles total?',
        type: 'multiple-choice',
        options: ['35', '40', '45', '50'],
        correctAnswer: '40',
        explanation: '5 × 8 = 40 marbles total',
        points: 15
      }
    ],
    estimatedTime: 35,
    difficulty: 'medium'
  }
  // Continue with more lessons...
];

const seedLessons = async () => {
  await Lesson.deleteMany({});
  
  // Generate comprehensive lesson data for both grades
  const allLessons = [...grade2Lessons, ...grade4Lessons];
  
  // Add more lessons programmatically for full 12-week curriculum
  const subjects = ['math', 'science', 'reading', 'history'];
  
  for (let grade of [2, 4]) {
    for (let week = 1; week <= 12; week++) {
      for (let day = 1; day <= 5; day++) {
        const subject = subjects[(day - 1) % 4];
        
        // Skip if we already have this lesson from manual data
        const exists = allLessons.find(l => 
          l.gradeLevel === grade && l.week === week && l.day === day && l.subject === subject
        );
        
        if (!exists) {
          const lesson = {
            title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Lesson - Week ${week}, Day ${day}`,
            subject,
            gradeLevel: grade,
            week,
            day,
            content: {
              introduction: `Welcome to today's ${subject} lesson!`,
              mainContent: `This is the main content for ${subject} in grade ${grade}, week ${week}, day ${day}.`,
              activities: [
                `Activity 1 for ${subject}`,
                `Activity 2 for ${subject}`,
                `Practice exercise for ${subject}`
              ],
              funFacts: [
                `Fun fact about ${subject}!`,
                `Another interesting ${subject} fact!`
              ]
            },
            quiz: [
              {
                question: `Sample ${subject} question for grade ${grade}?`,
                type: 'multiple-choice',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A',
                explanation: `This is the explanation for the ${subject} question.`,
                points: 10
              }
            ],
            estimatedTime: grade === 2 ? 30 : 35,
            difficulty: grade === 2 ? 'easy' : 'medium'
          };
          allLessons.push(lesson);
        }
      }
    }
  }
  
  for (const lessonData of allLessons) {
    const lesson = new Lesson(lessonData);
    await lesson.save();
  }
  
  console.log(`Created ${allLessons.length} lessons`);
};

const seedAll = async () => {
  try {
    await connectDB();
    console.log('Starting data seeding...');
    
    await seedUsers();
    await seedBadges();
    await seedLessons();
    
    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAll(); 
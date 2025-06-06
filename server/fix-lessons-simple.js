const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// Use the existing schema structure
const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'fill-blank', 'short-answer'],
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  explanation: String,
  points: {
    type: Number,
    default: 10
  }
});

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    enum: ['math', 'science', 'reading', 'history'],
    required: true
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  week: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    introduction: {
      type: String,
      required: true
    },
    mainContent: {
      type: String,
      required: true
    },
    activities: [{
      type: String
    }],
    funFacts: [{
      type: String
    }]
  },
  quiz: [QuizSchema],
  estimatedTime: {
    type: Number,
    default: 30
  },
  isBonus: {
    type: Boolean,
    default: false
  },
  funMoneyReward: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

// Sample lessons with proper quiz structure
const sampleLessons = [
  {
    title: "Counting by 2s, 5s, and 10s",
    subject: "math",
    gradeLevel: 2,
    week: 2,
    day: 1,
    content: {
      introduction: "Today we're learning to count by 2s, 5s, and 10s! This special counting helps us count faster and see number patterns.",
      mainContent: "Skip counting means counting by jumping over numbers in a pattern. When we count by 2s, we say 2, 4, 6, 8, 10... When we count by 5s, we say 5, 10, 15, 20, 25... When we count by 10s, we say 10, 20, 30, 40, 50...",
      activities: [
        "Use pairs of socks to practice counting by 2s",
        "Count nickels to practice counting by 5s",
        "Count dimes to practice counting by 10s"
      ],
      funFacts: [
        "Your body helps you count by 2s - you have 2 eyes, 2 ears, 2 hands, and 2 feet!",
        "Clock faces help us count by 5s - each number represents 5 minutes!"
      ]
    },
    quiz: [
      {
        question: "What comes next when counting by 2s: 2, 4, 6, 8, ?",
        type: "multiple-choice",
        options: ["9", "10", "11", "12"],
        correctAnswer: "10",
        explanation: "When counting by 2s, we add 2 each time: 8 + 2 = 10",
        points: 10
      },
      {
        question: "Which numbers do we say when counting by 5s?",
        type: "multiple-choice",
        options: ["1, 2, 3, 4, 5", "5, 10, 15, 20, 25", "2, 4, 6, 8, 10", "1, 3, 5, 7, 9"],
        correctAnswer: "5, 10, 15, 20, 25",
        explanation: "When counting by 5s, we add 5 each time starting from 5",
        points: 10
      },
      {
        question: "How many fingers are on 3 hands if we count by 5s?",
        type: "multiple-choice",
        options: ["10", "15", "20", "25"],
        correctAnswer: "15",
        explanation: "Each hand has 5 fingers, so 3 hands = 5, 10, 15 fingers",
        points: 10
      },
      {
        question: "What comes after 30 when counting by 10s?",
        type: "multiple-choice",
        options: ["31", "35", "40", "50"],
        correctAnswer: "40",
        explanation: "When counting by 10s: 10, 20, 30, 40...",
        points: 10
      },
      {
        question: "Which pattern shows counting by 2s?",
        type: "multiple-choice",
        options: ["1, 3, 5, 7", "2, 4, 6, 8", "5, 10, 15, 20", "10, 20, 30, 40"],
        correctAnswer: "2, 4, 6, 8",
        explanation: "Counting by 2s means adding 2 each time: 2, 4, 6, 8...",
        points: 10
      },
      {
        question: "If you have 4 groups of 5 stickers each, how many stickers total?",
        type: "multiple-choice",
        options: ["15", "20", "25", "30"],
        correctAnswer: "20",
        explanation: "Count by 5s four times: 5, 10, 15, 20 stickers",
        points: 10
      },
      {
        question: "Which number comes next: 10, 20, 30, ?",
        type: "multiple-choice",
        options: ["35", "40", "45", "50"],
        correctAnswer: "40",
        explanation: "This is counting by 10s, so 30 + 10 = 40",
        points: 10
      },
      {
        question: "How many shoes are there if 6 people each have 2 shoes?",
        type: "multiple-choice",
        options: ["8", "10", "12", "14"],
        correctAnswer: "12",
        explanation: "Count by 2s six times: 2, 4, 6, 8, 10, 12 shoes",
        points: 10
      }
    ],
    estimatedTime: 25,
    isBonus: false,
    funMoneyReward: 15,
    difficulty: "easy"
  },
  {
    title: "Weather and Seasons",
    subject: "science",
    gradeLevel: 2,
    week: 2,
    day: 1,
    content: {
      introduction: "Today we're learning about weather and how it changes with the seasons!",
      mainContent: "Weather is what's happening in the sky right now - sunny, cloudy, rainy, or snowy. Seasons are longer patterns: spring brings rain and flowers, summer is hot and sunny, fall has cooler weather and leaves change colors, winter is cold with possible snow.",
      activities: [
        "Keep a weather journal for one week",
        "Look outside and describe today's weather",
        "Match clothing to different types of weather"
      ],
      funFacts: [
        "Snowflakes are all unique - no two are exactly the same!",
        "Lightning is five times hotter than the surface of the sun!"
      ]
    },
    quiz: [
      {
        question: "What season comes after winter?",
        type: "multiple-choice",
        options: ["Fall", "Spring", "Summer", "Winter"],
        correctAnswer: "Spring",
        explanation: "Spring comes after winter, bringing warmer weather and flowers.",
        points: 10
      },
      {
        question: "What type of weather would you expect in summer?",
        type: "multiple-choice",
        options: ["Snow", "Hot and sunny", "Falling leaves", "Rain showers"],
        correctAnswer: "Hot and sunny",
        explanation: "Summer is typically hot and sunny weather.",
        points: 10
      },
      {
        question: "What should you wear on a rainy day?",
        type: "multiple-choice",
        options: ["Shorts and t-shirt", "Raincoat and boots", "Swimming suit", "Heavy winter coat"],
        correctAnswer: "Raincoat and boots",
        explanation: "A raincoat and boots keep you dry on rainy days.",
        points: 10
      },
      {
        question: "In which season do leaves change colors?",
        type: "multiple-choice",
        options: ["Spring", "Summer", "Fall", "Winter"],
        correctAnswer: "Fall",
        explanation: "In fall (autumn), leaves change colors before falling off trees.",
        points: 10
      },
      {
        question: "What weather tool measures how hot or cold it is?",
        type: "multiple-choice",
        options: ["Ruler", "Scale", "Thermometer", "Clock"],
        correctAnswer: "Thermometer",
        explanation: "A thermometer measures temperature - how hot or cold it is.",
        points: 10
      },
      {
        question: "What happens to water when it gets very cold?",
        type: "multiple-choice",
        options: ["It disappears", "It turns to ice", "It gets warmer", "It changes color"],
        correctAnswer: "It turns to ice",
        explanation: "When water gets very cold (freezes), it turns into ice.",
        points: 10
      },
      {
        question: "Which season is the best time to plant flowers?",
        type: "multiple-choice",
        options: ["Winter", "Spring", "Fall", "Never"],
        correctAnswer: "Spring",
        explanation: "Spring is the best time to plant flowers because of warm weather and rain.",
        points: 10
      },
      {
        question: "What causes wind?",
        type: "multiple-choice",
        options: ["Trees moving", "Air moving", "Cars driving", "People walking"],
        correctAnswer: "Air moving",
        explanation: "Wind is caused by air moving from one place to another.",
        points: 10
      }
    ],
    estimatedTime: 25,
    isBonus: false,
    funMoneyReward: 15,
    difficulty: "easy"
  }
];

async function fixLessons() {
  console.log('Starting lesson database fix...');
  
  // Clear existing lessons
  await Lesson.deleteMany({});
  console.log('Cleared existing lessons');
  
  // Insert sample lessons
  for (const lessonData of sampleLessons) {
    try {
      const lesson = new Lesson(lessonData);
      await lesson.save();
      console.log(`Created lesson: ${lessonData.title}`);
    } catch (error) {
      console.error(`Error creating lesson ${lessonData.title}:`, error.message);
    }
  }
  
  console.log('Lesson fix completed!');
}

async function main() {
  await connectDB();
  await fixLessons();
  process.exit(0);
}

main().catch(console.error); 
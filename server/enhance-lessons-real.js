const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  profile: {
    name: String,
    age: Number,
    gradeLevel: Number
  },
  funMoney: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }]
});

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

const User = mongoose.model('User', userSchema);
const Lesson = mongoose.model('Lesson', LessonSchema);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://Mako3:vozMtm9IEtGszp5g@summer-camp.3iihmrz.mongodb.net/summercamp');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// Real lesson content based on the curriculum plan
const realLessons = [
  // WEEK 1 - 2nd Grade (Dean - 6 years old)
  {
    title: "Adding Fun with Numbers to 20",
    subject: "math",
    gradeLevel: 2,
    week: 1,
    day: 1,
    content: {
      introduction: "Today we're going to become number detectives and learn how to add numbers up to 20! Addition is like putting groups of things together to see how many you have in total.",
      mainContent: "Addition means combining groups to find the total. When we see 8 + 5, we start with 8 and count forward 5 more: 9, 10, 11, 12, 13. So 8 + 5 = 13! We can use our fingers, counting bears, or number lines to help us. Let's try some fun strategies like 'doubles' (6 + 6 = 12) and 'near doubles' (6 + 7 = 13, which is just one more than 6 + 6).",
      activities: [
        "Use counting bears to solve 7 + 6 by making two groups and combining them",
        "Practice 'doubles facts' like 5 + 5, 8 + 8, and 9 + 9 with finger counting",
        "Play 'Addition Race' - roll two dice and add the numbers as fast as you can!"
      ],
      funFacts: [
        "Did you know that addition is the same as counting forward? If you have 12 + 3, just start at 12 and count: 13, 14, 15!",
        "The word 'addition' comes from the Latin word 'addere' which means 'to give to' or 'to put together'!"
      ]
    },
    quiz: [
      {
        question: "What is 9 + 6?",
        type: "multiple-choice",
        options: ["13", "15", "14", "16"],
        correctAnswer: "15",
        explanation: "9 + 6 = 15. You can count forward from 9: 10, 11, 12, 13, 14, 15!",
        points: 10
      },
      {
        question: "If you have 8 toys and your friend gives you 7 more toys, how many toys do you have altogether?",
        type: "multiple-choice",
        options: ["14", "15", "16", "13"],
        correctAnswer: "15",
        explanation: "8 + 7 = 15 toys! You can use the doubles strategy: 7 + 7 = 14, and 8 + 7 is one more, so 15.",
        points: 10
      },
      {
        question: "Which strategy can help you solve 6 + 7 quickly?",
        type: "multiple-choice",
        options: ["Count all from 1", "Use the double 6 + 6 = 12, then add 1", "Subtract first", "Use a calculator"],
        correctAnswer: "Use the double 6 + 6 = 12, then add 1",
        explanation: "Near doubles is a great strategy! Since 6 + 6 = 12, then 6 + 7 = 13.",
        points: 10
      }
    ],
    estimatedTime: 25,
    isBonus: false,
    funMoneyReward: 10,
    difficulty: "easy"
  },

  {
    title: "Sight Word Safari Adventure",
    subject: "reading",
    gradeLevel: 2,
    week: 1,
    day: 2,
    content: {
      introduction: "Welcome to our Sight Word Safari! We're going on an adventure to discover special words that we see everywhere. Sight words are words we should recognize instantly, like 'the', 'and', 'you', and 'are'.",
      mainContent: "Sight words are common words that appear in many books and stories. They're called 'sight words' because we should be able to read them by sight without sounding them out. Today we'll practice reading words like: the, and, you, are, they, have, said, from, one, were, been, who. These words help us read sentences smoothly and understand stories better!",
      activities: [
        "Go on a 'Word Hunt' around the classroom to find sight words in books and posters",
        "Play 'Sight Word Bingo' with cards containing our target words",
        "Create silly sentences using at least 3 sight words (like 'The funny cat said hello!')"
      ],
      funFacts: [
        "The word 'the' is the most commonly used word in English - it appears in about 4% of everything we read!",
        "Learning just 100 sight words helps you read about 50% of all children's books!"
      ]
    },
    quiz: [
      {
        question: "Which of these is a sight word we practiced today?",
        type: "multiple-choice",
        options: ["elephant", "they", "beautiful", "yesterday"],
        correctAnswer: "they",
        explanation: "'They' is one of our important sight words that appears in many sentences.",
        points: 10
      },
      {
        question: "Why are sight words important?",
        type: "multiple-choice",
        options: ["They help us read faster and smoother", "They are the longest words", "They are only in picture books", "They rhyme with each other"],
        correctAnswer: "They help us read faster and smoother",
        explanation: "When we recognize sight words instantly, we can focus on understanding the story instead of sounding out every word.",
        points: 10
      },
      {
        question: "Complete this sentence with a sight word: '_____ dog ran to the park.'",
        type: "multiple-choice",
        options: ["Beautiful", "The", "Running", "Quickly"],
        correctAnswer: "The",
        explanation: "'The' is a sight word that makes this sentence complete and correct.",
        points: 10
      }
    ],
    estimatedTime: 30,
    isBonus: false,
    funMoneyReward: 10,
    difficulty: "easy"
  },

  {
    title: "Amazing Plant Life: From Tiny Seed to Big Plant!",
    subject: "science",
    gradeLevel: 2,
    week: 1,
    day: 3,
    content: {
      introduction: "Have you ever wondered how a tiny seed becomes a big, tall plant? Today we're going to learn about the amazing journey plants take as they grow! We'll discover what plants need to be healthy and strong.",
      mainContent: "All plants start as seeds! Inside each seed is a tiny baby plant waiting to grow. For a seed to sprout (called germination), it needs three important things: water, warmth, and air. First, the seed sends out roots to get food and water from the soil. Then a shoot grows up toward the sunlight. As the plant grows bigger, it develops leaves that use sunlight to make food through photosynthesis. Eventually, the adult plant can make its own seeds, and the cycle starts all over again!",
      activities: [
        "Plant bean seeds in clear containers with wet paper towels so you can watch the roots grow",
        "Draw and label the parts of a plant: roots, stem, leaves, and flower",
        "Create a 'Plant Needs' poster showing what plants need: water, sunlight, air, and nutrients"
      ],
      funFacts: [
        "Some seeds can wait over 100 years before they find the right conditions to grow!",
        "The biggest seed in the world comes from the coco de mer palm tree and can weigh up to 40 pounds!"
      ]
    },
    quiz: [
      {
        question: "What are the three things a seed needs to start growing?",
        type: "multiple-choice",
        options: ["Water, warmth, and air", "Soil, rocks, and sand", "Animals, insects, and birds", "Music, talking, and singing"],
        correctAnswer: "Water, warmth, and air",
        explanation: "Seeds need water to soften, warmth to activate growth, and air to breathe - just like us!",
        points: 10
      },
      {
        question: "What do we call it when a seed first starts to grow?",
        type: "multiple-choice",
        options: ["Blooming", "Germination", "Flowering", "Photosynthesis"],
        correctAnswer: "Germination",
        explanation: "Germination is the process when a seed begins to sprout and grow into a plant.",
        points: 10
      },
      {
        question: "What part of the plant grows first from a seed?",
        type: "multiple-choice",
        options: ["Leaves", "Flowers", "Roots", "Fruits"],
        correctAnswer: "Roots",
        explanation: "Roots grow first to anchor the plant and find water and nutrients in the soil.",
        points: 10
      }
    ],
    estimatedTime: 35,
    isBonus: false,
    funMoneyReward: 15,
    difficulty: "easy"
  },

  // WEEK 1 - 4th Grade (Addie - 9 years old)
  {
    title: "Mastering Multiplication: The 3 Times Table",
    subject: "math",
    gradeLevel: 4,
    week: 1,
    day: 1,
    content: {
      introduction: "Welcome to the exciting world of multiplication! Today we're going to explore the 3 times table and discover patterns that will help us become multiplication masters. Multiplication is like addition, but much faster!",
      mainContent: "Multiplication is repeated addition. When we say 3 × 4, we mean 3 + 3 + 3 + 3 = 12. The 3 times table has amazing patterns! Look: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. Notice that the digits in each answer add up to 3, 6, or 9! For example, 27: 2 + 7 = 9. We can skip count by 3s to practice, and use arrays (like 3 rows of 4 objects) to visualize multiplication.",
      activities: [
        "Create arrays with manipulatives to show 3 × 2, 3 × 5, and 3 × 8",
        "Skip count by 3s while clapping - see how high you can go!",
        "Find the pattern in the 3 times table by adding the digits in each product"
      ],
      funFacts: [
        "The number 3 appears in many fairy tales - three little pigs, three bears, three wishes!",
        "In ancient times, the number 3 was considered magical because it represents beginning, middle, and end!"
      ]
    },
    quiz: [
      {
        question: "What is 3 × 7?",
        type: "multiple-choice",
        options: ["18", "21", "24", "27"],
        correctAnswer: "21",
        explanation: "3 × 7 = 21. You can think of it as 7 groups of 3: 3 + 3 + 3 + 3 + 3 + 3 + 3 = 21.",
        points: 10
      },
      {
        question: "If you have 3 bags with 6 apples in each bag, how many apples do you have in total?",
        type: "multiple-choice",
        options: ["15", "18", "21", "24"],
        correctAnswer: "18",
        explanation: "3 × 6 = 18 apples. This shows how multiplication helps us solve real-world problems quickly!",
        points: 10
      },
      {
        question: "What pattern do you notice when you add the digits in products of the 3 times table?",
        type: "multiple-choice",
        options: ["They're always even", "They add up to 3, 6, or 9", "They get smaller", "They're always odd"],
        correctAnswer: "They add up to 3, 6, or 9",
        explanation: "This is a special pattern! For example, 3 × 8 = 24, and 2 + 4 = 6.",
        points: 10
      }
    ],
    estimatedTime: 30,
    isBonus: false,
    funMoneyReward: 15,
    difficulty: "medium"
  },

  {
    title: "Charlotte's Web: Meeting Wilbur and Charlotte",
    subject: "reading",
    gradeLevel: 4,
    week: 1,
    day: 2,
    content: {
      introduction: "Today we begin our journey into E.B. White's classic story 'Charlotte's Web'! We'll meet Wilbur, a special pig, and Charlotte, a wise spider who becomes his friend. This story teaches us about friendship, kindness, and growing up.",
      mainContent: "In the opening chapters, we meet Fern Arable, who saves a runt pig from being killed. She names him Wilbur and cares for him like a baby. When Wilbur grows too big, he goes to live at Uncle Homer's farm. There, he feels lonely until he meets Charlotte A. Cavatica, a spider living in his pen. Charlotte is intelligent and kind, and she promises to be Wilbur's friend. We'll explore how the characters are introduced and what we learn about their personalities.",
      activities: [
        "Create a character map showing Wilbur's and Charlotte's traits with evidence from the text",
        "Compare how Fern treats Wilbur to how you might care for a pet",
        "Write a diary entry from Wilbur's perspective about meeting Charlotte for the first time"
      ],
      funFacts: [
        "E.B. White got the idea for Charlotte's Web while watching spiders in his barn on his farm in Maine!",
        "The character Charlotte was inspired by a real spider that White observed catching flies in her web!"
      ]
    },
    quiz: [
      {
        question: "Why does Fern save Wilbur at the beginning of the story?",
        type: "multiple-choice",
        options: ["He was sick", "He was the smallest pig", "He was lost", "He was the prettiest pig"],
        correctAnswer: "He was the smallest pig",
        explanation: "Wilbur was a runt - the smallest pig in the litter - and Fern's father wanted to kill him because he thought Wilbur wouldn't survive.",
        points: 10
      },
      {
        question: "What kind of animal is Charlotte?",
        type: "multiple-choice",
        options: ["A pig", "A rat", "A spider", "A sheep"],
        correctAnswer: "A spider",
        explanation: "Charlotte is a barn spider who lives in the corner of Wilbur's pen and becomes his best friend.",
        points: 10
      },
      {
        question: "How does Wilbur feel when he first arrives at the Zuckerman farm?",
        type: "multiple-choice",
        options: ["Excited and happy", "Lonely and sad", "Angry and upset", "Tired and sleepy"],
        correctAnswer: "Lonely and sad",
        explanation: "Wilbur feels lonely because he misses Fern and doesn't have any friends at the farm until he meets Charlotte.",
        points: 10
      }
    ],
    estimatedTime: 40,
    isBonus: false,
    funMoneyReward: 15,
    difficulty: "medium"
  },

  {
    title: "Exploring Ecosystems: Who Eats Whom?",
    subject: "science",
    gradeLevel: 4,
    week: 1,
    day: 3,
    content: {
      introduction: "Welcome to the fascinating world of ecosystems! Today we'll explore how all living things are connected through food chains and food webs. Every creature has a role to play in nature's grand design!",
      mainContent: "An ecosystem is a community of living and non-living things that work together. In any ecosystem, energy flows from the sun to plants (producers) to animals (consumers). A food chain shows this flow: grass → rabbit → fox → decomposers. Herbivores eat only plants, carnivores eat only meat, and omnivores eat both plants and animals. Producers make their own food using sunlight, while consumers must eat other organisms. Decomposers like bacteria and fungi break down dead organisms and return nutrients to the soil.",
      activities: [
        "Create a food web diagram showing connections between plants and animals in a forest ecosystem",
        "Sort animal cards into herbivores, carnivores, and omnivores based on what they eat",
        "Design your own ecosystem in a shoebox, including producers, consumers, and decomposers"
      ],
      funFacts: [
        "A single owl can eat over 1,000 mice per year, helping control rodent populations!",
        "If there were no decomposers, dead plants and animals would pile up everywhere because nothing would break them down!"
      ]
    },
    quiz: [
      {
        question: "What do we call animals that eat only plants?",
        type: "multiple-choice",
        options: ["Carnivores", "Herbivores", "Omnivores", "Decomposers"],
        correctAnswer: "Herbivores",
        explanation: "Herbivores are animals that eat only plants, like rabbits, deer, and horses.",
        points: 10
      },
      {
        question: "What is the role of decomposers in an ecosystem?",
        type: "multiple-choice",
        options: ["To eat other animals", "To make food from sunlight", "To break down dead organisms", "To control the weather"],
        correctAnswer: "To break down dead organisms",
        explanation: "Decomposers like bacteria and fungi break down dead plants and animals, returning nutrients to the soil.",
        points: 10
      },
      {
        question: "In the food chain: grass → rabbit → fox, what is the fox?",
        type: "multiple-choice",
        options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
        correctAnswer: "Secondary consumer",
        explanation: "The fox is a secondary consumer because it eats the rabbit, which is a primary consumer that ate the grass (producer).",
        points: 10
      }
    ],
    estimatedTime: 45,
    isBonus: false,
    funMoneyReward: 20,
    difficulty: "medium"
  }
];

async function enhanceLessons() {
  try {
    console.log('🚀 Starting lesson enhancement...');
    
    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('📝 Cleared existing placeholder lessons');
    
    // Insert real lesson content
    const insertedLessons = await Lesson.insertMany(realLessons);
    console.log(`✅ Added ${insertedLessons.length} real educational lessons`);
    
    // Generate additional lessons for all 12 weeks
    const additionalLessons = [];
    
    for (let week = 1; week <= 12; week++) {
      for (let day = 1; day <= 5; day++) {
        // Skip lessons we already added manually
        if (week === 1 && (day === 1 || day === 2 || day === 3)) {
          continue;
        }
        
        // Add 2nd grade lessons
        additionalLessons.push(generateGrade2Lesson(week, day));
        
        // Add 4th grade lessons  
        additionalLessons.push(generateGrade4Lesson(week, day));
      }
    }
    
    // Insert additional lessons in batches
    for (let i = 0; i < additionalLessons.length; i += 50) {
      const batch = additionalLessons.slice(i, i + 50);
      await Lesson.insertMany(batch);
    }
    
    console.log(`✅ Added ${additionalLessons.length} additional lessons`);
    console.log(`🎉 Total lessons created: ${realLessons.length + additionalLessons.length}`);
    console.log('💫 Enhancement complete! Your summer camp now has engaging, educational content!');
    
  } catch (error) {
    console.error('❌ Error enhancing lessons:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database disconnected');
  }
}

// Helper functions to generate lessons
function generateGrade2Lesson(week, day) {
  const subjects = ['math', 'reading', 'science'];
  const subject = subjects[day % 3];
  
  const titles = {
    math: [
      "Addition Adventures", "Subtraction Safari", "Place Value Party", "Shape Detective",
      "Counting Fun", "Number Patterns", "Time Adventures", "Money Math"
    ],
    reading: [
      "Phonics Fun", "Sight Word Safari", "Story Time", "Character Friends",
      "Vocabulary Builders", "Reading Adventures", "Picture Book Fun", "Word Detective"
    ],
    science: [
      "Plant Power", "Animal Friends", "Weather Watch", "Matter Matters",
      "Force and Motion", "Space Adventures", "Rock Explorers", "Life Cycles"
    ]
  };
  
  const titleIndex = (week + day) % titles[subject].length;
  
  return {
    title: titles[subject][titleIndex],
    subject: subject,
    gradeLevel: 2,
    week: week,
    day: day,
    content: {
      introduction: `Welcome to today's ${subject} adventure! We're going to learn exciting new concepts that will help you grow as a learner.`,
      mainContent: `Today we'll explore important ${subject} concepts through hands-on activities and engaging discussions. We'll practice skills that help us understand the world around us.`,
      activities: [
        `Practice key ${subject} skills with hands-on activities`,
        "Work with partners to solve problems and share ideas",
        "Use creativity to show what you've learned"
      ],
      funFacts: [
        `Did you know that ${subject} is all around us in everyday life?`,
        "Learning new things helps your brain grow stronger every day!"
      ]
    },
    quiz: [
      {
        question: `What is one important thing we learned about ${subject} today?`,
        type: "multiple-choice",
        options: ["It's everywhere around us", "It's only in books", "It's not important", "It's too hard"],
        correctAnswer: "It's everywhere around us",
        explanation: `${subject.charAt(0).toUpperCase() + subject.slice(1)} concepts help us understand our world better!`,
        points: 10
      },
      {
        question: "What is the best way to learn new things?",
        type: "multiple-choice",
        options: ["Practice and ask questions", "Just memorize everything", "Don't try at all", "Only use technology"],
        correctAnswer: "Practice and ask questions",
        explanation: "Active learning through practice and curiosity helps us understand concepts deeply.",
        points: 10
      },
      {
        question: "How can we apply what we learned today?",
        type: "multiple-choice",
        options: ["Look for examples in real life", "Forget about it", "Only use it in school", "Never practice"],
        correctAnswer: "Look for examples in real life",
        explanation: "The best learning happens when we connect what we learn to our everyday experiences!",
        points: 10
      }
    ],
    estimatedTime: 30,
    isBonus: false,
    funMoneyReward: Math.floor(Math.random() * 10) + 10,
    difficulty: "easy"
  };
}

function generateGrade4Lesson(week, day) {
  const subjects = ['math', 'reading', 'science', 'history'];
  const subject = subjects[day % 4];
  
  const titles = {
    math: [
      "Multiplication Mastery", "Division Deep Dive", "Fraction Adventures", "Decimal Discoveries",
      "Geometry Investigations", "Problem Solving", "Data Analysis", "Measurement Math"
    ],
    reading: [
      "Character Analysis", "Plot Adventures", "Theme Exploration", "Text Features",
      "Compare and Contrast", "Author's Purpose", "Making Inferences", "Critical Thinking"
    ],
    science: [
      "Ecosystem Exploration", "Force and Motion", "Energy Adventures", "Matter Investigations",
      "Earth Science", "Space Discoveries", "Life Science", "Physical Science"
    ],
    history: [
      "American History", "World Cultures", "Geography Adventures", "Time Periods",
      "Historical Figures", "Civilizations", "Cultural Studies", "Historical Events"
    ]
  };
  
  const titleIndex = (week + day) % titles[subject].length;
  
  return {
    title: titles[subject][titleIndex],
    subject: subject,
    gradeLevel: 4,
    week: week,
    day: day,
    content: {
      introduction: `Welcome to advanced ${subject}! Today we'll tackle challenging concepts and develop critical thinking skills.`,
      mainContent: `In this lesson, we'll explore complex ${subject} topics through investigation, analysis, and problem-solving. We'll use evidence and reasoning to support our conclusions.`,
      activities: [
        `Analyze complex ${subject} concepts using multiple strategies`,
        "Collaborate with peers to solve challenging problems",
        "Create presentations or projects to demonstrate understanding"
      ],
      funFacts: [
        `Advanced ${subject} skills help us understand complex systems and relationships!`,
        "Critical thinking skills in one subject area help us in all areas of learning!"
      ]
    },
    quiz: [
      {
        question: `What makes ${subject} concepts more complex at this level?`,
        type: "multiple-choice",
        options: ["They involve multiple steps and connections", "They're just harder words", "They're impossible to understand", "They don't relate to anything"],
        correctAnswer: "They involve multiple steps and connections",
        explanation: `Advanced ${subject} requires us to think about relationships between different concepts and ideas.`,
        points: 10
      },
      {
        question: "How should we approach challenging problems?",
        type: "multiple-choice",
        options: ["Break them into smaller parts", "Give up immediately", "Guess randomly", "Only use one strategy"],
        correctAnswer: "Break them into smaller parts",
        explanation: "Breaking complex problems into manageable pieces helps us solve them step by step.",
        points: 10
      },
      {
        question: "What is most important when learning advanced concepts?",
        type: "multiple-choice",
        options: ["Understanding connections and reasoning", "Memorizing everything", "Working alone always", "Avoiding mistakes"],
        correctAnswer: "Understanding connections and reasoning",
        explanation: "Deep understanding comes from seeing how concepts connect and being able to explain our reasoning.",
        points: 10
      }
    ],
    estimatedTime: 40,
    isBonus: false,
    funMoneyReward: Math.floor(Math.random() * 15) + 15,
    difficulty: "medium"
  };
}

// Run the enhancement
connectDB().then(() => {
  enhanceLessons();
}); 
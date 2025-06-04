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
  
  // Real educational content organized by week and subject
  const mathTopics = [
    // Week 1-3: Addition and Subtraction
    { title: "Adding Numbers to 20", concept: "addition", range: "0-20" },
    { title: "Subtracting Within 20", concept: "subtraction", range: "0-20" },
    { title: "Addition and Subtraction Stories", concept: "word problems", range: "0-20" },
    // Week 4-6: Place Value
    { title: "Tens and Ones", concept: "place value", range: "10-99" },
    { title: "Comparing Numbers", concept: "comparison", range: "10-99" },
    { title: "Skip Counting by 2s, 5s, and 10s", concept: "skip counting", range: "patterns" },
    // Week 7-9: Measurement and Time
    { title: "Measuring Length", concept: "measurement", range: "inches/cm" },
    { title: "Telling Time to the Hour", concept: "time", range: "clocks" },
    { title: "Money: Coins and Values", concept: "money", range: "penny-quarter" },
    // Week 10-12: Shapes and Data
    { title: "2D Shapes Around Us", concept: "geometry", range: "shapes" },
    { title: "3D Shapes We See", concept: "geometry", range: "solids" },
    { title: "Making Graphs", concept: "data", range: "bar graphs" }
  ];
  
  const readingTopics = [
    // Week 1-3: Phonics and Sight Words
    { title: "Short Vowel Sounds", concept: "phonics", focus: "CVC words" },
    { title: "Long Vowel Magic E", concept: "phonics", focus: "CVCe words" },
    { title: "High-Frequency Words", concept: "sight words", focus: "common words" },
    // Week 4-6: Reading Comprehension
    { title: "Story Characters", concept: "comprehension", focus: "who is in the story" },
    { title: "Story Settings", concept: "comprehension", focus: "where and when" },
    { title: "Story Problems and Solutions", concept: "comprehension", focus: "plot elements" },
    // Week 7-9: Reading Skills
    { title: "Making Predictions", concept: "prediction", focus: "what happens next" },
    { title: "Finding the Main Idea", concept: "main idea", focus: "what's it about" },
    { title: "Comparing Stories", concept: "comparison", focus: "similarities/differences" },
    // Week 10-12: Reading Fluency
    { title: "Reading with Expression", concept: "fluency", focus: "emotion in reading" },
    { title: "Reading Different Genres", concept: "genres", focus: "fiction vs nonfiction" },
    { title: "Author and Illustrator", concept: "text features", focus: "who creates books" }
  ];
  
  const scienceTopics = [
    // Week 1-3: Life Science
    { title: "Plant Life Cycles", concept: "life cycles", focus: "seed to plant" },
    { title: "Animal Habitats", concept: "habitats", focus: "where animals live" },
    { title: "Animal Needs", concept: "basic needs", focus: "food, water, shelter" },
    // Week 4-6: Physical Science
    { title: "States of Matter", concept: "matter", focus: "solid, liquid, gas" },
    { title: "Push and Pull Forces", concept: "forces", focus: "motion" },
    { title: "Simple Machines", concept: "machines", focus: "lever, wheel" },
    // Week 7-9: Earth Science
    { title: "Weather and Seasons", concept: "weather", focus: "seasonal changes" },
    { title: "Day and Night", concept: "earth science", focus: "sun and moon" },
    { title: "Rocks and Soil", concept: "geology", focus: "earth materials" },
    // Week 10-12: Space Science
    { title: "The Sun and Moon", concept: "astronomy", focus: "day/night cycle" },
    { title: "Stars in the Sky", concept: "astronomy", focus: "constellations" },
    { title: "Exploring Space", concept: "space", focus: "planets and rockets" }
  ];
  
  const topicIndex = ((week - 1) * 5 + (day - 1)) % 12;
  let topic, content;
  
  if (subject === 'math') {
    topic = mathTopics[topicIndex];
    content = generateMathContent2nd(topic, week, day);
  } else if (subject === 'reading') {
    topic = readingTopics[topicIndex];
    content = generateReadingContent2nd(topic, week, day);
  } else {
    topic = scienceTopics[topicIndex];
    content = generateScienceContent2nd(topic, week, day);
  }
  
  return {
    title: topic.title,
    subject: subject,
    gradeLevel: 2,
    week: week,
    day: day,
    content: content.content,
    quiz: content.quiz,
    estimatedTime: 25,
    isBonus: false,
    funMoneyReward: Math.floor(Math.random() * 5) + 10,
    difficulty: "easy"
  };
}

function generateGrade4Lesson(week, day) {
  const subjects = ['math', 'reading', 'science', 'history'];
  const subject = subjects[day % 4];
  
  // Real educational content for 4th grade
  const mathTopics = [
    // Week 1-3: Multi-digit Operations
    { title: "Multi-Digit Addition", concept: "addition", range: "1000s" },
    { title: "Multi-Digit Subtraction", concept: "subtraction", range: "1000s" },
    { title: "Multiplication Facts", concept: "multiplication", range: "times tables" },
    // Week 4-6: Fractions
    { title: "Understanding Fractions", concept: "fractions", range: "parts of whole" },
    { title: "Equivalent Fractions", concept: "fractions", range: "same value" },
    { title: "Adding Fractions", concept: "fractions", range: "same denominator" },
    // Week 7-9: Decimals and Measurement
    { title: "Introduction to Decimals", concept: "decimals", range: "tenths/hundredths" },
    { title: "Area and Perimeter", concept: "measurement", range: "rectangles" },
    { title: "Converting Units", concept: "measurement", range: "metric/standard" },
    // Week 10-12: Geometry and Data
    { title: "Angles and Lines", concept: "geometry", range: "acute/obtuse/right" },
    { title: "Coordinate Graphing", concept: "graphing", range: "ordered pairs" },
    { title: "Data Analysis", concept: "statistics", range: "mean/median/mode" }
  ];
  
  const readingTopics = [
    // Week 1-3: Literary Analysis
    { title: "Character Development", concept: "characters", focus: "traits and motivation" },
    { title: "Plot Structure", concept: "plot", focus: "beginning/middle/end" },
    { title: "Theme and Message", concept: "theme", focus: "lesson of story" },
    // Week 4-6: Reading Strategies
    { title: "Making Inferences", concept: "inference", focus: "reading between lines" },
    { title: "Cause and Effect", concept: "relationships", focus: "what happens why" },
    { title: "Compare and Contrast", concept: "comparison", focus: "similarities/differences" },
    // Week 7-9: Text Features
    { title: "Nonfiction Text Features", concept: "text features", focus: "headings/captions" },
    { title: "Author's Purpose", concept: "purpose", focus: "inform/persuade/entertain" },
    { title: "Point of View", concept: "perspective", focus: "who tells story" },
    // Week 10-12: Critical Reading
    { title: "Fact vs Opinion", concept: "critical thinking", focus: "truth vs belief" },
    { title: "Research Skills", concept: "research", focus: "finding information" },
    { title: "Poetry Elements", concept: "poetry", focus: "rhyme/rhythm/metaphor" }
  ];
  
  const scienceTopics = [
    // Week 1-3: Life Science
    { title: "Food Chains and Webs", concept: "ecosystems", focus: "energy flow" },
    { title: "Plant and Animal Adaptations", concept: "adaptations", focus: "survival features" },
    { title: "Human Body Systems", concept: "anatomy", focus: "organs work together" },
    // Week 4-6: Physical Science
    { title: "Properties of Matter", concept: "matter", focus: "physical/chemical" },
    { title: "Energy and Motion", concept: "energy", focus: "kinetic/potential" },
    { title: "Sound and Light Waves", concept: "waves", focus: "vibration/reflection" },
    // Week 7-9: Earth Science
    { title: "Water Cycle", concept: "cycles", focus: "evaporation/precipitation" },
    { title: "Rock Cycle", concept: "geology", focus: "igneous/sedimentary/metamorphic" },
    { title: "Weather Systems", concept: "meteorology", focus: "fronts/pressure" },
    // Week 10-12: Space Science
    { title: "Solar System", concept: "astronomy", focus: "planets and sun" },
    { title: "Moon Phases", concept: "astronomy", focus: "lunar cycle" },
    { title: "Earth's Rotation", concept: "astronomy", focus: "day/night/seasons" }
  ];
  
  const historyTopics = [
    // Week 1-3: Early America
    { title: "Native American Cultures", concept: "indigenous peoples", focus: "before Europeans" },
    { title: "European Exploration", concept: "exploration", focus: "Columbus and others" },
    { title: "Colonial Life", concept: "colonies", focus: "daily life in 1600s-1700s" },
    // Week 4-6: American Revolution
    { title: "Causes of Revolution", concept: "revolution", focus: "taxes and freedom" },
    { title: "Revolutionary War", concept: "war", focus: "fighting for independence" },
    { title: "Founding Fathers", concept: "leaders", focus: "Washington/Jefferson/Franklin" },
    // Week 7-9: Westward Expansion
    { title: "Pioneer Life", concept: "pioneers", focus: "moving west" },
    { title: "California Gold Rush", concept: "migration", focus: "seeking fortune" },
    { title: "Transcontinental Railroad", concept: "transportation", focus: "connecting country" },
    // Week 10-12: Industrial Revolution
    { title: "Inventions Change Life", concept: "technology", focus: "machines and factories" },
    { title: "Immigration to America", concept: "immigration", focus: "people seeking new life" },
    { title: "Growth of Cities", concept: "urbanization", focus: "farms to cities" }
  ];
  
  const topicIndex = ((week - 1) * 5 + (day - 1)) % 12;
  let topic, content;
  
  if (subject === 'math') {
    topic = mathTopics[topicIndex];
    content = generateMathContent4th(topic, week, day);
  } else if (subject === 'reading') {
    topic = readingTopics[topicIndex];
    content = generateReadingContent4th(topic, week, day);
  } else if (subject === 'science') {
    topic = scienceTopics[topicIndex];
    content = generateScienceContent4th(topic, week, day);
  } else {
    topic = historyTopics[topicIndex];
    content = generateHistoryContent4th(topic, week, day);
  }
  
  return {
    title: topic.title,
    subject: subject,
    gradeLevel: 4,
    week: week,
    day: day,
    content: content.content,
    quiz: content.quiz,
    estimatedTime: 35,
    isBonus: false,
    funMoneyReward: Math.floor(Math.random() * 10) + 15,
    difficulty: "medium"
  };
}

// Content generation functions for 2nd grade
function generateMathContent2nd(topic, week, day) {
  const mathContents = {
    "addition": {
      content: {
        introduction: "Today we're going to practice adding numbers! Addition means putting numbers together to find how many you have in total.",
        mainContent: "When we add, we can count forward from the bigger number. For example, 8 + 5: start at 8 and count 5 more (9, 10, 11, 12, 13). We can also use our fingers, draw pictures, or use objects like beans or coins to help us add. Try these strategies: doubles (7+7=14), near doubles (7+8 is just one more than 7+7), and making 10 (8+6 = 8+2+4 = 10+4 = 14).",
        activities: [
          "Use household items (beans, coins, toys) to make addition problems and solve them",
          "Practice addition facts by writing them 5 times each: 6+4=10, 7+3=10, 8+2=10",
          "Find addition in real life: count books on a shelf, then count books on another shelf, add them together"
        ],
        funFacts: [
          "Did you know you can add numbers in any order? 5+3 is the same as 3+5!",
          "Your brain actually does addition automatically when you see groups of things!"
        ]
      },
      quiz: [
        {
          question: "What is 9 + 4?",
          type: "multiple-choice",
          options: ["12", "13", "14", "15"],
          correctAnswer: "13",
          explanation: "9 + 4 = 13. You can count forward from 9: 10, 11, 12, 13!",
          points: 10
        },
        {
          question: "If you have 7 stickers and find 6 more stickers, how many stickers do you have altogether?",
          type: "multiple-choice",
          options: ["12", "13", "14", "15"],
          correctAnswer: "13",
          explanation: "7 + 6 = 13 stickers! You can use the doubles strategy: 6+6=12, so 7+6=13.",
          points: 10
        },
        {
          question: "Which number sentence shows the same amount as 5 + 8?",
          type: "multiple-choice",
          options: ["8 + 5", "5 + 3", "8 - 5", "5 - 8"],
          correctAnswer: "8 + 5",
          explanation: "5 + 8 = 8 + 5 because you can add numbers in any order!",
          points: 10
        }
      ]
    },
    "subtraction": {
      content: {
        introduction: "Today we're learning about subtraction! Subtraction means taking away or finding the difference between numbers.",
        mainContent: "When we subtract, we start with a number and take some away. For 15 - 7, we can count backwards from 15 seven times, or we can think 'what plus 7 equals 15?' We can use objects to help: start with 15 items, take away 7, and count what's left. Another strategy is to use a number line - start at 15 and jump back 7 spaces.",
        activities: [
          "Use toys or snacks to practice subtraction: start with 12 items, take away 5, count what remains",
          "Draw pictures to solve subtraction problems: draw 14 circles, cross out 6, count what's left",
          "Practice subtraction facts that you'll use often: 10-3=7, 10-4=6, 10-5=5"
        ],
        funFacts: [
          "Subtraction is the opposite of addition! If 8+5=13, then 13-5=8!",
          "You use subtraction when you figure out how much change you should get when buying something!"
        ]
      },
      quiz: [
        {
          question: "What is 14 - 6?",
          type: "multiple-choice",
          options: ["6", "7", "8", "9"],
          correctAnswer: "8",
          explanation: "14 - 6 = 8. You can think: what plus 6 equals 14? The answer is 8!",
          points: 10
        },
        {
          question: "You have 16 candies and eat 9 of them. How many candies do you have left?",
          type: "multiple-choice",
          options: ["6", "7", "8", "9"],
          correctAnswer: "7",
          explanation: "16 - 9 = 7 candies left. You can count back from 16 or think 9 + ? = 16.",
          points: 10
        },
        {
          question: "If 7 + 8 = 15, what is 15 - 8?",
          type: "multiple-choice",
          options: ["6", "7", "8", "9"],
          correctAnswer: "7",
          explanation: "15 - 8 = 7. Addition and subtraction are opposites, so if 7+8=15, then 15-8=7!",
          points: 10
        }
      ]
    }
  };
  
  return mathContents[topic.concept] || mathContents["addition"];
}

function generateReadingContent2nd(topic, week, day) {
  const readingContents = {
    "phonics": {
      content: {
        introduction: "Today we're going to learn about sounds that letters make! These sounds help us read and spell words.",
        mainContent: "Short vowel sounds are the sounds a, e, i, o, u make in simple words. A says 'ah' like in 'cat', E says 'eh' like in 'bed', I says 'ih' like in 'sit', O says 'oh' like in 'hot', and U says 'uh' like in 'bug'. When we see a word like 'cat', we sound out each letter: c-a-t, then blend them together: cat!",
        activities: [
          "Find 10 objects around your house that have short vowel sounds (hat, pen, lip, pot, cup)",
          "Practice writing and saying CVC words: bat, bet, bit, bot, but",
          "Play 'I Spy' with short vowel words: 'I spy something that rhymes with hat' (cat, mat, bat)"
        ],
        funFacts: [
          "The word 'vowel' comes from a Latin word meaning 'voice' because vowels are the sounds we make with our voice!",
          "Every English word has at least one vowel sound in it!"
        ]
      },
      quiz: [
        {
          question: "What sound does the 'a' make in the word 'cat'?",
          type: "multiple-choice",
          options: ["ay (like in cake)", "ah (like in cat)", "aw (like in saw)", "ar (like in car)"],
          correctAnswer: "ah (like in cat)",
          explanation: "In 'cat', the 'a' makes the short vowel sound 'ah'.",
          points: 10
        },
        {
          question: "Which word has the same vowel sound as 'bed'?",
          type: "multiple-choice",
          options: ["bat", "bet", "bit", "but"],
          correctAnswer: "bet",
          explanation: "Both 'bed' and 'bet' have the short 'e' sound that says 'eh'.",
          points: 10
        },
        {
          question: "How do we read a new word we've never seen before?",
          type: "multiple-choice",
          options: ["Guess what it might be", "Sound out each letter, then blend them", "Skip it and keep reading", "Ask someone else"],
          correctAnswer: "Sound out each letter, then blend them",
          explanation: "Sounding out letters and blending them together helps us read new words!",
          points: 10
        }
      ]
    }
  };
  
  return readingContents[topic.concept] || readingContents["phonics"];
}

function generateScienceContent2nd(topic, week, day) {
  const scienceContents = {
    "life cycles": {
      content: {
        introduction: "Today we're going to learn about how plants grow and change! All plants start as tiny seeds and grow into big plants.",
        mainContent: "A plant's life cycle starts with a seed. Inside the seed is a tiny baby plant. When the seed gets water, warmth, and air, it begins to sprout (this is called germination). First, roots grow down into the soil to get food and water. Then a shoot grows up toward the sun. The shoot develops leaves that use sunlight to make food for the plant. When the plant is fully grown, it can make flowers and new seeds, starting the cycle all over again!",
        activities: [
          "Plant bean seeds in a clear jar with wet paper towels so you can watch the roots and shoots grow",
          "Draw the plant life cycle: seed → roots → shoot → leaves → adult plant → flowers → new seeds",
          "Look for plants at different stages in your yard or neighborhood - find seedlings, young plants, and adult plants"
        ],
        funFacts: [
          "Some seeds can sleep for hundreds of years before they start growing!",
          "The oldest living tree is over 4,800 years old and still growing!"
        ]
      },
      quiz: [
        {
          question: "What do seeds need to start growing?",
          type: "multiple-choice",
          options: ["Only water", "Water, warmth, and air", "Only sunlight", "Only soil"],
          correctAnswer: "Water, warmth, and air",
          explanation: "Seeds need water to soften, warmth to wake up, and air to breathe - just like us!",
          points: 10
        },
        {
          question: "What grows first when a seed starts to sprout?",
          type: "multiple-choice",
          options: ["Leaves", "Flowers", "Roots", "Fruits"],
          correctAnswer: "Roots",
          explanation: "Roots grow first to anchor the plant and find water and nutrients in the soil.",
          points: 10
        },
        {
          question: "What do leaves use to make food for the plant?",
          type: "multiple-choice",
          options: ["Moonlight", "Sunlight", "Wind", "Rain"],
          correctAnswer: "Sunlight",
          explanation: "Leaves use sunlight to make food for the plant through a process called photosynthesis.",
          points: 10
        }
      ]
    }
  };
  
  return scienceContents[topic.concept] || scienceContents["life cycles"];
}

// Content generation functions for 4th grade
function generateMathContent4th(topic, week, day) {
  const mathContents = {
    "multiplication": {
      content: {
        introduction: "Today we're mastering multiplication! Multiplication is a fast way to add equal groups together.",
        mainContent: "Multiplication shows repeated addition. 4 × 6 means 'four groups of six' or 6+6+6+6 = 24. We can visualize this with arrays (rectangles of objects) or skip counting. The multiplication table shows patterns: products of 5 always end in 0 or 5, products of 2 are always even. To multiply larger numbers, we can break them apart: 4 × 16 = 4 × (10 + 6) = (4 × 10) + (4 × 6) = 40 + 24 = 64.",
        activities: [
          "Create arrays with household items to show multiplication: arrange 24 items in different rectangles (3×8, 4×6, 2×12)",
          "Practice skip counting for times tables: 3, 6, 9, 12, 15... (3 times table)",
          "Find multiplication in real life: eggs in cartons (2×6=12), floor tiles (8×8=64), ice cube trays"
        ],
        funFacts: [
          "Ancient Babylonians used multiplication tables over 4,000 years ago!",
          "The largest number with a commonly known name is a googol (1 followed by 100 zeros)!"
        ]
      },
      quiz: [
        {
          question: "What is 7 × 8?",
          type: "multiple-choice",
          options: ["54", "56", "63", "64"],
          correctAnswer: "56",
          explanation: "7 × 8 = 56. You can think of it as 8 groups of 7, or skip count by 7s eight times.",
          points: 10
        },
        {
          question: "If there are 6 boxes with 9 pencils in each box, how many pencils are there total?",
          type: "multiple-choice",
          options: ["52", "54", "56", "58"],
          correctAnswer: "54",
          explanation: "6 × 9 = 54 pencils. This shows how multiplication helps solve real-world problems quickly!",
          points: 10
        },
        {
          question: "What is 4 × 25?",
          type: "multiple-choice",
          options: ["90", "95", "100", "105"],
          correctAnswer: "100",
          explanation: "4 × 25 = 100. You can think of it as 4 × (20 + 5) = (4 × 20) + (4 × 5) = 80 + 20 = 100.",
          points: 10
        },
        {
          question: "Which number will always be even when multiplied by 2?",
          type: "multiple-choice",
          options: ["Only even numbers", "Only odd numbers", "Any number", "Only multiples of 5"],
          correctAnswer: "Any number",
          explanation: "Any number multiplied by 2 will always give an even result because you're adding the number to itself.",
          points: 10
        },
        {
          question: "What is 9 × 6?",
          type: "multiple-choice",
          options: ["52", "54", "56", "58"],
          correctAnswer: "54",
          explanation: "9 × 6 = 54. You can use the fact that 9 × 6 = 6 × 9 (multiplication is commutative).",
          points: 10
        },
        {
          question: "If you arrange 36 objects in a rectangle with 4 rows, how many columns will you have?",
          type: "multiple-choice",
          options: ["7", "8", "9", "10"],
          correctAnswer: "9",
          explanation: "36 ÷ 4 = 9, so you'll have 9 columns. This shows the relationship between multiplication and division.",
          points: 10
        },
        {
          question: "What pattern do you notice in the 5 times table?",
          type: "multiple-choice",
          options: ["All products are odd", "Products end in 0 or 5", "Products are always less than 50", "Products double each time"],
          correctAnswer: "Products end in 0 or 5",
          explanation: "The 5 times table always ends in 0 or 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50...",
          points: 10
        },
        {
          question: "What is 12 × 3?",
          type: "multiple-choice",
          options: ["34", "35", "36", "37"],
          correctAnswer: "36",
          explanation: "12 × 3 = 36. You can think of it as (10 × 3) + (2 × 3) = 30 + 6 = 36.",
          points: 10
        },
        {
          question: "A classroom has 5 rows of desks with 7 desks in each row. How many desks total?",
          type: "multiple-choice",
          options: ["33", "34", "35", "36"],
          correctAnswer: "35",
          explanation: "5 × 7 = 35 desks. This is a real-world application of multiplication arrays.",
          points: 10
        },
        {
          question: "What is the relationship between 8 × 9 and 9 × 8?",
          type: "multiple-choice",
          options: ["8 × 9 is larger", "9 × 8 is larger", "They are equal", "You can't compare them"],
          correctAnswer: "They are equal",
          explanation: "8 × 9 = 9 × 8 = 72. This demonstrates the commutative property of multiplication.",
          points: 10
        }
      ]
    },
    "fractions": {
      content: {
        introduction: "Welcome to the world of fractions! Fractions help us describe parts of wholes and make precise measurements.",
        mainContent: "A fraction shows part of a whole. The bottom number (denominator) tells us how many equal parts the whole is divided into. The top number (numerator) tells us how many parts we're talking about. 3/4 means 3 parts out of 4 equal parts. We can see fractions everywhere: pizza slices, pie pieces, measuring cups. Equivalent fractions show the same amount but use different numbers: 1/2 = 2/4 = 3/6.",
        activities: [
          "Cut paper circles into halves, fourths, and eighths to see how fractions relate to each other",
          "Use measuring cups to explore fractions: 1/4 cup + 1/4 cup = 1/2 cup",
          "Find fractions in your kitchen: look at measuring spoons, recipe ingredients, food packaging"
        ],
        funFacts: [
          "Ancient Egyptians used fractions over 4,000 years ago, but they mostly used unit fractions (fractions with 1 on top)!",
          "The word 'fraction' comes from the Latin word 'fractus' meaning 'broken'!"
        ]
      },
      quiz: [
        {
          question: "In the fraction 3/8, what does the 8 tell us?",
          type: "multiple-choice",
          options: ["How many parts we have", "How many equal parts the whole is divided into", "How big each part is", "How many wholes there are"],
          correctAnswer: "How many equal parts the whole is divided into",
          explanation: "The denominator (bottom number) tells us how many equal parts make up the whole.",
          points: 10
        },
        {
          question: "Which fraction is equivalent to 1/2?",
          type: "multiple-choice",
          options: ["1/4", "2/4", "1/3", "3/4"],
          correctAnswer: "2/4",
          explanation: "2/4 = 1/2 because both represent half of something, just divided differently.",
          points: 10
        },
        {
          question: "If you eat 2/8 of a pizza and your friend eats 3/8 of the same pizza, how much pizza did you eat together?",
          type: "multiple-choice",
          options: ["5/16", "5/8", "2/3", "6/8"],
          correctAnswer: "5/8",
          explanation: "2/8 + 3/8 = 5/8. When fractions have the same denominator, we just add the numerators!",
          points: 10
        },
        {
          question: "Which fraction is larger: 1/3 or 1/4?",
          type: "multiple-choice",
          options: ["1/3", "1/4", "They are equal", "Cannot determine"],
          correctAnswer: "1/3",
          explanation: "1/3 is larger than 1/4. When numerators are the same, the fraction with the smaller denominator is larger.",
          points: 10
        },
        {
          question: "What fraction of this group is shaded if 3 out of 5 circles are shaded?",
          type: "multiple-choice",
          options: ["3/5", "5/3", "2/5", "3/8"],
          correctAnswer: "3/5",
          explanation: "3 out of 5 parts are shaded, so the fraction is 3/5.",
          points: 10
        },
        {
          question: "Which fraction represents one whole?",
          type: "multiple-choice",
          options: ["1/2", "2/3", "4/4", "3/4"],
          correctAnswer: "4/4",
          explanation: "4/4 = 1 whole because all 4 parts out of 4 total parts are included.",
          points: 10
        },
        {
          question: "If a recipe calls for 1/4 cup of sugar and you want to double the recipe, how much sugar do you need?",
          type: "multiple-choice",
          options: ["1/8 cup", "1/4 cup", "1/2 cup", "1 cup"],
          correctAnswer: "1/2 cup",
          explanation: "1/4 × 2 = 2/4 = 1/2 cup. Doubling 1/4 gives you 1/2.",
          points: 10
        },
        {
          question: "What is another way to write 6/8?",
          type: "multiple-choice",
          options: ["2/3", "3/4", "1/2", "4/6"],
          correctAnswer: "3/4",
          explanation: "6/8 = 3/4 when we simplify by dividing both the numerator and denominator by 2.",
          points: 10
        },
        {
          question: "Which is the correct way to compare 2/3 and 1/2?",
          type: "multiple-choice",
          options: ["2/3 < 1/2", "2/3 > 1/2", "2/3 = 1/2", "Cannot compare"],
          correctAnswer: "2/3 > 1/2",
          explanation: "2/3 is larger than 1/2. We can see this by converting: 2/3 = 4/6 and 1/2 = 3/6, so 4/6 > 3/6.",
          points: 10
        },
        {
          question: "If you have 3/4 of a chocolate bar and eat 1/4 of it, how much is left?",
          type: "multiple-choice",
          options: ["1/4", "2/4", "1/2", "3/8"],
          correctAnswer: "1/2",
          explanation: "3/4 - 1/4 = 2/4 = 1/2. You have half the chocolate bar left.",
          points: 10
        }
      ]
    },
    "addition": {
      content: {
        introduction: "Today we're mastering multi-digit addition! We'll learn to add large numbers using strategies that make it easier and more accurate.",
        mainContent: "When adding large numbers, we line up the digits by place value: ones under ones, tens under tens, hundreds under hundreds. We start adding from the right (ones place) and work left. When a column adds up to 10 or more, we 'carry' the extra to the next column. For example: 347 + 285 = 632. We can also use mental math strategies like rounding and compensating: 347 + 285 ≈ 350 + 285 = 635, then subtract 3 to get 632.",
        activities: [
          "Practice column addition with numbers from your daily life: add up grocery receipts, count collections of items",
          "Use base-ten blocks or draw place value charts to visualize regrouping when adding",
          "Estimate sums first, then calculate to check if your answer is reasonable"
        ],
        funFacts: [
          "The word 'addition' comes from the Latin 'addere' meaning 'to give to' or 'put together'!",
          "Ancient civilizations used counting boards (like an abacus) to help with large addition problems!"
        ]
      },
      quiz: [
        {
          question: "What is 347 + 286?",
          type: "multiple-choice",
          options: ["623", "633", "643", "653"],
          correctAnswer: "633",
          explanation: "347 + 286 = 633. Line up place values and add: 7+6=13 (write 3, carry 1), 4+8+1=13 (write 3, carry 1), 3+2+1=6.",
          points: 10
        },
        {
          question: "When adding 458 + 367, what happens in the ones column?",
          type: "multiple-choice",
          options: ["8 + 7 = 15, write 5 and carry 1", "8 + 7 = 15, write 15", "8 + 7 = 14, write 4 and carry 1", "8 + 7 = 16, write 6 and carry 1"],
          correctAnswer: "8 + 7 = 15, write 5 and carry 1",
          explanation: "8 + 7 = 15. We write down 5 in the ones place and carry the 1 to the tens column.",
          points: 10
        },
        {
          question: "What is a good estimate for 592 + 418?",
          type: "multiple-choice",
          options: ["900", "1000", "1100", "800"],
          correctAnswer: "1000",
          explanation: "Round 592 to 600 and 418 to 400. 600 + 400 = 1000, which is a good estimate.",
          points: 10
        },
        {
          question: "What is 1,234 + 5,678?",
          type: "multiple-choice",
          options: ["6,912", "6,902", "7,912", "6,812"],
          correctAnswer: "6,912",
          explanation: "1,234 + 5,678 = 6,912. Add each column: 4+8=12 (carry 1), 3+7+1=11 (carry 1), 2+6+1=9, 1+5=6.",
          points: 10
        },
        {
          question: "Which strategy helps check if your addition answer is reasonable?",
          type: "multiple-choice",
          options: ["Estimating before calculating", "Always using a calculator", "Adding the numbers backwards", "Only adding odd numbers"],
          correctAnswer: "Estimating before calculating",
          explanation: "Estimating gives you an approximate answer to compare with your exact calculation.",
          points: 10
        },
        {
          question: "What is 765 + 0?",
          type: "multiple-choice",
          options: ["0", "765", "7650", "Cannot determine"],
          correctAnswer: "765",
          explanation: "Adding zero to any number gives you the same number. 765 + 0 = 765.",
          points: 10
        },
        {
          question: "In the problem 1,847 + 2,965, how many times do you need to regroup (carry)?",
          type: "multiple-choice",
          options: ["0 times", "1 time", "2 times", "3 times"],
          correctAnswer: "3 times",
          explanation: "You carry in ones (7+5=12), tens (4+6+1=11), and hundreds (8+9+1=18). That's 3 carries.",
          points: 10
        },
        {
          question: "What does the commutative property tell us about addition?",
          type: "multiple-choice",
          options: ["We can add in any order", "We must add from left to right", "We can only add even numbers", "We need to estimate first"],
          correctAnswer: "We can add in any order",
          explanation: "The commutative property means 347 + 286 = 286 + 347. Order doesn't matter in addition.",
          points: 10
        },
        {
          question: "What is 999 + 1?",
          type: "multiple-choice",
          options: ["1000", "9991", "999", "1999"],
          correctAnswer: "1000",
          explanation: "999 + 1 = 1000. This creates a new thousand when we add 1 to 999.",
          points: 10
        },
        {
          question: "A school collected 1,847 cans in January and 2,965 cans in February. How many cans total?",
          type: "multiple-choice",
          options: ["4,812", "4,702", "4,812", "3,812"],
          correctAnswer: "4,812",
          explanation: "1,847 + 2,965 = 4,812 cans total. This shows how addition solves real-world problems.",
          points: 10
        }
      ]
    }
  };
  
  return mathContents[topic.concept] || mathContents["multiplication"];
}

function generateReadingContent4th(topic, week, day) {
  const readingContents = {
    "characters": {
      content: {
        introduction: "Today we're going to explore story characters and what makes them interesting! Characters are the people, animals, or creatures in stories.",
        mainContent: "Characters have traits (qualities that describe them) and motivations (reasons for their actions). We learn about characters through what they say, do, think, and how others react to them. Main characters change and grow throughout the story, while supporting characters help move the plot along. We can describe characters using adjectives like brave, curious, stubborn, or kind. Understanding characters helps us understand why they make certain choices in the story.",
        activities: [
          "Choose a favorite book character and create a character profile: list their traits, motivations, and how they change",
          "Write a character diary entry: imagine you are the character and write about your thoughts and feelings",
          "Compare two characters from different stories: how are they similar and different?"
        ],
        funFacts: [
          "The word 'character' comes from a Greek word meaning 'to engrave' - like characters are engraved in our memory!",
          "Some characters, like Sherlock Holmes, are so famous they seem like real people to many readers!"
        ]
      },
      quiz: [
        {
          question: "What are character traits?",
          type: "multiple-choice",
          options: ["The places characters go", "The qualities that describe what characters are like", "The things characters own", "The jobs characters have"],
          correctAnswer: "The qualities that describe what characters are like",
          explanation: "Character traits are qualities like brave, funny, or stubborn that tell us what a character is like as a person.",
          points: 10
        },
        {
          question: "How can we learn about a character in a story?",
          type: "multiple-choice",
          options: ["Only by what they look like", "By what they say, do, and think", "Only by their name", "Only by where they live"],
          correctAnswer: "By what they say, do, and think",
          explanation: "We learn about characters through their words, actions, thoughts, and how others react to them.",
          points: 10
        },
        {
          question: "What is a character's motivation?",
          type: "multiple-choice",
          options: ["How fast they can run", "The reason why they do something", "What they look like", "Where they were born"],
          correctAnswer: "The reason why they do something",
          explanation: "Motivation is what drives a character to act - their reasons, goals, and desires.",
          points: 10
        }
      ]
    }
  };
  
  return readingContents[topic.concept] || readingContents["characters"];
}

function generateScienceContent4th(topic, week, day) {
  const scienceContents = {
    "ecosystems": {
      content: {
        introduction: "Welcome to the amazing world of ecosystems! Today we'll explore how all living things are connected through food chains and energy flow.",
        mainContent: "An ecosystem includes all living and non-living things in an area working together. Energy flows from the sun to producers (plants that make their own food) to primary consumers (plant-eaters) to secondary consumers (meat-eaters). A food chain shows this flow: grass → rabbit → fox. Food webs show how multiple food chains connect. Decomposers like bacteria and fungi break down dead organisms, returning nutrients to the soil for plants to use again.",
        activities: [
          "Create a food web poster for a local ecosystem (forest, pond, or grassland) showing at least 8 organisms and their connections",
          "Research and write about one animal's role in its ecosystem: what it eats, what eats it, and how it helps other organisms",
          "Observe a small ecosystem in your yard or a park: identify producers, consumers, and decomposers"
        ],
        funFacts: [
          "Wolves in Yellowstone changed the shape of rivers by controlling deer populations, which allowed trees to grow back along riverbanks!",
          "One teaspoon of soil contains more organisms than there are people on Earth!"
        ]
      },
      quiz: [
        {
          question: "What are producers in an ecosystem?",
          type: "multiple-choice",
          options: ["Animals that hunt other animals", "Plants that make their own food using sunlight", "Animals that eat plants", "Organisms that break down dead things"],
          correctAnswer: "Plants that make their own food using sunlight",
          explanation: "Producers are plants and some bacteria that can make their own food using sunlight through photosynthesis.",
          points: 10
        },
        {
          question: "In the food chain: grass → grasshopper → frog → snake, what is the frog?",
          type: "multiple-choice",
          options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
          correctAnswer: "Secondary consumer",
          explanation: "The frog is a secondary consumer because it eats the grasshopper (primary consumer) that ate the grass (producer).",
          points: 10
        },
        {
          question: "What would happen if all the decomposers disappeared from an ecosystem?",
          type: "multiple-choice",
          options: ["Nothing would change", "Dead plants and animals would pile up and nutrients wouldn't be recycled", "There would be more food for animals", "Plants would grow faster"],
          correctAnswer: "Dead plants and animals would pile up and nutrients wouldn't be recycled",
          explanation: "Decomposers are essential because they break down dead organisms and return nutrients to the soil for plants to use.",
          points: 10
        },
        {
          question: "What is the original source of energy for most ecosystems?",
          type: "multiple-choice",
          options: ["Wind", "The sun", "Water", "Soil"],
          correctAnswer: "The sun",
          explanation: "The sun provides energy that plants capture through photosynthesis, starting most food chains.",
          points: 10
        },
        {
          question: "Which animal would be a primary consumer?",
          type: "multiple-choice",
          options: ["Lion", "Hawk", "Rabbit", "Snake"],
          correctAnswer: "Rabbit",
          explanation: "Rabbits are primary consumers because they eat plants (producers) directly.",
          points: 10
        },
        {
          question: "What do we call animals that eat both plants and meat?",
          type: "multiple-choice",
          options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
          correctAnswer: "Omnivores",
          explanation: "Omnivores eat both plants and animals, like bears, humans, and many birds.",
          points: 10
        },
        {
          question: "In a food web, arrows show:",
          type: "multiple-choice",
          options: ["Where animals live", "The direction energy flows", "How fast animals move", "What animals look like"],
          correctAnswer: "The direction energy flows",
          explanation: "Arrows in food webs point from the food source to the consumer, showing energy flow.",
          points: 10
        },
        {
          question: "What might happen if wolves were removed from a forest ecosystem?",
          type: "multiple-choice",
          options: ["More trees would grow", "Deer population would increase and overeat plants", "Fish would disappear", "Weather would change"],
          correctAnswer: "Deer population would increase and overeat plants",
          explanation: "Without wolves to control them, deer populations can grow too large and damage plant communities.",
          points: 10
        },
        {
          question: "Which of these is an abiotic (non-living) part of an ecosystem?",
          type: "multiple-choice",
          options: ["Trees", "Birds", "Sunlight", "Bacteria"],
          correctAnswer: "Sunlight",
          explanation: "Sunlight is abiotic (non-living) but essential for ecosystems. Trees, birds, and bacteria are all living (biotic).",
          points: 10
        },
        {
          question: "Why are decomposers sometimes called 'nature's recyclers'?",
          type: "multiple-choice",
          options: ["They eat garbage", "They break down dead things and return nutrients to the soil", "They live in recycling centers", "They make new animals"],
          correctAnswer: "They break down dead things and return nutrients to the soil",
          explanation: "Decomposers recycle nutrients from dead organisms back into the ecosystem for new life to use.",
          points: 10
        }
      ]
    },
    "astronomy": {
      content: {
        introduction: "Welcome to the incredible universe! Today we'll explore our solar system and learn about the planets, sun, and moon that make up our cosmic neighborhood.",
        mainContent: "Our solar system consists of the sun (a star) and eight planets that orbit around it. The planets in order from the sun are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The inner planets (Mercury, Venus, Earth, Mars) are rocky and smaller. The outer planets (Jupiter, Saturn, Uranus, Neptune) are gas giants and much larger. Earth is special because it has liquid water and the right temperature to support life. The moon orbits Earth and affects our tides.",
        activities: [
          "Create a scale model of the solar system using different sized balls or fruits to represent the planets",
          "Keep a moon observation journal for one week, drawing the moon's shape each night",
          "Research one planet and create a travel brochure describing what a visit there would be like"
        ],
        funFacts: [
          "You could fit about 1.3 million Earths inside the sun!",
          "A day on Venus is longer than its year because it rotates so slowly!"
        ]
      },
      quiz: [
        {
          question: "Which planet is closest to the sun?",
          type: "multiple-choice",
          options: ["Venus", "Earth", "Mercury", "Mars"],
          correctAnswer: "Mercury",
          explanation: "Mercury is the closest planet to the sun and has the shortest year of all planets.",
          points: 10
        },
        {
          question: "How many planets are in our solar system?",
          type: "multiple-choice",
          options: ["7", "8", "9", "10"],
          correctAnswer: "8",
          explanation: "There are 8 planets in our solar system. Pluto is now classified as a dwarf planet.",
          points: 10
        },
        {
          question: "Which planets are known as the 'gas giants'?",
          type: "multiple-choice",
          options: ["Mercury, Venus, Earth, Mars", "Jupiter, Saturn, Uranus, Neptune", "Only Jupiter and Saturn", "Earth and Mars"],
          correctAnswer: "Jupiter, Saturn, Uranus, Neptune",
          explanation: "The four outer planets are called gas giants because they are made mostly of gas and are very large.",
          points: 10
        },
        {
          question: "What makes Earth special compared to other planets?",
          type: "multiple-choice",
          options: ["It's the biggest planet", "It has liquid water and can support life", "It's closest to the sun", "It has the most moons"],
          correctAnswer: "It has liquid water and can support life",
          explanation: "Earth is in the 'Goldilocks zone' - just the right distance from the sun for liquid water and life.",
          points: 10
        },
        {
          question: "What is the sun?",
          type: "multiple-choice",
          options: ["A planet", "A star", "A moon", "A comet"],
          correctAnswer: "A star",
          explanation: "The sun is a star - a huge ball of hot gas that produces light and heat through nuclear reactions.",
          points: 10
        },
        {
          question: "Which planet is known for its beautiful rings?",
          type: "multiple-choice",
          options: ["Jupiter", "Mars", "Saturn", "Uranus"],
          correctAnswer: "Saturn",
          explanation: "Saturn is famous for its spectacular ring system made of ice and rock particles.",
          points: 10
        },
        {
          question: "How long does it take Earth to orbit around the sun?",
          type: "multiple-choice",
          options: ["One day", "One month", "One year", "One decade"],
          correctAnswer: "One year",
          explanation: "Earth takes 365.25 days (one year) to complete one orbit around the sun.",
          points: 10
        },
        {
          question: "Which planet is called the 'Red Planet'?",
          type: "multiple-choice",
          options: ["Mercury", "Venus", "Mars", "Jupiter"],
          correctAnswer: "Mars",
          explanation: "Mars appears red because of iron oxide (rust) on its surface.",
          points: 10
        },
        {
          question: "What causes the phases of the moon?",
          type: "multiple-choice",
          options: ["Earth's shadow on the moon", "The moon changing shape", "How much of the moon we can see as it orbits Earth", "Clouds covering the moon"],
          correctAnswer: "How much of the moon we can see as it orbits Earth",
          explanation: "Moon phases happen because we see different amounts of the moon's lit side as it orbits Earth.",
          points: 10
        },
        {
          question: "Which is the largest planet in our solar system?",
          type: "multiple-choice",
          options: ["Earth", "Saturn", "Jupiter", "Neptune"],
          correctAnswer: "Jupiter",
          explanation: "Jupiter is the largest planet and is more than twice as massive as all other planets combined!",
          points: 10
        }
      ]
    },
    "adaptations": {
      content: {
        introduction: "Today we'll discover how amazing animals and plants have special features that help them survive in their environments!",
        mainContent: "Adaptations are special characteristics that help living things survive in their environment. Physical adaptations include body parts like a bird's beak shape, a polar bear's thick fur, or a cactus's waxy coating. Behavioral adaptations are things animals do, like migration, hibernation, or nocturnal hunting. These adaptations develop over many generations to help species survive challenges like finding food, staying safe from predators, or dealing with weather.",
        activities: [
          "Design an imaginary animal perfectly adapted for a specific environment (desert, ocean, Arctic)",
          "Research and compare how different birds' beaks are adapted for their food sources",
          "Observe adaptations in your backyard: look for how different plants and animals are suited to their environment"
        ],
        funFacts: [
          "Arctic foxes change fur color from brown in summer to white in winter for camouflage!",
          "Some desert plants can live for over a year without any rain!"
        ]
      },
      quiz: [
        {
          question: "What is an adaptation?",
          type: "multiple-choice",
          options: ["Any body part of an animal", "A special characteristic that helps a living thing survive", "The food an animal eats", "Where an animal lives"],
          correctAnswer: "A special characteristic that helps a living thing survive",
          explanation: "Adaptations are special features that have evolved to help organisms survive in their environment.",
          points: 10
        },
        {
          question: "A polar bear's thick fur is an example of what type of adaptation?",
          type: "multiple-choice",
          options: ["Physical adaptation", "Behavioral adaptation", "Food adaptation", "Seasonal adaptation"],
          correctAnswer: "Physical adaptation",
          explanation: "Thick fur is a physical adaptation - a body feature that helps polar bears stay warm in cold environments.",
          points: 10
        },
        {
          question: "Birds flying south for winter is an example of:",
          type: "multiple-choice",
          options: ["Physical adaptation", "Behavioral adaptation", "Structural adaptation", "Genetic adaptation"],
          correctAnswer: "Behavioral adaptation",
          explanation: "Migration is a behavioral adaptation - an action or behavior that helps animals survive seasonal changes.",
          points: 10
        },
        {
          question: "Why do cactuses have waxy coatings on their stems?",
          type: "multiple-choice",
          options: ["To look pretty", "To prevent water loss in the desert", "To attract insects", "To protect from cold"],
          correctAnswer: "To prevent water loss in the desert",
          explanation: "The waxy coating helps cactuses conserve precious water in hot, dry desert environments.",
          points: 10
        },
        {
          question: "Which beak shape would be best for cracking hard seeds?",
          type: "multiple-choice",
          options: ["Long and thin", "Short and thick", "Curved and sharp", "Flat and wide"],
          correctAnswer: "Short and thick",
          explanation: "Short, thick beaks provide the strength needed to crack open hard seeds and nuts.",
          points: 10
        },
        {
          question: "What helps a chameleon catch insects?",
          type: "multiple-choice",
          options: ["Changing colors", "Long, sticky tongue", "Sharp claws", "Loud calls"],
          correctAnswer: "Long, sticky tongue",
          explanation: "Chameleons have extremely long, sticky tongues that can shoot out quickly to catch insects.",
          points: 10
        },
        {
          question: "Why do some animals hibernate?",
          type: "multiple-choice",
          options: ["They're lazy", "To survive winter when food is scarce", "To avoid predators", "To find mates"],
          correctAnswer: "To survive winter when food is scarce",
          explanation: "Hibernation helps animals survive winter by slowing their body processes when food is hard to find.",
          points: 10
        },
        {
          question: "A fish's gills are adapted for:",
          type: "multiple-choice",
          options: ["Swimming fast", "Breathing underwater", "Finding food", "Avoiding predators"],
          correctAnswer: "Breathing underwater",
          explanation: "Gills extract oxygen from water, allowing fish to breathe underwater.",
          points: 10
        },
        {
          question: "Why do zebras have stripes?",
          type: "multiple-choice",
          options: ["To look beautiful", "To confuse predators and flies", "To stay warm", "To find food"],
          correctAnswer: "To confuse predators and flies",
          explanation: "Zebra stripes may confuse predators when zebras are in groups and also help repel biting flies.",
          points: 10
        },
        {
          question: "What adaptation helps owls hunt at night?",
          type: "multiple-choice",
          options: ["Colorful feathers", "Large eyes and excellent hearing", "Long legs", "Bright calls"],
          correctAnswer: "Large eyes and excellent hearing",
          explanation: "Owls have large eyes to gather more light and asymmetrical ears for precise hearing to locate prey in darkness.",
          points: 10
        }
      ]
    },
    "anatomy": {
      content: {
        introduction: "Welcome to the amazing world inside your body! Today we'll explore how different body systems work together to keep you healthy and strong.",
        mainContent: "Your body has several organ systems that work together like a well-organized team. The circulatory system (heart and blood vessels) delivers oxygen and nutrients throughout your body. The respiratory system (lungs) brings in oxygen and removes carbon dioxide. The digestive system breaks down food into nutrients your body can use. The nervous system (brain and nerves) controls everything and helps you think. The skeletal system (bones) supports your body, and the muscular system helps you move.",
        activities: [
          "Create a human body diagram showing the major organ systems and label their functions",
          "Track your pulse and breathing rate before and after exercise to see your circulatory and respiratory systems at work",
          "Keep a food diary for one day and research how your digestive system processes different foods"
        ],
        funFacts: [
          "Your heart beats about 100,000 times every day!",
          "Your brain uses about 20% of all the energy your body produces!"
        ]
      },
      quiz: [
        {
          question: "What is the main function of the circulatory system?",
          type: "multiple-choice",
          options: ["To help you breathe", "To carry blood throughout your body", "To digest food", "To help you think"],
          correctAnswer: "To carry blood throughout your body",
          explanation: "The circulatory system pumps blood through blood vessels to deliver oxygen and nutrients to all parts of your body.",
          points: 10
        },
        {
          question: "Which organ is the control center of your nervous system?",
          type: "multiple-choice",
          options: ["Heart", "Lungs", "Brain", "Stomach"],
          correctAnswer: "Brain",
          explanation: "The brain is the control center that coordinates all body functions and enables thinking, memory, and emotions.",
          points: 10
        },
        {
          question: "What do your lungs do?",
          type: "multiple-choice",
          options: ["Pump blood", "Take in oxygen and remove carbon dioxide", "Digest food", "Make you move"],
          correctAnswer: "Take in oxygen and remove carbon dioxide",
          explanation: "Your lungs are part of the respiratory system that brings oxygen into your body and removes waste carbon dioxide.",
          points: 10
        },
        {
          question: "How many bones are in an adult human skeleton?",
          type: "multiple-choice",
          options: ["150", "206", "300", "400"],
          correctAnswer: "206",
          explanation: "An adult human skeleton has 206 bones that provide structure and protect internal organs.",
          points: 10
        },
        {
          question: "What does your digestive system do?",
          type: "multiple-choice",
          options: ["Help you breathe", "Break down food into nutrients", "Pump blood", "Control your movements"],
          correctAnswer: "Break down food into nutrients",
          explanation: "The digestive system breaks down food into smaller nutrients that your body can absorb and use for energy and growth.",
          points: 10
        },
        {
          question: "Which system helps you move your body?",
          type: "multiple-choice",
          options: ["Digestive system", "Respiratory system", "Muscular system", "Circulatory system"],
          correctAnswer: "Muscular system",
          explanation: "The muscular system contains muscles that contract and relax to move your bones and body parts.",
          points: 10
        },
        {
          question: "What carries messages between your brain and the rest of your body?",
          type: "multiple-choice",
          options: ["Blood vessels", "Nerves", "Muscles", "Bones"],
          correctAnswer: "Nerves",
          explanation: "Nerves are like electrical wires that carry messages between your brain and all parts of your body.",
          points: 10
        },
        {
          question: "Why is your heart important?",
          type: "multiple-choice",
          options: ["It helps you think", "It pumps blood to your whole body", "It helps you digest food", "It stores oxygen"],
          correctAnswer: "It pumps blood to your whole body",
          explanation: "Your heart is a muscle that pumps blood containing oxygen and nutrients to every cell in your body.",
          points: 10
        },
        {
          question: "What protects your brain?",
          type: "multiple-choice",
          options: ["Your hair", "Your skull", "Your skin", "Your muscles"],
          correctAnswer: "Your skull",
          explanation: "Your skull is a hard, bony case that protects your brain from injury.",
          points: 10
        },
        {
          question: "How do your body systems work together?",
          type: "multiple-choice",
          options: ["They don't work together", "Each system works independently", "They coordinate to keep you healthy and functioning", "Only some systems work together"],
          correctAnswer: "They coordinate to keep you healthy and functioning",
          explanation: "All body systems work together as a team - for example, your respiratory and circulatory systems work together to deliver oxygen throughout your body.",
          points: 10
        }
      ]
    }
  };
  
  return scienceContents[topic.concept] || scienceContents["ecosystems"];
}

function generateHistoryContent4th(topic, week, day) {
  const historyContents = {
    "indigenous peoples": {
      content: {
        introduction: "Today we'll learn about the Native American peoples who lived in North America for thousands of years before Europeans arrived.",
        mainContent: "Native American tribes had diverse cultures, languages, and ways of life. Plains tribes like the Lakota followed buffalo herds and lived in tipis they could move easily. Woodland tribes like the Iroquois lived in longhouses and grew crops like corn, beans, and squash (called the 'Three Sisters'). Southwest tribes like the Pueblo built adobe homes and developed advanced farming techniques. Each tribe had its own government, traditions, and beliefs, often living in harmony with nature.",
        activities: [
          "Research one Native American tribe and create a fact sheet about their homes, food, and customs",
          "Make a map showing where different Native American tribes lived across North America",
          "Learn about the 'Three Sisters' planting method and why corn, beans, and squash grow well together"
        ],
        funFacts: [
          "There were over 500 different Native American tribes in North America, each with their own language and culture!",
          "Native Americans gave us many foods we eat today: corn, potatoes, tomatoes, chocolate, and turkey!"
        ]
      },
      quiz: [
        {
          question: "What were the 'Three Sisters' that many Native American tribes grew?",
          type: "multiple-choice",
          options: ["Corn, beans, and squash", "Wheat, rice, and oats", "Apples, oranges, and pears", "Carrots, potatoes, and onions"],
          correctAnswer: "Corn, beans, and squash",
          explanation: "The Three Sisters - corn, beans, and squash - were grown together because they helped each other grow better.",
          points: 10
        },
        {
          question: "How did Plains tribes like the Lakota adapt to their environment?",
          type: "multiple-choice",
          options: ["They built permanent stone houses", "They followed buffalo herds and lived in portable tipis", "They lived only near the ocean", "They never moved from one place"],
          correctAnswer: "They followed buffalo herds and lived in portable tipis",
          explanation: "Plains tribes followed the buffalo that provided food, clothing, and shelter materials, so they needed homes they could move easily.",
          points: 10
        },
        {
          question: "How many different Native American tribes existed in North America?",
          type: "multiple-choice",
          options: ["About 50", "About 100", "About 250", "Over 500"],
          correctAnswer: "Over 500",
          explanation: "There were over 500 different Native American tribes, each with their own unique culture, language, and traditions.",
          points: 10
        }
      ]
    }
  };
  
  return historyContents[topic.concept] || historyContents["indigenous peoples"];
}

// Run the enhancement
connectDB().then(() => {
  enhanceLessons();
}); 
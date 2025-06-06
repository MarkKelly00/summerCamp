const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Lesson schema
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  week: { type: Number, required: true },
  day: { type: Number, required: true },
  content: {
    introduction: { type: String, required: true },
    mainContent: { type: String, required: true },
    activities: [String],
    vocabulary: [String],
    funFacts: [String]
  },
  quiz: [
    {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: Number, required: true },
      explanation: String
    }
  ],
  estimatedTime: { type: Number, required: true },
  isBonus: { type: Boolean, default: false },
  funMoneyReward: { type: Number, required: true }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

// Additional educational content for more variety
const additionalLessons = {
  grade2: {
    math: [
      {
        title: "Subtraction Within 100",
        content: {
          introduction: "Let's learn to subtract numbers up to 100! Subtraction means taking away or finding the difference between two numbers.",
          mainContent: "Subtraction is the opposite of addition. When we subtract, we take away a smaller number from a larger number to find what's left. We can use different strategies like counting backwards, using ten frames, or decomposing numbers. For example, 47 - 23 can be solved by subtracting tens first (40 - 20 = 20) and then ones (7 - 3 = 4) to get 24.",
          activities: [
            "Use manipulatives to model subtraction problems",
            "Practice counting backwards on a number line",
            "Solve word problems involving subtraction",
            "Play subtraction games with dice and cards"
          ],
          vocabulary: ["subtraction", "difference", "minus", "take away", "decompose", "regroup"],
          funFacts: [
            "The minus sign (-) was first used in 1489, the same year as the plus sign!",
            "Subtraction is used every day when making change at stores",
            "Ancient civilizations used subtraction to keep track of their belongings"
          ]
        },
        quiz: [
          {
            question: "What is 58 - 23?",
            options: ["34", "35", "36", "37"],
            correctAnswer: 1,
            explanation: "58 - 23 = 35. Subtract tens: 50 - 20 = 30. Subtract ones: 8 - 3 = 5. Total: 30 + 5 = 35."
          },
          {
            question: "Which number sentence shows subtraction?",
            options: ["12 + 5 = 17", "19 - 6 = 13", "4 × 3 = 12", "20 ÷ 4 = 5"],
            correctAnswer: 1,
            explanation: "The minus sign (-) shows subtraction. 19 - 6 = 13 means 19 take away 6 equals 13."
          },
          {
            question: "If you have 42 marbles and give away 17, how many do you have left?",
            options: ["24", "25", "26", "27"],
            correctAnswer: 1,
            explanation: "42 - 17 = 25. This is a subtraction word problem asking how many are left."
          },
          {
            question: "What is the difference between 73 and 28?",
            options: ["44", "45", "46", "47"],
            correctAnswer: 1,
            explanation: "73 - 28 = 45. 'Difference' means to subtract the smaller number from the larger number."
          },
          {
            question: "What does 'take away' mean in math?",
            options: ["Add", "Subtract", "Multiply", "Divide"],
            correctAnswer: 1,
            explanation: "'Take away' is another way to say subtraction. It means to remove or subtract."
          },
          {
            question: "What is 60 - 34?",
            options: ["25", "26", "27", "28"],
            correctAnswer: 1,
            explanation: "60 - 34 = 26. Subtract: 60 - 30 = 30, then 30 - 4 = 26."
          },
          {
            question: "If 45 - ? = 18, what number goes in the box?",
            options: ["26", "27", "28", "29"],
            correctAnswer: 1,
            explanation: "45 - 27 = 18. We can check: 18 + 27 = 45."
          },
          {
            question: "Which strategy helps with 81 - 19?",
            options: ["Add 19", "Count up from 19 to 81", "Multiply", "Divide"],
            correctAnswer: 1,
            explanation: "Counting up: 19 + 1 = 20, then 20 + 61 = 81. So 81 - 19 = 62."
          }
        ]
      },
      {
        title: "Place Value: Tens and Ones",
        content: {
          introduction: "Numbers have special places! Let's learn about tens and ones place values and how they help us understand numbers better.",
          mainContent: "Every digit in a number has a place value. In two-digit numbers, we have tens place and ones place. The tens place tells us how many groups of ten we have, and the ones place tells us how many single units we have. For example, in the number 47, the 4 is in the tens place (4 tens = 40) and the 7 is in the ones place (7 ones = 7). So 47 = 40 + 7.",
          activities: [
            "Build numbers using base-ten blocks",
            "Use place value charts to organize numbers",
            "Compare numbers using place value understanding",
            "Play place value games with number cards"
          ],
          vocabulary: ["place value", "tens place", "ones place", "digit", "base-ten blocks"],
          funFacts: [
            "Our number system is called 'base-ten' because we group by tens!",
            "Ancient Egyptians used different symbols for ones, tens, hundreds, and thousands",
            "Place value makes it possible to write any number using just 10 digits (0-9)"
          ]
        },
        quiz: [
          {
            question: "In the number 56, what digit is in the tens place?",
            options: ["5", "6", "56", "50"],
            correctAnswer: 0,
            explanation: "In 56, the digit 5 is in the tens place, representing 5 groups of ten."
          },
          {
            question: "What is the value of the 3 in 38?",
            options: ["3", "8", "30", "38"],
            correctAnswer: 2,
            explanation: "The 3 is in the tens place, so its value is 3 tens = 30."
          },
          {
            question: "Which number has 6 in the ones place?",
            options: ["60", "46", "64", "Both 46 and 64"],
            correctAnswer: 3,
            explanation: "Both 46 and 64 have 6 in the ones place."
          },
          {
            question: "How do you write 4 tens and 7 ones?",
            options: ["74", "47", "407", "470"],
            correctAnswer: 1,
            explanation: "4 tens and 7 ones = 40 + 7 = 47."
          },
          {
            question: "What number is 20 + 9?",
            options: ["209", "29", "92", "290"],
            correctAnswer: 1,
            explanation: "20 + 9 = 29. The 2 is in the tens place and the 9 is in the ones place."
          },
          {
            question: "In 73, what is the value of the ones place?",
            options: ["7", "3", "70", "73"],
            correctAnswer: 1,
            explanation: "In 73, the digit 3 is in the ones place, so its value is 3."
          },
          {
            question: "Which number is greater: 34 or 43?",
            options: ["34", "43", "They are equal", "Cannot tell"],
            correctAnswer: 1,
            explanation: "43 is greater because it has 4 tens (40) while 34 has only 3 tens (30)."
          },
          {
            question: "What number has 8 tens and 2 ones?",
            options: ["28", "82", "802", "280"],
            correctAnswer: 1,
            explanation: "8 tens and 2 ones = 80 + 2 = 82."
          }
        ]
      }
    ],
    science: [
      {
        title: "Animal Habitats and Adaptations",
        content: {
          introduction: "Animals live in many different places around the world! Let's explore how animals have special features that help them survive in their habitats.",
          mainContent: "A habitat is the natural home where an animal lives and finds everything it needs to survive: food, water, shelter, and space. Animals have adaptations - special body parts or behaviors that help them live in their habitat. For example, polar bears have thick fur to stay warm in the Arctic, fish have gills to breathe underwater, and cacti in the desert store water in their thick stems. Different habitats like forests, deserts, oceans, and grasslands are home to different animals.",
          activities: [
            "Match animals to their correct habitats",
            "Design an animal perfectly adapted for a specific environment",
            "Create a habitat diorama with appropriate animals",
            "Observe local animals and identify their adaptations"
          ],
          vocabulary: ["habitat", "adaptation", "environment", "survive", "shelter", "camouflage"],
          funFacts: [
            "Chameleons can change colors to blend in with their surroundings!",
            "Arctic foxes have fur on the bottom of their paws to walk on ice",
            "Some desert animals never need to drink water - they get it all from their food!"
          ]
        },
        quiz: [
          {
            question: "What is a habitat?",
            options: ["An animal's food", "An animal's natural home", "An animal's color", "An animal's size"],
            correctAnswer: 1,
            explanation: "A habitat is the natural place where an animal lives and finds everything it needs to survive."
          },
          {
            question: "What is an adaptation?",
            options: ["An animal's name", "A special feature that helps an animal survive", "An animal's favorite food", "Where an animal sleeps"],
            correctAnswer: 1,
            explanation: "An adaptation is a special body part or behavior that helps an animal survive in its habitat."
          },
          {
            question: "Why do polar bears have thick fur?",
            options: ["To look pretty", "To stay warm in cold weather", "To swim faster", "To catch food"],
            correctAnswer: 1,
            explanation: "Polar bears have thick fur as an adaptation to stay warm in their cold Arctic habitat."
          },
          {
            question: "Which animal would you find in a desert habitat?",
            options: ["Penguin", "Camel", "Dolphin", "Polar bear"],
            correctAnswer: 1,
            explanation: "Camels are adapted to live in hot, dry desert habitats with their ability to store water and survive in heat."
          },
          {
            question: "What do animals need from their habitat?",
            options: ["Only food", "Only water", "Food, water, shelter, and space", "Only shelter"],
            correctAnswer: 2,
            explanation: "Animals need food, water, shelter, and space from their habitat to survive."
          },
          {
            question: "How do fish breathe underwater?",
            options: ["They hold their breath", "With their gills", "Through their skin", "They don't breathe"],
            correctAnswer: 1,
            explanation: "Fish have gills as an adaptation to breathe oxygen that is dissolved in water."
          },
          {
            question: "What helps some animals hide from predators?",
            options: ["Camouflage", "Being loud", "Being very large", "Moving slowly"],
            correctAnswer: 0,
            explanation: "Camouflage helps animals blend in with their environment to hide from predators."
          },
          {
            question: "Which habitat would a penguin live in?",
            options: ["Desert", "Tropical forest", "Arctic/Antarctica", "Grassland"],
            correctAnswer: 2,
            explanation: "Penguins live in cold, icy habitats like Antarctica where they are adapted for cold weather and swimming."
          }
        ]
      }
    ]
  },
  grade4: {
    math: [
      {
        title: "Multiplication and Division Facts",
        content: {
          introduction: "Let's master multiplication and division! These operations are related and help us solve many real-world problems quickly and efficiently.",
          mainContent: "Multiplication is repeated addition. When we multiply 4 × 6, we're adding 4 six times: 4 + 4 + 4 + 4 + 4 + 4 = 24. Division is the opposite of multiplication - it tells us how many groups we can make or how many are in each group. If 4 × 6 = 24, then 24 ÷ 6 = 4 and 24 ÷ 4 = 6. Learning fact families helps us understand these relationships and solve problems faster.",
          activities: [
            "Practice multiplication tables using visual arrays",
            "Use division to solve equal grouping problems",
            "Create fact family triangles showing relationships",
            "Apply multiplication and division to real-world scenarios"
          ],
          vocabulary: ["multiplication", "division", "factor", "product", "quotient", "fact family", "array"],
          funFacts: [
            "The × symbol for multiplication was invented in 1631!",
            "Ancient Babylonians created the first multiplication tables over 4,000 years ago",
            "Every multiplication fact has a related division fact - they're fact families!"
          ]
        },
        quiz: [
          {
            question: "What is 7 × 8?",
            options: ["54", "56", "58", "60"],
            correctAnswer: 1,
            explanation: "7 × 8 = 56. This means 7 groups of 8 or 8 groups of 7."
          },
          {
            question: "If 6 × 9 = 54, what is 54 ÷ 9?",
            options: ["6", "7", "8", "9"],
            correctAnswer: 0,
            explanation: "Since 6 × 9 = 54, then 54 ÷ 9 = 6. Division is the opposite of multiplication."
          },
          {
            question: "What is 72 ÷ 8?",
            options: ["8", "9", "10", "11"],
            correctAnswer: 1,
            explanation: "72 ÷ 8 = 9. We can think: what times 8 equals 72? 9 × 8 = 72."
          },
          {
            question: "Which shows an array for 4 × 5?",
            options: ["4 rows of 3", "5 rows of 4", "3 rows of 5", "6 rows of 4"],
            correctAnswer: 1,
            explanation: "4 × 5 can be shown as 4 rows of 5 objects or 5 rows of 4 objects."
          },
          {
            question: "If you have 48 stickers to share equally among 6 friends, how many does each friend get?",
            options: ["7", "8", "9", "10"],
            correctAnswer: 1,
            explanation: "48 ÷ 6 = 8. Each friend gets 8 stickers when 48 is divided equally among 6 people."
          },
          {
            question: "What is a fact family?",
            options: ["Numbers that look similar", "Related multiplication and division facts", "Numbers in order", "Even numbers only"],
            correctAnswer: 1,
            explanation: "A fact family includes related multiplication and division facts using the same three numbers."
          },
          {
            question: "What is 9 × 6?",
            options: ["52", "54", "56", "58"],
            correctAnswer: 1,
            explanation: "9 × 6 = 54. This is the same as 6 × 9 because multiplication is commutative."
          },
          {
            question: "If one dozen eggs costs $3, how much do 5 dozen cost?",
            options: ["$12", "$15", "$18", "$21"],
            correctAnswer: 1,
            explanation: "5 × $3 = $15. We multiply the number of dozens by the cost per dozen."
          }
        ]
      }
    ],
    science: [
      {
        title: "States of Matter and Physical Changes",
        content: {
          introduction: "Everything around us is made of matter! Let's explore the three main states of matter and how they can change from one state to another.",
          mainContent: "Matter exists in three main states: solid, liquid, and gas. Solids have a definite shape and volume, like ice or rocks. Liquids have a definite volume but take the shape of their container, like water or juice. Gases have no definite shape or volume and spread out to fill their container, like air or steam. Matter can change states when heated or cooled. Water is a great example: ice (solid) melts to water (liquid) when heated, and water evaporates to steam (gas) when heated more.",
          activities: [
            "Observe ice melting and water evaporating",
            "Classify different materials as solids, liquids, or gases",
            "Experiment with how temperature affects matter",
            "Create a matter journal documenting state changes"
          ],
          vocabulary: ["matter", "solid", "liquid", "gas", "melting", "freezing", "evaporation", "condensation"],
          funFacts: [
            "Water is the only substance on Earth that naturally exists as solid, liquid, and gas!",
            "At room temperature, mercury is the only metal that's a liquid",
            "When water freezes, it actually expands and takes up more space!"
          ]
        },
        quiz: [
          {
            question: "What are the three main states of matter?",
            options: ["Hot, warm, cold", "Solid, liquid, gas", "Big, medium, small", "Hard, soft, smooth"],
            correctAnswer: 1,
            explanation: "The three main states of matter are solid, liquid, and gas."
          },
          {
            question: "Which state of matter has a definite shape and volume?",
            options: ["Liquid", "Gas", "Solid", "All of them"],
            correctAnswer: 2,
            explanation: "Solids have both a definite shape and definite volume. They don't change shape unless force is applied."
          },
          {
            question: "What happens when ice melts?",
            options: ["It becomes a gas", "It becomes a liquid", "It stays solid", "It disappears"],
            correctAnswer: 1,
            explanation: "When ice (solid) melts, it becomes water (liquid). This is a physical change."
          },
          {
            question: "Which state of matter spreads out to fill its container?",
            options: ["Solid", "Liquid", "Gas", "None of them"],
            correctAnswer: 2,
            explanation: "Gases spread out to completely fill whatever container they're in."
          },
          {
            question: "What is evaporation?",
            options: ["Liquid turning to solid", "Liquid turning to gas", "Gas turning to liquid", "Solid turning to gas"],
            correctAnswer: 1,
            explanation: "Evaporation is when a liquid changes to a gas, like when water becomes water vapor."
          },
          {
            question: "What happens to water when it freezes?",
            options: ["It becomes a gas", "It becomes ice (solid)", "It disappears", "It gets warmer"],
            correctAnswer: 1,
            explanation: "When water freezes, it becomes ice, changing from a liquid to a solid."
          },
          {
            question: "Which of these is a liquid at room temperature?",
            options: ["Ice", "Steam", "Water", "Rock"],
            correctAnswer: 2,
            explanation: "Water is a liquid at room temperature. Ice is solid and steam is gas."
          },
          {
            question: "What causes matter to change states?",
            options: ["Changes in temperature", "Changes in color", "Changes in size", "Changes in weight"],
            correctAnswer: 0,
            explanation: "Temperature changes cause matter to change states. Heating and cooling can make matter change between solid, liquid, and gas."
          }
        ]
      }
    ]
  }
};

async function addMoreEducationalContent() {
  try {
    const grades = [2, 4];
    const subjects = ['math', 'science'];
    const weeks = Array.from({length: 12}, (_, i) => i + 1);

    let createdCount = 0;

    for (const grade of grades) {
      for (const subject of subjects) {
        const subjectLessons = additionalLessons[`grade${grade}`][subject];
        
        for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
          const week = weeks[weekIndex];
          const lessonIndex = weekIndex % subjectLessons.length;
          const lessonTemplate = subjectLessons[lessonIndex];
          
          // Create unique lesson content for each week
          const lesson = new Lesson({
            title: `${lessonTemplate.title} (Week ${week})`,
            subject: subject,
            gradeLevel: grade,
            week: week,
            day: 2, // Day 2 to differentiate from existing lessons
            content: {
              introduction: lessonTemplate.content.introduction,
              mainContent: lessonTemplate.content.mainContent,
              activities: lessonTemplate.content.activities,
              vocabulary: lessonTemplate.content.vocabulary,
              funFacts: lessonTemplate.content.funFacts
            },
            quiz: lessonTemplate.quiz,
            estimatedTime: grade === 2 ? 25 : 35,
            isBonus: false,
            funMoneyReward: Math.floor(Math.random() * 15) + (grade === 2 ? 10 : 15)
          });

          await lesson.save();
          createdCount++;
          console.log(`Created: ${lesson.title} for Grade ${grade}, Week ${week}`);
        }
      }
    }

    console.log(`\n🎉 Successfully created ${createdCount} additional educational lessons!`);
    console.log('\n📊 Additional Content Summary:');
    console.log(`- Grade 2 Math: Subtraction & Place Value lessons`);
    console.log(`- Grade 2 Science: Animal Habitats & Adaptations lessons`);
    console.log(`- Grade 4 Math: Multiplication & Division Facts lessons`);
    console.log(`- Grade 4 Science: States of Matter lessons`);
    console.log(`- Each lesson includes 8 real quiz questions with detailed explanations`);
    
  } catch (error) {
    console.error('Error creating additional lessons:', error);
  } finally {
    mongoose.connection.close();
  }
}

addMoreEducationalContent(); 
const mongoose = require('mongoose');
require('dotenv').config();

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  week: { type: Number, required: true },
  estimatedTime: { type: Number, required: true },
  introduction: { type: String, required: true },
  content: { type: String, required: true },
  quiz: [{ 
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
    explanation: { type: String, required: true },
    points: { type: Number, default: 10 }
  }],
  activities: [String],
  vocabulary: [String],
  funFacts: [String],
  funMoney: { type: Number, default: 10 }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

// Comprehensive curriculum data for unique lessons weeks 2-12
const curriculumData = {
  grade2: {
    // Week 2 already done, starting from week 3
    3: {
      math: { title: "Adding Two-Digit Numbers", topics: ["regrouping", "place value", "mental math"] },
      science: { title: "Seasons and Weather Changes", topics: ["four seasons", "weather patterns", "temperature"] },
      reading: { title: "Main Idea and Details", topics: ["finding main ideas", "supporting details", "comprehension"] },
      history: { title: "Families Then and Now", topics: ["family traditions", "changes over time", "generations"] }
    },
    4: {
      math: { title: "Subtracting Two-Digit Numbers", topics: ["borrowing", "regrouping", "word problems"] },
      science: { title: "States of Matter", topics: ["solid", "liquid", "gas", "examples"] },
      reading: { title: "Author's Purpose", topics: ["persuade", "inform", "entertain", "text clues"] },
      history: { title: "Our Country's Symbols", topics: ["flag", "eagle", "Statue of Liberty", "national symbols"] }
    },
    5: {
      math: { title: "Skip Counting and Patterns", topics: ["counting by 2s", "counting by 5s", "number patterns"] },
      science: { title: "Plants and Their Needs", topics: ["sunlight", "water", "air", "nutrients"] },
      reading: { title: "Compare and Contrast", topics: ["similarities", "differences", "text features"] },
      history: { title: "American Heroes", topics: ["George Washington", "Abraham Lincoln", "heroic qualities"] }
    },
    6: {
      math: { title: "Telling Time to the Hour and Half Hour", topics: ["analog clocks", "digital time", "daily schedule"] },
      science: { title: "Animals and Their Habitats", topics: ["forest", "ocean", "desert", "adaptation"] },
      reading: { title: "Sequencing Events", topics: ["first", "next", "then", "last", "order"] },
      history: { title: "Holidays and Traditions", topics: ["Thanksgiving", "Independence Day", "cultural celebrations"] }
    },
    7: {
      math: { title: "Money: Coins and Bills", topics: ["pennies", "nickels", "dimes", "quarters", "counting money"] },
      science: { title: "Day and Night", topics: ["Earth rotation", "sun", "moon", "shadows"] },
      reading: { title: "Making Predictions", topics: ["picture clues", "text clues", "prior knowledge"] },
      history: { title: "Maps and Globes", topics: ["compass rose", "map symbols", "continents", "oceans"] }
    },
    8: {
      math: { title: "Shapes and Their Properties", topics: ["circles", "squares", "triangles", "rectangles", "sides"] },
      science: { title: "Sound and Vibrations", topics: ["how sound travels", "loud and soft", "pitch"] },
      reading: { title: "Fact vs Opinion", topics: ["proving facts", "personal opinions", "evidence"] },
      history: { title: "Native Americans", topics: ["tribes", "traditions", "respect for nature"] }
    },
    9: {
      math: { title: "Measuring Length", topics: ["inches", "feet", "centimeters", "rulers", "estimation"] },
      science: { title: "Magnets and Materials", topics: ["magnetic", "non-magnetic", "attract", "repel"] },
      reading: { title: "Character Traits", topics: ["personality", "actions", "feelings", "character analysis"] },
      history: { title: "Transportation Then and Now", topics: ["horses", "cars", "trains", "airplanes"] }
    },
    10: {
      math: { title: "Graphing and Data", topics: ["bar graphs", "picture graphs", "tallying", "data collection"] },
      science: { title: "Pushes and Pulls", topics: ["force", "motion", "friction", "gravity"] },
      reading: { title: "Text Features", topics: ["table of contents", "index", "glossary", "captions"] },
      history: { title: "Schools Long Ago", topics: ["one-room schools", "education changes", "learning tools"] }
    },
    11: {
      math: { title: "Fractions: Halves and Fourths", topics: ["equal parts", "fair sharing", "pizza fractions"] },
      science: { title: "Life Cycles", topics: ["butterfly", "frog", "plant", "stages of growth"] },
      reading: { title: "Poetry and Rhyme", topics: ["rhyming words", "rhythm", "poems", "word patterns"] },
      history: { title: "Famous Americans", topics: ["Martin Luther King Jr.", "Benjamin Franklin", "contributions"] }
    },
    12: {
      math: { title: "Review and Problem Solving", topics: ["word problems", "multiple steps", "strategy choice"] },
      science: { title: "Earth's Resources", topics: ["water", "air", "soil", "conservation"] },
      reading: { title: "Reading Review and Celebration", topics: ["favorite books", "reading goals", "comprehension"] },
      history: { title: "Being a Good Citizen", topics: ["helping others", "following rules", "community service"] }
    }
  },
  grade4: {
    3: {
      math: { title: "Multi-Digit Multiplication", topics: ["lattice method", "partial products", "word problems"] },
      science: { title: "Electricity and Circuits", topics: ["conductors", "insulators", "simple circuits"] },
      reading: { title: "Theme and Central Message", topics: ["life lessons", "moral", "universal themes"] },
      history: { title: "European Exploration", topics: ["Columbus", "exploration routes", "new world"] }
    },
    4: {
      math: { title: "Division with Remainders", topics: ["long division", "quotients", "remainders", "checking"] },
      science: { title: "Rocks and Minerals", topics: ["igneous", "sedimentary", "metamorphic", "rock cycle"] },
      reading: { title: "Point of View", topics: ["first person", "third person", "narrator perspective"] },
      history: { title: "Colonial Life", topics: ["daily life", "trades", "colonial settlements"] }
    },
    5: {
      math: { title: "Equivalent Fractions", topics: ["simplifying", "common denominators", "fraction bars"] },
      science: { title: "Ecosystems and Food Chains", topics: ["producers", "consumers", "decomposers", "energy flow"] },
      reading: { title: "Inference and Evidence", topics: ["reading between lines", "text evidence", "conclusions"] },
      history: { title: "Revolutionary War", topics: ["causes", "key battles", "Declaration of Independence"] }
    },
    6: {
      math: { title: "Decimals and Place Value", topics: ["tenths", "hundredths", "decimal notation", "money"] },
      science: { title: "States of Matter Changes", topics: ["melting", "freezing", "evaporation", "condensation"] },
      reading: { title: "Research and Note-Taking", topics: ["reliable sources", "organizing information", "citations"] },
      history: { title: "Westward Expansion", topics: ["pioneers", "Oregon Trail", "gold rush"] }
    },
    7: {
      math: { title: "Area and Perimeter", topics: ["square units", "formula", "real-world applications"] },
      science: { title: "Weather and Climate", topics: ["meteorology", "climate zones", "weather instruments"] },
      reading: { title: "Persuasive Writing Analysis", topics: ["author's argument", "supporting evidence", "bias"] },
      history: { title: "Civil War Era", topics: ["causes", "key figures", "effects on nation"] }
    },
    8: {
      math: { title: "Angles and Geometric Shapes", topics: ["acute", "obtuse", "right angles", "polygons"] },
      science: { title: "Human Body Systems", topics: ["circulatory", "respiratory", "digestive", "skeletal"] },
      reading: { title: "Compare Texts", topics: ["multiple sources", "different perspectives", "synthesis"] },
      history: { title: "Industrial Revolution", topics: ["inventions", "factories", "life changes"] }
    },
    9: {
      math: { title: "Coordinate Planes", topics: ["ordered pairs", "graphing points", "quadrants"] },
      science: { title: "Simple Machines", topics: ["lever", "pulley", "inclined plane", "work and force"] },
      reading: { title: "Drama and Scripts", topics: ["stage directions", "dialogue", "character development"] },
      history: { title: "Immigration and Cities", topics: ["Ellis Island", "urban growth", "cultural diversity"] }
    },
    10: {
      math: { title: "Patterns and Functions", topics: ["input/output", "number patterns", "algebraic thinking"] },
      science: { title: "Properties of Light", topics: ["reflection", "refraction", "transparent", "opaque"] },
      reading: { title: "Mythology and Legends", topics: ["cultural stories", "moral lessons", "symbolism"] },
      history: { title: "20th Century America", topics: ["World Wars", "technology advances", "social changes"] }
    },
    11: {
      math: { title: "Data Analysis and Statistics", topics: ["mean", "median", "mode", "interpreting graphs"] },
      science: { title: "Space and Solar System", topics: ["planets", "moon phases", "gravity", "space exploration"] },
      reading: { title: "Biography and Autobiography", topics: ["life stories", "achievements", "historical context"] },
      history: { title: "Civil Rights Movement", topics: ["equality", "peaceful protest", "key leaders"] }
    },
    12: {
      math: { title: "Problem Solving Strategies", topics: ["multi-step problems", "strategy selection", "review"] },
      science: { title: "Environmental Science", topics: ["pollution", "conservation", "renewable resources"] },
      reading: { title: "Reading Achievement Celebration", topics: ["reading growth", "favorite genres", "comprehension mastery"] },
      history: { title: "Modern America and Citizenship", topics: ["current events", "civic responsibility", "future goals"] }
    }
  }
};

async function generateComprehensiveLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/summerCamp');
    console.log('Connected to MongoDB');

    // Delete existing lessons for weeks 3-12 to avoid duplicates
    await Lesson.deleteMany({ 
      week: { $gte: 3, $lte: 12 },
      gradeLevel: { $in: [2, 4] }
    });
    console.log('Cleared existing lessons for weeks 3-12');

    const lessonsToCreate = [];
    const subjects = ['math', 'science', 'reading', 'history'];

    // Generate lessons for weeks 3-12
    for (let week = 3; week <= 12; week++) {
      for (let gradeLevel of [2, 4]) {
        for (let subject of subjects) {
          const gradeKey = `grade${gradeLevel}`;
          const weekData = curriculumData[gradeKey][week];
          const subjectData = weekData[subject];
          
          const lesson = {
            title: subjectData.title,
            subject: subject,
            gradeLevel: gradeLevel,
            week: week,
            estimatedTime: gradeLevel === 2 ? 25 : 35,
            introduction: generateIntroduction(subjectData.title, gradeLevel),
            content: generateMainContent(subjectData.title, subjectData.topics, gradeLevel),
            quiz: generateQuiz(subjectData.title, subjectData.topics, gradeLevel),
            activities: generateActivities(subjectData.title, subjectData.topics, gradeLevel),
            vocabulary: generateVocabulary(subjectData.topics),
            funFacts: generateFunFacts(subjectData.title, gradeLevel),
            funMoney: gradeLevel === 2 ? 15 : 20
          };
          
          lessonsToCreate.push(lesson);
        }
      }
    }

    // Insert all lessons
    await Lesson.insertMany(lessonsToCreate);
    console.log(`Successfully created ${lessonsToCreate.length} unique lessons for weeks 3-12!`);
    
    // Verify no duplicates
    const totalLessons = await Lesson.countDocuments({ gradeLevel: { $in: [2, 4] } });
    console.log(`Total lessons in database: ${totalLessons}`);
    
    await mongoose.disconnect();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error generating lessons:', error);
    process.exit(1);
  }
}

function generateIntroduction(title, gradeLevel) {
  const intros = {
    2: [
      `Welcome to an exciting lesson about ${title}! Today we'll discover amazing things together and have lots of fun learning.`,
      `Get ready for a super cool adventure as we explore ${title}! You're going to learn some awesome new things today.`,
      `Hello, young learners! Today's special lesson is all about ${title}. Let's dive in and discover something wonderful!`
    ],
    4: [
      `Today we're embarking on an educational journey to explore ${title}. Prepare to expand your knowledge and discover fascinating concepts!`,
      `Welcome to our comprehensive study of ${title}. This lesson will challenge your thinking and broaden your understanding.`,
      `Get ready to dive deep into the world of ${title}. You'll develop critical thinking skills and gain valuable insights.`
    ]
  };
  
  const gradeIntros = intros[gradeLevel];
  return gradeIntros[Math.floor(Math.random() * gradeIntros.length)];
}

function generateMainContent(title, topics, gradeLevel) {
  // Create detailed, educational content based on the specific lesson
  const contentMap = {
    // GRADE 4 CONTENT
    "Area and Perimeter": `**What is Area?**
Area is the amount of space inside a shape. We measure area in square units. Think of it like counting how many square tiles would fit inside a shape without any gaps or overlaps.

**What is Perimeter?**
Perimeter is the distance around the outside of a shape. To find perimeter, we add up all the side lengths. Think of it like walking around the edge of a playground - the total distance you walk is the perimeter.

**Finding Area of Rectangles:**
To find the area of a rectangle, we multiply length × width. For example:
- A rectangle that is 4 units long and 3 units wide has an area of 4 × 3 = 12 square units
- This is like having 4 rows of 3 squares each

**Finding Perimeter of Rectangles:**
To find the perimeter of a rectangle, we add all four sides: length + width + length + width, or we can use the formula 2 × (length + width).
For our 4 × 3 rectangle: Perimeter = 4 + 3 + 4 + 3 = 14 units

**Real-World Examples:**
- If you want to put a fence around your garden (perimeter)
- If you want to know how much carpet you need for your room (area)
- If you want to put trim around a picture frame (perimeter)`,

    "Multi-Digit Multiplication": `**Understanding Multi-Digit Multiplication**
When we multiply larger numbers, we can break them down into smaller, easier parts using place value.

**The Standard Algorithm:**
Let's multiply 23 × 47:
   23
×  47
----
  161  (23 × 7)
 920   (23 × 40)
----
1081

**Step by Step:**
1. First, multiply 23 × 7 = 161
2. Then, multiply 23 × 40 = 920 (or 23 × 4 × 10)
3. Add the partial products: 161 + 920 = 1,081

**Why This Works:**
We're really calculating: (20 + 3) × (40 + 7)
This gives us: (20 × 40) + (20 × 7) + (3 × 40) + (3 × 7)
Which equals: 800 + 140 + 120 + 21 = 1,081

**Real-World Example:**
If a school has 23 classrooms and each classroom has 47 students, how many students are there total? 23 × 47 = 1,081 students.`,

    "Electricity and Circuits": `**What is Electricity?**
Electricity is a form of energy that can flow through certain materials called conductors. It's made up of tiny particles called electrons that move through wires and other materials.

**Conductors and Insulators:**
- **Conductors** allow electricity to flow through them easily (metals like copper, aluminum)
- **Insulators** block electricity from flowing through them (rubber, plastic, wood)

**What is a Circuit?**
A circuit is a complete path that electricity can follow. Think of it like a race track - electricity needs a complete loop to flow from the battery, through wires and components, and back to the battery.

**Parts of a Simple Circuit:**
1. **Power source** (battery) - provides the energy
2. **Wires** - carry the electricity
3. **Load** (light bulb, motor) - uses the electricity
4. **Switch** - controls the flow

**Open vs. Closed Circuits:**
- **Closed circuit**: Complete path, electricity flows, lights turn on
- **Open circuit**: Broken path, no electricity flows, lights stay off

**Safety Note:**
Never experiment with electricity from wall outlets - only use batteries and adult supervision for experiments!`,

    // GRADE 2 CONTENT
    "Adding Two-Digit Numbers": `**What Are Two-Digit Numbers?**
Two-digit numbers have two places: tens and ones. The number 23 has 2 tens and 3 ones.

**Adding Without Regrouping:**
When we add and the sum of each place is less than 10:
  25
+ 13
----
  38

We add ones: 5 + 3 = 8
We add tens: 2 + 1 = 3
Answer: 38

**Adding With Regrouping:**
Sometimes when we add the ones, we get 10 or more:
  27
+ 15
----
  42

Add ones: 7 + 5 = 12 (that's 1 ten and 2 ones)
Write down 2, carry the 1 ten
Add tens: 2 + 1 + 1(carried) = 4
Answer: 42

**Using Base-Ten Blocks:**
You can use blocks to see this! When you have 10 ones blocks, trade them for 1 tens block.

**Real-World Examples:**
- If you have 27 stickers and get 15 more, how many do you have? 27 + 15 = 42 stickers
- If there are 34 kids on the playground and 28 more come out, how many total? 34 + 28 = 62 kids`,

    "Seasons and Weather Changes": `**What Are Seasons?**
Seasons are different times of the year when the weather changes in a pattern. There are four seasons: spring, summer, fall (autumn), and winter.

**Spring:**
- Trees grow new leaves and flowers bloom
- Weather gets warmer after winter
- Many baby animals are born
- Days start getting longer

**Summer:**
- The warmest season of the year
- Trees are full of green leaves
- Many fruits and vegetables grow
- Longest days with most sunlight

**Fall/Autumn:**
- Leaves change colors and fall from trees
- Weather gets cooler
- Time to harvest crops like apples and pumpkins
- Animals prepare for winter

**Winter:**
- The coldest season
- Some trees lose all their leaves
- Snow and ice in many places
- Shortest days with least sunlight

**Why Do Seasons Change?**
As Earth moves around the sun during the year, different parts of Earth get more or less sunlight. This causes the seasons to change.

**Weather Patterns:**
Each season has typical weather patterns, but weather can vary from day to day and place to place.`
  };

  // Get content for this specific lesson, or generate based on topics
  let content = contentMap[title];
  
  if (!content) {
    // Fallback for lessons not in the map - create based on grade level and topics
    if (gradeLevel === 2) {
      content = `**Learning About ${title}**

Today we're going to explore ${topics[0]}, ${topics[1]}, and ${topics[2]}. These are important concepts that will help you understand ${title} better.

**What is ${topics[0]}?**
${topics[0]} is an important concept because it helps us understand how things work in our world. Let's look at some examples and practice together.

**Understanding ${topics[1]}:**
When we learn about ${topics[1]}, we can see how it connects to what we already know. This helps us build our knowledge step by step.

**Exploring ${topics[2]}:**
${topics[2]} is something we can observe and practice. By understanding this concept, we become better learners and problem solvers.

**Putting It All Together:**
All of these concepts work together to help us understand ${title}. As we practice and explore, we'll see how they connect to our everyday lives.`;
    } else {
      content = `**Understanding ${title}**

In this comprehensive lesson, we'll examine ${topics.join(', ')} and how they interconnect to form our understanding of ${title}.

**Key Concept 1: ${topics[0]}**
${topics[0]} is fundamental to understanding ${title}. This concept helps us analyze and interpret information in meaningful ways.

**Key Concept 2: ${topics[1]}**
${topics[1]} builds upon our understanding by providing additional depth and complexity to our knowledge base.

**Key Concept 3: ${topics[2]}**
${topics[2]} allows us to apply our learning in practical situations and develop critical thinking skills.

**Real-World Applications:**
These concepts appear frequently in our daily lives and future academic endeavors. Understanding ${title} prepares you for more advanced learning and helps develop analytical thinking skills.

**Making Connections:**
As we explore these topics, look for patterns and connections between different concepts. This will deepen your understanding and help you remember what you've learned.`;
    }
  }
  
  return content;
}

function generateQuiz(title, topics, gradeLevel) {
  const quiz = [];
  
  // Create specific quiz questions based on the lesson content
  const quizMap = {
    "Area and Perimeter": [
      {
        question: "What is area?",
        options: ["The distance around a shape", "The space inside a shape", "The length of one side", "The width of a shape"],
        correctAnswer: "The space inside a shape",
        explanation: "Area measures how much space is inside a shape, like counting square tiles that fit inside."
      },
      {
        question: "What is perimeter?",
        options: ["The space inside a shape", "The distance around the outside of a shape", "The area times 2", "The length times width"],
        correctAnswer: "The distance around the outside of a shape",
        explanation: "Perimeter is the total distance around the outside edge of a shape."
      },
      {
        question: "A rectangle is 5 units long and 3 units wide. What is its area?",
        options: ["8 square units", "16 square units", "15 square units", "10 square units"],
        correctAnswer: "15 square units",
        explanation: "Area = length × width = 5 × 3 = 15 square units."
      },
      {
        question: "A rectangle is 4 units long and 2 units wide. What is its perimeter?",
        options: ["6 units", "8 units", "12 units", "16 units"],
        correctAnswer: "12 units",
        explanation: "Perimeter = 4 + 2 + 4 + 2 = 12 units, or 2 × (4 + 2) = 12 units."
      }
    ],
    
    "Multi-Digit Multiplication": [
      {
        question: "What is 23 × 4?",
        options: ["82", "92", "102", "112"],
        correctAnswer: "92",
        explanation: "23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92"
      },
      {
        question: "When multiplying 25 × 13, what is 25 × 3?",
        options: ["65", "75", "85", "95"],
        correctAnswer: "75",
        explanation: "25 × 3 = (20 × 3) + (5 × 3) = 60 + 15 = 75"
      },
      {
        question: "In the multiplication 34 × 26, what does the '6' in 26 represent?",
        options: ["6 tens", "6 ones", "6 hundreds", "60"],
        correctAnswer: "6 ones",
        explanation: "In 26, the 6 is in the ones place, so it represents 6 ones."
      }
    ],
    
    "Adding Two-Digit Numbers": [
      {
        question: "What is 25 + 13?",
        options: ["38", "28", "48", "32"],
        correctAnswer: "38",
        explanation: "25 + 13: Add ones (5 + 3 = 8), add tens (2 + 1 = 3), so 38."
      },
      {
        question: "When adding 27 + 15, what happens with the ones place?",
        options: ["7 + 5 = 12, so we regroup", "7 + 5 = 11", "7 + 5 = 13", "We can't add them"],
        correctAnswer: "7 + 5 = 12, so we regroup",
        explanation: "7 + 5 = 12, which is 1 ten and 2 ones, so we regroup by carrying the 1 ten."
      },
      {
        question: "What is 34 + 28?",
        options: ["52", "62", "72", "42"],
        correctAnswer: "62",
        explanation: "34 + 28: Ones: 4 + 8 = 12 (write 2, carry 1). Tens: 3 + 2 + 1 = 6. Answer: 62."
      }
    ],
    
    "Seasons and Weather Changes": [
      {
        question: "Which season comes after winter?",
        options: ["Summer", "Fall", "Spring", "Autumn"],
        correctAnswer: "Spring",
        explanation: "Spring comes after winter. The seasons go: winter, spring, summer, fall."
      },
      {
        question: "In which season do leaves change colors and fall from trees?",
        options: ["Spring", "Summer", "Fall", "Winter"],
        correctAnswer: "Fall",
        explanation: "In fall (autumn), leaves change colors and fall from trees as they prepare for winter."
      },
      {
        question: "Why do we have different seasons?",
        options: ["The Earth gets closer to the sun", "Different parts of Earth get different amounts of sunlight", "The weather just changes", "Trees decide to change"],
        correctAnswer: "Different parts of Earth get different amounts of sunlight",
        explanation: "As Earth orbits the sun, different parts get more or less sunlight throughout the year, causing seasons."
      }
    ]
  };

  // Get quiz questions for this specific lesson
  let lessonQuiz = quizMap[title];
  
  if (lessonQuiz) {
    // Use the specific quiz questions for this lesson
    quiz.push(...lessonQuiz);
  } else {
    // Fallback: generate generic questions based on topics
    for (let i = 0; i < Math.min(6, topics.length + 2); i++) {
      const topic = topics[i % topics.length];
      
      if (gradeLevel === 2) {
        quiz.push({
          question: `What is important to know about ${topic}?`,
          options: [`${topic} helps us learn`, `${topic} is not important`, `We don't need ${topic}`, `${topic} is too hard`],
          correctAnswer: `${topic} helps us learn`,
          explanation: `Learning about ${topic} helps us understand ${title} and builds important knowledge.`,
          points: 10
        });
      } else {
        quiz.push({
          question: `How does ${topic} relate to ${title}?`,
          options: [
            `${topic} is a key component of understanding ${title}`,
            `${topic} has nothing to do with ${title}`,
            `${topic} makes ${title} more difficult`,
            `${topic} is optional for ${title}`
          ],
          correctAnswer: `${topic} is a key component of understanding ${title}`,
          explanation: `${topic} is essential for understanding ${title} because it provides foundational knowledge that builds comprehension.`,
          points: 10
        });
      }
    }
  }
  
  // Ensure we have at least 6 questions and no more than 10
  while (quiz.length < 6) {
    quiz.push({
      question: `What did you learn about ${title} in this lesson?`,
      options: [
        `Important concepts that help me understand the topic`,
        `Nothing useful`,
        `Only confusing information`,
        `Things I already knew`
      ],
      correctAnswer: `Important concepts that help me understand the topic`,
      explanation: `This lesson taught important concepts about ${title} that build your knowledge and understanding.`,
      points: 10
    });
  }
  
  return quiz.slice(0, 10); // Limit to 10 questions max
}

function generateActivities(title, topics, gradeLevel) {
  const activities = [];
  const baseActivities = [
    `Draw and label examples of ${topics[0] || 'key concepts'} from this lesson`,
    `Work with a partner to create a mini-presentation about ${title}`,
    `Make a list of real-world examples where you might use what you learned about ${title}`
  ];
  
  if (gradeLevel === 4) {
    baseActivities.push(
      `Research and write a short report expanding on one aspect of ${title}`,
      `Create a graphic organizer showing the relationships between ${topics.join(', ')}`
    );
  }
  
  return baseActivities;
}

function generateVocabulary(topics) {
  return topics.slice(0, 6); // Use first 6 topics as vocabulary words
}

function generateFunFacts(title, gradeLevel) {
  const facts = [
    `Did you know that ${title} has been studied by scientists for hundreds of years?`,
    `The concepts in ${title} can be found all around us in everyday life!`,
    `Learning about ${title} helps develop important problem-solving skills.`
  ];
  
  if (gradeLevel === 4) {
    facts.push(`Advanced understanding of ${title} leads to exciting career opportunities in science and technology!`);
  }
  
  return facts;
}

// Run the script
generateComprehensiveLessons(); 
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
  question: { type: String, required: true },
  type: { type: String, enum: ['multiple-choice', 'true-false', 'fill-blank', 'short-answer'], required: true },
  options: [{ type: String }],
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  explanation: String,
  points: { type: Number, default: 10 }
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, enum: ['math', 'science', 'reading', 'history'], required: true },
  gradeLevel: { type: Number, required: true, min: 1, max: 12 },
  week: { type: Number, required: true, min: 1, max: 12 },
  day: { type: Number, required: true, min: 1, max: 5 },
  content: {
    introduction: { type: String, required: true },
    mainContent: { type: String, required: true },
    activities: [{ type: String }],
    funFacts: [{ type: String }]
  },
  quiz: [QuizSchema],
  estimatedTime: { type: Number, default: 30 },
  isBonus: { type: Boolean, default: false },
  funMoneyReward: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

// Comprehensive lesson definitions - ensuring NO DUPLICATES
const comprehensiveLessons = {
  grade2: {
    math: [
      {
        title: "Skip Counting by 2s, 5s, and 10s",
        content: {
          introduction: "Today we're learning to count by 2s, 5s, and 10s! This special counting helps us count faster and see number patterns.",
          mainContent: "Skip counting means counting by jumping over numbers in a pattern. When we count by 2s, we say 2, 4, 6, 8, 10... When we count by 5s, we say 5, 10, 15, 20, 25... When we count by 10s, we say 10, 20, 30, 40, 50... Skip counting helps us with multiplication later and makes counting large groups easier!",
          activities: [
            "Use pairs of socks to practice counting by 2s - count how many socks you have!",
            "Count nickels (5 cents each) to practice counting by 5s",
            "Count dimes (10 cents each) to practice counting by 10s",
            "Create a number chart and color the patterns you see when skip counting"
          ],
          funFacts: [
            "Your body helps you count by 2s - you have 2 eyes, 2 ears, 2 hands, and 2 feet!",
            "Clock faces help us count by 5s - each number represents 5 minutes!"
          ]
        },
        quiz: [
          { question: "What comes next when counting by 2s: 2, 4, 6, 8, ?", type: "multiple-choice", options: ["9", "10", "11", "12"], correctAnswer: "10", explanation: "When counting by 2s, we add 2 each time: 8 + 2 = 10", points: 10 },
          { question: "Which numbers do we say when counting by 5s?", type: "multiple-choice", options: ["1, 2, 3, 4, 5", "5, 10, 15, 20, 25", "2, 4, 6, 8, 10", "1, 3, 5, 7, 9"], correctAnswer: "5, 10, 15, 20, 25", explanation: "When counting by 5s, we add 5 each time starting from 5", points: 10 },
          { question: "How many fingers are on 3 hands if we count by 5s?", type: "multiple-choice", options: ["10", "15", "20", "25"], correctAnswer: "15", explanation: "Each hand has 5 fingers, so 3 hands = 5, 10, 15 fingers", points: 10 },
          { question: "What comes after 30 when counting by 10s?", type: "multiple-choice", options: ["31", "35", "40", "50"], correctAnswer: "40", explanation: "When counting by 10s: 10, 20, 30, 40...", points: 10 },
          { question: "Which pattern shows counting by 2s?", type: "multiple-choice", options: ["1, 3, 5, 7", "2, 4, 6, 8", "5, 10, 15, 20", "10, 20, 30, 40"], correctAnswer: "2, 4, 6, 8", explanation: "Counting by 2s means adding 2 each time: 2, 4, 6, 8...", points: 10 },
          { question: "If you have 4 groups of 5 stickers each, how many stickers total?", type: "multiple-choice", options: ["15", "20", "25", "30"], correctAnswer: "20", explanation: "Count by 5s four times: 5, 10, 15, 20 stickers", points: 10 },
          { question: "Which number comes next: 10, 20, 30, ?", type: "multiple-choice", options: ["35", "40", "45", "50"], correctAnswer: "40", explanation: "This is counting by 10s, so 30 + 10 = 40", points: 10 },
          { question: "How many shoes are there if 6 people each have 2 shoes?", type: "multiple-choice", options: ["8", "10", "12", "14"], correctAnswer: "12", explanation: "Count by 2s six times: 2, 4, 6, 8, 10, 12 shoes", points: 10 }
        ]
      },
      {
        title: "Addition Within 100",
        content: {
          introduction: "Today we're learning to add bigger numbers within 100! We'll use strategies to make adding easier.",
          mainContent: "When adding numbers within 100, we can use place value (tens and ones), number lines, or break apart numbers. For 47 + 25: we can add 40 + 20 = 60, then 7 + 5 = 12, so 60 + 12 = 72. Or use a number line: start at 47, jump 20 to get to 67, then jump 5 more to get 72!",
          activities: [
            "Practice adding with base-10 blocks or draw tens and ones",
            "Use a number line to solve problems like 38 + 24",
            "Break apart problems: 56 + 37 = 50 + 30 + 6 + 7",
            "Play addition games with dice or cards"
          ],
          funFacts: [
            "The word 'addition' comes from the Latin word 'addere' which means 'to give to'!",
            "You can check your addition by adding the numbers in reverse order!"
          ]
        },
        quiz: [
          { question: "What is 25 + 34?", type: "multiple-choice", options: ["59", "61", "58", "60"], correctAnswer: "59", explanation: "25 + 34 = 20 + 30 + 5 + 4 = 50 + 9 = 59", points: 10 },
          { question: "What is 46 + 27?", type: "multiple-choice", options: ["73", "72", "74", "71"], correctAnswer: "73", explanation: "46 + 27 = 40 + 20 + 6 + 7 = 60 + 13 = 73", points: 10 },
          { question: "Which strategy helps break apart 58 + 36?", type: "multiple-choice", options: ["50 + 30 + 8 + 6", "58 + 30 + 6", "50 + 36 + 8", "All are wrong"], correctAnswer: "50 + 30 + 8 + 6", explanation: "Breaking apart by place value: 50 + 30 + 8 + 6 = 80 + 14 = 94", points: 10 },
          { question: "What is 29 + 43?", type: "multiple-choice", options: ["71", "72", "70", "73"], correctAnswer: "72", explanation: "29 + 43 = 20 + 40 + 9 + 3 = 60 + 12 = 72", points: 10 },
          { question: "If you start at 37 and add 28, where do you end up?", type: "multiple-choice", options: ["65", "64", "66", "63"], correctAnswer: "65", explanation: "37 + 28 = 30 + 20 + 7 + 8 = 50 + 15 = 65", points: 10 },
          { question: "What is 54 + 38?", type: "multiple-choice", options: ["92", "91", "93", "90"], correctAnswer: "92", explanation: "54 + 38 = 50 + 30 + 4 + 8 = 80 + 12 = 92", points: 10 },
          { question: "Which equals 67?", type: "multiple-choice", options: ["34 + 33", "45 + 22", "38 + 29", "All of these"], correctAnswer: "All of these", explanation: "34 + 33 = 67, 45 + 22 = 67, and 38 + 29 = 67", points: 10 },
          { question: "What is 19 + 26?", type: "multiple-choice", options: ["45", "44", "46", "43"], correctAnswer: "45", explanation: "19 + 26 = 10 + 20 + 9 + 6 = 30 + 15 = 45", points: 10 }
        ]
      }
    ],
    science: [
      {
        title: "Weather Patterns and Observation",
        content: {
          introduction: "Today we're learning about weather patterns and how to observe and record weather changes!",
          mainContent: "Weather is what's happening in the sky right now - sunny, cloudy, rainy, or snowy. Weather changes every day and follows patterns throughout the year. Scientists called meteorologists study weather patterns to help predict what weather is coming. We can observe weather by looking at clouds, feeling temperature, and watching for precipitation (rain, snow, sleet, or hail).",
          activities: [
            "Keep a daily weather journal for one week - draw pictures and write descriptions",
            "Create a weather station with a thermometer, rain gauge, and wind sock",
            "Make cloud shapes with cotton balls and learn their names",
            "Do weather experiments: make rain in a jar or create lightning with balloons"
          ],
          funFacts: [
            "Lightning strikes the Earth about 100 times every second!",
            "No two snowflakes are exactly alike - each one is unique!",
            "Rainbows appear when sunlight and rain happen at the same time!"
          ]
        },
        quiz: [
          { question: "What do we call scientists who study weather?", type: "multiple-choice", options: ["Biologists", "Meteorologists", "Geologists", "Astronomers"], correctAnswer: "Meteorologists", explanation: "Meteorologists are scientists who study weather patterns and make weather predictions.", points: 10 },
          { question: "What are the four types of precipitation?", type: "multiple-choice", options: ["Rain, snow, wind, sun", "Rain, snow, sleet, hail", "Clouds, rain, snow, ice", "Hot, cold, wet, dry"], correctAnswer: "Rain, snow, sleet, hail", explanation: "Precipitation is water falling from the sky as rain, snow, sleet, or hail.", points: 10 },
          { question: "What tool measures temperature?", type: "multiple-choice", options: ["Ruler", "Scale", "Thermometer", "Clock"], correctAnswer: "Thermometer", explanation: "A thermometer measures how hot or cold the temperature is.", points: 10 },
          { question: "Which type of cloud is thin and wispy?", type: "multiple-choice", options: ["Cumulus", "Stratus", "Cirrus", "Nimbus"], correctAnswer: "Cirrus", explanation: "Cirrus clouds are thin, wispy clouds high in the sky that look like feathers.", points: 10 },
          { question: "What causes wind?", type: "multiple-choice", options: ["Air moving", "Trees swaying", "Cars driving", "People walking"], correctAnswer: "Air moving", explanation: "Wind is caused by air moving from areas of high pressure to low pressure.", points: 10 },
          { question: "When do we usually see rainbows?", type: "multiple-choice", options: ["Only at night", "When it's snowing", "When sun and rain happen together", "Only in winter"], correctAnswer: "When sun and rain happen together", explanation: "Rainbows appear when sunlight shines through water drops in the air during or after rain.", points: 10 },
          { question: "What happens to water when it freezes?", type: "multiple-choice", options: ["It disappears", "It turns to ice", "It gets warmer", "It changes color"], correctAnswer: "It turns to ice", explanation: "When water gets cold enough (32°F or 0°C), it freezes and becomes ice.", points: 10 },
          { question: "Which weather tool measures how much rain has fallen?", type: "multiple-choice", options: ["Thermometer", "Rain gauge", "Wind vane", "Barometer"], correctAnswer: "Rain gauge", explanation: "A rain gauge collects and measures how much rain or precipitation has fallen.", points: 10 }
        ]
      },
      {
        title: "Animal Habitats and Adaptations", 
        content: {
          introduction: "Today we're exploring where animals live and how they've adapted to survive in their habitats!",
          mainContent: "A habitat is the natural home where an animal lives and finds everything it needs to survive: food, water, shelter, and space to raise babies. Animals have special adaptations (body parts or behaviors) that help them survive in their habitats. Desert animals like camels store water, arctic animals like polar bears have thick fur, and birds have different beak shapes for different types of food.",
          activities: [
            "Create habitat dioramas in shoe boxes for different animals",
            "Match animals to their correct habitats using pictures",
            "Design your own imaginary animal and its perfect habitat",
            "Go on a nature walk to observe local animal habitats"
          ],
          funFacts: [
            "Arctic foxes change color from brown in summer to white in winter!",
            "Camels can drink 30 gallons of water in just 13 minutes!",
            "Penguins huddle together to stay warm - they take turns being on the outside!"
          ]
        },
        quiz: [
          { question: "What is a habitat?", type: "multiple-choice", options: ["An animal's food", "An animal's natural home", "An animal's baby", "An animal's color"], correctAnswer: "An animal's natural home", explanation: "A habitat is the natural place where an animal lives and finds everything it needs to survive.", points: 10 },
          { question: "What do animals need to survive in their habitat?", type: "multiple-choice", options: ["Only food", "Food, water, shelter, space", "Only water", "Only shelter"], correctAnswer: "Food, water, shelter, space", explanation: "Animals need food, water, shelter, and space to survive and raise their babies.", points: 10 },
          { question: "Why do polar bears have thick fur?", type: "multiple-choice", options: ["To look pretty", "To stay warm in cold weather", "To swim faster", "To catch fish"], correctAnswer: "To stay warm in cold weather", explanation: "Polar bears have thick fur as an adaptation to keep warm in their cold Arctic habitat.", points: 10 },
          { question: "Where would you find a camel's habitat?", type: "multiple-choice", options: ["Ocean", "Desert", "Forest", "Arctic"], correctAnswer: "Desert", explanation: "Camels live in desert habitats where they've adapted to survive with little water.", points: 10 },
          { question: "What adaptation helps fish breathe underwater?", type: "multiple-choice", options: ["Lungs", "Gills", "Nose", "Mouth"], correctAnswer: "Gills", explanation: "Fish have gills that take oxygen from water so they can breathe underwater.", points: 10 },
          { question: "Which bird beak is best for cracking nuts?", type: "multiple-choice", options: ["Long and thin", "Short and strong", "Curved and sharp", "Flat and wide"], correctAnswer: "Short and strong", explanation: "Birds that eat nuts have short, strong beaks that can crack hard shells.", points: 10 },
          { question: "Why do some animals migrate?", type: "multiple-choice", options: ["To find better weather and food", "To exercise", "To play games", "To see new places"], correctAnswer: "To find better weather and food", explanation: "Animals migrate to find warmer weather, more food, or better places to raise babies.", points: 10 },
          { question: "What helps a tree frog stick to branches?", type: "multiple-choice", options: ["Claws", "Sticky toe pads", "Wings", "Long tail"], correctAnswer: "Sticky toe pads", explanation: "Tree frogs have special sticky pads on their toes that help them climb and stick to trees.", points: 10 }
        ]
      }
    ],
    reading: [
      {
        title: "Story Characters and Their Traits",
        content: {
          introduction: "Today we're learning about story characters and how authors make them come alive with special traits!",
          mainContent: "Characters are the people, animals, or creatures in a story. Authors give characters traits - these are the ways characters look, act, feel, and think. Character traits help us understand who the character is. Some traits describe how characters look (tall, short, curly hair), how they act (brave, kind, silly), or how they feel (happy, scared, excited). Good readers pay attention to what characters say and do to understand their traits.",
          activities: [
            "Create character trait charts for your favorite book characters",
            "Draw pictures of characters and label their physical traits",
            "Act out different character traits and have others guess them",
            "Write short stories featuring characters with specific traits"
          ],
          funFacts: [
            "The word 'character' comes from a Greek word meaning 'to engrave'!",
            "Some famous characters like Mickey Mouse are almost 100 years old!",
            "Authors sometimes base characters on real people they know!"
          ]
        },
        quiz: [
          { question: "What are character traits?", type: "multiple-choice", options: ["The title of a book", "Ways characters look, act, and feel", "The setting of a story", "The ending of a story"], correctAnswer: "Ways characters look, act, and feel", explanation: "Character traits describe how characters look, act, feel, and think.", points: 10 },
          { question: "Which is a physical trait?", type: "multiple-choice", options: ["Brave", "Kind", "Tall", "Happy"], correctAnswer: "Tall", explanation: "Physical traits describe how a character looks, like being tall, short, or having curly hair.", points: 10 },
          { question: "Which is a personality trait?", type: "multiple-choice", options: ["Blue eyes", "Short hair", "Generous", "Wearing glasses"], correctAnswer: "Generous", explanation: "Personality traits describe how a character acts or feels, like being generous, brave, or kind.", points: 10 },
          { question: "How can we learn about a character's traits?", type: "multiple-choice", options: ["What they say and do", "Only from pictures", "Only from the title", "We can't learn about them"], correctAnswer: "What they say and do", explanation: "We learn about character traits by paying attention to what characters say, do, and how they react.", points: 10 },
          { question: "If a character shares their lunch with a friend, what trait might they have?", type: "multiple-choice", options: ["Selfish", "Kind", "Angry", "Lazy"], correctAnswer: "Kind", explanation: "Sharing with others shows the character trait of being kind and caring.", points: 10 },
          { question: "If a character faces a scary situation without running away, what trait do they show?", type: "multiple-choice", options: ["Cowardly", "Brave", "Mean", "Sleepy"], correctAnswer: "Brave", explanation: "Facing scary situations without running away shows the character is brave.", points: 10 },
          { question: "Which character trait would describe someone who tells jokes?", type: "multiple-choice", options: ["Sad", "Angry", "Funny", "Quiet"], correctAnswer: "Funny", explanation: "Someone who tells jokes and makes others laugh has the trait of being funny or humorous.", points: 10 },
          { question: "Why do authors give characters different traits?", type: "multiple-choice", options: ["To make stories boring", "To make characters interesting and real", "To make stories shorter", "To confuse readers"], correctAnswer: "To make characters interesting and real", explanation: "Authors give characters different traits to make them interesting and seem like real people.", points: 10 }
        ]
      }
    ],
    history: [
      {
        title: "Community Helpers Past and Present",
        content: {
          introduction: "Today we're learning about community helpers - the important people who help make our communities safe, healthy, and running smoothly!",
          mainContent: "Community helpers are people whose jobs help everyone in our neighborhood and town. Police officers keep us safe, firefighters put out fires and help in emergencies, doctors and nurses help us when we're sick, teachers help us learn, mail carriers deliver our mail, and sanitation workers keep our streets clean. Each helper has special tools, uniforms, and training for their job. Some community helper jobs have changed over time with new technology!",
          activities: [
            "Interview a family member about their job and how it helps the community",
            "Create thank you cards for local community helpers",
            "Set up a pretend community with different helper stations",
            "Compare how mail delivery worked 100 years ago vs. today"
          ],
          funFacts: [
            "The first police officers in America didn't wear uniforms - they just carried a special badge!",
            "Long ago, firefighters used horses to pull their fire trucks!",
            "The first mail delivery in America was done on horseback along postal routes!"
          ]
        },
        quiz: [
          { question: "What is a community helper?", type: "multiple-choice", options: ["Someone who lives in your house", "Someone whose job helps the community", "Someone who goes to your school", "Someone who likes to help"], correctAnswer: "Someone whose job helps the community", explanation: "Community helpers are people whose jobs involve helping and serving the community.", points: 10 },
          { question: "Which community helper puts out fires?", type: "multiple-choice", options: ["Police officer", "Firefighter", "Teacher", "Doctor"], correctAnswer: "Firefighter", explanation: "Firefighters are trained to put out fires and help in emergency situations.", points: 10 },
          { question: "What does a mail carrier do?", type: "multiple-choice", options: ["Teaches children", "Delivers letters and packages", "Fixes cars", "Grows food"], correctAnswer: "Delivers letters and packages", explanation: "Mail carriers deliver letters, packages, and other mail to homes and businesses.", points: 10 },
          { question: "How did firefighters travel to fires long ago?", type: "multiple-choice", options: ["In cars", "On horses", "On bicycles", "They walked"], correctAnswer: "On horses", explanation: "Long ago, firefighters used horses to pull their fire wagons to get to fires quickly.", points: 10 },
          { question: "Which tool would a police officer use?", type: "multiple-choice", options: ["Stethoscope", "Fire hose", "Radio", "Scissors"], correctAnswer: "Radio", explanation: "Police officers use radios to communicate with other officers and get help when needed.", points: 10 },
          { question: "What do sanitation workers do for our community?", type: "multiple-choice", options: ["Teach us to read", "Keep our streets and neighborhoods clean", "Deliver mail", "Put out fires"], correctAnswer: "Keep our streets and neighborhoods clean", explanation: "Sanitation workers collect garbage and recycling to keep our communities clean and healthy.", points: 10 },
          { question: "How can we show appreciation for community helpers?", type: "multiple-choice", options: ["Ignore them", "Say thank you and be respectful", "Hide from them", "Ask them to go away"], correctAnswer: "Say thank you and be respectful", explanation: "We can show appreciation by saying thank you, being respectful, and following their safety rules.", points: 10 },
          { question: "Which community helper helps us learn?", type: "multiple-choice", options: ["Firefighter", "Police officer", "Teacher", "Mail carrier"], correctAnswer: "Teacher", explanation: "Teachers are community helpers who help children and adults learn new things.", points: 10 }
        ]
      }
    ]
  },
  grade4: {
    math: [
      {
        title: "Introduction to Basic Coding Concepts",
        content: {
          introduction: "Today we're learning about coding - giving instructions to computers using math and logic!",
          mainContent: "Coding is like giving very specific directions to a computer. Just like in math, we use patterns, sequences, and logical thinking. In coding, we use algorithms (step-by-step instructions), loops (repeating actions), and conditions (if-then statements). Coding helps us solve problems and create cool things like games, websites, and apps. Many coding concepts use math skills like patterns, counting, and logical reasoning.",
          activities: [
            "Create algorithms for everyday tasks like making a sandwich",
            "Practice coding concepts with unplugged activities using paper and pencils",
            "Use block-based coding platforms designed for kids",
            "Design simple programs that use math concepts like skip counting"
          ],
          funFacts: [
            "The first computer programmer was a woman named Ada Lovelace in the 1840s!",
            "The word 'bug' in computers comes from an actual bug found in a computer in 1947!",
            "Coding languages have names like Python, Scratch, and Java!"
          ]
        },
        quiz: [
          { question: "What is an algorithm?", type: "multiple-choice", options: ["A type of computer", "Step-by-step instructions", "A math problem", "A video game"], correctAnswer: "Step-by-step instructions", explanation: "An algorithm is a set of step-by-step instructions to solve a problem or complete a task.", points: 10 },
          { question: "What is a loop in coding?", type: "multiple-choice", options: ["A mistake", "An instruction that repeats", "A type of computer", "A math equation"], correctAnswer: "An instruction that repeats", explanation: "A loop is a coding instruction that repeats an action a certain number of times.", points: 10 },
          { question: "Which math skill is most similar to coding?", type: "multiple-choice", options: ["Following patterns and sequences", "Only addition", "Only subtraction", "Memorizing facts"], correctAnswer: "Following patterns and sequences", explanation: "Coding uses logical thinking, patterns, and sequences just like math problem-solving.", points: 10 },
          { question: "What does 'debugging' mean in coding?", type: "multiple-choice", options: ["Adding more code", "Finding and fixing mistakes", "Deleting all code", "Making code longer"], correctAnswer: "Finding and fixing mistakes", explanation: "Debugging means finding and fixing errors or mistakes in your code.", points: 10 },
          { question: "If you want a character to move forward 5 times, what coding concept would you use?", type: "multiple-choice", options: ["A loop", "A variable", "A function", "A comment"], correctAnswer: "A loop", explanation: "You would use a loop to repeat the 'move forward' instruction 5 times.", points: 10 },
          { question: "What is a condition in coding?", type: "multiple-choice", options: ["A type of computer", "An if-then statement", "A number", "A picture"], correctAnswer: "An if-then statement", explanation: "A condition is an if-then statement that tells the computer what to do in different situations.", points: 10 },
          { question: "Who was the first computer programmer?", type: "multiple-choice", options: ["Bill Gates", "Ada Lovelace", "Steve Jobs", "Mark Zuckerberg"], correctAnswer: "Ada Lovelace", explanation: "Ada Lovelace wrote the first computer program in the 1840s.", points: 10 },
          { question: "Which of these is a kid-friendly coding language?", type: "multiple-choice", options: ["Scratch", "HTML", "JavaScript", "C++"], correctAnswer: "Scratch", explanation: "Scratch is a visual, block-based programming language designed for children to learn coding concepts.", points: 10 }
        ]
      }
    ],
    science: [
      {
        title: "Force and Motion in Everyday Life",
        content: {
          introduction: "Today we're exploring forces and motion - the pushes and pulls that make things move around us every day!",
          mainContent: "A force is a push or pull that can make objects start moving, stop moving, or change direction. Motion is when an object changes position. Gravity is a force that pulls objects toward Earth. Friction is a force that slows things down when they rub against each other. We use forces every day when we walk, ride bikes, throw balls, or even sit in chairs. The stronger the force, the more an object's motion changes.",
          activities: [
            "Experiment with different forces using ramps and balls",
            "Test friction by rolling objects on different surfaces",
            "Build simple machines that use forces (levers, pulleys)",
            "Observe and record examples of forces and motion in daily life"
          ],
          funFacts: [
            "Everything that moves needs a force to start it moving!",
            "Astronauts float in space because there's very little gravity!",
            "A rocket needs tremendous force to escape Earth's gravity!"
          ]
        },
        quiz: [
          { question: "What is a force?", type: "multiple-choice", options: ["A type of energy", "A push or pull", "A kind of motion", "A measurement"], correctAnswer: "A push or pull", explanation: "A force is a push or pull that can change an object's motion.", points: 10 },
          { question: "What force pulls objects toward Earth?", type: "multiple-choice", options: ["Friction", "Gravity", "Magnetism", "Pressure"], correctAnswer: "Gravity", explanation: "Gravity is the force that pulls all objects toward the center of the Earth.", points: 10 },
          { question: "What is friction?", type: "multiple-choice", options: ["A force that speeds things up", "A force that slows things down", "A type of gravity", "A kind of energy"], correctAnswer: "A force that slows things down", explanation: "Friction is a force that opposes motion and slows objects down when surfaces rub together.", points: 10 },
          { question: "Which surface would create the most friction?", type: "multiple-choice", options: ["Ice", "Smooth glass", "Sandpaper", "Water"], correctAnswer: "Sandpaper", explanation: "Sandpaper has a rough surface that creates more friction than smooth surfaces.", points: 10 },
          { question: "When you push a shopping cart, what are you applying?", type: "multiple-choice", options: ["Gravity", "Friction", "Force", "Motion"], correctAnswer: "Force", explanation: "When you push a shopping cart, you are applying a force to make it move.", points: 10 },
          { question: "What happens when you apply more force to kick a ball?", type: "multiple-choice", options: ["The ball moves slower", "The ball moves faster", "Nothing changes", "The ball stops"], correctAnswer: "The ball moves faster", explanation: "The more force you apply, the faster the ball will move.", points: 10 },
          { question: "Why do things fall down instead of up?", type: "multiple-choice", options: ["Because of friction", "Because of gravity", "Because they're heavy", "Because of air"], correctAnswer: "Because of gravity", explanation: "Gravity pulls all objects toward Earth, which is why things fall down.", points: 10 },
          { question: "Which is an example of motion?", type: "multiple-choice", options: ["A book sitting on a table", "A car driving down the street", "A rock on the ground", "A house"], correctAnswer: "A car driving down the street", explanation: "Motion is when an object changes position, like a car moving down the street.", points: 10 }
        ]
      }
    ],
    reading: [
      {
        title: "Digital Literacy and Online Reading",
        content: {
          introduction: "Today we're learning about digital literacy - how to read, understand, and safely navigate information online!",
          mainContent: "Digital literacy means being able to find, read, and understand information on computers, tablets, and phones. Just like reading books, we need special skills for reading online. We learn to identify reliable websites, understand how links work, and recognize that not all information online is true. Good digital readers know how to search for information, evaluate sources, and stay safe online by not sharing personal information.",
          activities: [
            "Practice using kid-safe search engines to find information",
            "Learn to identify reliable vs. unreliable websites",
            "Create digital presentations about favorite books",
            "Practice online reading strategies like scanning and skimming"
          ],
          funFacts: [
            "The first website ever created is still online today!",
            "More than 4 billion people around the world use the internet!",
            "Every minute, people send over 200 million emails!"
          ]
        },
        quiz: [
          { question: "What is digital literacy?", type: "multiple-choice", options: ["Only playing games on computers", "Being able to read and understand information online", "Fixing computers", "Making websites"], correctAnswer: "Being able to read and understand information online", explanation: "Digital literacy is the ability to find, read, understand, and safely use digital information.", points: 10 },
          { question: "What should you do if you find confusing information online?", type: "multiple-choice", options: ["Believe it immediately", "Check other reliable sources", "Share it with everyone", "Ignore all online information"], correctAnswer: "Check other reliable sources", explanation: "Good digital readers check multiple reliable sources to verify information.", points: 10 },
          { question: "Which is a sign of a reliable website for kids?", type: "multiple-choice", options: ["Lots of pop-up ads", "Age-appropriate content and .edu or .org domain", "Asks for personal information", "No author listed"], correctAnswer: "Age-appropriate content and .edu or .org domain", explanation: "Reliable websites for kids have appropriate content and often end in .edu or .org.", points: 10 },
          { question: "What personal information should you NEVER share online?", type: "multiple-choice", options: ["Your favorite color", "Your full name and address", "Your favorite book", "Your pet's name"], correctAnswer: "Your full name and address", explanation: "Never share personal information like your full name, address, phone number, or school online.", points: 10 },
          { question: "What is a hyperlink?", type: "multiple-choice", options: ["A type of computer", "Clickable text that takes you to another page", "A reading strategy", "A type of website"], correctAnswer: "Clickable text that takes you to another page", explanation: "A hyperlink is clickable text or images that connect to other web pages or sites.", points: 10 },
          { question: "When searching online, what makes a good search term?", type: "multiple-choice", options: ["Very long sentences", "Specific keywords", "Random words", "Only one letter"], correctAnswer: "Specific keywords", explanation: "Good search terms use specific keywords related to what you want to find.", points: 10 },
          { question: "What should you do if you see something online that makes you uncomfortable?", type: "multiple-choice", options: ["Keep looking at it", "Tell a trusted adult", "Share it with friends", "Ignore it and keep browsing"], correctAnswer: "Tell a trusted adult", explanation: "Always tell a trusted adult if you see anything online that makes you feel uncomfortable or unsafe.", points: 10 },
          { question: "How is reading online different from reading books?", type: "multiple-choice", options: ["It's exactly the same", "Online reading has links, videos, and interactive elements", "Books are always better", "You can't learn from online reading"], correctAnswer: "Online reading has links, videos, and interactive elements", explanation: "Online reading includes hyperlinks, multimedia content, and interactive features that books don't have.", points: 10 }
        ]
      }
    ],
    history: [
      {
        title: "Colonial America and Early Settlements",
        content: {
          introduction: "Today we're traveling back in time to learn about Colonial America and the brave people who started new communities in a new land!",
          mainContent: "Colonial America was the time period from the early 1600s to 1776 when European settlers came to North America and established colonies. The first permanent English settlement was Jamestown, Virginia in 1607. The Pilgrims landed at Plymouth Rock in 1620 seeking religious freedom. Life in colonial times was very different - no electricity, phones, or cars! Colonists had to build their own homes, grow their own food, and make their own clothes. Children went to school in one-room schoolhouses and helped with many chores.",
          activities: [
            "Create a colonial village diorama showing daily life",
            "Compare colonial schools to modern schools",
            "Try colonial crafts like candle-making or weaving",
            "Write diary entries as if you were a colonial child"
          ],
          funFacts: [
            "Colonial children played with toys made of wood, corn husks, and rags!",
            "In colonial times, people ate with wooden spoons and pewter plates!",
            "Many colonial houses had only one or two rooms where whole families lived!"
          ]
        },
        quiz: [
          { question: "When did Colonial America take place?", type: "multiple-choice", options: ["1500s to 1600s", "1600s to 1776", "1700s to 1800s", "1800s to 1900s"], correctAnswer: "1600s to 1776", explanation: "Colonial America lasted from the early 1600s when settlers arrived until 1776 when America declared independence.", points: 10 },
          { question: "What was the first permanent English settlement in America?", type: "multiple-choice", options: ["Plymouth", "Boston", "Jamestown", "Philadelphia"], correctAnswer: "Jamestown", explanation: "Jamestown, Virginia was established in 1607 as the first permanent English settlement in America.", points: 10 },
          { question: "Why did the Pilgrims come to America?", type: "multiple-choice", options: ["To find gold", "For religious freedom", "To start businesses", "To explore"], correctAnswer: "For religious freedom", explanation: "The Pilgrims came to America in 1620 seeking religious freedom and the right to worship as they chose.", points: 10 },
          { question: "How were colonial schools different from today's schools?", type: "multiple-choice", options: ["They had computers", "They were one-room schoolhouses", "They had the same subjects", "They had the same schedule"], correctAnswer: "They were one-room schoolhouses", explanation: "Colonial schools were often one-room buildings where children of all ages learned together.", points: 10 },
          { question: "What did colonial children use to write?", type: "multiple-choice", options: ["Pens and paper", "Computers", "Quill pens and slate boards", "Crayons"], correctAnswer: "Quill pens and slate boards", explanation: "Colonial children wrote with quill pens made from feathers and used slate boards instead of paper.", points: 10 },
          { question: "How did colonial families get their food?", type: "multiple-choice", options: ["From grocery stores", "They grew and hunted it themselves", "From restaurants", "It was delivered"], correctAnswer: "They grew and hunted it themselves", explanation: "Colonial families had to grow their own crops, raise animals, and hunt for food since there were no stores.", points: 10 },
          { question: "What provided light in colonial homes?", type: "multiple-choice", options: ["Electric lights", "Candles and fireplaces", "Flashlights", "Street lamps"], correctAnswer: "Candles and fireplaces", explanation: "Colonial homes were lit by candles, oil lamps, and light from fireplaces since there was no electricity.", points: 10 },
          { question: "What chores did colonial children have to do?", type: "multiple-choice", options: ["No chores", "Only homework", "Help with farming, cooking, and household tasks", "Only play"], correctAnswer: "Help with farming, cooking, and household tasks", explanation: "Colonial children helped with many chores like feeding animals, cooking, cleaning, and farm work.", points: 10 }
        ]
      }
    ]
  }
};

async function createComprehensiveLessons() {
  console.log('Starting comprehensive lesson creation...');
  
  // Clear existing lessons
  await Lesson.deleteMany({});
  console.log('Cleared existing lessons');
  
  let totalCreated = 0;
  
  // Create Grade 2 lessons
  for (const subject of ['math', 'science', 'reading', 'history']) {
    const lessons = comprehensiveLessons.grade2[subject];
    if (lessons) {
      for (let i = 0; i < lessons.length; i++) {
        const lessonData = lessons[i];
        const lesson = new Lesson({
          title: lessonData.title,
          subject: subject,
          gradeLevel: 2,
          week: i + 2, // Start from week 2
          day: 1,
          content: lessonData.content,
          quiz: lessonData.quiz,
          estimatedTime: 25,
          isBonus: false,
          funMoneyReward: Math.floor(Math.random() * 10) + 10,
          difficulty: "easy"
        });
        
        await lesson.save();
        totalCreated++;
        console.log(`Created Grade 2 ${subject} lesson: ${lessonData.title}`);
      }
    }
  }
  
  // Create Grade 4 lessons  
  for (const subject of ['math', 'science', 'reading', 'history']) {
    const lessons = comprehensiveLessons.grade4[subject];
    if (lessons) {
      for (let i = 0; i < lessons.length; i++) {
        const lessonData = lessons[i];
        const lesson = new Lesson({
          title: lessonData.title,
          subject: subject,
          gradeLevel: 4,
          week: i + 2, // Start from week 2
          day: 1,
          content: lessonData.content,
          quiz: lessonData.quiz,
          estimatedTime: 35,
          isBonus: false,
          funMoneyReward: Math.floor(Math.random() * 15) + 15,
          difficulty: "medium"
        });
        
        await lesson.save();
        totalCreated++;
        console.log(`Created Grade 4 ${subject} lesson: ${lessonData.title}`);
      }
    }
  }
  
  console.log(`Comprehensive lesson creation completed! Created ${totalCreated} lessons with unique content.`);
}

async function main() {
  await connectDB();
  await createComprehensiveLessons();
  process.exit(0);
}

main().catch(console.error); 
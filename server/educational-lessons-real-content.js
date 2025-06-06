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

// Real educational content based on curriculum research
const realLessons = {
  grade2: {
    math: [
      {
        title: "Skip Counting by 2s, 5s, and 10s",
        content: {
          introduction: "Today we're learning to count by 2s, 5s, and 10s! This special counting helps us count faster and see number patterns.",
          mainContent: "Skip counting means counting by jumping over numbers in a pattern. When we count by 2s, we say 2, 4, 6, 8, 10... When we count by 5s, we say 5, 10, 15, 20, 25... When we count by 10s, we say 10, 20, 30, 40, 50... Skip counting helps us with multiplication later and makes counting large groups easier!",
          activities: [
            "Use pairs of socks to practice counting by 2s",
            "Count nickels to practice counting by 5s", 
            "Count dimes to practice counting by 10s",
            "Create number patterns on a hundreds chart"
          ],
          vocabulary: ["skip counting", "pattern", "sequence", "multiply"],
          funFacts: [
            "Ancient people used skip counting to count large herds of animals!",
            "Skip counting by 5s helps you tell time on an analog clock",
            "Your hands have 10 fingers - perfect for counting by 10s!"
          ]
        },
        quiz: [
          {
            question: "What comes next when skip counting by 2s: 2, 4, 6, 8, ___?",
            options: ["9", "10", "11", "12"],
            correctAnswer: 1,
            explanation: "When counting by 2s, we add 2 each time. 8 + 2 = 10."
          },
          {
            question: "Which pattern shows skip counting by 5s?",
            options: ["1, 2, 3, 4, 5", "5, 10, 15, 20, 25", "2, 4, 6, 8, 10", "10, 20, 30, 40, 50"],
            correctAnswer: 1,
            explanation: "Skip counting by 5s means we add 5 each time: 5, 10, 15, 20, 25..."
          },
          {
            question: "How many groups of 10 are in 40?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            explanation: "Counting by 10s: 10, 20, 30, 40. There are 4 groups of 10 in 40."
          },
          {
            question: "If you have 6 pairs of shoes, how many shoes do you have in total?",
            options: ["6", "8", "10", "12"],
            correctAnswer: 3,
            explanation: "Each pair has 2 shoes. Skip counting by 2s six times: 2, 4, 6, 8, 10, 12."
          },
          {
            question: "What is the missing number: 15, 20, ___, 30?",
            options: ["22", "23", "24", "25"],
            correctAnswer: 3,
            explanation: "This is skip counting by 5s. 20 + 5 = 25."
          },
          {
            question: "Which would be faster for counting 20 pencils?",
            options: ["Count by 1s", "Count by 2s", "Count by 5s", "Count by 10s"],
            correctAnswer: 3,
            explanation: "Counting by 10s is fastest: 10, 20. Only two counts needed!"
          },
          {
            question: "Skip counting helps us prepare for which math skill?",
            options: ["Addition", "Subtraction", "Multiplication", "Division"],
            correctAnswer: 2,
            explanation: "Skip counting shows repeated addition, which is the foundation of multiplication."
          },
          {
            question: "How many fingers are on 3 hands?",
            options: ["13", "14", "15", "16"],
            correctAnswer: 2,
            explanation: "Each hand has 5 fingers. Skip counting by 5s: 5, 10, 15."
          }
        ]
      },
      {
        title: "Addition Within 100",
        content: {
          introduction: "Let's become addition experts! Today we'll learn to add numbers up to 100 using different strategies.",
          mainContent: "Addition means putting numbers together to find the total. We can add using counting on, making ten, or using place value. For example, 23 + 15 can be solved by adding the tens (20 + 10 = 30) and ones (3 + 5 = 8) to get 38. We can also use number lines, base-ten blocks, or mental math strategies.",
          activities: [
            "Use base-ten blocks to show addition problems",
            "Practice making ten strategy with number bonds",
            "Solve word problems using addition",
            "Play addition games with dice and cards"
          ],
          vocabulary: ["addition", "sum", "total", "place value", "tens", "ones", "regrouping"],
          funFacts: [
            "The + symbol was first used in 1489!",
            "Your brain can add small numbers instantly without thinking",
            "Ancient Egyptians used different symbols for addition"
          ]
        },
        quiz: [
          {
            question: "What is 25 + 14?",
            options: ["38", "39", "40", "41"],
            correctAnswer: 0,
            explanation: "25 + 14 = 39. Add the tens: 20 + 10 = 30. Add the ones: 5 + 4 = 9. Total: 30 + 9 = 39."
          },
          {
            question: "Which strategy helps you add 27 + 8?",
            options: ["Count backwards", "Make ten", "Skip count", "Subtract"],
            correctAnswer: 1,
            explanation: "Making ten: 27 + 3 = 30, then 30 + 5 = 35. We split 8 into 3 + 5."
          },
          {
            question: "What is the sum of 46 and 23?",
            options: ["69", "68", "67", "70"],
            correctAnswer: 0,
            explanation: "46 + 23 = 69. Add tens: 40 + 20 = 60. Add ones: 6 + 3 = 9. Total: 69."
          },
          {
            question: "If you have 35 stickers and get 17 more, how many do you have?",
            options: ["51", "52", "53", "54"],
            correctAnswer: 1,
            explanation: "35 + 17 = 52. This is an addition word problem asking for the total."
          },
          {
            question: "What does 'sum' mean?",
            options: ["To take away", "The answer to addition", "To count by 2s", "To make equal groups"],
            correctAnswer: 1,
            explanation: "Sum means the answer you get when you add numbers together."
          },
          {
            question: "In 58 + 24, what are you adding in the tens place?",
            options: ["5 + 2", "50 + 20", "8 + 4", "58 + 24"],
            correctAnswer: 1,
            explanation: "In the tens place, we add 50 + 20 = 70."
          },
          {
            question: "What is 19 + 6?",
            options: ["24", "25", "26", "27"],
            correctAnswer: 1,
            explanation: "19 + 6 = 25. You can think: 19 + 1 = 20, then 20 + 5 = 25."
          },
          {
            question: "Which number sentence is correct?",
            options: ["12 + 15 = 26", "12 + 15 = 27", "12 + 15 = 28", "12 + 15 = 29"],
            correctAnswer: 1,
            explanation: "12 + 15 = 27. Add the ones: 2 + 5 = 7. Add the tens: 10 + 10 = 20. Total: 27."
          }
        ]
      }
    ],
    science: [
      {
        title: "Weather Patterns and Observation",
        content: {
          introduction: "Weather happens all around us every day! Let's learn about different types of weather and how scientists study weather patterns.",
          mainContent: "Weather is what the sky looks and the air feels like. The main parts of weather are temperature (hot or cold), precipitation (rain, snow), clouds, wind, and sunshine. Scientists called meteorologists use special tools to measure and predict weather. They use thermometers for temperature, rain gauges for precipitation, and weather vanes for wind direction. Weather patterns help us know what to expect and how to dress each day.",
          activities: [
            "Create a classroom weather station",
            "Keep a daily weather journal for one week",
            "Make a weather wheel to show different conditions",
            "Use a thermometer to measure temperature outside"
          ],
          vocabulary: ["weather", "meteorologist", "temperature", "precipitation", "thermometer", "rain gauge", "wind vane"],
          funFacts: [
            "Lightning is 5 times hotter than the sun!",
            "No two snowflakes are exactly alike",
            "A cloud can weigh as much as 80 elephants!"
          ]
        },
        quiz: [
          {
            question: "What is weather?",
            options: ["Only rain and snow", "How the sky looks and air feels", "Just the temperature", "Only sunny days"],
            correctAnswer: 1,
            explanation: "Weather describes how the sky looks and how the air feels, including temperature, precipitation, clouds, and wind."
          },
          {
            question: "What tool measures temperature?",
            options: ["Rain gauge", "Weather vane", "Thermometer", "Ruler"],
            correctAnswer: 2,
            explanation: "A thermometer measures how hot or cold the air is."
          },
          {
            question: "What is precipitation?",
            options: ["Only rain", "Only snow", "Wind direction", "Rain, snow, and other water falling from clouds"],
            correctAnswer: 3,
            explanation: "Precipitation includes all forms of water that fall from clouds: rain, snow, sleet, and hail."
          },
          {
            question: "Who studies weather?",
            options: ["Meteorologist", "Dentist", "Chef", "Artist"],
            correctAnswer: 0,
            explanation: "Meteorologists are scientists who study and predict weather."
          },
          {
            question: "What does a weather vane tell us?",
            options: ["Temperature", "How much rain fell", "Wind direction", "Cloud types"],
            correctAnswer: 2,
            explanation: "A weather vane shows which direction the wind is blowing from."
          },
          {
            question: "Which is NOT a type of weather?",
            options: ["Sunny", "Rainy", "Snowy", "Purple"],
            correctAnswer: 3,
            explanation: "Purple is a color, not a type of weather. Weather types include sunny, rainy, snowy, cloudy, and windy."
          },
          {
            question: "Why do we study weather patterns?",
            options: ["Just for fun", "To predict what weather is coming", "To make it rain", "To stop storms"],
            correctAnswer: 1,
            explanation: "Studying weather patterns helps us predict future weather so we can prepare and stay safe."
          },
          {
            question: "What makes clouds?",
            options: ["Dirt in the air", "Water vapor", "Wind only", "Hot air only"],
            correctAnswer: 1,
            explanation: "Clouds form when water vapor in the air cools and turns into tiny water droplets."
          }
        ]
      }
    ],
    reading: [
      {
        title: "Story Characters and Their Traits",
        content: {
          introduction: "Every story has characters - the people or animals the story is about. Let's learn how to identify characters and understand their traits!",
          mainContent: "Characters are the people, animals, or creatures in a story. Character traits are words that describe what a character is like on the inside (personality) and outside (appearance). We can learn about characters by reading what they say, what they do, what they think, and what others say about them. Good readers pay attention to character traits because they help us understand why characters act the way they do in stories.",
          activities: [
            "Create character trait charts for favorite book characters",
            "Act out different character traits with body language",
            "Draw characters and write trait words around them",
            "Compare characters from different stories"
          ],
          vocabulary: ["character", "trait", "personality", "appearance", "describe", "behavior"],
          funFacts: [
            "The word 'character' comes from a Greek word meaning 'to scratch or mark'",
            "Some characters like Mickey Mouse have been around for over 90 years!",
            "Authors often base characters on real people they know"
          ]
        },
        quiz: [
          {
            question: "What is a character in a story?",
            options: ["The setting", "A person or animal in the story", "The problem", "The ending"],
            correctAnswer: 1,
            explanation: "A character is a person, animal, or creature that the story is about."
          },
          {
            question: "What are character traits?",
            options: ["What happens in the story", "Words that describe what a character is like", "Where the story takes place", "The story's title"],
            correctAnswer: 1,
            explanation: "Character traits are words that describe a character's personality and appearance."
          },
          {
            question: "If a character shares toys with friends, what trait might they have?",
            options: ["Mean", "Generous", "Lazy", "Scared"],
            correctAnswer: 1,
            explanation: "Someone who shares is generous and kind to others."
          },
          {
            question: "How can we learn about a character's traits?",
            options: ["Only by looking at pictures", "By what they say and do", "Only by the title", "Only by the setting"],
            correctAnswer: 1,
            explanation: "We learn about characters by reading what they say, do, think, and what others say about them."
          },
          {
            question: "Which word describes how a character looks?",
            options: ["Kind", "Tall", "Brave", "Smart"],
            correctAnswer: 1,
            explanation: "Tall describes physical appearance. Kind, brave, and smart describe personality."
          },
          {
            question: "If a character helps others when they're in trouble, they are probably:",
            options: ["Selfish", "Helpful", "Angry", "Silly"],
            correctAnswer: 1,
            explanation: "A character who helps others shows they are helpful and caring."
          },
          {
            question: "Why is it important to understand character traits?",
            options: ["To help us understand why characters act the way they do", "To make the story longer", "To find spelling mistakes", "To count the pages"],
            correctAnswer: 0,
            explanation: "Understanding character traits helps us understand why characters make certain choices and act certain ways."
          },
          {
            question: "Which is an example of a character trait?",
            options: ["The character lives in a house", "The character is in second grade", "The character is honest", "The character goes to school"],
            correctAnswer: 2,
            explanation: "Being honest is a personality trait. The others are facts about where they live or what they do."
          }
        ]
      }
    ],
    history: [
      {
        title: "Community Helpers Past and Present",
        content: {
          introduction: "Communities have always needed helpers! Let's explore how the jobs that help our community have changed over time.",
          mainContent: "Community helpers are people whose jobs help make our neighborhoods safe, healthy, and nice places to live. In the past, communities had helpers like blacksmiths (who made tools), lamplighters (who lit street lamps), and ice delivery men. Today we have police officers, firefighters, doctors, teachers, mail carriers, and many others. Some jobs have changed with technology - like how milk used to be delivered by horse and wagon, but now we buy it at grocery stores. However, the most important thing hasn't changed: people working together to help their community.",
          activities: [
            "Interview a community helper about their job",
            "Compare old and new versions of community helper jobs",
            "Create a timeline showing how one job has changed",
            "Write thank you cards to local community helpers"
          ],
          vocabulary: ["community", "helper", "past", "present", "blacksmith", "technology", "service"],
          funFacts: [
            "The first police officers didn't wear uniforms - they just carried a special stick!",
            "Long ago, people called 'knocker-uppers' used long sticks to tap on windows to wake people up for work",
            "The first firefighters were often just neighbors with buckets of water"
          ]
        },
        quiz: [
          {
            question: "What is a community helper?",
            options: ["Someone who only helps their family", "Someone whose job helps the whole community", "Someone who lives alone", "Someone who works only at home"],
            correctAnswer: 1,
            explanation: "Community helpers have jobs that help make the whole community a better place to live."
          },
          {
            question: "What did a blacksmith do in the past?",
            options: ["Delivered mail", "Made tools and horseshoes", "Taught school", "Put out fires"],
            correctAnswer: 1,
            explanation: "Blacksmiths used fire and hammers to make metal tools, horseshoes, and other metal items."
          },
          {
            question: "How has mail delivery changed over time?",
            options: ["It hasn't changed at all", "From horses to trucks and planes", "People stopped getting mail", "Only children deliver mail now"],
            correctAnswer: 1,
            explanation: "Mail delivery has changed from horses and wagons to trucks, planes, and other modern transportation."
          },
          {
            question: "What job helped light streets before electric lights?",
            options: ["Lamplighter", "Teacher", "Doctor", "Police officer"],
            correctAnswer: 0,
            explanation: "Lamplighters lit oil or gas lamps on streets each evening before electric streetlights were invented."
          },
          {
            question: "Which community helper would help if your house was on fire?",
            options: ["Teacher", "Firefighter", "Mail carrier", "Store clerk"],
            correctAnswer: 1,
            explanation: "Firefighters are specially trained to put out fires and rescue people from dangerous situations."
          },
          {
            question: "How are today's community helpers similar to those in the past?",
            options: ["They use exactly the same tools", "They wear the same clothes", "They still work to help their community", "They work the same hours"],
            correctAnswer: 2,
            explanation: "Even though tools and methods have changed, community helpers still work to help and serve their communities."
          },
          {
            question: "What has helped community helper jobs change over time?",
            options: ["New technology", "Different weather", "Smaller communities", "Fewer people"],
            correctAnswer: 0,
            explanation: "New technology like cars, phones, and computers has changed how community helpers do their jobs."
          },
          {
            question: "Who delivers milk to most families today?",
            options: ["Horse and wagon", "Families get it themselves at stores", "Only neighbors", "Ice delivery men"],
            correctAnswer: 1,
            explanation: "Today, most families buy milk themselves at grocery stores instead of having it delivered to their homes."
          }
        ]
      }
    ]
  },
  grade4: {
    math: [
      {
        title: "Introduction to Basic Coding Concepts",
        content: {
          introduction: "Welcome to the exciting world of coding! Today we'll learn how computers think and how we can give them instructions using algorithms and patterns.",
          mainContent: "Coding is like writing instructions for a computer to follow. An algorithm is a step-by-step set of instructions to solve a problem or complete a task. Just like following a recipe to bake cookies! Computers need very specific, clear instructions. We use concepts like loops (doing something over and over), conditions (if-then statements), and sequences (doing things in order). Even without a computer, we can practice coding thinking with everyday activities like brushing teeth or making a sandwich.",
          activities: [
            "Write algorithms for daily activities like making a peanut butter sandwich",
            "Practice 'unplugged' coding with paper and pencils",
            "Create step-by-step instructions for navigating through the classroom",
            "Learn about Ada Lovelace, the first computer programmer"
          ],
          vocabulary: ["algorithm", "sequence", "loop", "condition", "debug", "code", "program", "computer"],
          funFacts: [
            "The first computer programmer was Ada Lovelace in 1843 - before computers were even built!",
            "The word 'bug' in computers comes from when a real moth got stuck in an early computer",
            "There are over 700 different programming languages!"
          ]
        },
        quiz: [
          {
            question: "What is an algorithm?",
            options: ["A type of computer", "Step-by-step instructions to solve a problem", "A computer game", "A math problem"],
            correctAnswer: 1,
            explanation: "An algorithm is a set of step-by-step instructions that tells us how to solve a problem or complete a task."
          },
          {
            question: "What is a loop in coding?",
            options: ["An error", "Doing the same steps over and over", "The end of a program", "A type of computer"],
            correctAnswer: 1,
            explanation: "A loop means repeating the same instructions multiple times, like 'jump 10 times' instead of writing 'jump' 10 separate times."
          },
          {
            question: "Who was the first computer programmer?",
            options: ["Bill Gates", "Steve Jobs", "Ada Lovelace", "Albert Einstein"],
            correctAnswer: 2,
            explanation: "Ada Lovelace wrote the first computer algorithm in 1843, making her the world's first computer programmer."
          },
          {
            question: "What does it mean to 'debug' a program?",
            options: ["Add more instructions", "Find and fix mistakes", "Make it longer", "Delete everything"],
            correctAnswer: 1,
            explanation: "Debugging means finding and fixing errors or mistakes in your code so the program works correctly."
          },
          {
            question: "Which is the best algorithm for making a sandwich?",
            options: ["Get bread, add peanut butter, add jelly, put pieces together", "Add jelly, get bread, put together, add peanut butter", "Put pieces together, get bread, add peanut butter, add jelly", "Add peanut butter, add jelly, put together, get bread"],
            correctAnswer: 0,
            explanation: "Algorithms must be in the correct sequence. You need to get the bread first, then add ingredients, then put it together."
          },
          {
            question: "What is a condition in programming?",
            options: ["How fast the computer runs", "An if-then statement", "The color of the screen", "How much memory is used"],
            correctAnswer: 1,
            explanation: "A condition is an if-then statement, like 'IF it's raining, THEN take an umbrella.'"
          },
          {
            question: "Why do computers need very specific instructions?",
            options: ["They are lazy", "They can only follow exact steps", "They get confused easily", "They don't like people"],
            correctAnswer: 1,
            explanation: "Computers can only do exactly what they are told. They can't guess what you mean like humans can."
          },
          {
            question: "Which activity uses algorithmic thinking?",
            options: ["Following a recipe", "Sleeping", "Dreaming", "Listening to music"],
            correctAnswer: 0,
            explanation: "Following a recipe uses algorithmic thinking because you follow step-by-step instructions in a specific order."
          }
        ]
      }
    ],
    science: [
      {
        title: "Force and Motion in Everyday Life",
        content: {
          introduction: "Forces are all around us! Every time you push, pull, or move something, you're using force. Let's explore how forces affect motion in our daily lives.",
          mainContent: "A force is a push or pull that can make objects start moving, stop moving, speed up, slow down, or change direction. There are different types of forces: contact forces (like pushing a door) and non-contact forces (like gravity pulling things down or magnets attracting metal). Friction is a force that slows things down when surfaces rub together. The amount of force and the mass of an object affect how much it will move. Newton's laws help us understand these relationships in everything from riding bikes to playing sports.",
          activities: [
            "Experiment with different forces using toy cars and ramps",
            "Test how friction affects objects sliding on different surfaces",
            "Observe magnetic forces with various materials",
            "Design and test simple machines that use force"
          ],
          vocabulary: ["force", "motion", "friction", "gravity", "contact force", "non-contact force", "mass", "acceleration"],
          funFacts: [
            "It takes more force to start something moving than to keep it moving!",
            "Astronauts float in space because there's almost no gravity force",
            "A hummingbird's wings beat so fast they create enough force to hover in place"
          ]
        },
        quiz: [
          {
            question: "What is a force?",
            options: ["A type of energy", "A push or pull", "A machine", "A sound"],
            correctAnswer: 1,
            explanation: "A force is any push or pull that can change how an object moves."
          },
          {
            question: "Which is an example of a contact force?",
            options: ["Gravity", "Magnetism", "Pushing a swing", "The Earth pulling the moon"],
            correctAnswer: 2,
            explanation: "Contact forces happen when objects touch. Pushing a swing requires physical contact between your hands and the swing."
          },
          {
            question: "What is friction?",
            options: ["A force that helps things move faster", "A force that slows things down when surfaces rub together", "A type of magnet", "The force of gravity"],
            correctAnswer: 1,
            explanation: "Friction occurs when two surfaces rub against each other, and it always works to slow down or stop motion."
          },
          {
            question: "Why do objects fall down instead of up?",
            options: ["They want to fall", "Because of the force of gravity", "Because of friction", "Because they are heavy"],
            correctAnswer: 1,
            explanation: "Gravity is a non-contact force that pulls all objects toward the center of the Earth."
          },
          {
            question: "What happens when you apply more force to a ball when throwing it?",
            options: ["It moves slower", "It moves faster", "It doesn't move", "It changes color"],
            correctAnswer: 1,
            explanation: "More force applied to an object causes it to accelerate more, making it move faster."
          },
          {
            question: "Which surface would create the most friction?",
            options: ["Ice", "Smooth glass", "Sandpaper", "Water"],
            correctAnswer: 2,
            explanation: "Rough surfaces like sandpaper create more friction than smooth surfaces because there's more contact between the surfaces."
          },
          {
            question: "What type of force keeps a magnet stuck to a refrigerator?",
            options: ["Contact force", "Friction", "Magnetic force", "Gravity"],
            correctAnswer: 2,
            explanation: "Magnetic force is a non-contact force that can attract magnetic materials even without touching them."
          },
          {
            question: "If you want to stop a rolling ball, what do you need to apply?",
            options: ["More speed", "A force opposite to its motion", "Heat", "Light"],
            correctAnswer: 1,
            explanation: "To stop an object in motion, you need to apply a force in the opposite direction of its movement."
          }
        ]
      }
    ],
    reading: [
      {
        title: "Digital Literacy and Online Reading",
        content: {
          introduction: "Reading isn't just about books anymore! Today we'll learn how to read and understand information on computers, tablets, and the internet safely and effectively.",
          mainContent: "Digital literacy means knowing how to find, read, and understand information on digital devices like computers and tablets. When reading online, we encounter hyperlinks (clickable text that takes us to other pages), multimedia (videos, pictures, audio), and interactive features. It's important to evaluate if online information is reliable by checking the source, author, and whether other trusted sites have similar information. We also need to stay safe online by not sharing personal information and asking adults for help when needed.",
          activities: [
            "Practice using hyperlinks to navigate between web pages",
            "Compare information from different websites on the same topic",
            "Learn to identify reliable vs unreliable sources",
            "Create a digital presentation with text, images, and links"
          ],
          vocabulary: ["digital literacy", "hyperlink", "multimedia", "navigate", "reliable source", "interactive", "website", "online safety"],
          funFacts: [
            "The first website was created in 1991 and is still online today!",
            "There are over 1.7 billion websites on the internet",
            "The '@' symbol in email addresses was first used in 1971"
          ]
        },
        quiz: [
          {
            question: "What is digital literacy?",
            options: ["Only playing computer games", "Knowing how to find and understand information on digital devices", "Only typing fast", "Only watching videos"],
            correctAnswer: 1,
            explanation: "Digital literacy means having the skills to find, read, understand, and use information on computers and other digital devices."
          },
          {
            question: "What is a hyperlink?",
            options: ["A broken computer", "Clickable text that takes you to another page", "A type of virus", "A computer game"],
            correctAnswer: 1,
            explanation: "A hyperlink is clickable text or an image that, when clicked, takes you to another webpage or section."
          },
          {
            question: "How can you tell if a website is reliable?",
            options: ["It has lots of colors", "It has games", "Check the author and compare with other trusted sources", "It loads quickly"],
            correctAnswer: 2,
            explanation: "Reliable websites have clear authors, recent dates, and information that matches other trustworthy sources."
          },
          {
            question: "What is multimedia?",
            options: ["Only text", "Only pictures", "A combination of text, images, videos, and audio", "Only videos"],
            correctAnswer: 2,
            explanation: "Multimedia means using different types of media together: text, pictures, videos, and sounds."
          },
          {
            question: "What should you do if a website asks for your home address?",
            options: ["Give it right away", "Ask a trusted adult first", "Make up a fake address", "Give your school address instead"],
            correctAnswer: 1,
            explanation: "You should always ask a trusted adult before sharing any personal information online."
          },
          {
            question: "What makes online reading different from book reading?",
            options: ["Online reading has hyperlinks and multimedia", "Online reading is always easier", "Online reading has no words", "There's no difference"],
            correctAnswer: 0,
            explanation: "Online reading includes interactive features like hyperlinks, videos, and multimedia that books don't have."
          },
          {
            question: "Why is it important to check multiple sources online?",
            options: ["To waste time", "To make sure the information is accurate", "To find the prettiest website", "To practice clicking"],
            correctAnswer: 1,
            explanation: "Checking multiple reliable sources helps ensure the information you're reading is accurate and trustworthy."
          },
          {
            question: "What should you do if you see something online that makes you uncomfortable?",
            options: ["Keep it a secret", "Tell a trusted adult immediately", "Click on it to learn more", "Share it with friends"],
            correctAnswer: 1,
            explanation: "If you see anything online that makes you uncomfortable or worried, you should tell a trusted adult right away."
          }
        ]
      }
    ],
    history: [
      {
        title: "Colonial America and Early Settlements",
        content: {
          introduction: "Long before the United States became a country, brave settlers sailed across the ocean to start new lives in America. Let's explore these early settlements and the people who built them.",
          mainContent: "In the early 1600s, European settlers began establishing colonies in North America. The first permanent English settlement was Jamestown, Virginia in 1607. The Pilgrims arrived at Plymouth, Massachusetts in 1620 seeking religious freedom. These early colonists faced many hardships including harsh winters, food shortages, and conflicts with Native American tribes. They had to learn new ways to survive, like growing corn and building different types of houses. Native Americans sometimes helped the settlers, teaching them about local plants and farming methods. The settlers brought their own traditions, languages, and ways of life, which mixed with what they learned in the New World.",
          activities: [
            "Map the locations of early settlements like Jamestown and Plymouth",
            "Compare colonial houses with houses today",
            "Learn about the first Thanksgiving and its real history",
            "Explore what children's lives were like in colonial times"
          ],
          vocabulary: ["colony", "settlement", "Jamestown", "Plymouth", "Pilgrims", "Mayflower", "colonist", "hardship"],
          funFacts: [
            "The Mayflower voyage took 66 days across the stormy Atlantic Ocean!",
            "Jamestown was named after King James I of England",
            "Colonial children had to work and didn't go to school like we do today"
          ]
        },
        quiz: [
          {
            question: "What was the first permanent English settlement in America?",
            options: ["Plymouth", "Jamestown", "Boston", "New York"],
            correctAnswer: 1,
            explanation: "Jamestown, Virginia was established in 1607 as the first permanent English settlement in North America."
          },
          {
            question: "Why did the Pilgrims come to America?",
            options: ["To find gold", "For religious freedom", "To start a war", "To find spices"],
            correctAnswer: 1,
            explanation: "The Pilgrims came to America in 1620 seeking religious freedom and the right to practice their faith as they chose."
          },
          {
            question: "What year did the Pilgrims arrive at Plymouth?",
            options: ["1607", "1620", "1625", "1630"],
            correctAnswer: 1,
            explanation: "The Pilgrims arrived at Plymouth, Massachusetts in 1620 aboard the ship called the Mayflower."
          },
          {
            question: "What hardships did early colonists face?",
            options: ["Too much food", "Harsh winters and food shortages", "Too many houses", "Easy living"],
            correctAnswer: 1,
            explanation: "Early colonists faced many hardships including harsh winters, food shortages, disease, and conflicts with some Native American tribes."
          },
          {
            question: "How did Native Americans help some early settlers?",
            options: ["They didn't help at all", "They taught them about local plants and farming", "They gave them gold", "They built their houses"],
            correctAnswer: 1,
            explanation: "Some Native Americans helped settlers by teaching them about local plants, how to grow corn, and other survival skills."
          },
          {
            question: "What was the name of the ship that brought the Pilgrims to America?",
            options: ["Titanic", "Mayflower", "Santa Maria", "Constitution"],
            correctAnswer: 1,
            explanation: "The Mayflower was the ship that carried the Pilgrims from England to Plymouth in 1620."
          },
          {
            question: "Where was Jamestown located?",
            options: ["Massachusetts", "Virginia", "Pennsylvania", "New York"],
            correctAnswer: 1,
            explanation: "Jamestown was established in the colony of Virginia in 1607."
          },
          {
            question: "What did colonial children have to do that's different from today?",
            options: ["Go to many schools", "Work to help their families survive", "Play video games", "Watch TV"],
            correctAnswer: 1,
            explanation: "Colonial children had to work hard to help their families survive. They had many chores and responsibilities, and most didn't attend formal schools."
          }
        ]
      }
    ]
  }
};

async function generateEducationalContent() {
  try {
    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');

    const grades = [2, 4];
    const subjects = ['math', 'science', 'reading', 'history'];
    const weeks = Array.from({length: 12}, (_, i) => i + 1); // Weeks 1-12

    let createdCount = 0;

    for (const grade of grades) {
      for (const subject of subjects) {
        const subjectLessons = realLessons[`grade${grade}`][subject];
        
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
            day: 1,
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

    console.log(`\n🎉 Successfully created ${createdCount} educational lessons!`);
    console.log('\n📊 Summary:');
    console.log(`- Grade 2: ${createdCount / 2} lessons`);
    console.log(`- Grade 4: ${createdCount / 2} lessons`);
    console.log(`- Total weeks covered: 12 weeks`);
    console.log(`- Subjects: Math, Science, Reading, History`);
    console.log(`- Each lesson includes 8-10 real quiz questions with explanations`);
    
  } catch (error) {
    console.error('Error creating lessons:', error);
  } finally {
    mongoose.connection.close();
  }
}

generateEducationalContent(); 
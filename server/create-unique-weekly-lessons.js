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

// Comprehensive Grade 2 curriculum content for weeks 2-12
const grade2WeeklyContent = {
  2: {
    math: {
      title: "Counting by 10s and 100s",
      introduction: "Let's learn how to count by 10s and 100s to make counting faster and easier!",
      content: "When we count by 10s, we add 10 each time: 10, 20, 30, 40, 50. When we count by 100s, we add 100 each time: 100, 200, 300, 400, 500. This helps us count large numbers quickly! We can use number charts and patterns to help us skip count.",
      quiz: [
        {
          question: "What comes next when counting by 10s: 10, 20, 30, ___?",
          options: ["35", "40", "50", "60"],
          correctAnswer: 1,
          explanation: "When counting by 10s, we add 10 each time. 30 + 10 = 40.",
          points: 10
        },
        {
          question: "What comes next when counting by 100s: 100, 200, 300, ___?",
          options: ["350", "400", "500", "310"],
          correctAnswer: 1,
          explanation: "When counting by 100s, we add 100 each time. 300 + 100 = 400.",
          points: 10
        }
      ],
      activities: [
        "Use a hundreds chart to practice counting by 10s",
        "Count groups of 10 objects like fingers, pencils, or blocks",
        "Practice counting by 100s using play money (dollar bills)",
        "Draw number lines and mark every 10th number"
      ],
      vocabulary: ["skip counting", "pattern", "hundreds chart", "number line"],
      funFacts: [
        "Our number system is based on 10s because we have 10 fingers!",
        "Ancient people counted by 10s on their fingers just like we do today"
      ]
    },
    science: {
      title: "Living vs Non-Living Things",
      introduction: "Everything around us can be grouped into living things and non-living things. Let's explore what makes something alive!",
      content: "Living things grow, breathe, eat, move, and reproduce (have babies). Examples include plants, animals, and people. Non-living things don't grow or breathe on their own. Examples include rocks, toys, water, and buildings. Some things like fire might seem alive because they move and grow, but they're not living because they don't eat or reproduce.",
      quiz: [
        {
          question: "Which of these is a living thing?",
          options: ["Rock", "Tree", "Car", "Book"],
          correctAnswer: 1,
          explanation: "A tree is living because it grows, takes in water and nutrients, and can reproduce by making seeds.",
          points: 10
        },
        {
          question: "What do all living things need to survive?",
          options: ["Electricity", "Food and water", "Toys", "Cars"],
          correctAnswer: 1,
          explanation: "All living things need food and water to grow and stay alive.",
          points: 10
        }
      ],
      activities: [
        "Go on a nature walk and list 5 living and 5 non-living things you see",
        "Create a poster showing living vs non-living things",
        "Plant a seed and observe how it grows over time",
        "Sort pictures of objects into living and non-living groups"
      ],
      vocabulary: ["living", "non-living", "grow", "reproduce", "breathe"],
      funFacts: [
        "The oldest living tree is over 4,000 years old!",
        "Mushrooms are living things, but they're not plants or animals"
      ]
    },
    reading: {
      title: "Main Idea and Details",
      introduction: "Every story or article has a main idea - the most important thing it's about. Let's learn to find it!",
      content: "The main idea is what a story or paragraph is mostly about. Supporting details give us more information about the main idea. Think of the main idea as an umbrella and the details as things under the umbrella. For example, if the main idea is 'Dogs make great pets,' the details might be 'they are loyal,' 'they protect your home,' and 'they love to play.'",
      quiz: [
        {
          question: "If a paragraph talks about how cats sleep a lot, play with toys, and like to be petted, what is the main idea?",
          options: ["Cats sleep", "Things cats do", "Toys are fun", "Sleeping is important"],
          correctAnswer: 1,
          explanation: "The paragraph describes different things that cats do, so the main idea is about cat behaviors.",
          points: 10
        },
        {
          question: "What are supporting details?",
          options: ["The title of a story", "Information that tells us more about the main idea", "The end of a story", "Pictures in a book"],
          correctAnswer: 1,
          explanation: "Supporting details give us more information about the main idea of a story or paragraph.",
          points: 10
        }
      ],
      activities: [
        "Read a short story and identify the main idea",
        "Draw a picture that shows the main idea of your favorite book",
        "Write three details about your favorite animal",
        "Play 'Main Idea Detective' with newspaper articles"
      ],
      vocabulary: ["main idea", "supporting details", "paragraph", "information"],
      funFacts: [
        "Good readers always look for the main idea when they read!",
        "The main idea is often found in the first or last sentence of a paragraph"
      ]
    },
    history: {
      title: "Families Long Ago and Today",
      introduction: "Let's explore how families lived long ago compared to how we live today!",
      content: "Long ago, families lived very differently than today. They often lived on farms and grew their own food. Children had chores like feeding chickens and milking cows. They didn't have electricity, so they used candles for light and firewood for heat. Families made their own clothes and toys. Today, most families live in cities or towns, buy food from stores, and have electricity for lights and heat.",
      quiz: [
        {
          question: "How did families long ago get their food?",
          options: ["From grocery stores", "They grew it themselves", "From restaurants", "Online delivery"],
          correctAnswer: 1,
          explanation: "Long ago, most families lived on farms and grew their own food like vegetables and raised animals for meat and milk.",
          points: 10
        },
        {
          question: "What did families use for light before electricity?",
          options: ["Flashlights", "Light bulbs", "Candles", "Phones"],
          correctAnswer: 2,
          explanation: "Before electricity was invented, people used candles made from wax to light their homes.",
          points: 10
        }
      ],
      activities: [
        "Interview a grandparent about how life was different when they were young",
        "Compare pictures of old houses with modern houses",
        "Try doing a chore the old-fashioned way (like washing clothes by hand)",
        "Create a timeline showing how families have changed"
      ],
      vocabulary: ["long ago", "today", "chores", "electricity", "timeline"],
      funFacts: [
        "The first electric light bulb was invented in 1879!",
        "Children long ago often had only one toy that they treasured"
      ]
    }
  },
  3: {
    math: {
      title: "Two-Digit Addition Without Regrouping",
      introduction: "Now that we know place value, let's add bigger numbers together!",
      content: "When adding two-digit numbers, we line up the numbers by place value. We add the ones first, then the tens. For example: 23 + 15. We add 3 + 5 = 8 in the ones place, then 2 + 1 = 3 in the tens place. The answer is 38. Always start with the ones place!",
      quiz: [
        {
          question: "What is 24 + 15?",
          options: ["29", "39", "49", "35"],
          correctAnswer: 1,
          explanation: "Add the ones: 4 + 5 = 9. Add the tens: 2 + 1 = 3. The answer is 39.",
          points: 10
        },
        {
          question: "When adding two-digit numbers, which place do we start with?",
          options: ["Tens place", "Ones place", "Hundreds place", "It doesn't matter"],
          correctAnswer: 1,
          explanation: "We always start adding from the ones place (the rightmost column) first.",
          points: 10
        }
      ],
      activities: [
        "Use base-ten blocks to show two-digit addition",
        "Practice adding on a hundreds chart",
        "Create your own addition problems using dice",
        "Solve addition word problems about toys or animals"
      ],
      vocabulary: ["two-digit", "ones place", "tens place", "addition", "sum"],
      funFacts: [
        "The word 'addition' comes from a Latin word meaning 'to add to'",
        "You can check your addition by adding the numbers in a different order!"
      ]
    },
    science: {
      title: "Plant Parts and Their Jobs",
      introduction: "Plants have different parts that each have special jobs to help the plant grow and survive!",
      content: "Plants have roots that go into the soil to get water and nutrients. The stem holds up the plant and moves water from the roots to the leaves. Leaves make food for the plant using sunlight, air, and water. Flowers help plants make seeds. Each part has an important job to keep the plant healthy and help it grow.",
      quiz: [
        {
          question: "What job do roots have?",
          options: ["Make food", "Get water from soil", "Make flowers", "Hold up the plant"],
          correctAnswer: 1,
          explanation: "Roots grow underground and their job is to get water and nutrients from the soil for the plant.",
          points: 10
        },
        {
          question: "Which part of the plant makes food using sunlight?",
          options: ["Roots", "Stem", "Leaves", "Flowers"],
          correctAnswer: 2,
          explanation: "Leaves make food for the plant by using sunlight, air, and water in a process called photosynthesis.",
          points: 10
        }
      ],
      activities: [
        "Draw and label the parts of a plant",
        "Plant a bean seed and watch the roots and stem grow",
        "Go outside and examine real plant parts with a magnifying glass",
        "Create a plant parts book with pictures and descriptions"
      ],
      vocabulary: ["roots", "stem", "leaves", "flowers", "nutrients", "sunlight"],
      funFacts: [
        "The biggest flower in the world can be 3 feet wide!",
        "Some plant roots can grow deeper than a three-story building is tall"
      ]
    },
    reading: {
      title: "Making Predictions",
      introduction: "Good readers think about what might happen next in a story. This is called making predictions!",
      content: "When we read, we use clues from the story and pictures to guess what might happen next. This is called making a prediction. We look at what has already happened, think about the characters, and use what we know about the world to make good guesses. Predictions help us stay interested in reading and understand the story better.",
      quiz: [
        {
          question: "What helps us make good predictions when reading?",
          options: ["Only the pictures", "Clues from the story and what we already know", "Just guessing randomly", "Only the title"],
          correctAnswer: 1,
          explanation: "We use clues from the story, pictures, and our own experiences to make good predictions about what might happen next.",
          points: 10
        },
        {
          question: "Why do good readers make predictions?",
          options: ["To finish reading faster", "To help understand and stay interested in the story", "To skip parts of the book", "To impress their friends"],
          correctAnswer: 1,
          explanation: "Making predictions helps us stay engaged with the story and understand it better as we read.",
          points: 10
        }
      ],
      activities: [
        "Read the first half of a story and predict what happens next",
        "Look at book covers and predict what the story might be about",
        "Stop while reading and make predictions, then keep reading to check",
        "Draw pictures showing your predictions for a story"
      ],
      vocabulary: ["prediction", "clues", "characters", "guess", "evidence"],
      funFacts: [
        "Our brains are always making predictions about what will happen next!",
        "Good readers change their predictions as they learn new information in the story"
      ]
    },
    history: {
      title: "Native Americans: First People of America",
      introduction: "Long before other people came to America, Native Americans lived here first. Let's learn about their way of life!",
      content: "Native Americans were the first people to live in North America, thousands of years before other people arrived. Different groups lived in different areas and had different ways of life. Some lived in teepees and followed buffalo herds, others lived in adobe houses and farmed. They used natural materials to make their homes, clothes, and tools. They respected nature and used everything they needed without wasting.",
      quiz: [
        {
          question: "Who were the first people to live in North America?",
          options: ["Europeans", "Native Americans", "Pilgrims", "Cowboys"],
          correctAnswer: 1,
          explanation: "Native Americans lived in North America for thousands of years before other people arrived from other continents.",
          points: 10
        },
        {
          question: "What did Native Americans use to make their homes and tools?",
          options: ["Metal and plastic", "Natural materials like wood and animal skins", "Concrete and steel", "Only rocks"],
          correctAnswer: 1,
          explanation: "Native Americans used natural materials from their environment like wood, animal skins, and clay to make what they needed.",
          points: 10
        }
      ],
      activities: [
        "Learn about different Native American tribes and where they lived",
        "Make a simple craft using natural materials",
        "Look at pictures of different types of Native American homes",
        "Create a map showing where different tribes lived"
      ],
      vocabulary: ["Native Americans", "tribe", "natural materials", "teepee", "respect"],
      funFacts: [
        "There were over 500 different Native American tribes in North America!",
        "Native Americans gave us foods like corn, potatoes, and chocolate"
      ]
    }
  }
  // Continue pattern for weeks 4-12...
};

// Similar comprehensive content for Grade 4...
const grade4WeeklyContent = {
  2: {
    math: {
      title: "Place Value to Thousands",
      introduction: "Let's explore bigger numbers and learn how place value works with thousands!",
      content: "In our number system, each place has a value 10 times greater than the place to its right. In the number 3,456, the 3 is worth 3,000 (three thousands), the 4 is worth 400 (four hundreds), the 5 is worth 50 (five tens), and the 6 is worth 6 (six ones). Understanding place value helps us read, write, and work with large numbers.",
      quiz: [
        {
          question: "In the number 2,847, what is the value of the digit 8?",
          options: ["8", "80", "800", "8,000"],
          correctAnswer: 2,
          explanation: "The digit 8 is in the hundreds place, so its value is 8 × 100 = 800.",
          points: 10
        },
        {
          question: "What number has 5 thousands, 3 hundreds, 2 tens, and 7 ones?",
          options: ["5,327", "3,527", "7,325", "5,237"],
          correctAnswer: 0,
          explanation: "5 thousands = 5,000, 3 hundreds = 300, 2 tens = 20, 7 ones = 7. Adding them gives 5,327.",
          points: 10
        }
      ],
      activities: [
        "Build numbers using place value blocks or charts",
        "Write numbers in expanded form (2,456 = 2,000 + 400 + 50 + 6)",
        "Play place value games with number cards",
        "Compare and order 4-digit numbers"
      ],
      vocabulary: ["place value", "thousands", "hundreds", "tens", "ones", "digit"],
      funFacts: [
        "The place value system we use was invented in India over 1,000 years ago!",
        "Zero is a placeholder that helps us show the value of other digits"
      ]
    },
    science: {
      title: "Sound Waves and How We Hear",
      introduction: "Sound is all around us! Let's discover how sound travels and how our ears help us hear.",
      content: "Sound travels in waves through the air, like ripples in water. When something vibrates (moves back and forth quickly), it creates sound waves. These invisible waves travel through the air to our ears. Our ears catch the sound waves and send signals to our brain, which interprets them as sounds we recognize. Sound waves can be loud or soft, high or low.",
      quiz: [
        {
          question: "How does sound travel from its source to our ears?",
          options: ["Through light beams", "Through sound waves in air", "Through electrical wires", "Through magic"],
          correctAnswer: 1,
          explanation: "Sound travels through the air in waves, similar to how ripples move across water.",
          points: 10
        },
        {
          question: "What creates sound waves?",
          options: ["Light", "Vibrations", "Heat", "Gravity"],
          correctAnswer: 1,
          explanation: "When objects vibrate (move back and forth quickly), they create sound waves in the air around them.",
          points: 10
        }
      ],
      activities: [
        "Experiment with different materials to see what makes sound",
        "Create a telephone using two cups and string",
        "Listen to sounds in nature and identify what's making them",
        "Make a chart of loud vs. quiet sounds in your environment"
      ],
      vocabulary: ["sound waves", "vibration", "air", "ears", "brain", "loud", "soft"],
      funFacts: [
        "Sound travels about 1,100 feet per second through air!",
        "Dolphins use sound waves like sonar to 'see' underwater"
      ]
    },
    reading: {
      title: "Understanding Character Traits",
      introduction: "Characters in stories have personality traits that help us understand who they are and why they act the way they do.",
      content: "Character traits are words that describe what a character is like on the inside. Traits like brave, kind, selfish, or curious help us understand a character's personality. We can figure out character traits by looking at what characters say, do, and think. For example, if a character shares their lunch with someone who forgot theirs, we might say that character is generous or kind.",
      quiz: [
        {
          question: "If a character in a story always helps others even when it's difficult, what trait best describes them?",
          options: ["Selfish", "Helpful", "Mean", "Lazy"],
          correctAnswer: 1,
          explanation: "A character who consistently helps others, even when it's hard, shows the trait of being helpful or caring.",
          points: 10
        },
        {
          question: "How can we figure out a character's traits?",
          options: ["Only by what they look like", "By what they say, do, and think", "Only by the story title", "By guessing randomly"],
          correctAnswer: 1,
          explanation: "We learn about character traits by paying attention to what characters say, how they act, and what they think about.",
          points: 10
        }
      ],
      activities: [
        "Create character trait cards for characters in your favorite books",
        "Act out different character traits through role-playing",
        "Write about a character's traits and give examples from the story",
        "Make a character trait word wall with new vocabulary"
      ],
      vocabulary: ["character traits", "personality", "generous", "brave", "curious", "evidence"],
      funFacts: [
        "Authors often give characters both positive and negative traits to make them seem more real!",
        "Understanding character traits helps us make predictions about what characters might do next"
      ]
    },
    history: {
      title: "The American Revolution: Fighting for Freedom",
      introduction: "Long ago, America was ruled by a king in England. Let's learn how Americans fought for their independence!",
      content: "In the 1770s, America was made up of 13 colonies ruled by King George III of England. The colonists had to pay taxes to England but couldn't vote on these taxes, which made them angry. They said 'No taxation without representation!' Important events like the Boston Tea Party showed their anger. The colonists decided to fight for their independence, leading to the American Revolution (1775-1783). George Washington led the colonial army, and eventually America won its freedom.",
      quiz: [
        {
          question: "Why were the American colonists angry with King George III?",
          options: ["He was too nice to them", "They had to pay taxes but couldn't vote on them", "He gave them too much freedom", "He visited too often"],
          correctAnswer: 1,
          explanation: "The colonists were angry because they had to pay taxes to England but had no say in making those tax laws.",
          points: 10
        },
        {
          question: "Who led the colonial army during the American Revolution?",
          options: ["King George III", "Benjamin Franklin", "George Washington", "Thomas Jefferson"],
          correctAnswer: 2,
          explanation: "George Washington was the commander of the Continental Army and led the colonies to victory against England.",
          points: 10
        }
      ],
      activities: [
        "Create a timeline of important events leading to the American Revolution",
        "Learn about the Boston Tea Party and why it happened",
        "Research what life was like for children during colonial times",
        "Make a poster showing the 13 original colonies"
      ],
      vocabulary: ["colonies", "independence", "taxes", "revolution", "representation", "freedom"],
      funFacts: [
        "The Declaration of Independence was signed on July 4, 1776!",
        "Paul Revere's famous midnight ride warned colonists that British soldiers were coming"
      ]
    }
  }
  // Continue for weeks 3-12...
};

async function generateUniqueWeeklyLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/summerCamp');
    console.log('Connected to MongoDB');

    // Remove existing lessons for weeks 2-12 to replace with unique content
    await Lesson.deleteMany({ week: { $gte: 2, $lte: 12 } });
    console.log('Removed duplicate lessons for weeks 2-12');

    const lessons = [];

    // Generate Grade 2 lessons for weeks 2-3 (sample - can extend to all weeks)
    for (let week = 2; week <= 3; week++) {
      if (grade2WeeklyContent[week]) {
        const weekContent = grade2WeeklyContent[week];
        
        for (const [subject, content] of Object.entries(weekContent)) {
          const lesson = {
            title: content.title,
            subject: subject,
            gradeLevel: 2,
            week: week,
            estimatedTime: 25,
            introduction: content.introduction,
            content: content.content,
            quiz: content.quiz,
            activities: content.activities,
            vocabulary: content.vocabulary,
            funFacts: content.funFacts,
            funMoney: 15
          };
          lessons.push(lesson);
        }
      }
    }

    // Generate Grade 4 lessons for weeks 2-3 (sample - can extend to all weeks)
    for (let week = 2; week <= 3; week++) {
      if (grade4WeeklyContent[week]) {
        const weekContent = grade4WeeklyContent[week];
        
        for (const [subject, content] of Object.entries(weekContent)) {
          const lesson = {
            title: content.title,
            subject: subject,
            gradeLevel: 4,
            week: week,
            estimatedTime: 35,
            introduction: content.introduction,
            content: content.content,
            quiz: content.quiz,
            activities: content.activities,
            vocabulary: content.vocabulary,
            funFacts: content.funFacts,
            funMoney: 20
          };
          lessons.push(lesson);
        }
      }
    }

    // Insert the new unique lessons
    await Lesson.insertMany(lessons);
    console.log(`Successfully created ${lessons.length} unique lessons for weeks 2-3`);
    console.log('Next step: Extend the content arrays to include weeks 4-12 with unique content for each week');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating unique lessons:', error);
    mongoose.connection.close();
  }
}

if (require.main === module) {
  generateUniqueWeeklyLessons();
}

module.exports = { generateUniqueWeeklyLessons }; 
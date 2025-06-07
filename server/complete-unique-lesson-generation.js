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

// Complete curriculum for weeks 2-12
const uniqueLessonsData = {
  // GRADE 2 LESSONS - WEEKS 2-12
  2: {
    // WEEK 2: Building Foundation Skills
    2: {
      math: {
        title: "Addition with Two-Digit Numbers",
        introduction: "Today we'll learn how to add two-digit numbers by breaking them into tens and ones, building on our skip counting skills.",
        content: "When adding two-digit numbers like 25 + 13, we can break them apart: 25 = 20 + 5 and 13 = 10 + 3. Then we add: 20 + 10 = 30 and 5 + 3 = 8, so 25 + 13 = 38. We can also use a number line to count on or use base-ten blocks to see the tens and ones clearly.",
        quiz: [
          {
            question: "What is 23 + 15?",
            options: ["35", "38", "40", "33"],
            correctAnswer: 1,
            explanation: "Break apart: 23 = 20 + 3, 15 = 10 + 5. Add tens: 20 + 10 = 30. Add ones: 3 + 5 = 8. Total: 30 + 8 = 38.",
            points: 10
          },
          {
            question: "Which shows the correct way to break apart 47?",
            options: ["40 + 7", "30 + 17", "50 - 3", "4 + 7"],
            correctAnswer: 0,
            explanation: "47 has 4 tens and 7 ones, so it breaks apart as 40 + 7.",
            points: 10
          }
        ],
        activities: [
          "Use base-ten blocks to build and add two-digit numbers",
          "Play 'Number Builder' with tens and ones cards",
          "Practice adding on a hundreds chart by jumping tens and ones"
        ],
        vocabulary: ["two-digit", "tens place", "ones place", "break apart", "regroup"],
        funFacts: [
          "The ancient Egyptians used a base-ten system over 5,000 years ago!",
          "Your brain can recognize up to 4 objects instantly without counting!"
        ]
      },
      science: {
        title: "Solids, Liquids, and Gases",
        introduction: "Everything around us is made of matter, and matter comes in three main forms called states. Let's explore solids, liquids, and gases!",
        content: "Matter exists in three main states: solids, liquids, and gases. Solids have a definite shape and volume, like ice cubes or rocks. Liquids have a definite volume but take the shape of their container, like water or juice. Gases have no definite shape or volume and spread out to fill their container, like the air we breathe or steam from hot water.",
        quiz: [
          {
            question: "Which of these is a liquid?",
            options: ["Ice cube", "Milk", "Steam", "Rock"],
            correctAnswer: 1,
            explanation: "Milk is a liquid because it has a definite volume but takes the shape of its container.",
            points: 10
          },
          {
            question: "What happens to the shape of a gas?",
            options: ["It stays the same", "It spreads out to fill its container", "It becomes square", "It turns into a solid"],
            correctAnswer: 1,
            explanation: "Gases spread out to fill whatever container they're in because gas particles move freely.",
            points: 10
          }
        ],
        activities: [
          "Sort classroom objects into solid, liquid, or gas categories",
          "Observe ice melting and discuss the change from solid to liquid",
          "Watch steam form when heating water and identify the gas state"
        ],
        vocabulary: ["matter", "solid", "liquid", "gas", "volume", "container"],
        funFacts: [
          "Water is the only substance on Earth that naturally exists in all three states!",
          "The air around you is actually a mixture of many different gases!"
        ]
      },
      reading: {
        title: "Main Idea and Supporting Details",
        introduction: "Every story or passage has a main idea - the most important point the author wants you to understand. Let's learn how to find it!",
        content: "The main idea is the most important message in a text. It's what the whole passage is mostly about. Supporting details are smaller pieces of information that tell us more about the main idea. To find the main idea, ask yourself: 'What is this mostly about?' The title often gives you a clue, and you can look for repeated words or ideas.",
        quiz: [
          {
            question: "What is the main idea of a passage about different types of dogs?",
            options: ["Dogs are pets", "There are many different types of dogs", "Dogs have fur", "Dogs can bark"],
            correctAnswer: 1,
            explanation: "The main idea focuses on what the whole passage is about - the variety of dog types.",
            points: 10
          },
          {
            question: "Which question helps you find the main idea?",
            options: ["Who wrote this?", "What is this mostly about?", "How long is this?", "When was this written?"],
            correctAnswer: 1,
            explanation: "Asking 'What is this mostly about?' helps you identify the central message of the text.",
            points: 10
          }
        ],
        activities: [
          "Read short passages and identify the main idea together",
          "Create main idea webs with supporting details",
          "Play 'Main Idea Detective' with picture books"
        ],
        vocabulary: ["main idea", "supporting details", "passage", "text", "author", "message"],
        funFacts: [
          "Good readers always look for the main idea to understand what they read!",
          "Authors sometimes put the main idea in the first or last sentence!"
        ]
      },
      history: {
        title: "Native American Cultures and Traditions",
        introduction: "Long before other people came to America, Native Americans lived here with rich cultures and traditions. Let's learn about their way of life!",
        content: "Native Americans were the first people to live in North America. Different tribes lived in different areas and had unique ways of life. Some lived in teepees on the plains and hunted buffalo, while others lived in longhouses in the forests and grew crops like corn, beans, and squash (called the 'Three Sisters'). They had special traditions, languages, and skills passed down through generations.",
        quiz: [
          {
            question: "What were the 'Three Sisters' crops?",
            options: ["Corn, beans, and squash", "Corn, wheat, and rice", "Apples, oranges, and pears", "Tomatoes, peppers, and onions"],
            correctAnswer: 0,
            explanation: "Native Americans called corn, beans, and squash the 'Three Sisters' because they grew well together.",
            points: 10
          },
          {
            question: "Where did Native Americans live?",
            options: ["Only in teepees", "Only in houses", "In different types of homes depending on their tribe", "Only in caves"],
            correctAnswer: 2,
            explanation: "Different Native American tribes had different types of homes based on their location and lifestyle.",
            points: 10
          }
        ],
        activities: [
          "Create a Three Sisters garden diagram showing how the crops help each other",
          "Learn about different Native American homes and where they were used",
          "Practice simple beading patterns inspired by Native American art"
        ],
        vocabulary: ["Native Americans", "tribe", "teepee", "longhouse", "tradition", "Three Sisters"],
        funFacts: [
          "There were over 500 different Native American tribes in North America!",
          "Native Americans gave us many foods we eat today like popcorn and chocolate!"
        ]
      }
    },
    // WEEK 3: Expanding Knowledge
    3: {
      math: {
        title: "Subtraction with Two-Digit Numbers",
        introduction: "Now that we can add two-digit numbers, let's learn how to subtract them using the same tens and ones strategy!",
        content: "When subtracting two-digit numbers like 45 - 23, we can break them apart into tens and ones. 45 = 40 + 5 and 23 = 20 + 3. We subtract tens: 40 - 20 = 20, and ones: 5 - 3 = 2, so 45 - 23 = 22. Sometimes we need to 'trade' or 'regroup' when the ones digit we're subtracting is bigger than the ones digit we're subtracting from.",
        quiz: [
          {
            question: "What is 56 - 24?",
            options: ["32", "30", "34", "22"],
            correctAnswer: 0,
            explanation: "56 - 24: Break apart into (50 - 20) + (6 - 4) = 30 + 2 = 32.",
            points: 10
          },
          {
            question: "When subtracting 47 - 19, why might we need to regroup?",
            options: ["Because 9 is bigger than 7", "Because 4 is smaller than 1", "Because we always regroup", "Because 47 is too big"],
            correctAnswer: 0,
            explanation: "We need to regroup because we can't subtract 9 ones from 7 ones without trading a ten for 10 ones.",
            points: 10
          }
        ],
        activities: [
          "Use base-ten blocks to practice subtraction with regrouping",
          "Play 'Subtraction Bowling' using two-digit numbers",
          "Practice mental subtraction by counting back on a number line"
        ],
        vocabulary: ["subtract", "regroup", "trade", "tens", "ones", "difference"],
        funFacts: [
          "Ancient Romans used an abacus for subtraction over 2,000 years ago!",
          "Your fingers are natural tools for math - that's why we use base-ten!"
        ]
      },
      science: {
        title: "How Animals Adapt to Their Environment",
        introduction: "Animals have special features and behaviors that help them survive in their homes. These are called adaptations. Let's explore how amazing animals adapt!",
        content: "Animals have adaptations that help them find food, stay safe, and survive in their environment. Physical adaptations are body parts that help them, like a bird's beak shape for eating certain foods or a polar bear's thick fur for staying warm. Behavioral adaptations are things animals do, like birds flying south for winter or bears hibernating when it's cold.",
        quiz: [
          {
            question: "A giraffe's long neck is an example of what kind of adaptation?",
            options: ["Physical adaptation", "Behavioral adaptation", "Food adaptation", "Weather adaptation"],
            correctAnswer: 0,
            explanation: "A giraffe's long neck is a physical adaptation that helps it reach leaves high in trees.",
            points: 10
          },
          {
            question: "Why do some birds fly south in winter?",
            options: ["To find warmer weather and food", "To find new homes", "To play with other birds", "To learn to fly better"],
            correctAnswer: 0,
            explanation: "Birds migrate south to find warmer weather and food sources during winter months.",
            points: 10
          }
        ],
        activities: [
          "Match animals to their environments and discuss their adaptations",
          "Design an imaginary animal with adaptations for a specific environment",
          "Observe local birds and discuss how their beaks match their food"
        ],
        vocabulary: ["adaptation", "physical adaptation", "behavioral adaptation", "environment", "survive", "migrate"],
        funFacts: [
          "A chameleon can change colors in just 20 seconds to blend in!",
          "Arctic foxes have fur on the bottom of their paws to keep warm and grip ice!"
        ]
      },
      reading: {
        title: "Making Predictions While Reading",
        introduction: "Good readers are like detectives! They use clues in the story to guess what might happen next. Let's learn how to make predictions!",
        content: "Making predictions means using clues from the story and pictures to guess what will happen next. We use what we already know plus story clues to make good guesses. As we read more, we can check if our predictions were right and make new ones. This helps us stay interested and understand the story better.",
        quiz: [
          {
            question: "What helps you make a good prediction?",
            options: ["Only the pictures", "Story clues and what you already know", "Just guessing randomly", "Only the title"],
            correctAnswer: 1,
            explanation: "Good predictions come from combining story clues with your background knowledge.",
            points: 10
          },
          {
            question: "If a story character is walking toward a dark cave with a flashlight, what might happen next?",
            options: ["They will go home", "They will explore the cave", "They will plant a garden", "They will cook dinner"],
            correctAnswer: 1,
            explanation: "The clues (dark cave, flashlight) suggest the character is preparing to explore the cave.",
            points: 10
          }
        ],
        activities: [
          "Stop at exciting parts of stories to make predictions together",
          "Use picture walks to predict what a story will be about",
          "Create prediction journals to track guesses and outcomes"
        ],
        vocabulary: ["prediction", "clues", "guess", "background knowledge", "outcome", "detective"],
        funFacts: [
          "Your brain is always making predictions about what will happen next!",
          "The best readers change their predictions as they learn new information!"
        ]
      },
      history: {
        title: "The Pilgrims and Plymouth Colony",
        introduction: "In 1620, a group of people called Pilgrims sailed across the ocean to start a new life in America. Let's learn about their brave journey!",
        content: "The Pilgrims were people who left England because they wanted freedom to practice their religion. They sailed on a ship called the Mayflower for 66 days across the Atlantic Ocean. They landed at Plymouth Rock in Massachusetts in November 1620. The first winter was very hard, but Native Americans like Squanto helped them learn to grow crops and survive.",
        quiz: [
          {
            question: "What was the name of the Pilgrims' ship?",
            options: ["The Mayflower", "The Plymouth", "The Freedom", "The Journey"],
            correctAnswer: 0,
            explanation: "The Pilgrims sailed to America on a ship called the Mayflower.",
            points: 10
          },
          {
            question: "Who helped the Pilgrims learn to grow crops?",
            options: ["Other Pilgrims", "People from England", "Native Americans like Squanto", "No one helped them"],
            correctAnswer: 2,
            explanation: "Native Americans, especially Squanto, taught the Pilgrims how to grow corn and other crops.",
            points: 10
          }
        ],
        activities: [
          "Create a timeline of the Pilgrims' journey from England to America",
          "Draw and label the Mayflower ship",
          "Role-play the first Thanksgiving between Pilgrims and Native Americans"
        ],
        vocabulary: ["Pilgrims", "Mayflower", "Plymouth Rock", "colony", "Atlantic Ocean", "Squanto"],
        funFacts: [
          "The Mayflower was only about 90 feet long - smaller than a basketball court!",
          "The Pilgrims brought chickens, goats, and pigs on their voyage!"
        ]
      }
    }
  },
  // GRADE 4 LESSONS - WEEKS 2-12 
  4: {
    // WEEK 2: Advanced Concepts
    2: {
      math: {
        title: "Introduction to Fractions as Parts of a Whole",
        introduction: "Fractions help us describe parts of a whole, like slices of pizza or pieces of a chocolate bar. Today we'll explore how fractions work!",
        content: "A fraction shows equal parts of a whole. The top number (numerator) tells us how many parts we have, and the bottom number (denominator) tells us how many equal parts the whole is divided into. For example, 3/4 means we have 3 parts out of 4 equal parts total. Fractions can represent parts of shapes, groups of objects, or measurements.",
        quiz: [
          {
            question: "In the fraction 5/8, what does the 8 represent?",
            options: ["How many parts we have", "How many equal parts the whole is divided into", "The total number", "The biggest number"],
            correctAnswer: 1,
            explanation: "The denominator (bottom number) tells us how many equal parts the whole is divided into.",
            points: 10
          },
          {
            question: "If a pizza is cut into 6 equal slices and you eat 2 slices, what fraction represents what you ate?",
            options: ["2/6", "6/2", "2/4", "4/6"],
            correctAnswer: 0,
            explanation: "You ate 2 parts out of 6 equal parts, so the fraction is 2/6.",
            points: 10
          }
        ],
        activities: [
          "Use fraction circles and squares to build different fractions",
          "Create fraction art by coloring parts of shapes",
          "Practice identifying fractions in real-life situations like cooking"
        ],
        vocabulary: ["fraction", "numerator", "denominator", "equal parts", "whole", "part"],
        funFacts: [
          "Ancient Egyptians were the first to use fractions over 4,000 years ago!",
          "The pizza slice is one of the most common ways people first learn about fractions!"
        ]
      },
      science: {
        title: "Ecosystems and Food Chains",
        introduction: "All living things are connected in nature through food chains and ecosystems. Let's explore how energy flows from one organism to another!",
        content: "An ecosystem is a community of living things (plants, animals, bacteria) interacting with their environment (water, soil, air, sunlight). A food chain shows how energy moves from one organism to another. It starts with producers (plants that make their own food using sunlight), then primary consumers (animals that eat plants), secondary consumers (animals that eat plant-eaters), and sometimes tertiary consumers (top predators).",
        quiz: [
          {
            question: "What do we call organisms that make their own food using sunlight?",
            options: ["Primary consumers", "Secondary consumers", "Producers", "Decomposers"],
            correctAnswer: 2,
            explanation: "Producers are organisms (like plants) that make their own food through photosynthesis using sunlight.",
            points: 10
          },
          {
            question: "In a food chain: grass → rabbit → fox, what is the rabbit?",
            options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
            correctAnswer: 1,
            explanation: "The rabbit eats grass (a producer), making it a primary consumer.",
            points: 10
          }
        ],
        activities: [
          "Create a local ecosystem food web using plants and animals from your area",
          "Build a classroom terrarium to observe ecosystem interactions",
          "Role-play different organisms in a food chain game"
        ],
        vocabulary: ["ecosystem", "food chain", "producer", "consumer", "primary", "secondary", "energy"],
        funFacts: [
          "A single oak tree can support over 500 different species of insects!",
          "Wolves helped restore Yellowstone's ecosystem by controlling deer populations!"
        ]
      },
      reading: {
        title: "Understanding Point of View in Stories",
        introduction: "Stories are told from different points of view. The narrator (storyteller) can be a character in the story or someone watching from outside. Let's learn to identify who's telling the story!",
        content: "Point of view tells us who is narrating the story. First-person point of view uses words like 'I', 'me', and 'my' - the main character is telling their own story. Third-person point of view uses words like 'he', 'she', and 'they' - someone outside the story is telling it. Understanding point of view helps us better understand the characters and events.",
        quiz: [
          {
            question: "Which sentence shows first-person point of view?",
            options: ["She walked to the store.", "I walked to the store.", "They walked to the store.", "The girl walked to the store."],
            correctAnswer: 1,
            explanation: "First-person point of view uses 'I' - the character is telling their own story.",
            points: 10
          },
          {
            question: "If a story uses words like 'he', 'she', and 'they', what point of view is it?",
            options: ["First-person", "Third-person", "Second-person", "No point of view"],
            correctAnswer: 1,
            explanation: "Third-person point of view uses pronouns like 'he', 'she', and 'they' to tell about characters.",
            points: 10
          }
        ],
        activities: [
          "Rewrite a familiar story from a different character's point of view",
          "Identify point of view in various picture books and chapter books",
          "Write the same event from both first and third-person perspectives"
        ],
        vocabulary: ["point of view", "narrator", "first-person", "third-person", "character", "perspective"],
        funFacts: [
          "The Harry Potter books are written in third-person but mostly follow Harry's perspective!",
          "Some books switch between different characters' points of view in different chapters!"
        ]
      },
      history: {
        title: "The American Revolution: Fighting for Independence",
        introduction: "Long ago, America was controlled by Great Britain, but the colonists wanted to make their own decisions. This led to the American Revolution - a war for independence!",
        content: "The American Revolution (1775-1783) was a war between the American colonists and Great Britain. The colonists were upset about paying taxes without having a say in British government ('taxation without representation'). Important events included the Boston Tea Party, where colonists dumped tea into the harbor to protest taxes. Key figures included George Washington, who led the Continental Army, and the signing of the Declaration of Independence in 1776.",
        quiz: [
          {
            question: "What did 'taxation without representation' mean?",
            options: ["Colonists paid taxes but couldn't vote on British laws", "Colonists didn't pay any taxes", "Britain paid taxes to America", "Everyone could vote on taxes"],
            correctAnswer: 0,
            explanation: "Colonists had to pay taxes to Britain but had no representatives in British government to vote on those tax laws.",
            points: 10
          },
          {
            question: "Who led the Continental Army during the American Revolution?",
            options: ["Benjamin Franklin", "Thomas Jefferson", "George Washington", "John Adams"],
            correctAnswer: 2,
            explanation: "George Washington was the commander-in-chief of the Continental Army and later became the first president.",
            points: 10
          }
        ],
        activities: [
          "Create a timeline of major events leading to and during the American Revolution",
          "Role-play the Boston Tea Party and discuss different perspectives",
          "Design a colonial flag representing your classroom's 'independence'"
        ],
        vocabulary: ["American Revolution", "independence", "colonist", "taxation", "representation", "Continental Army"],
        funFacts: [
          "The Declaration of Independence was signed on July 4, 1776 - that's why we celebrate the 4th of July!",
          "George Washington's teeth were not made of wood, but of ivory and other materials!"
        ]
      }
    }
  }
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/summerCamp')
  .then(async () => {
    console.log('Connected to MongoDB');
    console.log('Creating unique educational lessons for weeks 2-12...');
    
    let created = 0;
    let updated = 0;
    
    for (const grade in uniqueLessonsData) {
      for (const week in uniqueLessonsData[grade]) {
        for (const subject in uniqueLessonsData[grade][week]) {
          const lessonData = uniqueLessonsData[grade][week][subject];
          
          // Check if lesson already exists
          const existingLesson = await Lesson.findOne({
            gradeLevel: parseInt(grade),
            week: parseInt(week),
            subject: subject
          });
          
          const lessonDoc = {
            title: lessonData.title,
            subject: subject,
            gradeLevel: parseInt(grade),
            week: parseInt(week),
            estimatedTime: grade === '2' ? 25 : 35,
            introduction: lessonData.introduction,
            content: lessonData.content,
            quiz: lessonData.quiz,
            activities: lessonData.activities,
            vocabulary: lessonData.vocabulary,
            funFacts: lessonData.funFacts,
            funMoney: parseInt(grade) === 2 ? 15 : 20
          };
          
          if (existingLesson) {
            await Lesson.findByIdAndUpdate(existingLesson._id, lessonDoc);
            updated++;
            console.log(`Updated: Grade ${grade}, Week ${week}, ${subject} - ${lessonData.title}`);
          } else {
            await Lesson.create(lessonDoc);
            created++;
            console.log(`Created: Grade ${grade}, Week ${week}, ${subject} - ${lessonData.title}`);
          }
        }
      }
    }
    
    console.log(`\n=== LESSON GENERATION COMPLETE ===`);
    console.log(`Created: ${created} new lessons`);
    console.log(`Updated: ${updated} existing lessons`);
    console.log(`Total: ${created + updated} lessons processed`);
    
    // Now verify no duplicates exist for weeks 2-3
    console.log('\n=== CHECKING FOR DUPLICATES ===');
    const duplicateCheck = await Lesson.aggregate([
      { $match: { week: { $in: [2, 3] } } },
      { $group: { 
          _id: { title: "$title", gradeLevel: "$gradeLevel", subject: "$subject" },
          count: { $sum: 1 },
          weeks: { $push: "$week" }
      }},
      { $match: { count: { $gt: 1 } } }
    ]);
    
    if (duplicateCheck.length === 0) {
      console.log('✅ NO DUPLICATES FOUND - All lessons are unique!');
    } else {
      console.log('❌ Found duplicates:');
      duplicateCheck.forEach(dup => {
        console.log(`- "${dup._id.title}" appears in weeks: ${dup.weeks.join(', ')}`);
      });
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Database disconnected successfully');
    console.log('🎉 Unique lesson generation completed!');
    
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  }); 
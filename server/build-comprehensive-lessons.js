const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const lessonSchema = new mongoose.Schema({
    week: Number,
    gradeLevel: Number,
    subject: String,
    title: String,
    introduction: String,
    content: String,
    activities: [String],
    funFacts: [String]
}, { strict: false });

const Lesson = mongoose.model('Lesson', lessonSchema);

// Comprehensive Educational Content Database
const educationalContent = {
    
    // ===== GRADE 2 MATH =====
    
    "Skip Counting by 5s": {
        grade2: {
            introduction: "Get ready to become a skip counting superhero! We're going to learn how to count by 5s, which is like taking giant kangaroo hops instead of tiny baby steps. When you skip count by 5s, you jump over numbers and land on every 5th number - it's going to be super fun!",
            content: `**What Is Skip Counting by 5s?**

Skip counting by 5s means we count in jumps of 5 instead of counting every single number. Instead of saying 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, we jump and say 5, 10! It's like being a math kangaroo!

**Why Skip Counting by 5s Matters**

Learning to skip count by 5s helps you count faster and is super useful in real life. When you count nickels (which are worth 5 cents each), you skip count by 5s! It also helps you tell time on a clock because the minute marks go by 5s.

**How Skip Counting by 5s Works**

Start at 5, then add 5 more each time:
• 5 (that's 1 group of 5)
• 10 (that's 2 groups of 5) 
• 15 (that's 3 groups of 5)
• 20 (that's 4 groups of 5)

Think of it like this: If you have 5 fingers on each hand, how many fingers do you have on 2 hands? Skip count: 5, 10!

**Real-Life Examples**

• Counting your fingers and toes (5, 10, 15, 20)
• Counting nickels in your piggy bank
• Counting by 5-minute marks on a clock
• Counting groups of 5 stickers or toys

**Common Mistakes to Avoid**

Don't mix up skip counting with regular counting. When skip counting by 5s, you don't say the numbers in between. Jump right from 5 to 10, not 5, 6, 7, 8, 9, 10.

**Quick Recap**

Skip counting by 5s is jumping by 5s: 5, 10, 15, 20, 25, 30. It's faster than counting by 1s and helps you in many real-life situations!`,
            activities: [
                "Play 'Basketball Skip Counting' - pretend to shoot baskets and count by 5s each time you 'score' (5, 10, 15, 20)",
                "Use your hands and feet to practice - count all your fingers by 5s, then add your toes", 
                "Make a 'Nickel Counting Game' with real or pretend nickels and count how much money you have",
                "Draw groups of 5 objects (like 5 stars, then 5 more stars) and practice counting them",
                "Find things around your house that come in groups of 5 and count them with a family member"
            ],
            funFacts: [
                "NBA basketball players often practice shooting 5 shots at a time and count by 5s to track their progress!",
                "The human hand has exactly 5 fingers, which is why counting by 5s feels so natural to us!",
                "Starfish have 5 arms, so if you see 3 starfish, you can skip count by 5s: 5, 10, 15 arms total!",
                "In bowling, you can score up to 10 points per frame, but many scoring systems use 5-point increments!",
                "Your favorite video games often use skip counting by 5s for point systems and power-ups!"
            ]
        }
    },

    "Addition with Two-Digit Numbers": {
        grade2: {
            introduction: "Get ready to become an addition champion! We're going to learn how to add bigger numbers together, like adding 25 + 34. It's like building with number blocks - you stack the ones and the tens to make bigger numbers!",
            content: `**What Is Addition with Two-Digit Numbers?**

Addition with two-digit numbers means adding numbers that have two digits, like 23 + 45. Two-digit numbers have a tens place and a ones place. It's like having groups of 10 things plus some extras!

**Why Addition with Two-Digit Numbers Matters**

You use this every day! When you count your toys, add up your allowance money, or figure out how many stickers you have total, you're using two-digit addition. It helps you solve bigger problems than just adding small numbers.

**How Addition with Two-Digit Numbers Works**

There are two main ways to add two-digit numbers:

**Method 1: Add the Parts**
For 25 + 34:
• Add the tens: 20 + 30 = 50
• Add the ones: 5 + 4 = 9
• Put them together: 50 + 9 = 59

**Method 2: Column Addition**
  25
+ 34
----
• Add the ones column first: 5 + 4 = 9
• Add the tens column: 2 + 3 = 5
• Answer: 59

**Real-Life Examples**

• You have 12 marbles and find 25 more - how many total? 12 + 25 = 37 marbles
• Your class has 18 boys and 16 girls - how many students? 18 + 16 = 34 students
• You save 15 dollars in January and 23 dollars in February - total savings? 15 + 23 = 38 dollars

**Common Mistakes to Avoid**

Remember to line up the ones with ones and tens with tens. Don't add 25 + 34 by doing 2 + 34 and 5 + 3 - that gives the wrong answer!

**Quick Recap**

Two-digit addition means adding numbers like 25 + 34. Add the ones first, then the tens, and put your answer together. It helps you solve bigger math problems in real life!`,
            activities: [
                "Use base-10 blocks, straws, or beans to build two-digit numbers and practice adding them together",
                "Play 'Store Owner' - add up prices of toys or snacks using two-digit numbers",
                "Create addition problems using your age, family members' ages, or important dates",
                "Draw pictures showing tens and ones, then add them together (like 2 groups of 10 + 5 ones)",
                "Go on a 'Number Hunt' around your house - find two-digit numbers and create addition problems"
            ],
            funFacts: [
                "Did you know that cashiers at stores use two-digit addition hundreds of times every day to add up purchases!",
                "Baseball players use two-digit addition to keep track of their batting averages and game statistics!",
                "Ancient Egyptians were doing two-digit addition over 4,000 years ago when they built the pyramids!",
                "Your brain can actually do simple two-digit addition automatically once you practice enough!",
                "Video game programmers use two-digit addition to calculate points, levels, and player statistics!"
            ]
        }
    },

    "Subtraction Within 100": {
        grade2: {
            introduction: "Welcome to the world of subtraction superheroes! Today we're going to learn how to subtract numbers within 100. Think of subtraction as taking things away or finding the difference between two groups. It's like being a detective who figures out how many are missing!",
            content: `**What Is Subtraction Within 100?**

Subtraction within 100 means taking away smaller numbers from bigger numbers, where all the numbers are 100 or less. When we subtract, we find out how many are left or what the difference is between two numbers.

**Why Subtraction Within 100 Matters**

You use subtraction every day! When you spend money and want to know how much you have left, when you eat some cookies and want to know how many remain, or when you're playing games and keeping score.

**How Subtraction Within 100 Works**

There are different ways to subtract:

**Counting Back Method:**
For 15 - 6, start at 15 and count back 6 numbers:
15, 14, 13, 12, 11, 10, 9
Answer: 9

**Number Line Method:**
Use a number line and hop backwards from the bigger number.

**Breaking Apart Method:**
For 43 - 27:
• Break 27 into 20 + 7
• First subtract 20: 43 - 20 = 23
• Then subtract 7: 23 - 7 = 16

**Real-Life Examples**

• You have 25 stickers and give away 8 - how many do you have left? 25 - 8 = 17
• There are 50 kids at the playground and 12 go home - how many are still playing? 50 - 12 = 38
• You save $30 and spend $15 on a toy - how much money do you have left? 30 - 15 = 15

**Common Mistakes to Avoid**

Remember that you always subtract the smaller number from the bigger number (unless you're learning about negative numbers later). Also, when borrowing in column subtraction, don't forget to reduce the number you borrowed from.

**Quick Recap**

Subtraction within 100 means taking away or finding differences between numbers up to 100. Practice with different methods to find what works best for you!`,
            activities: [
                "Play 'Store Detective' - start with play money and 'buy' things, figuring out your change",
                "Use building blocks or toys to practice taking groups away and counting what's left",
                "Create word problems about your pets, toys, or favorite things and solve them",
                "Practice with a deck of cards - draw two cards and subtract the smaller from the larger",
                "Make up subtraction stories about superheroes losing and regaining their powers"
            ],
            funFacts: [
                "Cashiers use subtraction every day to give customers the right change!",
                "Baseball players use subtraction to figure out their batting averages and statistics!",
                "Video game programmers use subtraction to take away health points and lives in games!",
                "Astronauts use subtraction to calculate fuel remaining during space missions!",
                "Your brain can do simple subtraction automatically - it's like having a calculator in your head!"
            ]
        }
    },

    "Animal Habitats and Adaptations": {
        grade2: {
            introduction: "Get ready to become a nature detective! Today we're going to explore the amazing world of animal homes and their special superpowers. Every animal has a perfect home called a habitat, and they have cool adaptations (like animal superpowers) that help them survive!",
            content: `**What Are Animal Habitats and Adaptations?**

Animal habitats are like homes for animals - special places where they live, find food, and raise their babies! Adaptations are like superpowers that help animals survive in their homes. Just like you might wear a jacket when it's cold, animals have special features that help them stay safe and healthy.

**Why Animal Habitats and Adaptations Matter**

Learning about where animals live and how they survive helps us understand nature and take care of our planet. It's like being a nature detective - you can figure out why a polar bear has thick fur and why a fish has gills!

**How Animal Habitats and Adaptations Work**

Animals choose habitats that give them everything they need:
• Food to eat (like how rabbits live in places with lots of grass)
• Water to drink (like how hippos live near rivers)
• Shelter to stay safe (like how birds build nests in trees)
• The right temperature (like how penguins live where it's cold)

Adaptations help them survive:
• Sharp claws help cats catch food
• Thick fur keeps animals warm
• Big ears help elephants stay cool
• Webbed feet help ducks swim

**Real-Life Examples**

• Desert animals like camels can go without water for days
• Arctic foxes have extra-thick fur in winter that turns white for camouflage
• Giraffes have long necks to reach leaves high up in trees
• Fish have gills to breathe underwater, while whales have lungs and must come up for air

**Common Mistakes to Avoid**

Don't think all animals can live anywhere - each animal needs its special habitat! Also, remember that adaptations take a very long time to develop, not just a few days.

**Quick Recap**

Animals live in habitats that meet their needs, and they have special adaptations (like superpowers) that help them survive. Every animal is perfectly designed for its home!`,
            activities: [
                "Create animal habitat dioramas using shoe boxes and craft materials",
                "Play an animal adaptation guessing game where you act out how different animals survive",
                "Draw and color different animals in their perfect habitats",
                "Build animal homes using blocks, pillows, or outdoor materials",
                "Go on a backyard safari to observe local animals and their adaptations"
            ],
            funFacts: [
                "Did you know that polar bears have black skin under their white fur to help absorb heat from the sun!",
                "Arctic foxes grow extra thick, white fur in winter that's so warm they can sleep comfortably in snow!",
                "Giraffes have super long tongues (up to 20 inches) that are dark purple to protect them from sunburn!",
                "Penguins huddle together in groups and take turns being on the outside to stay warm in freezing weather!",
                "Camels can drink up to 40 gallons of water at once and store it in their bodies for long desert trips!"
            ]
        }
    },

    "Community Helpers Past and Present": {
        grade2: {
            introduction: "Get ready to become a time-traveling explorer! We're going to learn about community helpers from long ago and today. Community helpers are like real-life superheroes who help make our neighborhoods safe, clean, and happy places to live!",
            content: `**What Are Community Helpers Past and Present?**

Community helpers are special people who work hard every day to keep our neighborhoods safe, clean, and happy! Some helpers have been around for a very long time (like doctors and teachers), while others are newer (like computer repair people). They're like real-life superheroes who help make our community a better place!

**Why Community Helpers Past and Present Matter**

Learning about community helpers helps you understand how people work together to take care of each other. It shows you all the different ways people can help their neighbors and gives you ideas for how you might want to help your community when you grow up!

**How Community Helpers Past and Present Work**

Community helpers have special jobs:
• Some keep us safe (like police officers and firefighters)
• Some help us learn (like teachers and librarians)  
• Some keep us healthy (like doctors and dentists)
• Some deliver things we need (like mail carriers and grocery store workers)

Long ago, some helpers did their jobs differently:
• Doctors used to make house calls with horse and buggy
• Teachers taught all grades in one room
• People got milk delivered to their doors
• Firefighters used horse-drawn fire trucks

**Real-Life Examples**

• Police officers today use cars and computers, but they still help keep people safe like they did 100 years ago
• Teachers used to write on chalkboards, now they use smart boards and tablets
• Mail carriers used to only deliver letters, now they bring packages from online shopping
• Firefighters now have better equipment, but they still rescue people and put out fires

**Common Mistakes to Avoid**

Don't think that old ways were always worse - sometimes they were different but still worked well! Also remember that new community helpers keep appearing as our world changes.

**Quick Recap**

Community helpers are important people who take care of our neighborhoods. Some helpers have been around forever, some have changed how they work, and some are brand new. They all help make our community strong!`,
            activities: [
                "Create a colorful poster showing different community helpers from today and long ago",
                "Play a matching game where you connect old and new ways community helpers do their jobs",
                "Dress up as different community helpers and act out how they help people",
                "Interview a family member about community helpers they knew when they were young",
                "Go on a neighborhood walk to find and count different types of community helpers"
            ],
            funFacts: [
                "Did you know that long ago, doctors traveled to patients' houses in horse-drawn carriages instead of having offices!",
                "Firefighters used to slide down brass poles to get to their fire trucks quickly - some fire stations still have them today!",
                "Teachers used to write on black chalkboards with white chalk, but now many use interactive smart boards!",
                "Mail carriers once delivered mail by horseback in the Wild West, and now some use trucks, bikes, and even drones!",
                "Police officers used to walk their beats on foot and blow whistles instead of using radios to call for help!"
            ]
        }
    }

    // I'll continue with more content, but for now let me build the foundation with these examples
};

// Function to clean lesson titles for matching
function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

// Function to generate content for lessons not in our database
function generateDefaultContent(grade, subject, title) {
    const intro = grade === 2 ? 
        `Get ready to become a ${title.toLowerCase()} explorer! We're going to learn about ${title}, which is an exciting adventure that will help you understand the world around you. This is going to be super fun!` :
        `Welcome to the fascinating world of ${title}! Today we're going to explore this important topic that will help you develop critical thinking skills and understand complex concepts.`;

    const content = grade === 2 ? `**What Is ${title}?**

${title} is something really important that we see and use in our everyday lives! Let's discover what makes it special and interesting to learn about.

**Why ${title} Matters**

Learning about ${title} helps you become smarter and more confident. You'll be amazed at how often you see and use this knowledge in your daily life!

**How ${title} Works**

Understanding ${title} is like solving a fun puzzle:
• First, we learn the basics with easy examples
• Then, we practice with hands-on activities
• Finally, we use it to solve real problems

**Real-Life Examples**

You can find ${title} everywhere! Look for it at home, school, the park, and even in your favorite games and activities.

**Common Mistakes to Avoid**

Remember to take your time and practice. The more you work with ${title}, the easier it becomes!

**Quick Recap**

${title} is useful, interesting, and all around us. With practice, you'll become an expert at understanding and using it!` : 
    `Advanced content for ${title} would go here with appropriate complexity for Grade ${grade}.`;

    const activities = grade === 2 ? [
        `Create a colorful poster or drawing showing different examples of ${title}`,
        `Play educational games that help you practice ${title} concepts`,
        `Use household items to demonstrate how ${title} works`,
        `Teach a family member about ${title} using simple explanations`,
        `Go on a discovery hunt to find examples of ${title} around you`
    ] : [
        `Conduct a detailed investigation or research project about ${title}`,
        `Create a presentation explaining how ${title} applies to real-world situations`,
        `Work on challenging problems that require understanding of ${title}`,
        `Research how professionals use ${title} in their careers`,
        `Develop a teaching demonstration to help others learn about ${title}`
    ];

    const funFacts = grade === 2 ? [
        `Did you know that ${title} is used in many of your favorite cartoons and movies!`,
        `Scientists and researchers study ${title} to make new discoveries!`,
        `Many animals in nature use concepts similar to ${title} to survive!`,
        `Your favorite athletes and sports stars use ${title} to improve their performance!`,
        `Kids who understand ${title} often become great problem-solvers and inventors!`
    ] : [
        `Research shows that ${title} plays a crucial role in many scientific breakthroughs!`,
        `Professional experts use ${title} to solve complex real-world problems!`,
        `Understanding ${title} can lead to exciting career opportunities in STEM fields!`,
        `${title} concepts appear in cutting-edge technology and innovation!`,
        `Students who master ${title} develop strong analytical and critical thinking skills!`
    ];

    return { introduction: intro, content, activities, funFacts };
}

async function buildComprehensiveLessons() {
    try {
        console.log('Building comprehensive lessons with high-quality educational content...');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`Found ${lessons.length} lessons to update`);

        let updated = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            // Check if we have specific high-quality content for this lesson
            if (educationalContent[cleanedTitle] && educationalContent[cleanedTitle][gradeKey]) {
                const content = educationalContent[cleanedTitle][gradeKey];
                
                lesson.introduction = content.introduction;
                lesson.content = content.content;
                lesson.activities = content.activities;
                lesson.funFacts = content.funFacts;
                
                console.log(`✅ Updated ${lesson.title} (Grade ${lesson.gradeLevel}) with high-quality structured content`);
            } else {
                // Generate default content for lessons not yet in our database
                const defaultContent = generateDefaultContent(lesson.gradeLevel, lesson.subject, cleanedTitle);
                
                lesson.introduction = defaultContent.introduction;
                lesson.content = defaultContent.content;
                lesson.activities = defaultContent.activities;
                lesson.funFacts = defaultContent.funFacts;
                
                console.log(`📝 Generated default content for ${lesson.title} (Grade ${lesson.gradeLevel}) - NEEDS STRUCTURED CONTENT`);
            }
            
            await lesson.save();
            updated++;
        }
        
        console.log(`\n🎉 Successfully updated ${updated} lessons!`);
        console.log(`✨ High-quality structured content applied where available`);
        console.log(`⚠️  Remaining lessons need specific educational content to be added to the database`);
        
    } catch (error) {
        console.error('Error building comprehensive lessons:', error);
    } finally {
        mongoose.connection.close();
    }
}

buildComprehensiveLessons(); 
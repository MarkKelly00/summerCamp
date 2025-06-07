const mongoose = require('mongoose');
require('dotenv').config();

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

// COMPREHENSIVE EDUCATIONAL CONTENT DATABASE
// Each lesson follows the exact "Skip Counting by 5s" template structure
const comprehensiveEducationalContent = {
    
    // ===== GRADE 2 MATH LESSONS =====
    
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

    "Money: Coins and Bills": {
        grade2: {
            introduction: "Get ready to become a money expert! We're going to learn about coins and bills, which are the different types of money we use every day. It's like learning a special number system that helps people buy and sell things!",
            content: `**What Are Money: Coins and Bills?**

Money is what we use to buy things we need and want. Coins are round pieces of metal money, and bills are rectangular pieces of paper money. Each coin and bill has a different value (how much it's worth)!

**Why Money: Coins and Bills Matter**

Understanding money helps you shop, save for things you want, and understand how much things cost. When you buy a toy or snack, you need to know how much money to give and how much change you should get back!

**How Money: Coins and Bills Work**

**Coins:**
• Penny = 1 cent (¢) - copper colored
• Nickel = 5 cents - bigger and silver colored  
• Dime = 10 cents - smallest and silver colored
• Quarter = 25 cents - biggest and silver colored

**Bills:**
• $1 bill = 100 cents = 4 quarters = 10 dimes = 20 nickels = 100 pennies
• $5 bill = 5 dollars
• $10 bill = 10 dollars
• $20 bill = 20 dollars

**Real-Life Examples**

• If you want to buy a 50¢ candy bar, you could use 2 quarters (25¢ + 25¢ = 50¢)
• A $3 toy could be paid for with 3 one-dollar bills or 12 quarters
• If you buy something for $7 and pay with a $10 bill, you get $3 back in change

**Common Mistakes to Avoid**

Don't think bigger coins are always worth more! A dime is smaller than a penny but worth 10 times more. Also, always count your change to make sure it's correct.

**Quick Recap**

Coins and bills are different types of money with different values. Learning to count money helps you buy things and understand how much things cost!`,
            activities: [
                "Set up a pretend store and practice buying and selling items using real or play money",
                "Count different combinations of coins to make the same amounts (like making 25¢ with different coins)",
                "Play 'Money Bingo' where you match coin combinations to their total values",
                "Create a money journal to track how you earn, spend, and save money",
                "Go on a 'Price Hunt' around your house or store to compare costs of different items"
            ],
            funFacts: [
                "Did you know that the first coins were made over 2,600 years ago in ancient Turkey!",
                "If you stacked up a million dollars in $1 bills, the pile would be about 358 feet tall!",
                "The penny is the only U.S. coin where the person faces right instead of left!",
                "A quarter has 119 ridges around its edge to help blind people tell it apart from other coins!",
                "The Bureau of Engraving and Printing produces about 38 million bills every day!"
            ]
        }
    },

    "Telling Time to the Hour and Half Hour": {
        grade2: {
            introduction: "Get ready to become a time detective! We're going to learn how to read clocks and tell time to the hour and half hour. Knowing how to tell time helps you know when it's time for lunch, recess, or your favorite TV show!",
            content: `**What Is Telling Time to the Hour and Half Hour?**

Telling time means reading a clock to know what time it is. We'll focus on telling time to the hour (like 3:00) and half hour (like 3:30). Clocks have two hands that point to numbers to show us the time!

**Why Telling Time to the Hour and Half Hour Matters**

Knowing how to tell time helps you be on time for school, know when activities start and end, and understand daily schedules. It's like having a superpower that helps you organize your day!

**How Telling Time to the Hour and Half Hour Works**

**Parts of a Clock:**
• Hour hand (short, thick hand) - points to the hour
• Minute hand (long, thin hand) - points to the minutes
• Numbers 1-12 around the clock face

**Telling Time to the Hour:**
• When the minute hand points to 12 and the hour hand points to any number
• Example: If hour hand points to 3 and minute hand points to 12, it's 3:00

**Telling Time to the Half Hour:**
• When the minute hand points to 6 and the hour hand is between two numbers
• Example: If hour hand is between 3 and 4, and minute hand points to 6, it's 3:30

**Real-Life Examples**

• School might start at 8:00 (8 o'clock)
• Lunch could be at 12:30 (twelve thirty or half past twelve)
• Bedtime might be 8:30 (eight thirty or half past eight)
• Recess could start at 10:00 (10 o'clock)

**Common Mistakes to Avoid**

Don't mix up the hour and minute hands! The short hand tells the hour, the long hand tells the minutes. Also, when it's 3:30, the hour hand is halfway between 3 and 4, not pointing exactly at 3.

**Quick Recap**

Reading clocks helps you tell time to the hour (:00) and half hour (:30). The short hand shows hours, the long hand shows minutes. This skill helps you stay on schedule every day!`,
            activities: [
                "Make your own paper plate clock with moveable hands and practice setting different times",
                "Play 'Time Charades' where you act out activities that happen at specific times",
                "Create a daily schedule showing what you do at different hours and half hours",
                "Use a real clock to track how long different activities take (like eating breakfast or brushing teeth)",
                "Go on a 'Clock Hunt' around your house to find and read different types of clocks"
            ],
            funFacts: [
                "Did you know that the first clocks didn't have minute hands - people only needed to know the hour!",
                "Big Ben in London is one of the most famous clocks in the world and weighs over 13 tons!",
                "Before clocks were invented, people told time by looking at the sun's position in the sky!",
                "Digital clocks show time with numbers, but analog clocks (with hands) help you see how much time has passed!",
                "Some animals have internal clocks that help them know when to wake up, eat, and sleep!"
            ]
        }
    },

    "Fractions: Halves and Fourths": {
        grade2: {
            introduction: "Get ready to become a fraction explorer! We're going to learn about halves and fourths, which are like cutting things into equal pieces. It's like sharing pizza or cookies fairly with your friends - everyone gets the same size piece!",
            content: `**What Are Fractions: Halves and Fourths?**

Fractions are parts of a whole thing! A half (1/2) means something is cut into 2 equal pieces, and you have 1 of those pieces. A fourth (1/4) means something is cut into 4 equal pieces, and you have 1 of those pieces. It's like dividing things up fairly!

**Why Fractions: Halves and Fourths Matter**

You use halves and fourths every day! When you eat half a sandwich, share a pizza cut into fourths, or tell time (half past the hour), you're using fractions. They help us share things equally and describe parts of things.

**How Fractions: Halves and Fourths Work**

**Halves (1/2):**
• Cut something into 2 equal pieces
• Each piece is one half (1/2)
• Two halves make one whole (1/2 + 1/2 = 1)

**Fourths (1/4):**
• Cut something into 4 equal pieces
• Each piece is one fourth (1/4) 
• Four fourths make one whole (1/4 + 1/4 + 1/4 + 1/4 = 1)
• Two fourths equal one half (1/4 + 1/4 = 1/2)

**Real-Life Examples**

• Pizza cut into 4 slices - each slice is 1/4 of the pizza
• An apple cut in half - each piece is 1/2 of the apple
• A clock face - 30 minutes is 1/2 hour, 15 minutes is 1/4 hour
• A dollar has 4 quarters - each quarter is 1/4 of a dollar

**Common Mistakes to Avoid**

Make sure pieces are equal! If you cut a pizza into pieces but they're different sizes, they're not real fractions. All pieces must be the same size.

**Quick Recap**

Halves and fourths are fractions that help us divide things into equal parts. Half means 2 equal pieces, fourth means 4 equal pieces. We use them every day for sharing and telling time!`,
            activities: [
                "Use paper plates, circles, or real food to practice cutting things in half and into fourths",
                "Create fraction art by coloring 1/2 or 1/4 of different shapes and patterns",
                "Play a 'Fair Sharing' game - divide snacks, toys, or treats into halves and fourths",
                "Use building blocks or LEGO pieces to make fraction models and practice combining them",
                "Go on a 'Fraction Hunt' to find things around your house that are divided into halves or fourths"
            ],
            funFacts: [
                "Did you know that pizza was invented in Italy, and they were some of the first people to cut it into equal triangle slices!",
                "A football field is divided into fourths called quarters, and each quarter of the game is 15 minutes long!",
                "Ancient Egyptians used fractions over 4,000 years ago, and they loved using halves and fourths!",
                "When you look at a clock, the long hand pointing to 6 means half past the hour!",
                "Pie charts in math are called that because they look like pies cut into equal slices - just like fractions!"
            ]
        }
    },

    // ===== GRADE 2 SCIENCE LESSONS =====
    
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

    // Add more lessons as needed...
};

// Clean lesson titles for matching
function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

async function buildAllLessons() {
    try {
        console.log('🎯 Building comprehensive lessons with structured educational content...');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`Found ${lessons.length} lessons to update\n`);

        let structuredCount = 0;
        let needsContentCount = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            // Check if we have structured content for this lesson
            if (comprehensiveEducationalContent[cleanedTitle] && comprehensiveEducationalContent[cleanedTitle][gradeKey]) {
                const content = comprehensiveEducationalContent[cleanedTitle][gradeKey];
                
                lesson.introduction = content.introduction;
                lesson.content = content.content;
                lesson.activities = content.activities;
                lesson.funFacts = content.funFacts;
                
                console.log(`✅ ${lesson.title} (Grade ${lesson.gradeLevel}) - HIGH-QUALITY STRUCTURED CONTENT`);
                structuredCount++;
            } else {
                // Mark lessons that still need structured content
                console.log(`⚠️  ${lesson.title} (Grade ${lesson.gradeLevel}) - NEEDS STRUCTURED CONTENT`);
                needsContentCount++;
            }
            
            await lesson.save();
        }
        
        console.log(`\n📊 SUMMARY:`);
        console.log(`✅ Lessons with high-quality structured content: ${structuredCount}`);
        console.log(`⚠️  Lessons needing structured content: ${needsContentCount}`);
        console.log(`📚 Total lessons: ${lessons.length}`);
        
        if (needsContentCount > 0) {
            console.log(`\n🔄 TO COMPLETE THE PROJECT:`);
            console.log(`   Add structured content for the remaining ${needsContentCount} lessons to the comprehensiveEducationalContent object`);
            console.log(`   Each lesson should follow the exact structure of "Skip Counting by 5s"`);
        }
        
    } catch (error) {
        console.error('Error building comprehensive lessons:', error);
    } finally {
        mongoose.connection.close();
    }
}

buildAllLessons(); 
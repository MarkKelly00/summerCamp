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
// Real educational content - NO MORE PLACEHOLDER TEXT!

const realEducationalContent = {
    
    // ===== PRIORITY GRADE 4 LESSONS (Most Critical) =====
    
    "Patterns and Functions": {
        grade4: {
            introduction: "Welcome to the amazing world of patterns and functions! Today we're going to become pattern detectives and function explorers. Patterns are everywhere around us - in nature, music, art, and even in the way we organize our day. Functions are like mathematical machines that follow rules to create patterns!",
            content: `**What Are Patterns and Functions?**

Patterns are sequences that follow a rule or repeat in a predictable way. Functions are special mathematical relationships where one number depends on another number according to a specific rule. Think of a function like a machine - you put a number in, it follows its rule, and gives you a new number out!

**Why Patterns and Functions Matter**

Understanding patterns and functions helps you predict what comes next, solve problems systematically, and understand how things are connected. Scientists use patterns to understand nature, musicians use patterns to create songs, and computer programmers use functions to write code!

**How Patterns and Functions Work**

**Number Patterns:**
• Arithmetic patterns: add or subtract the same amount each time (2, 4, 6, 8...)
• Skip counting patterns: like counting by 3s (3, 6, 9, 12...)
• Growing patterns: where the change gets bigger each time

**Functions:**
• Input → Rule → Output
• Example: "Add 5 to any number you give me"
• If you input 3, the output is 8 (because 3 + 5 = 8)
• If you input 10, the output is 15 (because 10 + 5 = 15)

**Function Tables:**
Input  | Output
   1   |   6
   2   |   7  
   3   |   8
   4   |   9
Rule: Add 5 to the input number

**Real-Life Examples**

• Your allowance: If you get $2 per week, after 4 weeks you'll have $8 (2 × 4 = 8)
• Growth patterns: A plant grows 2 inches per month, so after 6 months it's grown 12 inches
• Cooking: If 1 cookie recipe serves 4 people, then 3 recipes serve 12 people
• Sports: If a runner completes 1 lap in 2 minutes, 5 laps will take 10 minutes

**Common Mistakes to Avoid**

Don't assume all patterns follow the same rule - always check multiple examples! Also, remember that functions must be consistent - the same input always gives the same output.

**Quick Recap**

Patterns follow predictable rules, and functions are mathematical relationships that connect input and output numbers. Understanding both helps you solve problems and see connections in math and the real world!`,
            activities: [
                "Create pattern art using shapes, colors, or numbers and challenge others to continue your pattern",
                "Build function machines using input/output boxes and test them with different numbers",
                "Find patterns in nature during a walk outside - leaf arrangements, flower petals, or tree branches",
                "Design your own function games where family members guess the rule from input/output examples",
                "Use everyday activities to create function tables - like minutes studied vs. pages read"
            ],
            funFacts: [
                "Did you know that honeybees use hexagonal patterns because they're the most efficient shape for storing honey!",
                "Fibonacci numbers appear in nature everywhere - from sunflower seeds to nautilus shells to pinecones!",
                "Computer algorithms are based on functions - every app and website uses millions of function calculations!",
                "Musicians use mathematical patterns to create rhythm and harmony in songs!",
                "Your heart beats in a pattern - doctors use this pattern to check if your heart is healthy!"
            ]
        }
    },

    "Introduction to Basic Coding Concepts": {
        grade4: {
            introduction: "Get ready to become a coding wizard! Today we're going to learn the basic concepts of computer programming. Coding is like giving instructions to a computer - it's the language we use to tell computers what to do. You already know how to give instructions to people, and coding is similar!",
            content: `**What Are Basic Coding Concepts?**

Coding (also called programming) is writing step-by-step instructions that tell a computer what to do. Just like you might give someone directions to your house, coding gives computers directions to solve problems, play games, or create apps!

**Why Basic Coding Concepts Matter**

Understanding coding helps you think logically, solve problems step-by-step, and understand how the technology around you works. Almost everything electronic uses coding - from video games and phones to cars and microwaves!

**How Basic Coding Concepts Work**

**Key Coding Concepts:**

**1. Sequence:** Instructions happen in order, one after another
• Like a recipe: first crack eggs, then mix, then cook
• Computers follow instructions exactly in the order you give them

**2. Loops:** Repeating the same instructions multiple times
• Like brushing all your teeth - you repeat the brushing motion
• Instead of writing "turn left" 4 times, you can say "turn left 4 times"

**3. Conditionals:** Making decisions based on situations
• "IF it's raining, THEN take an umbrella"
• "IF the character touches a wall, THEN stop moving"

**4. Variables:** Storing information to use later
• Like remembering your score in a game
• The score can change, but you always know what it is

**Real-Life Examples**

• Making a sandwich: sequence of steps (bread, peanut butter, jelly, bread)
• Playing "Simon Says": conditional statements (IF Simon says, THEN do the action)
• Counting jumping jacks: using a variable to keep track of how many you've done
• Morning routine: loops (brush each tooth) and sequences (brush before breakfast)

**Common Mistakes to Avoid**

Remember that computers are very literal - they do exactly what you tell them! If you forget a step or put steps in the wrong order, the program won't work the way you expect.

**Quick Recap**

Coding uses sequences (step-by-step instructions), loops (repeating actions), conditionals (making decisions), and variables (remembering information) to tell computers what to do. These concepts help you think logically and solve problems!`,
            activities: [
                "Write step-by-step instructions for making your favorite snack and test them with a family member",
                "Play 'Human Robot' where one person gives coding instructions and another follows them exactly",
                "Create a treasure hunt using conditional statements like 'IF you see a red door, THEN turn left'",
                "Use online coding games like Scratch Jr. or Hour of Code to practice basic programming concepts",
                "Design an algorithm (set of instructions) for something you do every day, like getting ready for school"
            ],
            funFacts: [
                "Did you know that the first computer programmer was a woman named Ada Lovelace in the 1840s!",
                "The word 'bug' in computer programming comes from when an actual bug (a moth) got stuck in an early computer!",
                "Every app on your phone or tablet was created using coding concepts like the ones you're learning!",
                "Video game designers use loops to make characters walk, jump, and repeat animations!",
                "There are over 700 different programming languages, but they all use the same basic concepts you're learning!"
            ]
        }
    },

    "States of Matter and Physical Changes": {
        grade4: {
            introduction: "Get ready to become a matter scientist! Today we're going to explore the fascinating world of states of matter and how they change. Everything around you - the air you breathe, the water you drink, even the chair you're sitting on - is made of matter that can change from one form to another!",
            content: `**What Are States of Matter and Physical Changes?**

Matter is anything that takes up space and has weight. All matter exists in different states (forms): solid, liquid, gas, and plasma. Physical changes happen when matter changes from one state to another without becoming a completely different substance.

**Why States of Matter and Physical Changes Matter**

Understanding matter helps explain how our world works! From ice melting in your drink to clouds forming in the sky, state changes happen everywhere. This knowledge helps us cook food, preserve things in freezers, and understand weather patterns.

**How States of Matter and Physical Changes Work**

**The Three Main States of Matter:**

**Solids:**
• Particles are tightly packed and barely move
• Keep their shape and size
• Examples: ice, rocks, wood, books

**Liquids:**
• Particles are close but can slide past each other
• Take the shape of their container but keep the same volume
• Examples: water, milk, oil, honey

**Gases:**
• Particles are far apart and move quickly in all directions
• Fill up any container completely
• Examples: air, steam, helium in balloons

**Physical Changes:**
• **Melting:** solid → liquid (ice → water)
• **Freezing:** liquid → solid (water → ice)
• **Evaporation:** liquid → gas (puddles drying up)
• **Condensation:** gas → liquid (steam → water droplets)

**Real-Life Examples**

• Ice cubes melting in a drink (solid to liquid)
• Steam rising from hot soup (liquid to gas)
• Frost forming on windows (gas to solid)
• Chocolate melting in your mouth (solid to liquid)
• Water droplets forming on a cold can (gas to liquid)

**Common Mistakes to Avoid**

Don't confuse physical changes with chemical changes! In physical changes, the substance stays the same - water is still water whether it's ice, liquid, or steam. The molecules don't change, just their arrangement and movement.

**Quick Recap**

Matter exists as solids, liquids, and gases, and can change between these states through physical changes like melting, freezing, and evaporation. These changes happen all around us every day!`,
            activities: [
                "Conduct ice experiments - time how long ice takes to melt in different conditions (room temperature, sunlight, refrigerator)",
                "Make water cycle observations by placing a clear container of water in sunlight and watching evaporation and condensation",
                "Create a matter scavenger hunt - find 10 solids, 5 liquids, and 3 gases in your house",
                "Experiment with chocolate or butter - observe how heat changes them from solid to liquid",
                "Use a magnifying glass to observe frost or dew formation and discuss how gas becomes liquid"
            ],
            funFacts: [
                "Did you know that glass is actually a very slow-moving liquid, not a solid? It flows so slowly you can't see it!",
                "Water is the only substance on Earth that naturally exists as a solid, liquid, and gas at normal temperatures!",
                "Lightning is so hot that it creates a fourth state of matter called plasma!",
                "Helium is the only element that can become a liquid without first becoming a solid when cooled!",
                "Your breath contains water vapor - that's why you can see it on cold days when the gas condenses into tiny droplets!"
            ]
        }
    },

    "Introduction to Fractions as Parts of a Whole": {
        grade4: {
            introduction: "Welcome to the exciting world of fractions! Today we're going to explore how fractions represent parts of a whole. Fractions are like mathematical puzzle pieces that help us understand parts, sharing, and precise measurements. Get ready to become a fraction expert!",
            content: `**What Are Fractions as Parts of a Whole?**

Fractions represent parts of a whole object, group, or measurement. The fraction 3/4 means you have 3 parts out of 4 equal parts total. Fractions help us describe amounts that are between whole numbers - like half a pizza or three-quarters of an hour.

**Why Fractions as Parts of a Whole Matter**

Fractions are everywhere in real life! Recipes use fractions (1/2 cup flour), time uses fractions (1/4 hour = 15 minutes), and measurements use fractions (3/4 inch). Understanding fractions helps you cook, build, tell time, and share things fairly.

**How Fractions as Parts of a Whole Work**

**Fraction Parts:**
• **Numerator** (top number): How many parts you have
• **Denominator** (bottom number): Total number of equal parts
• **Fraction bar**: Means "divided by" or "out of"

**Types of Fractions:**
• **Proper fractions:** Numerator is smaller than denominator (3/4, 2/5)
• **Improper fractions:** Numerator is larger than denominator (5/3, 7/4)  
• **Mixed numbers:** Whole number plus a fraction (2 1/3, 1 3/4)
• **Equivalent fractions:** Different fractions that represent the same amount (1/2 = 2/4 = 4/8)

**Real-Life Examples**

• Pizza slices: If you eat 3 slices out of 8, you ate 3/8 of the pizza
• Time: 45 minutes is 3/4 of an hour (45 out of 60 minutes)
• Sports: A basketball player makes 7 out of 10 free throws (7/10)
• Recipes: 3/4 cup of sugar means 3 parts out of 4 equal parts of a cup

**Common Mistakes to Avoid**

Don't add fractions by adding numerators and denominators separately (1/2 + 1/3 ≠ 2/5). Always find common denominators first. Also, remember that larger denominators make smaller pieces when numerators are equal.

**Quick Recap**

Fractions represent parts of wholes using numerators and denominators. Understanding equivalent fractions, comparing fractions, and connecting fractions to real-world situations builds strong mathematical foundations!`,
            activities: [
                "Use pizza or pie cutouts to create visual models of different fractions and compare their sizes",
                "Create fraction strips using paper to show equivalent fractions and practice comparing",
                "Cook or bake something using a recipe with fractions - measure ingredients and see fractions in action",
                "Play fraction games with cards or dice where you create fractions and compare their values",
                "Find fractions in sports statistics, cooking shows, or time schedules around your house"
            ],
            funFacts: [
                "Did you know that ancient Egyptians only used fractions with numerator 1 (like 1/2, 1/3, 1/4) except for 2/3!",
                "Pizza companies use fractions all the time - when they cut a large pizza into 8 slices, each slice is 1/8!",
                "Musicians read fractions constantly - a whole note, half note, quarter note, and eighth note are all fraction relationships!",
                "Carpenters and builders use fractions like 3/4 inch and 5/8 inch for precise measurements every day!",
                "Stock prices are often shown in fractions - understanding fractions helps people invest their money wisely!"
            ]
        }
    },

    "Multiplication and Division Facts": {
        grade4: {
            introduction: "Get ready to become a multiplication and division superhero! Today we're going to master these powerful math operations that are like addition and subtraction's super-speedy cousins. When you know your multiplication and division facts, you can solve problems lightning fast!",
            content: `**What Are Multiplication and Division Facts?**

Multiplication and division facts are basic number relationships that help you calculate quickly and accurately. Multiplication is repeated addition (3 × 4 means 3 + 3 + 3 + 3), and division is splitting things into equal groups or finding how many times one number fits into another.

**Why Multiplication and Division Facts Matter**

These facts are the foundation for all advanced math! You'll use them in algebra, geometry, science, cooking, shopping, and countless real-world situations. Knowing these facts by heart makes you a powerful problem-solver.

**How Multiplication and Division Facts Work**

**Multiplication Properties:**
• **Commutative:** Order doesn't matter (3 × 4 = 4 × 3)
• **Associative:** Grouping doesn't matter ((2 × 3) × 4 = 2 × (3 × 4))
• **Identity:** Any number times 1 equals itself (7 × 1 = 7)
• **Zero property:** Any number times 0 equals 0 (5 × 0 = 0)

**Division Rules:**
• Division is the opposite of multiplication
• If 6 × 4 = 24, then 24 ÷ 4 = 6 and 24 ÷ 6 = 4
• Any number divided by 1 equals itself (8 ÷ 1 = 8)
• Any number divided by itself equals 1 (9 ÷ 9 = 1)

**Fact Family Relationships:**
• 3 × 4 = 12, 4 × 3 = 12, 12 ÷ 3 = 4, 12 ÷ 4 = 3
• These four facts are related and help you learn faster

**Real-Life Examples**

• If you buy 6 packs of gum with 5 pieces each: 6 × 5 = 30 pieces total
• Dividing 24 cookies equally among 6 friends: 24 ÷ 6 = 4 cookies each
• Arrays: A classroom with 5 rows of 6 desks has 5 × 6 = 30 desks
• Time: 3 hours equals 3 × 60 = 180 minutes

**Common Mistakes to Avoid**

Don't confuse multiplication and addition when numbers get larger. Also, remember that division by zero is impossible - you can't split something into zero groups!

**Quick Recap**

Multiplication and division facts are related number relationships that help you solve problems quickly. Learning these facts well gives you a strong foundation for all future math!`,
            activities: [
                "Create fact family triangles and use them to practice related multiplication and division facts",
                "Play multiplication war with cards - multiply the numbers you draw and the highest product wins",
                "Use arrays of objects (like coins or buttons) to visualize multiplication and division problems",
                "Time yourself doing multiplication drills and track your improvement over several days",
                "Find real-world examples of multiplication and division in sports scores, recipes, or shopping"
            ],
            funFacts: [
                "Did you know that if you multiply any number by 9, the digits in the answer always add up to 9 or a multiple of 9!",
                "Ancient Babylonians created the first multiplication tables over 4,000 years ago!",
                "Computer processors do millions of multiplication and division calculations every second!",
                "The fastest human calculators can multiply large numbers in their heads faster than most people can use a calculator!",
                "Multiplication and division are used in every video game to calculate movement, scoring, and graphics!"
            ]
        }
    },

    // Adding more content as the database grows...
    
    "Force and Motion in Everyday Life": {
        grade4: {
            introduction: "Get ready to become a physics detective! Today we're going to explore the invisible forces that make everything around us move, stop, speed up, and slow down. Forces and motion are everywhere - from throwing a ball to riding in a car to walking down the street!",
            content: `**What Are Force and Motion in Everyday Life?**

Force is a push or pull that can make objects move, stop, speed up, slow down, or change direction. Motion is when an object changes position over time. Everything that moves has been acted upon by a force, and understanding these concepts helps explain how our world works!

**Why Force and Motion in Everyday Life Matter**

Understanding forces and motion helps you predict how things will move, stay safe in various situations, and understand how machines work. Engineers use these concepts to design cars, architects use them to build strong buildings, and athletes use them to improve their performance.

**How Force and Motion in Everyday Life Work**

**Types of Forces:**
• **Gravity:** Pulls objects toward Earth (makes things fall down)
• **Friction:** Opposes motion between surfaces (helps cars stop, makes things slow down)
• **Magnetic force:** Attracts magnetic materials
• **Applied force:** When you push or pull something directly

**Newton's Laws in Simple Terms:**
• **Law 1:** Objects at rest stay at rest, moving objects keep moving unless a force acts on them
• **Law 2:** Stronger forces create more motion (F = ma)
• **Law 3:** For every action, there's an equal and opposite reaction

**Motion Concepts:**
• **Speed:** How fast something moves
• **Velocity:** Speed in a specific direction
• **Acceleration:** Speeding up, slowing down, or changing direction

**Real-Life Examples**

• Sliding down a playground slide: gravity pulls you down, friction slows you down
• Riding a bike: you apply force to pedals, friction helps tires grip the road
• Playing catch: you apply force to throw, gravity brings the ball down
• Car safety: seatbelts use force to keep you safe when the car stops suddenly

**Common Mistakes to Avoid**

Don't think heavier objects always fall faster - in the absence of air resistance, all objects fall at the same rate! Also, remember that it takes force to change motion, not just to create motion.

**Quick Recap**

Forces are pushes and pulls that cause motion, and motion happens when objects change position. Understanding these concepts helps explain everything from sports to transportation to playground activities!`,
            activities: [
                "Conduct motion experiments with different balls, ramps, and surfaces to observe force and motion principles",
                "Create a force and motion scavenger hunt around your house, identifying pushes, pulls, and different types of motion",
                "Build simple machines (like levers or pulleys) using household items and test how they change forces",
                "Use toy cars on different surfaces to explore how friction affects motion",
                "Design and test paper airplanes to understand how forces affect flight and motion through air"
            ],
            funFacts: [
                "Did you know that when you walk, you're actually falling forward and catching yourself with each step!",
                "Astronauts in space experience weightlessness because they're constantly falling toward Earth but moving fast enough to keep missing it!",
                "A cheetah can accelerate from 0 to 60 mph in just 3 seconds - that's faster than most cars!",
                "The friction from your car's brakes converts the car's motion energy into heat energy!",
                "Every time you jump, you're actually pushing Earth away from you, but Earth is so massive you can't detect its movement!"
            ]
        }
    }

    // Database continues to expand with more real educational content...
};

function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

async function deployRealEducationalContent() {
    try {
        console.log('🚀 DEPLOYING REAL EDUCATIONAL CONTENT');
        console.log('🎯 Eliminating placeholder content with actual lessons!');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`📚 Found ${lessons.length} lessons to update\n`);

        let hasRealContent = 0;
        let stillHasPlaceholders = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            if (realEducationalContent[cleanedTitle] && realEducationalContent[cleanedTitle][gradeKey]) {
                const content = realEducationalContent[cleanedTitle][gradeKey];
                
                lesson.introduction = content.introduction;
                lesson.content = content.content;
                lesson.activities = content.activities;
                lesson.funFacts = content.funFacts;
                
                console.log(`✅ ${lesson.title} (Grade ${lesson.gradeLevel}) - REAL EDUCATIONAL CONTENT`);
                hasRealContent++;
            } else {
                // Keep existing content if it's already good, otherwise mark as needing update
                if (lesson.content && lesson.content.includes('would go here with appropriate complexity')) {
                    console.log(`⚠️  ${lesson.title} (Grade ${lesson.gradeLevel}) - STILL HAS PLACEHOLDER TEXT`);
                    stillHasPlaceholders++;
                } else {
                    console.log(`📝 ${lesson.title} (Grade ${lesson.gradeLevel}) - Has existing content`);
                }
            }
            
            await lesson.save();
        }
        
        console.log(`\n📊 CONTENT DEPLOYMENT RESULTS:`);
        console.log(`✅ Lessons with REAL educational content: ${hasRealContent}`);
        console.log(`⚠️  Lessons still with placeholder text: ${stillHasPlaceholders}`);
        console.log(`📚 Total lessons processed: ${lessons.length}`);
        
        if (hasRealContent > 0) {
            console.log(`\n🎉 SUCCESS! Your kids now have proper educational content!`);
            console.log(`📖 No more "content would go here" placeholders for these key lessons`);
            console.log(`🧠 Each lesson now has engaging, age-appropriate, topic-specific content`);
        }
        
        if (stillHasPlaceholders > 0) {
            console.log(`\n📋 NEXT STEPS:`);
            console.log(`   Working on eliminating remaining ${stillHasPlaceholders} placeholder lessons`);
            console.log(`   Framework established for rapid content expansion`);
        }
        
    } catch (error) {
        console.error('❌ Error deploying educational content:', error);
    } finally {
        mongoose.connection.close();
    }
}

deployRealEducationalContent(); 
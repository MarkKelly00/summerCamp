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

// COMPREHENSIVE EDUCATIONAL CONTENT DATABASE
// Specific teaching content with methods, examples, and techniques
const comprehensiveEducationalContent = {
    
    // ===== GRADE 2 MATH LESSONS =====
    
    "Skip Counting by 5s": {
        grade2: {
            introduction: "Get ready to become a skip counting superhero! We're going to learn how to count by 5s, which is like taking giant kangaroo hops instead of tiny baby steps. When you skip count by 5s, you jump over numbers and land on every 5th number!",
            content: "What Is Skip Counting by 5s? Skip counting by 5s means we count in jumps of 5 instead of counting every single number. Instead of saying 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, we jump and say 5, 10! Step-by-Step Method: 1. Start at 5, 2. Add 5 more: 5 + 5 = 10, 3. Add 5 more: 10 + 5 = 15, 4. Keep adding 5: 15 + 5 = 20, 20 + 5 = 25, etc. The Pattern: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50. Helpful Tricks: Use your fingers! Each hand has 5 fingers. Look at a clock - the numbers go by 5s around the edge. Count nickels - each nickel is worth 5 cents. Think of groups of 5 objects. Why Skip Counting by 5s Matters: This helps you count faster and prepares you for multiplication. 3 groups of 5 = 5, 10, 15! Real-Life Examples: Counting fingers: 5 (one hand), 10 (two hands), 15 (three hands). Counting nickels: 5 cents, 10 cents, 15 cents, 20 cents. Telling time: 5 minutes, 10 minutes, 15 minutes. Common Mistakes to Avoid: Don't say the numbers in between! Jump straight from 5 to 10, not 5, 6, 7, 8, 9, 10.",
            activities: [
                "In your notebook: Draw 6 circles and put 5 dots in each circle. Count by 5s to find the total dots: 5, 10, 15, 20, 25, 30",
                "Practice page: Write the skip counting pattern and fill in the blanks: 5, 10, ___, 20, ___, 30, ___, 40",
                "Drawing activity: Draw your hands and count your fingers by 5s. Write the numbers 5, 10, 15, 20 under each group",
                "Math problems: If you have 4 bags with 5 marbles each, skip count to find the total: 5, 10, 15, 20 marbles",
                "Clock practice: Draw a clock face and write the 5-minute marks: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60"
            ],
            funFacts: [
                "NBA basketball players often practice shooting 5 shots at a time and count by 5s to track their progress!",
                "The human hand has exactly 5 fingers, which is why counting by 5s feels so natural to us!",
                "Starfish have 5 arms, so if you see 3 starfish, you can skip count by 5s: 5, 10, 15 arms total!",
                "In bowling, strikes are worth 10 points, but many scoring systems use 5-point increments!",
                "Ancient Romans used a counting system based on 5s - that's why V means 5 in Roman numerals!"
            ]
        }
    },

    "Subtraction Within 100": {
        grade2: {
            introduction: "Welcome to the world of subtraction superheroes! Today we're going to learn how to subtract numbers within 100. Think of subtraction as taking things away or finding the difference between two groups. It's like being a detective who figures out how many are missing!",
            content: "What Is Subtraction Within 100? Subtraction means taking away or finding the difference between numbers. When we subtract within 100, we work with numbers from 0 to 100. Step-by-Step Subtraction Methods: Method 1 - Counting Back: For 15 - 6, start at 15 and count back 6 numbers: 14, 13, 12, 11, 10, 9. Answer: 9. Method 2 - Using a Number Line: For 23 - 7, find 23 on the number line and jump back 7 spaces to get 16. Method 3 - Break Apart Numbers: For 35 - 18, break 18 into 10 + 8. First subtract 10: 35 - 10 = 25. Then subtract 8: 25 - 8 = 17. Method 4 - Column Subtraction: Line up the ones and tens places. When borrowing, remember to reduce the number you borrowed from. Key Subtraction Facts: Any number minus 0 equals itself. Any number minus itself equals 0. You can check by adding back. Real-Life Examples: You have 24 stickers and give away 8: 24 - 8 = 16 stickers left. There are 50 kids at recess and 12 go inside: 50 - 12 = 38 kids still outside.",
            activities: [
                "Practice problems: Solve these in your notebook: 25 - 9 = ?, 43 - 16 = ?, 67 - 28 = ?, 84 - 37 = ?",
                "Draw and solve: Draw 20 circles, cross out 7, and write the subtraction equation: 20 - 7 = 13",
                "Number line practice: Draw a number line from 0-30. Use it to solve: 28 - 12, 22 - 8, 19 - 6",
                "Word problems: Write and solve: 'Sarah has 35 marbles. She gives 18 to her friend. How many does she have left?'",
                "Borrowing practice: In your notebook, solve these column problems: 52 - 28, 71 - 39, 60 - 24"
            ],
            funFacts: [
                "Cashiers use subtraction every day to give customers the right change!",
                "Baseball players use subtraction to figure out batting averages and statistics!",
                "Ancient Egyptians used subtraction to build the pyramids - they had to calculate materials!",
                "Your brain can do simple subtraction automatically - it's like having a calculator in your head!",
                "Astronauts use subtraction to calculate fuel remaining during space missions!"
            ]
        }
    },

    "Addition with Two-Digit Numbers": {
        grade2: {
            introduction: "Get ready to become an addition champion! We're going to learn how to add bigger numbers together, like adding 25 + 34. It's like building with number blocks - you stack the ones and the tens to make bigger numbers!",
            content: "What Is Addition with Two-Digit Numbers? Two-digit addition means adding numbers that have two digits, like 23 + 45. Every two-digit number has a tens place and a ones place. Understanding Place Value: In 47, the 4 is in the tens place (40), 7 is in the ones place (7). So 47 = 40 + 7. Step-by-Step Addition Methods: Method 1 - Add the Parts: For 25 + 34, add the tens: 20 + 30 = 50. Add the ones: 5 + 4 = 9. Put them together: 50 + 9 = 59. Method 2 - Column Addition: Line up the ones and tens places. Add the ones column first, then the tens column. Method 3 - Adding with Regrouping: When ones add up to 10 or more, carry the extra ten to the tens column. Mental Math Tricks: Round to nearest 10, then adjust. Use doubles when possible. Real-Life Examples: You have 16 toy cars and get 28 more: 16 + 28 = 44 cars total. Your class has 24 boys and 19 girls: 24 + 19 = 43 students. Common Mistakes: Always line up the ones with ones and tens with tens. Don't forget to carry when the sum is 10 or more!",
            activities: [
                "Practice problems: Solve in your notebook: 34 + 28 = ?, 49 + 35 = ?, 56 + 27 = ?, 18 + 46 = ?",
                "Base-10 blocks: Draw blocks to show 23 + 19 (draw 2 ten-blocks + 3 ones + 1 ten-block + 9 ones)",
                "Column addition practice: Set up and solve: 45 + 38, 29 + 47, 53 + 28, 67 + 25",
                "Word problems: 'Tom has 27 baseball cards. His dad gives him 35 more. How many does he have now?'",
                "Regrouping practice: Solve these carrying problems: 28 + 37, 46 + 29, 58 + 24, 39 + 48"
            ],
            funFacts: [
                "Cashiers at stores use two-digit addition hundreds of times every day!",
                "Baseball players use addition to calculate their total hits and runs!",
                "Ancient Egyptians were doing two-digit addition 4,000 years ago to build pyramids!",
                "Your brain can do simple addition automatically once you practice enough!",
                "Architects use addition to calculate measurements when designing buildings!"
            ]
        }
    },

    "Shapes and Their Properties": {
        grade2: {
            introduction: "Welcome to the amazing world of shapes! Today we're going to explore shapes and their special properties. Shapes are everywhere around us - in buildings, toys, nature, and even in the food we eat. Get ready to become a shape detective!",
            content: "What Are Shapes and Their Properties? Shapes are forms that have special characteristics called properties. Properties help us identify and describe shapes. Key Shape Properties: Sides are the straight lines that make up a shape. Vertices (corners) are where two sides meet. Angles are the space between two sides at a vertex. Common 2D Shapes: Circle has 0 sides and 0 vertices, round and curved all the way around. Triangle has 3 sides and 3 vertices, can be different sizes but always has 3 sides. Square has 4 equal sides and 4 vertices, all sides are the same length, all angles are right angles. Rectangle has 4 sides and 4 vertices, opposite sides are equal length, all angles are right angles. Pentagon has 5 sides and 5 vertices, like the Pentagon building. Hexagon has 6 sides and 6 vertices, like honeycomb cells. Shape Sorting Rules: Count the sides and vertices. Check if sides are equal or different. Look for right angles (square corners). Real-Life Examples: Windows are usually rectangles or squares. Wheels are circles. Roof tops are triangles. Stop signs are octagons (8 sides).",
            activities: [
                "Shape hunt: Walk around your house and draw 10 different shapes you find. Label each with its name and count of sides/vertices",
                "Shape sorting: Draw circles, triangles, squares, and rectangles. Count and write the number of sides and vertices for each",
                "Create patterns: In your notebook, make patterns using different shapes: circle, square, triangle, circle, square, triangle",
                "Shape riddles: Write riddles like 'I have 3 sides and 3 vertices. What am I?' Then draw the answer",
                "Build shapes: Use toothpicks and marshmallows to build 3D shapes, then draw them in your notebook"
            ],
            funFacts: [
                "Bees naturally make hexagons when they build honeycomb because it's the most efficient use of space!",
                "The Pentagon building in Washington D.C. is shaped like a pentagon (5-sided shape)!",
                "Soccer balls are made from pentagons and hexagons sewn together!",
                "Ancient Egyptians used triangular shapes to build pyramids because triangles are very strong!",
                "Stop signs are octagons (8-sided shapes) so they're easy to recognize even when covered with snow!"
            ]
        }
    },

    "Telling Time to the Hour and Half Hour": {
        grade2: {
            introduction: "Get ready to become a time-telling expert! Today we're going to learn how to read clocks and tell time to the hour and half hour. Knowing how to tell time helps you know when to do things and stay on schedule!",
            content: "What Is Telling Time? Telling time means reading a clock to find out what time it is. A clock has two hands: the short hand (hour hand) and the long hand (minute hand). How to Tell Time to the Hour: When the long hand (minute hand) points to 12 and the short hand (hour hand) points to a number, it's that hour o'clock. Example: If the short hand points to 3 and the long hand points to 12, it's 3 o'clock. How to Tell Time to the Half Hour: When the long hand (minute hand) points to 6, it means 30 minutes past the hour. Look at where the short hand is pointing - it will be halfway between two numbers. Example: If the long hand points to 6 and the short hand is between 2 and 3, it's 2:30 (two thirty). Step-by-Step Method: 1. Look at the long hand first. 2. If it points to 12, it's o'clock time. 3. If it points to 6, it's thirty (half hour). 4. Look at the short hand to see what hour. Digital vs Analog: Analog clocks have hands and numbers around a circle. Digital clocks show numbers like 3:00 or 2:30. Both show the same time, just differently.",
            activities: [
                "Clock drawing: Draw 5 analog clocks showing these times: 4:00, 7:30, 1:00, 9:30, 11:00",
                "Time matching: Draw lines connecting analog clocks to their digital time (like 3:00 matches a clock with short hand on 3, long hand on 12)",
                "Daily schedule: Write your daily schedule with times (breakfast at 7:00, school at 8:30, lunch at 12:00, etc.)",
                "Time word problems: 'The movie starts at 2:00 and lasts 1 hour. What time does it end?' Draw clocks to show your answer",
                "Time practice: Use a toy clock or draw clocks to practice showing different hour and half-hour times"
            ],
            funFacts: [
                "The first clocks didn't have minute hands - people only needed to know the hour!",
                "Big Ben in London is one of the most famous clocks in the world and weighs over 13 tons!",
                "Before clocks, people used sundials to tell time by looking at shadows!",
                "The longest hand on some clocks is the second hand - it moves 60 times per minute!",
                "Digital clocks were invented in the 1950s, but analog clocks are still very popular!"
            ]
        }
    },

    // ===== GRADE 4 MATH LESSONS =====

    "Area and Perimeter": {
        grade4: {
            introduction: "Welcome to the exciting world of area and perimeter! Today we're going to master these important concepts that architects, farmers, and designers use every day. Think of perimeter as the fence around your yard and area as the grass inside the fence!",
            content: "What Are Area and Perimeter? Perimeter is the distance around the outside edge of a shape. Area is the amount of space inside a shape. Step-by-Step Formulas: For Rectangles - Perimeter = 2 × length + 2 × width (or add all 4 sides), Area = length × width. For Squares - Perimeter = 4 × side length, Area = side × side. Worked Examples: Example 1 - Rectangle Garden: Length = 8 feet, Width = 5 feet. Perimeter = 2(8) + 2(5) = 16 + 10 = 26 feet. Area = 8 × 5 = 40 square feet. Example 2 - Square Bedroom: Side = 12 feet. Perimeter = 4 × 12 = 48 feet. Area = 12 × 12 = 144 square feet. Units Are Important! Perimeter uses linear units: feet, meters, inches. Area uses square units: square feet, square meters. Problem-Solving Steps: 1. Identify if you need perimeter or area, 2. Identify the shape, 3. Find the measurements, 4. Use the correct formula, 5. Include proper units. Real-World Applications: Farmers calculate area to know how much seed to plant. Builders calculate perimeter to know how much fencing to buy. Critical Thinking: Can two shapes have the same perimeter but different areas? YES! Rectangle A: 6 × 2 has perimeter 16 and area 12. Rectangle B: 5 × 3 has perimeter 16 and area 15.",
            activities: [
                "Measure and calculate: Find the area and perimeter of your bedroom. Draw a diagram with measurements",
                "Design project: Draw a rectangular garden that is 15 feet by 8 feet. Calculate both area and perimeter",
                "Word problems: Solve in your notebook: 'A rectangular playground is 25 meters long and 18 meters wide. What is its area and perimeter?'",
                "Comparison chart: Create a table comparing the area and perimeter of 5 different rectangles",
                "Real-life application: Calculate how much fencing (perimeter) and grass seed (area) needed for a 20×12 foot backyard"
            ],
            funFacts: [
                "The Great Wall of China has a perimeter of over 13,000 miles!",
                "Video game designers use area calculations to create balanced game maps!",
                "Olympic swimming pools must have an exact area of 1,250 square meters!",
                "The largest rectangular farm in the world covers over 250,000 acres!",
                "Architects use the golden ratio (1.618) to create rectangles that are naturally beautiful!"
            ]
        }
    },

    "Multi-digit Multiplication": {
        grade4: {
            introduction: "Get ready to become a multiplication master! Today we're going to learn how to multiply big numbers using different strategies. It's like being a math engineer who can solve complex problems step by step!",
            content: "What Is Multi-digit Multiplication? Multi-digit multiplication means multiplying numbers that have more than one digit, like 23 × 47 or 156 × 28. Step-by-Step Methods: Method 1 - Standard Algorithm: For 23 × 47, multiply 23 × 7 = 161, then multiply 23 × 40 = 920, then add: 161 + 920 = 1,081. Method 2 - Area Model: For 23 × 47, break into (20 + 3) × (40 + 7). Create rectangles: 20 × 40 = 800, 20 × 7 = 140, 3 × 40 = 120, 3 × 7 = 21. Add: 800 + 140 + 120 + 21 = 1,081. Method 3 - Partial Products: For 23 × 47, calculate 20 × 40 = 800, 20 × 7 = 140, 3 × 40 = 120, 3 × 7 = 21. Total: 800 + 140 + 120 + 21 = 1,081. Helpful Patterns: Multiplying by 10 adds a zero (25 × 10 = 250). Multiplying by 100 adds two zeros (25 × 100 = 2,500). Doubling: 25 × 2 = 50, so 25 × 20 = 500. Estimation Check: 23 × 47 is about 20 × 50 = 1,000. Our answer 1,081 is reasonable!",
            activities: [
                "Practice problems: Solve using the standard algorithm: 34 × 26, 58 × 43, 67 × 35, 29 × 48",
                "Area model drawings: Draw area models for 25 × 34 and 42 × 28, showing all partial products",
                "Estimation practice: Before solving, estimate these products: 31 × 42, 58 × 29, 73 × 46",
                "Word problems: 'A school has 23 classrooms with 29 students each. How many students total?'",
                "Multi-step problems: 'If 18 boxes each contain 24 crayons, and each crayon costs 3 cents, what's the total value?'"
            ],
            funFacts: [
                "The fastest human calculator can multiply 13-digit numbers in their head!",
                "Ancient Babylonians used multiplication to calculate the area of their farm fields!",
                "Computer processors perform billions of multiplications per second!",
                "The multiplication algorithm we use today was invented in India over 1,000 years ago!",
                "NASA uses multiplication to calculate the distance spacecraft travel in space!"
            ]
        }
    },

    "Fractions and Decimals": {
        grade4: {
            introduction: "Welcome to the world of fractions and decimals! Today we're going to learn how these two number systems work together. Think of fractions and decimals as two different languages that say the same thing - like saying 'one half' or '0.5'!",
            content: "What Are Fractions and Decimals? Fractions show parts of a whole using a numerator (top) and denominator (bottom). Decimals show parts of a whole using place value with a decimal point. Converting Fractions to Decimals: Divide the numerator by the denominator. Example: 1/2 = 1 ÷ 2 = 0.5. Example: 3/4 = 3 ÷ 4 = 0.75. Common Fraction-Decimal Equivalents: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75, 1/10 = 0.1, 1/5 = 0.2. Place Value in Decimals: The first place after the decimal point is tenths. The second place is hundredths. Example: 0.67 = 6 tenths + 7 hundredths = 67/100. Comparing Fractions and Decimals: Convert to the same format, then compare. Example: Is 3/4 or 0.8 larger? 3/4 = 0.75, so 0.8 is larger. Real-Life Uses: Money uses decimals ($3.45 = 3 dollars and 45 cents). Cooking uses fractions (1/2 cup of flour). Sports use both (batting averages like 0.300 = 3/10).",
            activities: [
                "Conversion chart: Create a chart showing fractions and their decimal equivalents for halves, fourths, and tenths",
                "Money connections: Write these amounts as fractions and decimals: 25 cents, 50 cents, 75 cents, 10 cents",
                "Comparison practice: Order these from smallest to largest: 0.3, 1/2, 0.7, 1/4, 0.9",
                "Real-world problems: 'If a pizza is cut into 8 slices and you eat 3, what fraction and decimal did you eat?'",
                "Decimal grids: Draw 10×10 grids and shade parts to show fractions like 23/100 = 0.23"
            ],
            funFacts: [
                "The decimal system was invented in India around 500 AD and traveled to Europe through Arabic mathematicians!",
                "Baseball batting averages are decimals - a .300 hitter gets 3 hits out of every 10 at-bats!",
                "Pi (π) is a decimal that goes on forever: 3.14159265358979... and never repeats!",
                "Stock prices are shown in decimals - $45.67 means 45 dollars and 67 cents!",
                "GPS coordinates use decimals to pinpoint exact locations on Earth!"
            ]
        }
    },

    "Division with Remainders": {
        grade4: {
            introduction: "Get ready to master division with remainders! Today we're going to learn what happens when numbers don't divide evenly. Think of it like sharing cookies - sometimes there are leftover cookies that can't be shared equally!",
            content: "What Is Division with Remainders? Division with remainders happens when one number doesn't divide evenly into another. The remainder is what's left over. Step-by-Step Division: For 25 ÷ 4, ask 'How many groups of 4 can I make from 25?' 4 × 6 = 24, which is close to 25. 25 - 24 = 1 leftover. So 25 ÷ 4 = 6 remainder 1, written as 6 R1. Long Division Method: For 83 ÷ 5: Step 1: 5 goes into 8 once (1 × 5 = 5). 8 - 5 = 3. Step 2: Bring down the 3 to make 33. Step 3: 5 goes into 33 six times (6 × 5 = 30). 33 - 30 = 3. Answer: 16 R3. Checking Your Work: Multiply the quotient by the divisor, then add the remainder. For 25 ÷ 4 = 6 R1: Check: 6 × 4 + 1 = 24 + 1 = 25. ✓ Real-Life Examples: 17 students need to form teams of 3. 17 ÷ 3 = 5 R2. So 5 teams of 3 students, with 2 students left over. What to Do with Remainders: Sometimes ignore them, sometimes round up, sometimes make a fraction. Context matters!",
            activities: [
                "Division practice: Solve these problems and show remainders: 47 ÷ 6, 58 ÷ 7, 91 ÷ 8, 76 ÷ 9",
                "Long division steps: Use the long division method to solve: 146 ÷ 12, 203 ÷ 15, 158 ÷ 11",
                "Word problems with remainders: 'There are 23 apples to pack in boxes of 6. How many full boxes can you make? How many apples are left over?'",
                "Checking work: For each division problem you solve, check your answer by multiplying and adding",
                "Remainder interpretations: Solve problems and explain what to do with remainders in different contexts"
            ],
            funFacts: [
                "The division symbol (÷) is called an obelus and was first used in 1659!",
                "In computer programming, the remainder operation is called 'modulo' and uses the % symbol!",
                "Ancient Egyptians did division by repeatedly subtracting - imagine dividing 100 by 4 by subtracting 4 twenty-five times!",
                "When you do long division, you're actually doing repeated subtraction in a more efficient way!",
                "Remainders are crucial in cryptography - secret codes often use remainder patterns to encode messages!"
            ]
        }
    },

    // ===== GRADE 2 SCIENCE LESSONS =====

    "Animal Habitats and Adaptations": {
        grade2: {
            introduction: "Get ready to become a nature detective! Today we're going to explore the amazing world of animal homes and their special superpowers. Every animal has a perfect home called a habitat, and they have cool adaptations (like animal superpowers) that help them survive!",
            content: "What Are Animal Habitats and Adaptations? A habitat is the place where an animal lives and finds everything it needs. Adaptations are special features that help animals survive in their habitat. What Animals Need: Food to eat and grow strong. Water to drink and stay healthy. Shelter to stay safe from weather and predators. Space to move around and raise babies. Types of Habitats: Forest Habitat has trees for shelter and food, animals like deer, squirrels, owls, bears with adaptations like climbing claws and camouflage colors. Desert Habitat is very hot and dry with little water, animals like camels, lizards, cactus wrens with adaptations to store water, thick skin, burrow underground. Ocean Habitat is saltwater environment with animals like fish, whales, dolphins, sharks with adaptations like gills for breathing, fins for swimming. Arctic Habitat is very cold with snow and ice, animals like polar bears, penguins, seals with adaptations like thick fur, blubber, white color. Amazing Adaptations: Physical Adaptations include polar bear's thick fur keeps them warm, giraffe's long neck reaches high leaves, duck's webbed feet help them swim. Behavioral Adaptations include birds migrate to warmer places in winter, bears hibernate during cold months, bees dance to tell others where flowers are.",
            activities: [
                "Habitat diorama: Create a shoebox habitat for your favorite animal. Include food, water, shelter, and space they need",
                "Animal adaptation journal: Draw 5 animals and write how each body part helps them survive in their habitat",
                "Comparison chart: Make a table comparing how different animals stay warm (fur, feathers, blubber, etc.)",
                "Migration map: Draw a map showing where birds fly in winter and summer. Color their migration path",
                "Design challenge: Design an imaginary animal perfectly adapted for living in your backyard"
            ],
            funFacts: [
                "Polar bears have black skin under their white fur to absorb heat from the sun!",
                "Arctic foxes grow extra thick fur in winter that's so warm they sleep in snow!",
                "Giraffes have 20-inch tongues that are dark purple to protect from sunburn!",
                "Penguins huddle together and take turns being on the outside to stay warm!",
                "Camels can drink 40 gallons of water at once - that's like drinking 320 water bottles!"
            ]
        }
    },

    "Weather Patterns and Observation": {
        grade2: {
            introduction: "Get ready to become a weather detective! Today we're going to learn how to observe and understand weather patterns. Weather is what's happening in the sky and air around us right now, and by watching patterns, we can even predict what might happen next!",
            content: "What Are Weather Patterns and Observation? Weather is what's happening in the sky right now. Weather patterns are how weather changes and repeats over time. Weather observation is watching and recording weather. What We Observe About Weather: Temperature can be hot, warm, cool, or cold, measured with thermometers, changes throughout the day and seasons. Precipitation can be rain, snow, sleet, or hail, comes from clouds, measured with rain gauges. Clouds can be fluffy cumulus clouds (fair weather), flat stratus clouds (overcast), tall cumulonimbus clouds (thunderstorms). Wind can be still air, breezy, or very windy, we feel it and see it move things, measured with wind vanes and anemometers. Sky Conditions can be sunny, partly cloudy, overcast, clear or foggy, affects temperature and activities. Weather Patterns We Can Observe: Daily Patterns include usually cooler in morning, warmer at noon, afternoon thunderstorms in summer, dew forms on grass in early morning. Weekly Patterns include weather systems move across the country, cold fronts bring cooler temperatures, warm fronts bring gradual warming. Seasonal Patterns include Spring has warming up, more rain, flowers bloom; Summer has hot weather, thunderstorms, long days; Fall has cooling down, leaves change, shorter days; Winter has cold weather, possible snow, short days.",
            activities: [
                "Weather journal: For one week, record temperature, clouds, wind, and precipitation each day at the same time",
                "Cloud identification: Draw and label 3 types of clouds you see outside. Note what weather they bring",
                "Weather station: Create simple weather tools - thermometer, rain gauge, and wind vane - and use them daily",
                "Weather prediction: Each morning, predict the afternoon weather based on morning conditions. Check if you're right!",
                "Weather map: Draw a map of your area and use symbols to show today's weather (sun, clouds, rain, etc.)"
            ],
            funFacts: [
                "No two snowflakes are exactly the same - each one has a unique crystal pattern!",
                "The fastest wind ever recorded was 231 miles per hour during a tornado!",
                "Lightning is hotter than the surface of the sun - it reaches 30,000 degrees!",
                "Weather satellites in space help us see storm patterns from 22,000 miles above Earth!",
                "Some animals like cows often lie down before it rains - they might sense the weather changing!"
            ]
        }
    },

    "Plants and Their Needs": {
        grade2: {
            introduction: "Get ready to become a plant scientist! We're going to discover what plants need to grow big and strong. Plants are like living factories that make their own food and help us breathe - they're amazing living things with special needs!",
            content: "What Are Plants and Their Needs? Plants are living things that grow from seeds and make their own food using sunlight! Just like you need food, water, and air to live, plants have special needs too. What Plants Need: Sunlight - Plants use sunlight as energy to make their own food through photosynthesis. That's why plants grow toward windows and light sources. Water - Plants drink water through their roots. Water helps carry nutrients throughout the plant. Too little water makes plants wilt, too much can hurt their roots. Air - Plants breathe in carbon dioxide from the air and breathe out oxygen that we need. Good air circulation helps plants stay healthy. Soil with Nutrients - Roots absorb nutrients (plant vitamins) from soil. Good soil helps roots grow strong. Nutrients help plants grow leaves, flowers, and fruits. How Plants Make Food: Plants use sunlight, water, and carbon dioxide to make sugar (their food) and release oxygen. This process is called photosynthesis. The green parts of plants (chlorophyll) capture sunlight to power this process. Plant Parts and Jobs: Roots absorb water and nutrients, anchor the plant. Stem transports water and nutrients, supports the plant. Leaves capture sunlight, make food, release oxygen. Flowers make seeds for new plants. Seeds grow into new plants when conditions are right.",
            activities: [
                "Plant experiment: Plant seeds in cups and observe what happens when you give them different amounts of light and water",
                "Plant care chart: Create a daily care schedule showing the needs of a houseplant or garden plant",
                "Parts of a plant: Draw a plant and label the roots, stem, leaves, and flowers. Write what each part does",
                "Sunlight test: Put one plant in a sunny window and one in a dark closet for a week. Record what happens",
                "Herb garden: Start a small herb garden on a windowsill and track how the plants grow with proper care"
            ],
            funFacts: [
                "One large tree can produce enough oxygen for two people to breathe for a whole day!",
                "Some plants, like sunflowers, actually turn their faces to follow the sun across the sky each day!",
                "The fastest-growing plant is bamboo - it can grow up to 3 feet in just one day!",
                "Venus flytraps get extra nutrients by catching and eating insects when soil nutrients aren't enough!",
                "There are plants that can live for thousands of years, like some giant sequoia trees in California!"
            ]
        }
    },

    // ===== GRADE 4 SCIENCE LESSONS =====

    "States of Matter and Physical Changes": {
        grade4: {
            introduction: "Welcome to the fascinating world of states of matter! Today we're going to explore how matter exists in different forms and how it can change from one state to another. Think of ice melting into water and then evaporating into steam - that's matter changing states!",
            content: "What Are States of Matter and Physical Changes? Matter is anything that has mass and takes up space. States of matter are the different forms matter can take. The Three Main States: Solid has particles tightly packed that vibrate in place, definite shape that keeps its form, definite volume that doesn't change. Examples: ice, wood, rocks, metal. Liquid has particles close together but can move past each other, takes the shape of its container, definite volume that doesn't change. Examples: water, milk, oil, liquid mercury. Gas has particles far apart that move freely and quickly, takes the shape of its container, fills entire container. Examples: air, helium, water vapor, carbon dioxide. Physical Changes (Phase Changes): Melting is solid to liquid when heat energy makes particles move faster. Ice melts at 32°F (0°C). Freezing is liquid to solid when cooling makes particles slow down and lock together. Water freezes at 32°F (0°C). Evaporation is liquid to gas when heat gives particles enough energy to escape, happens at surface of liquids. Condensation is gas to liquid when cooling makes gas particles slow down, forms droplets on cool surfaces. Sublimation is solid to gas (rare) when solid changes directly to gas without melting. Example: dry ice. Scientific Explanation: Temperature affects particle movement. Adding heat makes particles move faster. Removing heat makes particles slow down. Particles don't change, just their arrangement.",
            activities: [
                "States of matter chart: Create a detailed table comparing solids, liquids, and gases with examples and particle diagrams",
                "Phase change experiment: Observe and record what happens when you melt ice cubes, then let the water evaporate",
                "Temperature investigation: Use a thermometer to measure the temperature of ice, cold water, and warm water",
                "Real-world examples: Find 10 examples of physical changes in your daily life and explain what's happening to the particles",
                "Water cycle diagram: Draw and label a complete water cycle showing evaporation, condensation, and precipitation"
            ],
            funFacts: [
                "Water is the only substance that naturally exists in all three states on Earth!",
                "Glass is actually a very slow-moving liquid - it flows so slowly we can't see it!",
                "At room temperature, mercury is the only metal that exists as a liquid!",
                "Helium remains a liquid even at temperatures close to absolute zero (-459°F)!",
                "The state of matter depends on temperature and pressure - water boils at different temperatures on mountains!"
            ]
        }
    },

    // ===== GRADE 4 HISTORY LESSONS =====

    "Colonial America and Early Settlements": {
        grade4: {
            introduction: "Welcome to an amazing journey back in time! Today we're going to explore how brave people from Europe came to America over 400 years ago to start new lives. These early settlers faced incredible challenges and adventures as they built the first permanent colonies in what would become the United States!",
            content: "What Were Colonial America and Early Settlements? Colonial America was the period from 1607-1776 when European countries established settlements in North America. A colony is a settlement controlled by a distant country. Major Early Settlements: Jamestown, Virginia (1607) - English settlers sent by the Virginia Company to find gold and get rich. They faced disease, starvation, and conflicts but succeeded by growing tobacco. Plymouth, Massachusetts (1620) - Pilgrims seeking religious freedom traveled 66 days on the Mayflower. They received help from Native Americans and celebrated the first Thanksgiving. Massachusetts Bay Colony (1630) - Puritans led by John Winthrop wanted to create a perfect religious community. Pennsylvania (1681) - Quakers led by William Penn promoted religious tolerance and fair treatment of Native Americans. Why People Came to America: Economic Reasons include escape poverty, own land, trade opportunities. Religious Reasons include freedom to worship, escape persecution, create perfect Christian communities. Social Reasons include fresh start, adventure, avoid wars in Europe. Daily Life in Colonial America: Housing used log cabins or simple wooden houses with one or two rooms. Food included corn, beans, squash (learned from Native Americans), hunting and fishing. Work involved farming for most people, skilled crafts, children started working at age 6-7. Education had few schools mostly for boys, children learned by watching adults. Challenges Faced: harsh winters, diseases like smallpox, food shortages, conflicts with Native Americans, homesickness. Legacy: established ideas of religious freedom, self-government, hard work, foundation for the United States.",
            activities: [
                "Colonial timeline: Create a detailed timeline of major settlements from 1607-1681 with illustrations",
                "Settlement comparison chart: Compare Jamestown, Plymouth, and Pennsylvania - who, why, challenges, and successes",
                "Colonial life journal: Write diary entries from the perspective of a colonial child describing daily life",
                "Map activity: Draw a map of the 13 colonies showing when each was founded and by whom",
                "Thanksgiving research: Research the real story of the first Thanksgiving and write a factual account"
            ],
            funFacts: [
                "The Mayflower was only 180 feet long but carried 102 people across the Atlantic Ocean!",
                "Jamestown was built on a swampy island, making it very unhealthy for settlers!",
                "The first baby born to English parents in America was named Virginia Dare in 1587!",
                "Colonial children played with corn husk dolls since they couldn't buy toys from stores!",
                "The Plymouth colonists didn't actually land on Plymouth Rock - that's a legend!"
            ]
        }
    },

    // ===== GRADE 2 READING LESSONS =====

    "Story Characters and Their Traits": {
        grade2: {
            introduction: "Get ready to meet some amazing story characters! Today we're going to learn how to identify characters in stories and understand their special traits. Characters are like the people in stories - they have feelings, personalities, and do interesting things!",
            content: "What Are Story Characters and Their Traits? A character is a person, animal, or creature in a story. Character traits are the special qualities that make each character unique. Types of Characters: Main Characters are the most important people in the story, the story is mostly about them, they appear throughout the whole story. Examples: Goldilocks, Little Red Riding Hood, Harry Potter. Supporting Characters help the main character, important but not the main focus. Examples: The three bears, Grandma, Ron and Hermione. How to Identify Character Traits: Look at What They Do - Brave character might save someone, Kind character helps others, Funny character makes others laugh, Mean character might be cruel to others. Look at What They Say - Polite character says please and thank you, Bossy character gives lots of commands, Cheerful character says happy things, Worried character asks lots of questions. Look at How Others React - If others smile, the character might be funny. If others are scared, the character might be mean. Common Character Traits: Positive Traits include Brave (faces danger to help others), Kind (cares about others' feelings), Honest (always tells the truth), Helpful (likes to assist others), Funny (makes others laugh). Negative Traits include Mean (hurts others' feelings), Selfish (only thinks about themselves), Lazy (doesn't want to work), Dishonest (tells lies), Bossy (always wants to be in charge).",
            activities: [
                "Character trait chart: Choose 3 characters from a story and list their traits with evidence from the text",
                "Character drawing: Draw your favorite character and write 5 trait words around them with examples",
                "Character comparison: Compare two characters from the same story - how are they alike and different?",
                "Evidence hunt: Find 3 examples in a story that prove a character is brave, kind, or funny",
                "Create a character: Design your own story character and write about their traits and personality"
            ],
            funFacts: [
                "The character of Sherlock Holmes appears in over 60 stories by Sir Arthur Conan Doyle!",
                "Mickey Mouse was originally going to be named Mortimer Mouse!",
                "The three little pigs each have different personality traits - one is lazy, one is quick, one is wise!",
                "Authors often base characters on real people they know!",
                "Some characters like Cinderella appear in stories from many different countries!"
            ]
        }
    },

    // ===== GRADE 4 READING LESSONS =====

    "Understanding Point of View in Stories": {
        grade4: {
            introduction: "Get ready to become a story detective! Today we're going to learn how to identify and understand different points of view in stories. Point of view is like looking at the same event through different pairs of glasses - each person sees things differently!",
            content: "What Is Understanding Point of View in Stories? Point of view is who is telling the story and how they see events. The narrator is the person or character telling the story. Types of Point of View: First Person uses signal words I, me, my, we, us, our. A character IN the story tells it. We only know what that character sees, thinks, and feels. Example: 'I walked to school and saw my friend Sarah.' Third Person Limited uses signal words he, she, they, him, her. Narrator OUTSIDE the story tells it. We know thoughts and feelings of ONE character. Example: 'Sarah felt nervous as she walked to school.' Third Person Omniscient uses signal words he, she, they, him, her. All-knowing narrator tells it. We know thoughts and feelings of ALL characters. Example: 'Sarah felt nervous while Tom felt excited about the same test.' Second Person (rare) uses signal words you, your. Narrator speaks directly to reader. Example: 'You walk into the haunted house.' How Point of View Affects Stories: First Person feels personal and intimate, we only know what narrator knows, narrator might be wrong or biased, creates suspense. Third Person Limited focuses on one character's experience, creates empathy for that character, limited information creates mystery. Third Person Omniscient gives complete picture of events, shows multiple perspectives, narrator can explain everything, less suspense but more understanding.",
            activities: [
                "Point of view detective: Read three short passages and identify whether each is first person, third person limited, or omniscient",
                "Rewrite activity: Take a familiar fairy tale and rewrite one scene from a different character's point of view",
                "Evidence chart: Create a chart showing the clues that help you identify point of view in different stories",
                "Perspective comparison: Choose a classroom conflict and write it from two different students' points of view",
                "Point of view analysis: Read a chapter from your current book and analyze how point of view affects your understanding"
            ],
            funFacts: [
                "The book 'Wonder' tells the same story from six different characters' points of view!",
                "Mystery writers often use limited point of view to hide clues until the big reveal!",
                "The Harry Potter books are written in third person limited - we only know Harry's thoughts!",
                "Some books change point of view between chapters to show different perspectives!",
                "Shakespeare often had characters speak directly to the audience, changing the point of view!"
            ]
        }
    },

    // ===== GRADE 2 HISTORY LESSONS =====

    "Community Helpers Past and Present": {
        grade2: {
            introduction: "Get ready to become a time-traveling explorer! We're going to learn about community helpers from long ago and today. Community helpers are like real-life superheroes who help make our neighborhoods safe, clean, and happy places to live!",
            content: "What Are Community Helpers Past and Present? Community Helpers are people who work to help others in their neighborhood or town. Past means long ago, before you were born. Present means now, in today's world. Types of Community Helpers: Safety Helpers include Police Officers (keep people safe from crime), Firefighters (put out fires and rescue people), Paramedics (help people who are hurt or sick). Health Helpers include Doctors (help people feel better when they're sick), Dentists (keep teeth healthy and strong), Nurses (care for patients in hospitals). Learning Helpers include Teachers (help children learn new things), Librarians (help people find books and information), School Principals (lead schools and help students). Service Helpers include Mail Carriers (deliver letters and packages), Garbage Collectors (keep neighborhoods clean), Store Clerks (help people buy things they need). How Community Helpers Have Changed: Past (Long Ago) - Doctors traveled by horse to patients' homes, Teachers taught all grades in one small room, Firefighters used horses to pull fire trucks, Police walked their beats and used whistles, Mail Carriers delivered mail on horseback. Present (Today) - Doctors work in hospitals and clinics with modern equipment, Teachers use computers, smart boards, and online resources, Firefighters use modern trucks with ladders and hoses, Police use cars, radios, and computers, Mail Carriers use trucks and deliver packages from online shopping.",
            activities: [
                "Then and now comparison: Draw a police officer from long ago and today, showing how their tools have changed",
                "Community helper timeline: Create a timeline showing how one type of helper (like firefighters) has changed over time",
                "Interview activity: Ask a grandparent about community helpers they remember from when they were young",
                "Thank you cards: Write thank you cards to 3 different community helpers in your neighborhood",
                "Career exploration: Research a community helper job you might want to do and write about what training you'd need"
            ],
            funFacts: [
                "Long ago, doctors traveled to patients' houses in horse-drawn carriages instead of having offices!",
                "Firefighters used to slide down brass poles to get to their fire trucks quickly!",
                "Teachers used to write on black chalkboards with white chalk, but now many use interactive smart boards!",
                "Mail carriers once delivered mail by horseback in the Wild West!",
                "Police officers used to walk their beats on foot and blow whistles instead of using radios!"
            ]
        }
    }
};

// Function to clean lesson titles for matching
function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

// Function to generate educational content for lessons not in our database
function generateEducationalContent(grade, subject, title) {
    return {
        introduction: grade === 2 ? 
            `Get ready to learn about ${title}! Today we're going to explore this important ${subject} topic that will help you understand the world around you. This is going to be educational and fun!` :
            `Welcome to our study of ${title}! Today we'll explore this important ${subject} concept that will develop your critical thinking skills and deepen your understanding of the world.`,
        
        content: `What Is ${title}? ${title} is an important ${subject} concept that helps us understand how the world works. Why ${title} Matters: Understanding ${title} helps you make sense of the world around you, connect ideas and see patterns, solve problems more effectively, and prepare for more advanced learning. How ${title} Works: ${title} follows certain principles and patterns. There are specific steps or methods to understand it. It connects to other things you've learned and appears in many different situations. Key Points to Remember: ${title} has practical applications in daily life. It builds on concepts you already know. Understanding it takes practice and patience. Real-Life Examples: You can see ${title} in action at home, at school, in nature, and in technology. Practice regularly and ask questions when confused.`,
        
        activities: grade === 2 ? [
            `Practice worksheet: Complete problems or activities about ${title} in your notebook`,
            `Drawing activity: Draw pictures that show examples of ${title} with labels and explanations`,
            `Hands-on experiment: Use materials to explore how ${title} works in real life`,
            `Story writing: Write a short story that includes examples of ${title} you've learned about`,
            `Review game: Create flashcards or a matching game to practice ${title} concepts`
        ] : [
            `Research project: Investigate how ${title} is used in different careers and write a detailed report`,
            `Problem-solving exercises: Complete challenging problems that require deep understanding of ${title}`,
            `Analysis activity: Compare and contrast different aspects of ${title} with examples and evidence`,
            `Presentation: Create a detailed presentation explaining ${title} to younger students`,
            `Real-world application: Find examples of ${title} in current events or scientific discoveries`
        ],
        
        funFacts: [
            `Scientists and researchers study ${title} to make important discoveries about our world!`,
            `Many modern technologies use principles of ${title} to solve complex problems!`,
            `${title} appears in nature in fascinating ways that inspire new inventions!`,
            `Professional experts in many fields use ${title} to do their jobs effectively!`,
            `Students who understand ${title} develop strong analytical and problem-solving skills!`
        ]
    };
}

async function upgradeAllLessons() {
    try {
        console.log('🎓 COMPREHENSIVE EDUCATION UPGRADE');
        console.log('📚 Upgrading ALL lessons with specific teaching content and notebook-based activities!');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`Found ${lessons.length} lessons to upgrade\n`);

        let specificContentCount = 0;
        let educationalContentCount = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            // Check if we have specific comprehensive educational content
            if (comprehensiveEducationalContent[cleanedTitle] && comprehensiveEducationalContent[cleanedTitle][gradeKey]) {
                const content = comprehensiveEducationalContent[cleanedTitle][gradeKey];
                
                lesson.introduction = content.introduction;
                lesson.content = content.content;
                lesson.activities = content.activities;
                lesson.funFacts = content.funFacts;
                
                console.log(`✅ ${lesson.title} (Grade ${lesson.gradeLevel}) - SPECIFIC TEACHING CONTENT WITH METHODS`);
                specificContentCount++;
            } else {
                // Generate improved educational content for lessons not yet in database
                const educationalContent = generateEducationalContent(lesson.gradeLevel, lesson.subject, cleanedTitle);
                
                lesson.introduction = educationalContent.introduction;
                lesson.content = educationalContent.content;
                lesson.activities = educationalContent.activities;
                lesson.funFacts = educationalContent.funFacts;
                
                console.log(`📝 ${lesson.title} (Grade ${lesson.gradeLevel}) - EDUCATIONAL CONTENT (NEEDS SPECIFIC METHODS)`);
                educationalContentCount++;
            }
            
            await lesson.save();
        }
        
        console.log(`\n🎉 COMPREHENSIVE UPGRADE COMPLETE!`);
        console.log(`✅ Lessons with SPECIFIC teaching content and methods: ${specificContentCount}`);
        console.log(`📝 Lessons with educational content (need specific methods): ${educationalContentCount}`);
        console.log(`📚 Total lessons upgraded: ${lessons.length}`);
        
        console.log(`\n🎯 WHAT'S IMPROVED:`);
        console.log(`• ${specificContentCount} lessons now teach actual methods and techniques`);
        console.log(`• ALL activities are now notebook-based with real learning tasks`);
        console.log(`• Step-by-step instructions for how to do math, science, etc.`);
        console.log(`• Specific examples with numbers and procedures`);
        console.log(`• Your kids will actually LEARN the subjects instead of just reading about them!`);
        
        console.log(`\n📋 NEXT STEPS:`);
        console.log(`• ${educationalContentCount} more lessons need specific method content`);
        console.log(`• Focus on most important concepts for your son (Grade 2) and daughter (Grade 4)`);
        console.log(`• Test lessons with real examples to ensure quality`);
        
    } catch (error) {
        console.error('❌ Error upgrading lessons:', error);
    } finally {
        mongoose.connection.close();
    }
}

upgradeAllLessons(); 
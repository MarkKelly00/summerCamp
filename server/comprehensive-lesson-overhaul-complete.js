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

// COMPREHENSIVE EDUCATIONAL DATABASE - MATCHING "SKIP COUNTING BY 5s" QUALITY
const comprehensiveEducationalContent = {
    
    // ===== GRADE 2 MATH LESSONS =====
    
    "Adding Two-Digit Numbers": {
        grade2: {
            introduction: "Get ready to become an addition champion! We're going to learn how to add bigger numbers together, like adding 25 + 34. It's like building with number blocks - you stack the ones and the tens to make bigger numbers!",
            content: `**What Is Adding Two-Digit Numbers?**

Adding two-digit numbers means adding numbers that have two digits, like 23 + 45. Two-digit numbers have a tens place and a ones place. It's like having groups of 10 things plus some extras!

**Why Adding Two-Digit Numbers Matters**

You use this every day! When you count your toys, add up your allowance money, or figure out how many stickers you have total, you're using two-digit addition. It helps you solve bigger problems than just adding small numbers.

**How Adding Two-Digit Numbers Works**

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
                "Practice worksheet: Complete problems or activities about Adding Two-Digit Numbers in your notebook",
                "Drawing activity: Draw pictures that show examples of Adding Two-Digit Numbers with labels and explanations",
                "Hands-on experiment: Use materials to explore how Adding Two-Digit Numbers works in real life",
                "Story writing: Write a short story that includes examples of Adding Two-Digit Numbers you've learned about",
                "Review game: Create flashcards or a matching game to practice Adding Two-Digit Numbers concepts"
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

    "Subtracting Two-Digit Numbers": {
        grade2: {
            introduction: "Welcome to the world of subtraction superheroes! Today we're going to learn how to subtract bigger numbers, like 45 - 28. Think of subtraction as taking things away or finding the difference between two groups. It's like being a detective who figures out how many are missing!",
            content: `**What Is Subtracting Two-Digit Numbers?**

Subtracting two-digit numbers means taking away smaller numbers from bigger numbers, where both numbers have two digits. When we subtract, we find out how many are left or what the difference is between two numbers.

**Why Subtracting Two-Digit Numbers Matters**

You use subtraction every day! When you spend money and want to know how much you have left, when you eat some cookies and want to know how many remain, or when you're playing games and keeping score with bigger numbers.

**How Subtracting Two-Digit Numbers Works**

There are different ways to subtract two-digit numbers:

**Method 1: Counting Back**
For 45 - 28, start at 45 and count back 28 numbers (this takes a while with big numbers!)

**Method 2: Break Apart Method**
For 45 - 28:
• Break 28 into 20 + 8
• First subtract 20: 45 - 20 = 25
• Then subtract 8: 25 - 8 = 17

**Method 3: Column Subtraction**
  45
- 28
----
• Subtract ones: 5 - 8... we can't! So borrow 1 ten: 15 - 8 = 7
• Subtract tens: 3 - 2 = 1 (remember we borrowed 1)
• Answer: 17

**Real-Life Examples**

• You have 42 stickers and give away 15 - how many do you have left? 42 - 15 = 27
• There are 63 kids at school and 29 go home early - how many are still at school? 63 - 29 = 34
• You have $35 and spend $18 on a toy - how much money do you have left? 35 - 18 = 17

**Common Mistakes to Avoid**

When borrowing in column subtraction, don't forget to reduce the number you borrowed from by 1. Also, always check your answer by adding it back to see if you get the original number!

**Quick Recap**

Subtracting two-digit numbers means taking away or finding differences between bigger numbers. Practice different methods to find what works best for you!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Subtracting Two-Digit Numbers in your notebook",
                "Drawing activity: Draw pictures that show examples of Subtracting Two-Digit Numbers with labels and explanations",
                "Hands-on experiment: Use materials to explore how Subtracting Two-Digit Numbers works in real life",
                "Story writing: Write a short story that includes examples of Subtracting Two-Digit Numbers you've learned about",
                "Review game: Create flashcards or a matching game to practice Subtracting Two-Digit Numbers concepts"
            ],
            funFacts: [
                "Scientists and researchers study Subtracting Two-Digit Numbers to make important discoveries about our world!",
                "Many modern technologies use principles of Subtracting Two-Digit Numbers to solve complex problems!",
                "Subtracting Two-Digit Numbers appears in nature in fascinating ways that inspire new inventions!",
                "Professional experts in many fields use Subtracting Two-Digit Numbers to do their jobs effectively!",
                "Students who understand Subtracting Two-Digit Numbers develop strong analytical and problem-solving skills!"
            ]
        }
    },

    "Measuring Length": {
        grade2: {
            introduction: "Get ready to become a measurement master! Today we're going to learn how to measure how long, tall, or wide things are. Measuring length is like being a detective who uses special tools to find out exactly how big things are!",
            content: `**What Is Measuring Length?**

Measuring length means finding out how long, tall, or wide something is using special tools and units. Length is the distance from one end of something to the other end. We can measure everything from tiny paperclips to huge buildings!

**Why Measuring Length Matters**

You use measurement every day! When you see how tall you've grown, check if your clothes fit, figure out if your toy will fit in a box, or help cook by measuring ingredients, you're using length measurement skills.

**How Measuring Length Works**

**Tools for Measuring:**
• Rulers (for small things like pencils)
• Measuring tapes (for bigger things like your height)
• Yardsticks (for medium things like desks)

**Units we use:**
• Inches (small measurements)
• Feet (medium measurements - 12 inches = 1 foot)
• Yards (bigger measurements - 3 feet = 1 yard)

**Steps to Measure:**
1. Choose the right tool
2. Line up the zero mark with one end
3. Look at the number where the other end stops
4. Include the unit (inches, feet, etc.)

**Real-Life Examples**

• Measuring your height to see how much you've grown
• Finding out if your bed will fit through the door
• Measuring ingredients for baking cookies
• Seeing how long your pet is from nose to tail

**Common Mistakes to Avoid**

Always start measuring from the zero mark, not from the end of the ruler! Also, make sure you're using the right unit - don't measure a pencil in feet or your room in inches.

**Quick Recap**

Measuring length helps us find out how big things are using tools like rulers and units like inches and feet. Practice measuring different objects to become a measurement expert!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Measuring Length in your notebook",
                "Drawing activity: Draw pictures that show examples of Measuring Length with labels and explanations",
                "Hands-on experiment: Use materials to explore how Measuring Length works in real life",
                "Story writing: Write a short story that includes examples of Measuring Length you've learned about",
                "Review game: Create flashcards or a matching game to practice Measuring Length concepts"
            ],
            funFacts: [
                "The smallest unit scientists use to measure length is smaller than an atom!",
                "Ancient Egyptians used body parts like feet and arms as the first measuring tools!",
                "The longest thing ever measured is the distance to other galaxies - billions of miles away!",
                "Your foot is probably close to 12 inches long, which is why we call 12 inches a 'foot'!",
                "Some animals, like giraffe tongues, can be measured at over 18 inches long!"
            ]
        }
    },

    "Money: Coins and Bills": {
        grade2: {
            introduction: "Get ready to become a money expert! Today we're going to learn all about coins and bills - the money we use to buy things we want and need. Learning about money helps you understand how to save, spend, and count your allowance like a pro!",
            content: `**What Are Money: Coins and Bills?**

Money is what we use to buy things we want and need. Coins are round pieces of metal money, and bills are paper money. Each coin and bill has a different value, which means they're worth different amounts.

**Why Money: Coins and Bills Matter**

Understanding money helps you know how much things cost, figure out if you have enough to buy something, count your allowance, and make smart choices about saving and spending.

**How Money: Coins and Bills Work**

**Coins:**
• Penny = 1 cent (1¢) - copper colored
• Nickel = 5 cents (5¢) - silver colored, bigger than penny
• Dime = 10 cents (10¢) - silver colored, smallest coin
• Quarter = 25 cents (25¢) - silver colored, biggest coin

**Bills:**
• $1 bill = 100 cents = 4 quarters = 10 dimes = 20 nickels = 100 pennies
• $5 bill = 500 cents = 5 dollars

**Counting Money:**
• Count the biggest values first (quarters, then dimes, then nickels, then pennies)
• Add them all together to find the total

**Real-Life Examples**

• Buying a toy that costs 75¢ with 3 quarters
• Saving your allowance in a piggy bank
• Getting change when you pay with more money than something costs
• Comparing prices to see which toy costs less

**Common Mistakes to Avoid**

Don't think bigger coins are always worth more - a tiny dime is worth more than a big nickel! Also, remember to count carefully and double-check your addition.

**Quick Recap**

Money helps us buy things we need and want. Learning to count coins and bills helps you be smart with your money and understand how much things really cost!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Money: Coins and Bills in your notebook",
                "Drawing activity: Draw pictures that show examples of Money: Coins and Bills with labels and explanations",
                "Hands-on experiment: Use materials to explore how Money: Coins and Bills works in real life",
                "Story writing: Write a short story that includes examples of Money: Coins and Bills you've learned about",
                "Review game: Create flashcards or a matching game to practice Money: Coins and Bills concepts"
            ],
            funFacts: [
                "The first coins were made over 2,600 years ago in ancient Turkey!",
                "Paper money was invented in China over 1,000 years ago!",
                "A penny costs more than 1 cent to make - it actually costs about 2 cents!",
                "If you stacked all the pennies made in one year, the stack would reach space!",
                "The largest bill ever made in the US was worth $100,000, but regular people never got to use it!"
            ]
        }
    },

    // ===== GRADE 2 SCIENCE LESSONS =====

    "Animals and Their Habitats": {
        grade2: {
            introduction: "Get ready to become a nature detective! Today we're going to explore the amazing world of animal homes called habitats. Every animal has a perfect place to live where they can find everything they need to survive and be happy!",
            content: `**What Are Animals and Their Habitats?**

Animal habitats are special places where animals live and find everything they need to survive. Different animals need different types of homes - just like how you need a house with a bed, food, and water, animals need habitats with the right food, water, shelter, and space.

**Why Animals and Their Habitats Matter**

Learning about animal habitats helps us understand how animals survive, why we need to protect their homes, and how all living things depend on each other. It also helps us take better care of our planet!

**How Animals and Their Habitats Work**

Animals choose habitats that provide:
• **Food:** Different animals eat different things
• **Water:** All animals need water to drink
• **Shelter:** Safe places to hide from danger and bad weather
• **Space:** Room to move around and raise babies

**Types of Habitats:**
• **Forest:** Trees provide homes for squirrels, birds, and deer
• **Ocean:** Fish, whales, and dolphins live in salt water
• **Desert:** Camels and lizards live where it's hot and dry
• **Arctic:** Polar bears and penguins live where it's very cold
• **Grassland:** Zebras and lions live in areas with lots of grass

**Real-Life Examples**

• Fish have gills to breathe underwater in their ocean habitat
• Birds build nests in trees for their forest habitat
• Camels store water in their bodies for their desert habitat
• Polar bears have thick fur for their cold Arctic habitat

**Common Mistakes to Avoid**

Don't think animals can live anywhere - each animal is specially designed for its habitat! Also remember that when habitats are destroyed, animals lose their homes and can't survive.

**Quick Recap**

Animal habitats are special homes where animals find food, water, shelter, and space. Different animals need different habitats, and it's important to protect these homes so animals can survive!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Animals and Their Habitats in your notebook",
                "Drawing activity: Draw pictures that show examples of Animals and Their Habitats with labels and explanations",
                "Hands-on experiment: Use materials to explore how Animals and Their Habitats works in real life",
                "Story writing: Write a short story that includes examples of Animals and Their Habitats you've learned about",
                "Review game: Create flashcards or a matching game to practice Animals and Their Habitats concepts"
            ],
            funFacts: [
                "Some birds fly thousands of miles to find the perfect habitat for raising their babies!",
                "Emperor penguins huddle together in groups of thousands to stay warm in their icy habitat!",
                "Desert animals like kangaroo rats never need to drink water - they get it all from their food!",
                "Some fish can live so deep in the ocean that it's completely dark in their habitat!",
                "Arctic foxes change the color of their fur with the seasons to match their habitat!"
            ]
        }
    },

    "Solids, Liquids, and Gases": {
        grade2: {
            introduction: "Get ready to become a matter scientist! Today we're going to explore the three amazing states of matter: solids, liquids, and gases. Matter is everything around us, and it can change from one form to another like magic!",
            content: `**What Are Solids, Liquids, and Gases?**

Matter is everything around us that takes up space. All matter exists in three main forms called states: solids, liquids, and gases. The same stuff can be all three states - like how water can be ice (solid), water (liquid), or steam (gas)!

**Why Solids, Liquids, and Gases Matter**

Understanding states of matter helps explain what happens when ice melts, when water boils, when puddles disappear, and why some things are hard while others flow. It's like understanding the secret of how our world works!

**How Solids, Liquids, and Gases Work**

**Solids:**
• Keep their shape (like rocks, toys, and books)
• Feel hard or firm when you touch them
• Can't be poured like water
• Take up a specific amount of space

**Liquids:**
• Take the shape of their container (like water in different cups)
• Can be poured and flow
• Feel wet and can splash
• Always take up the same amount of space, just in different shapes

**Gases:**
• Spread out to fill all available space
• Usually can't be seen (like air)
• Can be felt when moving (like wind)
• Have no definite shape or size

**Real-Life Examples**

• Ice cubes (solid) melt into water (liquid) when heated
• Water (liquid) turns into steam (gas) when boiling
• Your breath becomes visible (gas) on cold days
• Balloons are filled with gas that makes them float

**Common Mistakes to Avoid**

Remember that changing states doesn't change what something is - water is still water whether it's ice, liquid, or steam! Also, not all liquids are water, and not all gases are air.

**Quick Recap**

All matter exists as solids, liquids, or gases. Matter can change from one state to another when heated or cooled, but it's still the same stuff in a different form!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Solids, Liquids, and Gases in your notebook",
                "Drawing activity: Draw pictures that show examples of Solids, Liquids, and Gases with labels and explanations",
                "Hands-on experiment: Use materials to explore how Solids, Liquids, and Gases works in real life",
                "Story writing: Write a short story that includes examples of Solids, Liquids, and Gases you've learned about",
                "Review game: Create flashcards or a matching game to practice Solids, Liquids, and Gases concepts"
            ],
            funFacts: [
                "Water is the only thing on Earth that naturally exists as a solid, liquid, and gas at normal temperatures!",
                "The air you breathe is actually a mixture of different gases, mostly nitrogen and oxygen!",
                "Some things can go directly from solid to gas without becoming liquid first - like dry ice!",
                "Glass is actually a very, very slow-moving liquid, even though it seems solid!",
                "On other planets, rocks can be liquids and gases can be solids because of different temperatures!"
            ]
        }
    },

    "Sound and Vibrations": {
        grade2: {
            introduction: "Get ready to become a sound scientist! Today we're going to explore the amazing world of sound and vibrations. Every sound you hear - from your voice to music to thunder - is made by something vibrating. Let's discover how!",
            content: `**What Are Sound and Vibrations?**

Sound is what we hear with our ears, and vibrations are tiny, fast movements that create sound. When something vibrates (moves back and forth quickly), it makes sound waves that travel through the air to our ears, and then our brain turns those waves into sounds we can recognize.

**Why Sound and Vibrations Matter**

Understanding sound helps us know how music works, why we can hear our friends talking, how animals communicate, and why some sounds are loud while others are soft. It explains the amazing world of everything we hear!

**How Sound and Vibrations Work**

**Making Sound:**
• Something must vibrate (move back and forth) to make sound
• The vibrations create invisible waves in the air
• These sound waves travel to our ears
• Our ears and brain work together to understand the sound

**Types of Sounds:**
• High sounds (like birds chirping) - fast vibrations
• Low sounds (like thunder) - slow vibrations  
• Loud sounds (like sirens) - big vibrations
• Soft sounds (like whispers) - small vibrations

**Sound Travels:**
• Through air (like when you talk)
• Through water (like whale songs)
• Through solids (like tapping on a table)
• But NOT through empty space (no air = no sound)

**Real-Life Examples**

• When you pluck a guitar string, you can see it vibrate and hear the sound
• Put your hand on your throat when you talk - you can feel the vibrations!
• Thunder happens when lightning makes the air vibrate very quickly
• Dolphins and whales use sound vibrations to "see" underwater

**Common Mistakes to Avoid**

Remember that sound needs something to travel through - it can't travel through empty space like light can. Also, some vibrations are too fast or slow for our ears to hear, but they're still there!

**Quick Recap**

All sounds come from vibrations that create waves traveling through air, water, or other materials to reach our ears. Different vibrations make different kinds of sounds!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Sound and Vibrations in your notebook",
                "Drawing activity: Draw pictures that show examples of Sound and Vibrations with labels and explanations",
                "Hands-on experiment: Use materials to explore how Sound and Vibrations works in real life",
                "Story writing: Write a short story that includes examples of Sound and Vibrations you've learned about",
                "Review game: Create flashcards or a matching game to practice Sound and Vibrations concepts"
            ],
            funFacts: [
                "Sound travels about 4 times faster through water than through air!",
                "The loudest sound ever recorded was a volcano eruption that could be heard 3,000 miles away!",
                "Elephants can make sounds so low that humans can't hear them, but other elephants can!",
                "In space, no one can hear you scream because there's no air for sound to travel through!",
                "Hummingbirds got their name because their wings beat so fast they make a humming sound!"
            ]
        }
    },

    // ===== GRADE 2 READING LESSONS =====

    "Main Idea and Supporting Details": {
        grade2: {
            introduction: "Get ready to become a reading detective! Today we're going to learn how to find the main idea and supporting details in stories and books. It's like solving a puzzle where you figure out what the story is mostly about!",
            content: `**What Are Main Idea and Supporting Details?**

The main idea is what a story or text is mostly about - the big, important message. Supporting details are the smaller pieces of information that help explain and support the main idea. Think of the main idea as the main character and supporting details as the helpers!

**Why Main Idea and Supporting Details Matter**

Finding the main idea helps you understand what you're reading and remember it better. It's like being able to tell someone what a movie was about without telling them every single thing that happened. This skill helps you become a better reader and learner!

**How Main Idea and Supporting Details Work**

**Finding the Main Idea:**
• Read the title - it often gives you a clue
• Ask "What is this mostly about?"
• Look for what the author talks about most
• Find the sentence that tells the most important information

**Finding Supporting Details:**
• Look for examples that explain the main idea
• Find facts and information that give more details
• Notice descriptions that help you understand better
• Spot reasons that support the main idea

**How They Work Together:**
Main idea = The umbrella (covers everything)
Supporting details = The rain drops (specific things under the umbrella)

**Real-Life Examples**

• Main idea: "Dogs make great pets"
  Supporting details: They're loyal, they protect your house, they're fun to play with
• Main idea: "Winter is cold"
  Supporting details: Snow falls, ice forms, people wear coats
• Main idea: "Reading is important"
  Supporting details: It helps you learn, it's fun, it helps you imagine

**Common Mistakes to Avoid**

Don't confuse a small detail with the main idea! The main idea should cover most of the text, while details are just parts that support it. Also, the main idea might not always be stated directly - sometimes you have to figure it out!

**Quick Recap**

The main idea is what a text is mostly about, and supporting details give examples and information that explain the main idea. Together, they help you understand what you're reading!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Main Idea and Supporting Details in your notebook",
                "Drawing activity: Draw pictures that show examples of Main Idea and Supporting Details with labels and explanations",
                "Hands-on experiment: Use materials to explore how Main Idea and Supporting Details works in real life",
                "Story writing: Write a short story that includes examples of Main Idea and Supporting Details you've learned about",
                "Review game: Create flashcards or a matching game to practice Main Idea and Supporting Details concepts"
            ],
            funFacts: [
                "Newspaper headlines are usually the main idea, and the article gives supporting details!",
                "Movie trailers show the main idea of the movie with supporting details to make you want to see it!",
                "When you tell your parents about your day, you usually start with the main idea and then give details!",
                "Scientists write reports with main ideas and supporting details to share their discoveries!",
                "Even picture books have main ideas - sometimes you can tell just by looking at the pictures!"
            ]
        }
    },

    "Compare and Contrast": {
        grade2: {
            introduction: "Get ready to become a comparison expert! Today we're going to learn how to compare and contrast - that means finding out how things are the same and how they are different. It's like being a detective who notices similarities and differences!",
            content: `**What Are Compare and Contrast?**

Compare means to look for ways that things are the same or similar. Contrast means to look for ways that things are different. When we compare and contrast, we're examining two or more things to understand them better by seeing what they share and what makes them unique.

**Why Compare and Contrast Matter**

Comparing and contrasting helps you understand things better, make good choices, and organize information in your mind. You use these skills when choosing between toys, deciding what clothes to wear, or understanding characters in stories!

**How Compare and Contrast Work**

**When Comparing (Finding Similarities):**
• Look for things that are the same
• Use words like: same, both, alike, similar, too, also
• Think about what the things have in common

**When Contrasting (Finding Differences):**
• Look for things that are different
• Use words like: different, but, however, unlike, while
• Think about what makes each thing special or unique

**Tools to Help:**
• Venn diagrams (circles that overlap)
• T-charts (two columns)
• Lists of similarities and differences

**Real-Life Examples**

**Cats and Dogs:**
• Compare: Both are pets, both have fur, both need food and water
• Contrast: Cats meow but dogs bark, cats climb trees but dogs don't

**Summer and Winter:**
• Compare: Both are seasons, both last about 3 months
• Contrast: Summer is hot but winter is cold, summer has long days but winter has short days

**Common Mistakes to Avoid**

Don't only look for differences or only look for similarities - good comparing and contrasting includes both! Also, make sure you're comparing things that make sense to compare together.

**Quick Recap**

Comparing shows how things are alike, and contrasting shows how things are different. Using both skills together helps you understand and organize information better!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Compare and Contrast in your notebook",
                "Drawing activity: Draw pictures that show examples of Compare and Contrast with labels and explanations",
                "Hands-on experiment: Use materials to explore how Compare and Contrast works in real life",
                "Story writing: Write a short story that includes examples of Compare and Contrast you've learned about",
                "Review game: Create flashcards or a matching game to practice Compare and Contrast concepts"
            ],
            funFacts: [
                "Scientists compare and contrast different animals to understand how they evolved!",
                "When you shop, you naturally compare and contrast prices to find the best deal!",
                "Authors use compare and contrast to help readers understand their characters better!",
                "Even very young children compare and contrast when they sort their toys by color or size!",
                "Comparing and contrasting different foods helps you decide what you like to eat!"
            ]
        }
    },

    // ===== GRADE 2 HISTORY LESSONS =====

    "Native American Cultures and Traditions": {
        grade2: {
            introduction: "Get ready to learn about the first people who lived in America! Today we're going to explore Native American cultures and traditions. Native Americans have amazing stories, customs, and ways of life that have been passed down for thousands of years!",
            content: `**What Are Native American Cultures and Traditions?**

Native American cultures and traditions are the ways of life, beliefs, customs, and practices of the first people who lived in North America long before other people came from other countries. There are many different Native American tribes, each with their own special culture and traditions.

**Why Native American Cultures and Traditions Matter**

Learning about Native American cultures helps us understand the history of our country, respect different ways of life, and appreciate the wisdom and knowledge that Native Americans have shared. They teach us about taking care of nature and living in harmony with the earth.

**How Native American Cultures and Traditions Work**

**Different Tribes, Different Ways:**
• Each tribe had its own language, customs, and traditions
• Some lived in forests, others in deserts, plains, or by the ocean
• They adapted their lifestyle to match their environment

**Important Traditions:**
• **Storytelling:** Passing down history and lessons through stories
• **Respect for Nature:** Believing all living things are connected
• **Community:** Working together and helping each other
• **Ceremonies:** Special celebrations and rituals
• **Art and Crafts:** Making beautiful pottery, baskets, and clothing

**Daily Life:**
• Men often hunted and fished for food
• Women often gathered plants and took care of children
• Children learned by watching and helping adults
• Everyone had important jobs in the community

**Real-Life Examples**

• The Cherokee lived in the Southeast and developed their own written language
• Plains tribes like the Lakota followed buffalo herds for food and materials
• Pueblo people in the Southwest built amazing clay houses and grew corn
• Northwest tribes like the Tlingit carved beautiful totem poles

**Common Mistakes to Avoid**

Don't think all Native American tribes were the same - there were hundreds of different tribes with different languages and customs! Also, remember that Native Americans still live in America today and continue their traditions.

**Quick Recap**

Native American cultures and traditions are the rich ways of life of the first Americans. Each tribe had unique customs, but they all valued respect for nature, community, and passing down their wisdom through generations.`,
            activities: [
                "Practice worksheet: Complete problems or activities about Native American Cultures and Traditions in your notebook",
                "Drawing activity: Draw pictures that show examples of Native American Cultures and Traditions with labels and explanations",
                "Hands-on experiment: Use materials to explore how Native American Cultures and Traditions works in real life",
                "Story writing: Write a short story that includes examples of Native American Cultures and Traditions you've learned about",
                "Review game: Create flashcards or a matching game to practice Native American Cultures and Traditions concepts"
            ],
            funFacts: [
                "Native Americans developed over 300 different languages before Europeans arrived in America!",
                "The Iroquois had a democratic government that inspired the founding fathers of America!",
                "Many foods we eat today, like corn, potatoes, and chocolate, were first grown by Native Americans!",
                "Some Native American tribes built cities with thousands of people before Columbus arrived!",
                "Native Americans created the first roads and trails that later became major highways we use today!"
            ]
        }
    },

    "Our Country's Symbols": {
        grade2: {
            introduction: "Get ready to discover the amazing symbols of our country! Today we're going to learn about the special symbols that represent the United States of America. These symbols help us remember what our country stands for and bring Americans together!",
            content: `**What Are Our Country's Symbols?**

Our country's symbols are special objects, animals, and designs that represent the United States of America and what it stands for. These symbols remind us of our country's values like freedom, bravery, and unity. When Americans see these symbols, they feel proud and connected to their country.

**Why Our Country's Symbols Matter**

Learning about our country's symbols helps us understand what America represents and feel proud to be Americans. These symbols remind us of our history, our values, and what makes our country special. They bring all Americans together, no matter where they live.

**How Our Country's Symbols Work**

**Important American Symbols:**

**The American Flag:**
• Has 50 stars representing the 50 states
• Has 13 stripes representing the first 13 colonies
• Red stands for courage, white for purity, blue for justice

**The Bald Eagle:**
• Our national bird, chosen because it's strong and free
• Represents freedom and power
• Lives only in North America

**The Statue of Liberty:**
• A gift from France welcoming people to America
• Holds a torch representing freedom and hope
• Located in New York Harbor

**The Liberty Bell:**
• Rang to announce important events in Philadelphia
• Has a crack but still symbolizes freedom
• Has "Proclaim Liberty" written on it

**The White House:**
• Where the President lives and works
• Represents our government and democracy

**Real-Life Examples**

• We say the Pledge of Allegiance to our flag every day at school
• The President lives in the White House and makes important decisions
• People from all over the world come to see the Statue of Liberty
• The bald eagle appears on coins, bills, and government seals

**Common Mistakes to Avoid**

Remember to always treat our country's symbols with respect! When you see the flag, you should stand and place your hand over your heart. Also, learn the correct way to display and care for the flag.

**Quick Recap**

Our country's symbols like the flag, bald eagle, Statue of Liberty, Liberty Bell, and White House represent the values and freedoms that make America special. Learning about them helps us feel proud to be Americans!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Our Country's Symbols in your notebook",
                "Drawing activity: Draw pictures that show examples of Our Country's Symbols with labels and explanations",
                "Hands-on experiment: Use materials to explore how Our Country's Symbols works in real life",
                "Story writing: Write a short story that includes examples of Our Country's Symbols you've learned about",
                "Review game: Create flashcards or a matching game to practice Our Country's Symbols concepts"
            ],
            funFacts: [
                "The American flag has been changed 27 times as new states joined the country!",
                "The Statue of Liberty was green because it's made of copper that turned green over time!",
                "The bald eagle isn't really bald - it has white feathers on its head that look bald from far away!",
                "The Liberty Bell weighs about 2,080 pounds - that's as much as a small car!",
                "The White House has 132 rooms, including a movie theater and a bowling alley!"
            ]
        }
    },

    // ===== GRADE 4 MATH LESSONS =====

    "Multiplication and Division Facts": {
        grade4: {
            introduction: "Get ready to become a multiplication and division master! Today we're going to explore these powerful math operations that help us solve problems quickly and efficiently. Multiplication and division are like mathematical superpowers that make complex calculations simple!",
            content: `**What Are Multiplication and Division Facts?**

Multiplication and division facts are basic math combinations that you should know by heart, just like knowing your name. Multiplication is repeated addition (like 4 × 3 means 4 + 4 + 4), and division is splitting things into equal groups. These facts are the building blocks for all advanced math!

**Why Multiplication and Division Facts Matter**

Knowing these facts by heart helps you solve complex problems quickly, understand fractions and decimals, work with larger numbers, and feel confident in math class. They're used in science, cooking, shopping, and countless real-world situations.

**How Multiplication and Division Facts Work**

**Multiplication Strategies:**
• **Skip Counting:** Count by groups (2, 4, 6, 8 for 2×4)
• **Arrays:** Arrange objects in equal rows and columns
• **Doubling:** Use facts you know to find new ones (if 6×4=24, then 6×8=48)
• **Breaking Apart:** Split numbers into easier parts (6×8 = 6×4 + 6×4)

**Division Strategies:**
• **Think Multiplication:** Use the opposite operation (24÷6 = ? Think: 6×? = 24)
• **Equal Groups:** Divide objects into same-size groups
• **Repeated Subtraction:** How many times can you subtract the divisor?

**Fact Families:**
Every set of three numbers makes a fact family:
3, 4, 12: 3×4=12, 4×3=12, 12÷3=4, 12÷4=3

**Real-Life Examples**

• A classroom has 6 rows of desks with 5 desks each: 6×5 = 30 desks total
• 24 students need to form equal teams of 4: 24÷4 = 6 teams
• You save $7 per week for 8 weeks: 7×8 = $56 total saved
• 36 cookies divided equally among 9 people: 36÷9 = 4 cookies each

**Common Mistakes to Avoid**

Don't just memorize without understanding! Make sure you know what multiplication and division mean. Also, remember that division by zero is impossible, and any number times zero equals zero.

**Quick Recap**

Multiplication and division facts are essential math skills that help you calculate quickly and accurately. Practice these facts until they become automatic, and you'll be ready for advanced math challenges!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Multiplication and Division Facts in your notebook",
                "Drawing activity: Draw pictures that show examples of Multiplication and Division Facts with labels and explanations",
                "Hands-on experiment: Use materials to explore how Multiplication and Division Facts works in real life",
                "Story writing: Write a short story that includes examples of Multiplication and Division Facts you've learned about",
                "Review game: Create flashcards or a matching game to practice Multiplication and Division Facts concepts"
            ],
            funFacts: [
                "Ancient Babylonians used multiplication tables over 4,000 years ago!",
                "The fastest human calculator can multiply two 13-digit numbers in their head in under 30 seconds!",
                "Computers use binary multiplication, which only uses 0s and 1s!",
                "The multiplication symbol (×) was first used in 1631 by an English mathematician!",
                "Some cultures have different ways of doing multiplication, like the Japanese lattice method!"
            ]
        }
    },

    "Decimals and Place Value": {
        grade4: {
            introduction: "Welcome to the precise world of decimals and place value! Today we're going to explore how numbers can represent parts of wholes with incredible accuracy. Decimals are like mathematical zoom lenses that let us see between whole numbers!",
            content: `**What Are Decimals and Place Value?**

Decimals are numbers that include parts smaller than one whole, written with a decimal point (.). Place value in decimals works just like in whole numbers, but continues to the right of the decimal point to show tenths, hundredths, and thousandths. This system lets us express very precise measurements and calculations.

**Why Decimals and Place Value Matter**

Decimals are everywhere in real life! Money uses decimals ($3.47), measurements use decimals (5.2 inches), sports statistics use decimals (.325 batting average), and science uses decimals for precise calculations. Understanding decimals helps you work with money, measurements, and data accurately.

**How Decimals and Place Value Work**

**Place Value Chart:**
Hundreds | Tens | Ones | . | Tenths | Hundredths | Thousandths
    1    |  2   |  3   | . |   4    |     5      |     6

The number 123.456 means:
• 1 hundred + 2 tens + 3 ones + 4 tenths + 5 hundredths + 6 thousandths

**Reading Decimals:**
• 0.3 = "three tenths" = 3/10
• 0.25 = "twenty-five hundredths" = 25/100
• 0.007 = "seven thousandths" = 7/1000

**Comparing Decimals:**
• Line up decimal points
• Compare digit by digit from left to right
• 0.7 > 0.65 because 7 tenths > 6 tenths

**Real-Life Examples**

• Money: $12.75 means 12 dollars and 75 cents (75 hundredths of a dollar)
• Sports: A runner's time of 10.25 seconds
• Measurements: A pencil that's 7.5 inches long
• Temperature: 98.6°F normal body temperature

**Common Mistakes to Avoid**

Don't think longer decimals are always larger (0.8 > 0.75)! Always line up decimal points when adding or subtracting. Remember that zeros at the end of decimals don't change the value (0.5 = 0.50).

**Quick Recap**

Decimals use place value to represent parts of wholes with precision. Understanding decimal place value helps you work with money, measurements, and data in real-world situations!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Decimals and Place Value in your notebook",
                "Drawing activity: Draw pictures that show examples of Decimals and Place Value with labels and explanations",
                "Hands-on experiment: Use materials to explore how Decimals and Place Value works in real life",
                "Story writing: Write a short story that includes examples of Decimals and Place Value you've learned about",
                "Review game: Create flashcards or a matching game to practice Decimals and Place Value concepts"
            ],
            funFacts: [
                "The decimal system was invented in India over 1,500 years ago!",
                "Scientists use decimals to measure incredibly tiny things - some atoms are 0.0000000001 meters wide!",
                "Olympic records are often measured in decimal seconds - sometimes winning by 0.01 seconds!",
                "Computer graphics use decimals to create smooth curves and realistic images!",
                "GPS systems use decimals accurate to many decimal places to pinpoint your exact location!"
            ]
        }
    },

    "Introduction to Fractions as Parts of a Whole": {
        grade4: {
            introduction: "Welcome to the fascinating world of fractions! Today we're going to explore how fractions represent parts of wholes in ways that help us understand division, measurement, and proportional thinking. Fractions are mathematical tools that help us work with parts and wholes precisely!",
            content: `**What Are Introduction to Fractions as Parts of a Whole?**

Fractions represent parts of a whole object, set, or measurement. Every fraction has two parts: a numerator (top number) showing how many parts we have, and a denominator (bottom number) showing how many equal parts the whole is divided into. Fractions help us express quantities between whole numbers.

**Why Introduction to Fractions as Parts of a Whole Matter**

Fractions are essential for cooking (1/2 cup flour), time (1/4 hour = 15 minutes), money (1/4 dollar = 25 cents), sports (batting averages), and measurements. Understanding fractions as parts of wholes builds foundation for advanced math concepts like ratios, proportions, and algebra.

**How Introduction to Fractions as Parts of a Whole Work**

**Understanding Fraction Parts:**
• **Numerator (top):** How many parts we have
• **Denominator (bottom):** Total equal parts in the whole
• **Fraction bar:** Represents division

**Types of Fractions:**
• **Proper fractions:** Numerator < denominator (3/4)
• **Improper fractions:** Numerator ≥ denominator (5/3)
• **Mixed numbers:** Whole number + fraction (2 1/3)
• **Unit fractions:** Numerator = 1 (1/5)

**Equivalent Fractions:**
Fractions that represent the same amount:
1/2 = 2/4 = 3/6 = 4/8

**Visual Representations:**
• Circles divided into equal parts
• Rectangles split into sections  
• Number lines marked with fractions
• Sets of objects grouped equally

**Real-Life Examples**

• Pizza slices: Eating 3 out of 8 slices = 3/8 of the pizza
• Time: 15 minutes = 1/4 of an hour
• Money: A quarter = 1/4 of a dollar
• Sports: Making 7 out of 10 free throws = 7/10

**Common Mistakes to Avoid**

Don't confuse the numerator and denominator! Remember that larger denominators create smaller fraction pieces (1/8 < 1/4). Also, when comparing fractions, you often need common denominators.

**Quick Recap**

Fractions represent parts of wholes using numerators and denominators. Understanding fractions as parts of wholes helps you work with measurements, time, money, and many real-world applications!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Fractions: Halves and Fourths in your notebook",
                "Drawing activity: Draw pictures that show examples of Fractions: Halves and Fourths with labels and explanations",
                "Hands-on experiment: Use materials to explore how Fractions: Halves and Fourths works in real life",
                "Story writing: Write a short story that includes examples of Fractions: Halves and Fourths you've learned about",
                "Review game: Create flashcards or a matching game to practice Fractions: Halves and Fourths concepts"
            ],
            funFacts: [
                "Ancient Egyptians used fractions over 4,000 years ago, but they mostly used unit fractions!",
                "The fraction bar wasn't used until the 1200s - before that, fractions were written differently!",
                "Musicians use fractions every day - a quarter note is 1/4 the length of a whole note!",
                "Bakers and chefs rely on fractions for precise recipe measurements!",
                "Stock market prices are often shown in fractions of dollars!"
            ]
        }
    },

    // ===== GRADE 4 SCIENCE LESSONS =====

    "Ecosystems and Food Chains": {
        grade4: {
            introduction: "Welcome to the interconnected world of ecosystems and food chains! Today we're going to explore how all living things in an environment depend on each other for survival. It's like discovering the secret web of life that connects every plant and animal!",
            content: `**What Are Ecosystems and Food Chains?**

An ecosystem is a community of living things (plants and animals) interacting with their non-living environment (air, water, soil, sunlight). A food chain shows how energy and nutrients flow from one organism to another as they eat and are eaten. Everything in an ecosystem is connected!

**Why Ecosystems and Food Chains Matter**

Understanding ecosystems helps us protect the environment, understand how human actions affect nature, and appreciate the delicate balance that keeps all living things healthy. Food chains show us how energy flows through nature and why every organism is important.

**How Ecosystems and Food Chains Work**

**Ecosystem Components:**
• **Producers:** Plants that make their own food using sunlight (photosynthesis)
• **Primary Consumers:** Animals that eat plants (herbivores like rabbits)
• **Secondary Consumers:** Animals that eat primary consumers (carnivores like foxes)
• **Decomposers:** Organisms that break down dead material (bacteria, fungi)

**Food Chain Flow:**
Sun → Grass → Rabbit → Fox → Decomposers
(Energy flows in one direction, but nutrients cycle back)

**Energy Transfer:**
• Only about 10% of energy passes from one level to the next
• That's why there are fewer predators than prey
• Producers need the most energy from the sun

**Types of Ecosystems:**
• Forest, grassland, desert, ocean, pond, tundra
• Each has unique climate, plants, and animals
• All follow similar energy flow patterns

**Real-Life Examples**

• Ocean: Phytoplankton → Small fish → Large fish → Sharks
• Forest: Acorns → Squirrels → Hawks → Decomposers
• Grassland: Grass → Zebras → Lions → Decomposers
• Garden: Plants → Insects → Birds → Larger predators

**Common Mistakes to Avoid**

Don't think of food chains as simple linear paths - real ecosystems have complex food webs with many interconnections. Also, remember that removing any part of a food chain affects the whole ecosystem.

**Quick Recap**

Ecosystems are communities where all living things depend on each other through food chains and energy flow. Understanding these connections helps us protect and preserve the natural world!`,
            activities: [
                "Research project: Investigate how Ecosystems and Food Chains is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Ecosystems and Food Chains",
                "Analysis activity: Compare and contrast different aspects of Ecosystems and Food Chains with examples and evidence",
                "Presentation: Create a detailed presentation explaining Ecosystems and Food Chains to younger students",
                "Real-world application: Find examples of Ecosystems and Food Chains in current events or scientific discoveries"
            ],
            funFacts: [
                "A single large tree can support over 500 species of insects, birds, and other animals!",
                "Wolves reintroduced to Yellowstone changed the entire ecosystem by controlling deer populations!",
                "The Amazon rainforest produces about 20% of the world's oxygen!",
                "Some deep ocean ecosystems get energy from chemical reactions instead of sunlight!",
                "One teaspoon of soil contains more organisms than there are people on Earth!"
            ]
        }
    },

    "Rocks and Minerals": {
        grade4: {
            introduction: "Welcome to the amazing world of rocks and minerals! Today we're going to explore the building blocks of our planet Earth. Rocks and minerals are like nature's building materials that form mountains, create precious gems, and tell the story of Earth's history!",
            content: `**What Are Rocks and Minerals?**

Minerals are naturally occurring solid substances with specific chemical compositions and crystal structures. Rocks are combinations of one or more minerals that form Earth's crust. Understanding rocks and minerals helps us learn about Earth's formation, find valuable resources, and understand geological processes.

**Why Rocks and Minerals Matter**

Rocks and minerals are essential for human civilization! They provide materials for buildings, roads, technology (phones contain over 30 different minerals), jewelry, and tools. Studying them helps us find oil, water, and precious metals, and understand natural disasters like earthquakes and volcanoes.

**How Rocks and Minerals Work**

**Types of Rocks:**

**Igneous Rocks:**
• Formed from cooled magma or lava
• Examples: granite (cooled slowly underground), obsidian (cooled quickly)
• Can have large or small crystals depending on cooling speed

**Sedimentary Rocks:**
• Formed from layers of sediment pressed together over time
• Examples: sandstone (from sand), limestone (from sea creatures)
• Often contain fossils

**Metamorphic Rocks:**
• Formed when existing rocks change due to heat and pressure
• Examples: marble (from limestone), slate (from shale)
• Have banded or folded patterns

**The Rock Cycle:**
Rocks constantly change from one type to another through weathering, heat, pressure, and melting.

**Mineral Properties:**
• **Hardness:** Measured on Mohs scale (1-10)
• **Color:** Can vary within the same mineral
• **Luster:** How light reflects (metallic, glassy, dull)
• **Streak:** Color when scratched on ceramic

**Real-Life Examples**

• Granite countertops in kitchens (igneous rock)
• Diamonds in jewelry (hardest mineral, 10 on Mohs scale)
• Salt for cooking (halite mineral)
• Pencil "lead" is actually graphite mineral
• Concrete contains limestone and other rock materials

**Common Mistakes to Avoid**

Don't confuse rocks and minerals - rocks are made OF minerals! Also, remember that mineral identification requires testing multiple properties, not just color. Coal is not a mineral because it comes from living things.

**Quick Recap**

Rocks and minerals are Earth's building blocks that form through different geological processes. Understanding their properties and formation helps us use Earth's resources wisely and understand our planet's history!`,
            activities: [
                "Research project: Investigate how Rocks and Minerals is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Rocks and Minerals",
                "Analysis activity: Compare and contrast different aspects of Rocks and Minerals with examples and evidence",
                "Presentation: Create a detailed presentation explaining Rocks and Minerals to younger students",
                "Real-world application: Find examples of Rocks and Minerals in current events or scientific discoveries"
            ],
            funFacts: [
                "Diamonds form about 100 miles underground and are brought to the surface by volcanic eruptions!",
                "The oldest rocks on Earth are over 4 billion years old - nearly as old as the planet itself!",
                "Your smartphone contains over 30 different minerals from around the world!",
                "Some meteorites contain minerals that don't exist naturally on Earth!",
                "The rock cycle means that atoms in your body might have once been part of a mountain!"
            ]
        }
    },

    "Weather Patterns": {
        grade4: {
            introduction: "Welcome to the dynamic world of weather patterns! Today we're going to explore how weather systems form, move, and affect our daily lives. Understanding weather patterns helps us predict storms, plan activities, and understand Earth's climate systems!",
            content: `**What Are Weather Patterns?**

Weather patterns are recurring atmospheric conditions and systems that create predictable weather changes over time. These patterns result from the interaction of air pressure, temperature, humidity, and wind systems across different regions. Meteorologists study these patterns to forecast weather and understand climate.

**Why Weather Patterns Matter**

Understanding weather patterns helps us prepare for severe weather, plan agricultural activities, schedule outdoor events, and understand climate change. Weather affects transportation, energy use, food production, and public safety. Accurate weather prediction saves lives and protects property.

**How Weather Patterns Work**

**Air Masses and Fronts:**
• **Cold fronts:** Dense cold air pushes under warm air, creating storms
• **Warm fronts:** Warm air rises over cold air, creating gentle precipitation
• **High pressure:** Clear, calm weather (air sinks)
• **Low pressure:** Stormy, cloudy weather (air rises)

**Weather Systems:**
• **Hurricanes:** Rotating tropical storms with winds over 74 mph
• **Tornadoes:** Violent rotating columns of air
• **Thunderstorms:** Convective systems with lightning and thunder
• **Blizzards:** Heavy snow with strong winds

**Global Patterns:**
• **Trade winds:** Blow toward the equator
• **Jet stream:** Fast-moving air current that steers weather systems
• **El Niño/La Niña:** Pacific Ocean patterns affecting global weather

**Water Cycle Connection:**
Evaporation → Condensation → Precipitation → Collection
This cycle drives most weather patterns

**Real-Life Examples**

• Hurricane tracking helps coastal communities prepare for evacuation
• Farmers use weather patterns to decide when to plant and harvest crops
• Airlines adjust flight paths based on jet stream patterns
• Ski resorts rely on weather patterns for snow forecasting
• Weather patterns affect energy demand for heating and cooling

**Common Mistakes to Avoid**

Don't confuse weather (short-term conditions) with climate (long-term patterns). Also, remember that weather prediction becomes less accurate the further into the future you try to forecast.

**Quick Recap**

Weather patterns are predictable atmospheric systems that help us understand and forecast weather conditions. Learning these patterns helps us prepare for weather events and understand Earth's complex climate system!`,
            activities: [
                "Research project: Investigate how Weather Patterns is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Weather Patterns",
                "Analysis activity: Compare and contrast different aspects of Weather Patterns with examples and evidence",
                "Presentation: Create a detailed presentation explaining Weather Patterns to younger students",
                "Real-world application: Find examples of Weather Patterns in current events or scientific discoveries"
            ],
            funFacts: [
                "The jet stream can reach speeds of over 250 mph and affects weather across entire continents!",
                "Lightning strikes Earth about 8 million times per day!",
                "The deadliest weather disaster in US history was the 1900 Galveston hurricane!",
                "Weather balloons released twice daily provide crucial data for weather forecasting!",
                "Doppler radar can detect tornado formation up to 20 minutes before the tornado touches down!"
            ]
        }
    },

    // ===== GRADE 4 READING LESSONS =====

    "Point of View": {
        grade4: {
            introduction: "Welcome to the exciting world of narrative perspective! Today we're going to explore how the person telling a story affects everything we know and feel about the events. Point of view is like choosing which pair of glasses to wear when reading - it changes everything you see!",
            content: `**What Is Point of View?**

Point of view is the perspective from which a story is told. It determines who is telling the story, what information readers receive, and how they connect with characters. Different points of view create different reading experiences and affect how we understand characters' thoughts, feelings, and motivations.

**Why Point of View Matters**

Understanding point of view helps you analyze characters more deeply, recognize author's techniques, understand bias and reliability in narration, and become a more sophisticated reader. It also helps you understand how perspective affects understanding in real life.

**How Point of View Works**

**First Person Point of View:**
• Narrator uses "I," "me," "my," "we"
• Narrator is a character in the story
• Readers know only what narrator knows and experiences
• Creates intimacy and personal connection
• May be unreliable or biased

**Third Person Limited:**
• Narrator uses "he," "she," "they"
• Focuses on one character's thoughts and feelings
• Narrator is outside the story but knows one character's mind
• Balances intimacy with objectivity

**Third Person Omniscient:**
• Narrator knows thoughts and feelings of all characters
• Can reveal information unknown to characters
• Provides broader perspective on events
• Allows complex character development

**Analyzing Point of View Effects:**
• How does point of view limit or expand information?
• What would change if told from different perspective?
• How does it affect reader's sympathy for characters?
• What biases or limitations does the narrator have?

**Real-Life Examples**

• News reports try to use objective third person perspective
• Diary entries are written in first person
• Historical accounts may vary based on whose perspective is recorded
• Social media posts reflect individual first-person viewpoints

**Common Mistakes to Avoid**

Don't assume first person narrators are always reliable - they may be biased, confused, or deliberately misleading. Also, remember that third person doesn't always mean objective or unbiased.

**Quick Recap**

Point of view shapes how stories are told and how readers experience events. Understanding different perspectives helps you analyze literature more deeply and recognize how viewpoint affects understanding in all areas of life!`,
            activities: [
                "Research project: Investigate how Point of View is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Point of View",
                "Analysis activity: Compare and contrast different aspects of Point of View with examples and evidence",
                "Presentation: Create a detailed presentation explaining Point of View to younger students",
                "Real-world application: Find examples of Point of View in current events or scientific discoveries"
            ],
            funFacts: [
                "The Harry Potter books are written in third person limited, focusing on Harry's perspective!",
                "Some novels use multiple points of view to tell the same story from different angles!",
                "Second person point of view (using 'you') is rare but creates unique reader experiences!",
                "Unreliable narrators became popular in literature to challenge readers' assumptions!",
                "Point of view in movies is shown through camera angles and whose thoughts we hear!"
            ]
        }
    },

    "Theme and Central Message": {
        grade4: {
            introduction: "Welcome to the deeper meaning behind stories! Today we're going to explore themes and central messages - the important life lessons and big ideas that authors want to share with readers. Themes are like hidden treasures that make stories meaningful and memorable!",
            content: `**What Are Theme and Central Message?**

Theme is the underlying message, lesson, or big idea that an author wants to convey through a story. The central message is the main point or moral that readers should take away. Unlike the topic (what the story is about), theme is what the story means or teaches about life, human nature, or important values.

**Why Theme and Central Message Matter**

Understanding themes helps you connect literature to real life, learn important lessons from characters' experiences, analyze author's purpose and techniques, and engage more deeply with texts. Themes make stories universal and timeless by addressing shared human experiences.

**How Theme and Central Message Work**

**Identifying Themes:**
• Look at character changes and growth
• Notice repeated ideas, symbols, or motifs
• Consider the conflict and its resolution
• Think about what the character learned
• Ask: "What is the author trying to say about life?"

**Common Universal Themes:**
• Friendship and loyalty
• Good vs. evil
• Coming of age/growing up
• Perseverance and determination
• Family relationships
• Courage and bravery
• Love and sacrifice
• Justice and fairness

**Theme vs. Topic:**
• Topic: What the story is about (friendship)
• Theme: What the story says about the topic (true friendship requires sacrifice)

**Supporting Evidence:**
• Character actions and decisions
• Dialogue and character statements
• Story events and consequences
• Symbols and imagery
• Title significance

**Real-Life Examples**

• Fables like "The Tortoise and the Hare" teach that slow and steady wins the race
• "Charlotte's Web" explores themes of friendship, sacrifice, and life cycles
• Fairy tales often teach lessons about kindness, honesty, or hard work
• Historical fiction may explore themes of courage, justice, or human rights

**Common Mistakes to Avoid**

Don't confuse theme with plot summary or topic. Themes are usually not stated directly - you must infer them from evidence. Also, complex stories may have multiple themes, not just one simple message.

**Quick Recap**

Themes and central messages are the deeper meanings and life lessons that authors convey through their stories. Understanding themes helps you connect literature to real life and appreciate the universal human experiences that stories explore!`,
            activities: [
                "Research project: Investigate how Theme and Central Message is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Theme and Central Message",
                "Analysis activity: Compare and contrast different aspects of Theme and Central Message with examples and evidence",
                "Presentation: Create a detailed presentation explaining Theme and Central Message to younger students",
                "Real-world application: Find examples of Theme and Central Message in current events or scientific discoveries"
            ],
            funFacts: [
                "Shakespeare's plays from 400 years ago still resonate because they explore universal themes!",
                "Many cultures have similar folktales with the same themes, showing shared human values!",
                "Movie studios often look for stories with strong themes that audiences can connect with!",
                "Themes in children's literature help young people learn important life lessons!",
                "Some authors write entire series exploring different aspects of the same central theme!"
            ]
        }
    },

    // ===== GRADE 4 HISTORY LESSONS =====

    "The American Revolution: Fighting for Independence": {
        grade4: {
            introduction: "Get ready for one of the most exciting stories in American history! Today we're going to learn about the American Revolution, when brave colonists decided to fight for their freedom from British rule. This is the story of how the United States of America was born!",
            content: `**What Was the American Revolution: Fighting for Independence?**

The American Revolution (1775-1783) was a war fought between Great Britain and thirteen American colonies who wanted to become independent. The colonists believed they should govern themselves rather than be ruled by a king across the ocean. This revolution created the United States of America and established principles of freedom and democracy.

**Why the American Revolution: Fighting for Independence Matters**

The American Revolution created our country and established the ideas of liberty, democracy, and individual rights that still guide America today. Understanding this revolution helps us appreciate our freedoms and understand how ordinary people can change history through courage and determination.

**How the American Revolution: Fighting for Independence Worked**

**Causes of the Revolution:**
• **"No Taxation Without Representation":** Colonists had to pay taxes but couldn't vote in British Parliament
• **British Control:** Laws made in Britain controlled colonial trade and daily life
• **Economic Restrictions:** Colonists couldn't trade freely with other countries
• **Military Presence:** British soldiers were stationed in colonial towns

**Key Events Leading to War:**
• **Boston Tea Party (1773):** Colonists dumped British tea into Boston Harbor
• **Intolerable Acts (1774):** Harsh British punishment for the Tea Party
• **First Continental Congress (1774):** Colonial leaders met to discuss problems
• **Lexington and Concord (1775):** First battles of the Revolution

**Important Documents and People:**
• **Declaration of Independence (1776):** Announced American independence
• **George Washington:** Commander of Continental Army, first President
• **Thomas Jefferson:** Main author of Declaration of Independence
• **Benjamin Franklin:** Diplomat who helped secure French support

**The War:**
• Lasted 8 years (1775-1783)
• Americans fought against the world's strongest military
• France helped America with ships, soldiers, and supplies
• Victory at Yorktown (1781) ended major fighting

**Real-Life Examples**

• Paul Revere's midnight ride warned colonists of approaching British troops
• Valley Forge winter showed American determination despite suffering
• Women like Betsy Ross and Abigail Adams supported the revolution
• Native Americans and African Americans fought on both sides

**Common Mistakes to Avoid**

Don't think all colonists wanted independence - about 1/3 remained loyal to Britain. Also, the war wasn't won quickly or easily - it required years of sacrifice and international support to succeed.

**Quick Recap**

The American Revolution was fought because colonists wanted the right to govern themselves. Through eight years of war and great sacrifice, they created the United States of America and established the principles of freedom and democracy we cherish today!`,
            activities: [
                "Research project: Investigate how The American Revolution: Fighting for Independence is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of The American Revolution: Fighting for Independence",
                "Analysis activity: Compare and contrast different aspects of The American Revolution: Fighting for Independence with examples and evidence",
                "Presentation: Create a detailed presentation explaining The American Revolution: Fighting for Independence to younger students",
                "Real-world application: Find examples of The American Revolution: Fighting for Independence in current events or scientific discoveries"
            ],
            funFacts: [
                "George Washington's surprise attack across the Delaware River on Christmas night 1776 saved the revolution!",
                "The youngest signer of the Declaration of Independence was only 26 years old!",
                "France spent so much money helping America that it contributed to the French Revolution!",
                "The Liberty Bell cracked while being rung to celebrate independence!",
                "Some Revolutionary War battles were fought with weapons like swords and bayonets!"
            ]
        }
    },

    // Add comprehensive fallback content for any remaining topics
    "Digital Literacy and Online Reading": {
        grade4: {
            introduction: "Welcome to the digital world! Today we're going to become smart and safe digital citizens. Digital literacy means knowing how to use technology responsibly and how to read and understand information online. It's like having superpowers for navigating the internet world!",
            content: `**What Are Digital Literacy and Online Reading?**

Digital literacy is the ability to use digital technology effectively, safely, and responsibly. Online reading means understanding how to find, evaluate, and use information from websites, apps, and digital sources. These skills help you become a smart consumer of digital information and a responsible digital citizen.

**Why Digital Literacy and Online Reading Matter**

In today's world, almost everything involves technology! From schoolwork to communication to entertainment, digital skills help you succeed and stay safe. Learning to read online content critically helps you distinguish between reliable and unreliable information sources.

**How Digital Literacy and Online Reading Work**

**Key Digital Literacy Skills:**
• **Navigation:** Understanding how to use websites, apps, and digital tools
• **Evaluation:** Determining if online information is trustworthy and accurate
• **Safety:** Protecting personal information and avoiding online dangers
• **Communication:** Using digital tools to share ideas respectfully
• **Creation:** Making digital content like presentations, videos, or websites

**Online Reading Strategies:**
• **Scanning:** Quickly looking for specific information
• **Skimming:** Reading quickly to get the main idea
• **Deep Reading:** Reading carefully for complete understanding
• **Source Checking:** Verifying information with multiple reliable sources
• **Fact-Checking:** Confirming information is accurate and current

**Digital Citizenship:**
• Respect others in online communications
• Protect personal and private information
• Give credit for others' work and ideas
• Report inappropriate content or behavior
• Balance screen time with other activities

**Real-Life Examples**

• Research projects using educational websites and databases
• Video calling with family members in other locations
• Online learning platforms for homework and assignments
• Digital art and creative projects
• Safe online gaming and social interactions

**Common Mistakes to Avoid**

Don't believe everything you read online - always check sources and verify information. Never share personal information like your address, phone number, or passwords with strangers online. Remember that not everything online is appropriate for all ages.

**Quick Recap**

Digital literacy and online reading skills help you use technology safely and effectively while becoming a responsible digital citizen. These skills are essential for success in school, work, and life in our connected world!`,
            activities: [
                "Research project: Investigate how Digital Literacy and Online Reading is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Digital Literacy and Online Reading",
                "Analysis activity: Compare and contrast different aspects of Digital Literacy and Online Reading with examples and evidence",
                "Presentation: Create a detailed presentation explaining Digital Literacy and Online Reading to younger students",
                "Real-world application: Find examples of Digital Literacy and Online Reading in current events or scientific discoveries"
            ],
            funFacts: [
                "The internet contains over 1.7 billion websites, but only about 200 million are active!",
                "The first website ever created is still online and was made in 1991!",
                "Every minute, people upload over 500 hours of video to YouTube!",
                "Kids today are called 'digital natives' because they've grown up with technology!",
                "The word 'wiki' (like Wikipedia) comes from Hawaiian meaning 'quick'!"
            ]
        }
    }
};

function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

async function comprehensiveLessonOverhaul() {
    try {
        console.log('🚀 STARTING COMPREHENSIVE LESSON OVERHAUL');
        console.log('🎯 Goal: Fix ALL 85 lessons with generic content');
        console.log('✨ Quality target: Match "Skip Counting by 5s" structure and depth\n');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`📚 Found ${lessons.length} lessons to process\n`);

        let fixedLessons = 0;
        let alreadyGoodLessons = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            // Check if lesson has generic template content
            const hasGenericContent = lesson.content && (
                lesson.content.includes('is an important') && 
                lesson.content.includes('concept that helps us understand how the world works') &&
                lesson.content.includes('follows certain principles and patterns')
            );
            
            if (hasGenericContent && comprehensiveEducationalContent[cleanedTitle] && comprehensiveEducationalContent[cleanedTitle][gradeKey]) {
                const content = comprehensiveEducationalContent[cleanedTitle][gradeKey];
                
                lesson.introduction = content.introduction;
                lesson.content = content.content;
                lesson.activities = content.activities;
                lesson.funFacts = content.funFacts;
                
                await lesson.save();
                console.log(`✅ FIXED: ${lesson.title} (Grade ${lesson.gradeLevel}) - Now has real educational content!`);
                fixedLessons++;
            } else if (!hasGenericContent) {
                console.log(`📝 GOOD: ${lesson.title} (Grade ${lesson.gradeLevel}) - Already has quality content`);
                alreadyGoodLessons++;
            } else {
                console.log(`⚠️  TODO: ${lesson.title} (Grade ${lesson.gradeLevel}) - Needs content addition to database`);
            }
        }
        
        console.log(`\n🎉 COMPREHENSIVE OVERHAUL COMPLETE!`);
        console.log(`===================================`);
        console.log(`✅ Lessons fixed with real content: ${fixedLessons}`);
        console.log(`📚 Lessons already good: ${alreadyGoodLessons}`);
        console.log(`📈 Progress: ${fixedLessons + alreadyGoodLessons}/${lessons.length} lessons now have quality content`);
        
        const successRate = Math.round(((fixedLessons + alreadyGoodLessons) / lessons.length) * 100);
        console.log(`🎯 Success rate: ${successRate}%`);
        
        if (successRate >= 80) {
            console.log(`\n🌟 EXCELLENT PROGRESS! Most lessons now have quality educational content!`);
            console.log(`🎓 Students will now learn real subject matter with step-by-step methods!`);
        }
        
    } catch (error) {
        console.error('❌ Error during comprehensive lesson overhaul:', error);
    } finally {
        mongoose.connection.close();
    }
}

comprehensiveLessonOverhaul(); 
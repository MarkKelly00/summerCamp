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

// REMAINING LESSONS DATABASE - COMPLETING THE FULL CURRICULUM
const remainingLessonsContent = {
    
    // ===== GRADE 4 SCIENCE =====
    
    "Force and Motion in Everyday Life": {
        grade4: {
            introduction: "Welcome to the amazing world of forces and motion! Today we're going to explore how pushes, pulls, and movement work all around us every day. Forces and motion explain everything from how you ride a bike to how rockets fly to space!",
            content: `**What Are Force and Motion in Everyday Life?**

Forces are pushes or pulls that can make objects start moving, stop moving, or change direction. Motion is when something changes position over time. Understanding forces and motion helps us explain how everything moves in our world, from the smallest toy car to the largest airplane.

**Why Force and Motion in Everyday Life Matter**

Forces and motion are everywhere! They explain how bikes work, why you need seat belts in cars, how athletes improve their performance, and how engineers design everything from playground equipment to space shuttles. Understanding these concepts helps you stay safe and solve everyday problems.

**How Force and Motion in Everyday Life Work**

**Types of Forces:**
• **Gravity:** Always pulls objects toward Earth (why things fall down)
• **Friction:** Force that opposes motion (makes things slow down)
• **Air Resistance:** Friction from air (why parachutes work)
• **Applied Force:** Pushes and pulls you create (kicking a ball)
• **Normal Force:** Support from surfaces (floor pushing up on your feet)

**Newton's Laws in Simple Terms:**
• **First Law:** Objects at rest stay at rest, objects in motion stay in motion (unless a force acts on them)
• **Second Law:** More force = more acceleration; heavier objects need more force
• **Third Law:** For every action, there's an equal and opposite reaction

**Motion Concepts:**
• **Speed:** How fast something moves
• **Velocity:** Speed with direction
• **Acceleration:** Speeding up, slowing down, or changing direction

**Real-Life Examples**

• Riding a bike: You apply force to pedals, friction slows you down, gravity keeps you on the ground
• Playing sports: Throwing a ball involves applied force, gravity brings it down, friction helps you stop
• Car safety: Seat belts use force to stop your body when the car stops suddenly
• Swimming: You push against water, water pushes back (Newton's third law)

**Common Mistakes to Avoid**

Don't think heavier objects always fall faster - in a vacuum, all objects fall at the same rate! Also, remember that forces work in pairs - when you push on something, it pushes back on you.

**Quick Recap**

Forces cause changes in motion, and motion happens when forces aren't balanced. Understanding these principles helps explain how everything in our world moves and helps us design safer, more efficient systems!`,
            activities: [
                "Design and conduct experiments testing different forces using toy cars on various surfaces",
                "Create a presentation about how forces and motion apply to your favorite sport or activity",
                "Build simple machines (ramps, levers, pulleys) and test how they change force and motion",
                "Investigate how friction affects motion by testing objects on different surfaces",
                "Research how understanding forces and motion helps engineers design safer cars or playground equipment"
            ],
            funFacts: [
                "A rocket can work in space because of Newton's third law - hot gases shoot out the back, pushing the rocket forward!",
                "The fastest land animal, a cheetah, can accelerate from 0 to 60 mph in just 3 seconds!",
                "Astronauts float in space because they're constantly falling toward Earth but moving sideways fast enough to keep missing it!",
                "Professional baseball pitchers can throw a ball over 100 mph using the forces in their whole body!",
                "Ice is slippery because it has very low friction - that's why ice skating and sledding work!"
            ]
        }
    },

    "Introduction to Basic Coding Concepts": {
        grade4: {
            introduction: "Welcome to the exciting world of coding! Today we're going to learn the basic concepts that make computers work and how to think like a programmer. Coding is like learning a special language that lets you tell computers exactly what to do!",
            content: `**What Is Introduction to Basic Coding Concepts?**

Coding (or programming) is the process of creating instructions that tell computers what to do. Basic coding concepts include sequences (step-by-step instructions), loops (repeating actions), conditionals (making decisions), and debugging (fixing mistakes). These concepts help us solve problems systematically and think logically.

**Why Introduction to Basic Coding Concepts Matter**

Coding skills help you think logically, solve problems step-by-step, and understand how technology works. Even if you don't become a programmer, coding teaches valuable problem-solving skills used in science, math, engineering, and everyday life. Plus, coding creates the apps, games, and websites you use every day!

**How Introduction to Basic Coding Concepts Work**

**Core Coding Concepts:**

**Sequences:**
• Step-by-step instructions in the right order
• Like following a recipe: mix ingredients, then bake, then cool
• Computers follow sequences exactly as written

**Loops:**
• Repeating the same actions multiple times
• Like brushing each tooth or counting to 100
• Saves time and reduces mistakes

**Conditionals (If-Then Statements):**
• Making decisions based on conditions
• "If it's raining, then take an umbrella"
• Helps programs respond to different situations

**Variables:**
• Containers that store information
• Like labeled boxes that hold numbers, words, or other data
• Can change values as the program runs

**Debugging:**
• Finding and fixing mistakes in code
• Like proofreading a story or checking math homework
• Essential skill for all programmers

**Real-Life Examples**

• Video games use loops to keep checking if you've won or lost
• Weather apps use conditionals to decide whether to recommend a jacket
• Social media uses sequences to post your photos in the right order
• Online shopping uses variables to keep track of items in your cart
• GPS apps use all these concepts to find the best route to your destination

**Common Mistakes to Avoid**

Don't expect to get everything right the first time - debugging is a normal part of coding! Also, remember that computers are very literal - they do exactly what you tell them, not what you meant to tell them.

**Quick Recap**

Coding uses sequences, loops, conditionals, and variables to create instructions for computers. Learning these basic concepts helps you think logically and solve problems systematically!`,
            activities: [
                "Create step-by-step instructions (algorithms) for everyday activities like making a sandwich or brushing teeth",
                "Practice logical thinking with unplugged coding activities using cards, blocks, or board games",
                "Learn basic coding concepts using visual programming languages like Scratch or Blockly",
                "Design a simple game or animation using basic coding concepts",
                "Research how coding is used in different careers and present your findings to the class"
            ],
            funFacts: [
                "The first computer programmer was Ada Lovelace, a woman who wrote the first computer algorithm in 1843!",
                "The word 'bug' in computer programming came from an actual insect that got stuck in an early computer!",
                "There are over 700 different programming languages, but most programmers only use a few!",
                "The code that runs a modern smartphone app can contain millions of lines of instructions!",
                "Kids as young as 5 can learn basic coding concepts using games and visual programming tools!"
            ]
        }
    },

    "Electricity and Circuits": {
        grade4: {
            introduction: "Get ready to explore the invisible force that powers our modern world! Today we're going to learn about electricity and circuits - the amazing system that brings power to our lights, computers, and all the devices we use every day!",
            content: `**What Are Electricity and Circuits?**

Electricity is a form of energy created by moving electric charges (tiny particles called electrons). A circuit is a complete path that electricity can flow through, like a road for electric current. Understanding electricity and circuits helps us safely use electrical devices and understand how our modern world is powered.

**Why Electricity and Circuits Matter**

Electricity powers almost everything in our modern lives - lights, computers, phones, refrigerators, and even electric cars! Understanding how electricity works helps us use it safely, troubleshoot problems, and appreciate the engineering marvels that bring power to our homes and schools.

**How Electricity and Circuits Work**

**Basic Electrical Concepts:**
• **Electric Current:** Flow of electrons through a conductor
• **Voltage:** The "push" that moves electrons (like water pressure in pipes)
• **Conductors:** Materials that let electricity flow easily (like copper wire)
• **Insulators:** Materials that block electricity (like rubber or plastic)

**Circuit Components:**
• **Power Source:** Battery or outlet that provides energy
• **Conductors:** Wires that carry electricity
• **Load:** Device that uses electricity (light bulb, motor)
• **Switch:** Device that opens or closes the circuit

**Types of Circuits:**
• **Series Circuit:** One path for electricity (like Christmas lights)
• **Parallel Circuit:** Multiple paths for electricity (like house wiring)
• **Open Circuit:** Broken path - no electricity flows
• **Closed Circuit:** Complete path - electricity flows

**Safety Rules:**
• Never touch electrical outlets or wires
• Keep water away from electrical devices
• Use proper tools and have adults help with electrical work
• Understand that electricity can be dangerous but is safe when used properly

**Real-Life Examples**

• Flashlights use simple circuits with batteries, switches, and light bulbs
• Your home has parallel circuits so each room can have independent lighting
• Electric cars use large batteries and complex circuits to power motors
• Solar panels convert sunlight into electricity using special circuits
• Circuit breakers protect homes by stopping electricity flow when there's a problem

**Common Mistakes to Avoid**

Don't think electricity only comes from outlets - batteries, solar panels, and generators also create electricity! Also, remember that electricity always needs a complete circuit to flow - if there's a break anywhere, it stops working.

**Quick Recap**

Electricity is moving electric charges that flow through circuits to power our devices. Understanding circuits helps us use electricity safely and appreciate the technology that powers our modern world!`,
            activities: [
                "Build simple circuits using batteries, wires, and small light bulbs or buzzers",
                "Investigate which materials conduct electricity and which are insulators",
                "Design and test series and parallel circuits to understand the differences",
                "Create a poster showing electrical safety rules for home and school",
                "Research how electricity gets from power plants to your home and present your findings"
            ],
            funFacts: [
                "Lightning is a giant electrical discharge that can reach 30,000 degrees Fahrenheit - hotter than the sun's surface!",
                "The human body conducts electricity, which is why you can get shocked - but it also helps your nerves and muscles work!",
                "The first practical light bulb was invented by Thomas Edison in 1879 and could only last 14.5 hours!",
                "Electric eels can generate up to 600 volts of electricity to stun prey and defend themselves!",
                "The internet works because of tiny electrical signals traveling through circuits at nearly the speed of light!"
            ]
        }
    },

    // ===== GRADE 2 SCIENCE ADDITIONS =====

    "States of Matter": {
        grade2: {
            introduction: "Get ready to explore the three amazing forms that everything around us can take! Today we're going to learn about solids, liquids, and gases - the three states of matter that make up our entire world!",
            content: `**What Are States of Matter?**

States of matter are the different forms that all materials can take. Everything you can see, touch, or breathe is made of matter, and all matter exists in one of three main states: solid, liquid, or gas. The same material can change from one state to another when heated or cooled!

**Why States of Matter Matter**

Understanding states of matter helps explain why ice melts, why puddles disappear on hot days, why we can see our breath on cold mornings, and how cooking changes food. It's like understanding the secret of how everything in our world behaves!

**How States of Matter Work**

**Solids:**
• Keep their shape (like rocks, toys, ice cubes)
• Particles are packed tightly together
• Hard or firm to touch
• Don't flow or pour

**Liquids:**
• Take the shape of their container (like water in different cups)
• Particles are loose enough to move past each other
• Can flow and pour
• Always take up the same amount of space

**Gases:**
• Spread out to fill all available space
• Particles move freely and quickly
• Usually invisible (like air)
• Can be compressed into smaller spaces

**Changing States:**
• **Melting:** Solid becomes liquid (ice → water)
• **Freezing:** Liquid becomes solid (water → ice)
• **Evaporation:** Liquid becomes gas (puddles drying up)
• **Condensation:** Gas becomes liquid (water drops on cold glass)

**Real-Life Examples**

• Water can be ice (solid), liquid water, or steam (gas)
• Chocolate melts from solid to liquid in your hand
• Your breath becomes visible gas on cold days
• Clothes dry when liquid water evaporates into gas

**Common Mistakes to Avoid**

Remember that changing states doesn't change what something is - water is still water whether it's ice, liquid, or steam! Also, some things like wood or paper change into completely different materials when heated.

**Quick Recap**

All matter exists as solids, liquids, or gases, and the same material can change between states when heated or cooled. Understanding states of matter helps explain many everyday phenomena!`,
            activities: [
                "Practice worksheet: Complete problems or activities about States of Matter in your notebook",
                "Drawing activity: Draw pictures that show examples of States of Matter with labels and explanations",
                "Hands-on experiment: Use materials to explore how States of Matter works in real life",
                "Story writing: Write a short story that includes examples of States of Matter you've learned about",
                "Review game: Create flashcards or a matching game to practice States of Matter concepts"
            ],
            funFacts: [
                "Water is the only substance on Earth that naturally exists as all three states at normal temperatures!",
                "The air you breathe is actually a mixture of different gases, mostly nitrogen and oxygen!",
                "Glass is technically a very slow-moving liquid, even though it seems completely solid!",
                "On other planets, rocks can be gases and gases can be liquids because of extreme temperatures!",
                "Scientists have created a fourth state of matter called plasma that's found in stars and lightning!"
            ]
        }
    },

    "Day and Night": {
        grade2: {
            introduction: "Get ready to explore one of nature's most amazing patterns! Today we're going to discover why we have day and night, and how Earth's spinning creates the cycle of light and darkness that affects all life on our planet!",
            content: `**What Are Day and Night?**

Day and night happen because Earth spins like a top! As our planet rotates (turns around), different parts face the Sun and receive sunlight (day), while other parts face away from the Sun and are in darkness (night). This spinning creates the 24-hour cycle we experience every day.

**Why Day and Night Matter**

Understanding day and night helps us know why we have schedules, why different places have different times, why we need sleep, and how plants and animals have adapted to this daily cycle. It also helps us understand time zones and why it's daytime in some places while it's nighttime in others.

**How Day and Night Work**

**Earth's Rotation:**
• Earth spins on its axis (like an invisible rod through the middle)
• One complete spin takes 24 hours
• The side facing the Sun has day
• The side facing away from the Sun has night

**The Sun's Role:**
• The Sun doesn't move - Earth moves around it
• The Sun provides light and heat during the day
• When your part of Earth faces away, you can't see the Sun (night)
• The Sun is always shining somewhere on Earth

**Time and Shadows:**
• Shadows change throughout the day as Earth rotates
• In the morning, shadows are long
• At noon, shadows are short
• In the evening, shadows get long again

**Effects on Life:**
• Most animals are active during either day or night
• Plants need sunlight during the day to make food
• People have adapted to be awake during day and sleep at night

**Real-Life Examples**

• When it's bedtime for you, kids on the other side of Earth are waking up for school
• Roosters crow at sunrise because their bodies sense the returning light
• Flowers like sunflowers turn to follow the Sun across the sky during the day
• Nocturnal animals like owls are active at night when it's quiet and dark

**Common Mistakes to Avoid**

Don't think the Sun moves around Earth - Earth spins and moves around the Sun! Also, remember that it's always daytime somewhere on Earth and nighttime somewhere else at the same time.

**Quick Recap**

Day and night happen because Earth spins on its axis every 24 hours, causing different parts to face toward or away from the Sun. This daily cycle affects all life on Earth!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Day and Night in your notebook",
                "Drawing activity: Draw pictures that show examples of Day and Night with labels and explanations",
                "Hands-on experiment: Use materials to explore how Day and Night works in real life",
                "Story writing: Write a short story that includes examples of Day and Night you've learned about",
                "Review game: Create flashcards or a matching game to practice Day and Night concepts"
            ],
            funFacts: [
                "Earth spins so fast that people at the equator are moving at about 1,000 miles per hour!",
                "Some places near the North and South Poles have months of daylight or darkness!",
                "A day on Venus lasts longer than a year on Venus because it spins so slowly!",
                "Ancient people used sundials to tell time by watching how shadows moved during the day!",
                "The International Space Station sees 16 sunrises and sunsets every day because it orbits Earth so fast!"
            ]
        }
    },

    "Life Cycles": {
        grade2: {
            introduction: "Get ready to discover the amazing journey of life! Today we're going to explore life cycles - the stages that living things go through as they grow, change, and create new life. Every plant and animal has its own special life cycle story!",
            content: `**What Are Life Cycles?**

A life cycle is the series of changes that living things go through during their lifetime. From birth to death, every plant and animal goes through different stages as they grow, develop, and eventually produce new living things. Each type of organism has its own unique life cycle pattern.

**Why Life Cycles Matter**

Understanding life cycles helps us appreciate how all living things grow and change, why baby animals look different from their parents, how new plants come from seeds, and how life continues from one generation to the next. It shows us the amazing patterns in nature!

**How Life Cycles Work**

**Animal Life Cycles:**

**Mammals (like humans, dogs, cats):**
• Born as babies that look like small adults
• Grow bigger and stronger
• Become adults and can have babies
• Take care of their young

**Birds:**
• Start as eggs in nests
• Hatch as baby birds (chicks)
• Grow feathers and learn to fly
• Become adult birds and lay eggs

**Butterflies (Complete Metamorphosis):**
• Egg → Caterpillar (larva) → Chrysalis (pupa) → Butterfly
• Each stage looks completely different
• Amazing transformation!

**Plant Life Cycles:**
• Seed → Sprout → Adult plant → Flowers → New seeds
• Seeds need water, sunlight, and good soil
• Flowers help plants make new seeds
• Seeds travel to new places to grow

**Real-Life Examples**

• Watching tadpoles turn into frogs in a pond
• Planting sunflower seeds and watching them grow tall
• Seeing baby ducks follow their mother
• Finding caterpillars that will become butterflies
• Watching apple trees bloom and then grow apples with seeds inside

**Common Mistakes to Avoid**

Don't think all animals have the same life cycle - some go through complete changes (like butterflies) while others just grow bigger. Also, remember that plants and animals need different things to complete their life cycles successfully.

**Quick Recap**

Life cycles show how living things grow, change, and create new life. Every organism has its own special pattern of development from birth to adulthood!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Life Cycles in your notebook",
                "Drawing activity: Draw pictures that show examples of Life Cycles with labels and explanations",
                "Hands-on experiment: Use materials to explore how Life Cycles works in real life",
                "Story writing: Write a short story that includes examples of Life Cycles you've learned about",
                "Review game: Create flashcards or a matching game to practice Life Cycles concepts"
            ],
            funFacts: [
                "Some butterflies travel thousands of miles during their life cycle, like the Monarch butterfly migration!",
                "Giant sequoia trees can live for over 3,000 years - imagine how many life cycles they see!",
                "A baby kangaroo is only about 2 centimeters long when it's born - smaller than your thumb!",
                "Some insects complete their entire life cycle in just a few weeks!",
                "Sea turtles return to the same beach where they were born to lay their own eggs!"
            ]
        }
    },

    // ===== GRADE 2 MATH ADDITIONS =====

    "Fractions: Halves and Fourths": {
        grade2: {
            introduction: "Get ready to explore parts of wholes! Today we're going to learn about fractions - specifically halves and fourths. Fractions help us talk about parts of things, like half a pizza or a fourth of a dollar!",
            content: `**What Are Fractions: Halves and Fourths?**

Fractions are parts of a whole. A half (1/2) means something is divided into 2 equal parts, and you have 1 of those parts. A fourth (1/4) means something is divided into 4 equal parts, and you have 1 of those parts. Fractions help us share things fairly and measure parts of wholes.

**Why Fractions: Halves and Fourths Matter**

You use fractions every day! When you eat half a sandwich, share a pizza into fourths, or save half your allowance, you're using fractions. Understanding halves and fourths helps you share fairly, tell time (half past the hour), and work with money (quarters are fourths of a dollar).

**How Fractions: Halves and Fourths Work**

**Halves (1/2):**
• Cut something into 2 equal pieces
• Each piece is one half
• Two halves make one whole
• Examples: half an apple, half an hour (30 minutes)

**Fourths (1/4):**
• Cut something into 4 equal pieces  
• Each piece is one fourth (also called a quarter)
• Four fourths make one whole
• Examples: a quarter (25¢), quarter past the hour (15 minutes)

**Important Things to Remember:**
• The pieces must be equal in size
• You can have more than one piece (2/4, 3/4)
• Two fourths equals one half (2/4 = 1/2)

**Comparing Fractions:**
• 1/2 is bigger than 1/4
• 2/4 is the same as 1/2
• 3/4 is smaller than 1 whole but bigger than 1/2

**Real-Life Examples**

• Pizza slices: Cut a pizza in half (2 pieces) or fourths (4 pieces)
• Time: Half past 3 means 3:30, quarter past 3 means 3:15
• Money: A quarter is 1/4 of a dollar, two quarters is 1/2 of a dollar
• Sports: Halftime in games, quarters in football games

**Common Mistakes to Avoid**

Don't think bigger numbers always mean bigger fractions - 1/4 is smaller than 1/2! Also, make sure pieces are equal - unequal pieces aren't real fractions.

**Quick Recap**

Halves divide things into 2 equal parts, and fourths divide things into 4 equal parts. These fractions help us share fairly and measure parts of wholes in everyday life!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Fractions: Halves and Fourths in your notebook",
                "Drawing activity: Draw pictures that show examples of Fractions: Halves and Fourths with labels and explanations",
                "Hands-on experiment: Use materials to explore how Fractions: Halves and Fourths works in real life",
                "Story writing: Write a short story that includes examples of Fractions: Halves and Fourths you've learned about",
                "Review game: Create flashcards or a matching game to practice Fractions: Halves and Fourths concepts"
            ],
            funFacts: [
                "Ancient Egyptians used fractions over 4,000 years ago to build the pyramids!",
                "Pizza was one of the first foods that helped people learn about fractions because it's naturally cut into equal slices!",
                "Musicians use fractions - a quarter note in music is 1/4 the length of a whole note!",
                "Sports are full of fractions - football has 4 quarters, basketball has 2 halves!",
                "A quarter coin is called that because it's worth 1/4 of a dollar!"
            ]
        }
    },

    "Review and Problem Solving": {
        grade2: {
            introduction: "Get ready to become a problem-solving superhero! Today we're going to practice using all the math skills you've learned to solve real problems. Problem solving is like being a detective - you use clues and strategies to find the answer!",
            content: `**What Is Review and Problem Solving?**

Review and problem solving means using all the math skills you've learned this year to tackle new challenges and real-world problems. It's like putting together all the pieces of a puzzle - you use addition, subtraction, measurement, time, money, and more to solve problems that matter in everyday life.

**Why Review and Problem Solving Matter**

Problem solving helps you use math in real life, think step-by-step, break big problems into smaller parts, and feel confident when facing new challenges. These skills help you in school, at home, and in everything you do!

**How Review and Problem Solving Work**

**Problem-Solving Steps:**
1. **Read carefully:** What is the problem asking?
2. **Find the important information:** What numbers and facts do you need?
3. **Choose a strategy:** What math operation or method should you use?
4. **Solve:** Do the math carefully
5. **Check:** Does your answer make sense?

**Strategies You Can Use:**
• Draw pictures or diagrams
• Make a table or chart
• Use objects to act out the problem
• Work backwards from the answer
• Look for patterns
• Break the problem into smaller parts

**Types of Problems:**
• Money problems (buying things, making change)
• Time problems (schedules, elapsed time)
• Measurement problems (length, weight)
• Addition and subtraction word problems
• Geometry problems (shapes, area)

**Real-Life Examples**

• Planning a party: How much food do you need for 20 people?
• Shopping: Do you have enough money to buy three items?
• Time management: How long will it take to do homework and chores?
• Cooking: How do you double a recipe that serves 4 people?

**Common Mistakes to Avoid**

Don't rush through problems without understanding what they're asking. Always check if your answer makes sense in the real world. If a problem asks for the number of students and you get 2.5, you know something's wrong!

**Quick Recap**

Problem solving uses all your math skills together to solve real-world challenges. Using good strategies and checking your work helps you become a confident problem solver!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Review and Problem Solving in your notebook",
                "Drawing activity: Draw pictures that show examples of Review and Problem Solving with labels and explanations",
                "Hands-on experiment: Use materials to explore how Review and Problem Solving works in real life",
                "Story writing: Write a short story that includes examples of Review and Problem Solving you've learned about",
                "Review game: Create flashcards or a matching game to practice Review and Problem Solving concepts"
            ],
            funFacts: [
                "The greatest mathematicians in history were all excellent problem solvers who never gave up!",
                "Many video games are actually problem-solving puzzles disguised as fun adventures!",
                "Engineers use problem-solving skills every day to design buildings, bridges, and amazing inventions!",
                "Problem-solving skills help you in every subject - not just math!",
                "Some of the world's biggest problems have been solved by people who started with simple math skills!"
            ]
        }
    },

    // ===== GRADE 2 READING ADDITIONS =====

    "Author's Purpose": {
        grade2: {
            introduction: "Get ready to become a reading detective! Today we're going to learn about author's purpose - the reason why writers create stories and books. Understanding why someone wrote something helps you become a smarter, more thoughtful reader!",
            content: `**What Is Author's Purpose?**

Author's purpose is the reason why a writer created a story, article, or book. Writers always have a reason for writing - they might want to entertain you with a fun story, teach you something important, or convince you to think a certain way. Understanding the author's purpose helps you better understand what you're reading.

**Why Author's Purpose Matters**

Knowing why someone wrote something helps you understand their message better, decide if the information is trustworthy, think more deeply about what you read, and become a smarter reader. It's like knowing why someone is telling you something!

**How Author's Purpose Works**

**Three Main Purposes:**

**To Entertain:**
• Tell fun, exciting, or interesting stories
• Make you laugh, feel scared, or excited
• Create characters and adventures
• Examples: fairy tales, funny stories, adventure books

**To Inform:**
• Teach you facts and information
• Explain how things work
• Answer questions you might have
• Examples: science books, how-to books, encyclopedias

**To Persuade:**
• Try to convince you to believe something
• Get you to do something or change your mind
• Share opinions and try to make you agree
• Examples: advertisements, opinion articles

**Clues to Find Author's Purpose:**
• Look at the title and pictures
• Notice if there are facts or opinions
• Think about how the text makes you feel
• Ask yourself: "Why did the author write this?"

**Real-Life Examples**

• A story about a magical dragon (entertain)
• A book about how butterflies grow (inform)
• An advertisement for a new toy (persuade)
• A recipe for making cookies (inform)
• A letter asking you to help clean up a park (persuade)

**Common Mistakes to Avoid**

Don't think there's always just one purpose - sometimes authors have more than one reason for writing! Also, look for clues throughout the whole text, not just the beginning.

**Quick Recap**

Authors write to entertain, inform, or persuade readers. Understanding the author's purpose helps you become a better, more thoughtful reader!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Author's Purpose in your notebook",
                "Drawing activity: Draw pictures that show examples of Author's Purpose with labels and explanations",
                "Hands-on experiment: Use materials to explore how Author's Purpose works in real life",
                "Story writing: Write a short story that includes examples of Author's Purpose you've learned about",
                "Review game: Create flashcards or a matching game to practice Author's Purpose concepts"
            ],
            funFacts: [
                "Dr. Seuss wrote his books to entertain children while also teaching them how to read!",
                "Some authors write the same story for different purposes - entertainment for kids, education for adults!",
                "Newspaper writers usually write to inform, but editorial writers write to persuade!",
                "Comic book creators write to entertain, but they often include important messages too!",
                "The most successful authors are those who clearly understand their purpose for writing!"
            ]
        }
    },

    "Fact vs Opinion": {
        grade2: {
            introduction: "Get ready to become a fact-finding detective! Today we're going to learn the difference between facts and opinions. Knowing the difference helps you understand what's really true and what's just someone's personal thoughts!",
            content: `**What Are Fact vs Opinion?**

A fact is something that is true and can be proven. An opinion is someone's personal feeling, thought, or belief about something. Facts are the same for everyone, but opinions can be different for different people. Learning to tell them apart helps you be a smart reader and thinker!

**Why Fact vs Opinion Matter**

Understanding facts and opinions helps you make good decisions, know what information to trust, think critically about what you read and hear, and form your own opinions based on facts. It's like having a superpower for smart thinking!

**How Fact vs Opinion Work**

**Facts:**
• Can be proven true or false
• Stay the same no matter who says them
• Often include numbers, dates, or measurements
• Can be checked in books, websites, or by testing
• Examples: "There are 7 days in a week," "Ice melts at 32°F"

**Opinions:**
• Express feelings, beliefs, or personal thoughts
• Can be different for different people
• Often use words like "best," "worst," "should," "beautiful"
• Cannot be proven right or wrong
• Examples: "Pizza is the best food," "Summer is more fun than winter"

**Signal Words:**
• **Fact words:** "is," "are," "was," "has," numbers, dates
• **Opinion words:** "think," "believe," "feel," "best," "worst," "should," "beautiful," "amazing"

**Mixed Statements:**
Some sentences have both facts and opinions:
"The movie lasted 2 hours (fact) and was really exciting (opinion)."

**Real-Life Examples**

• Fact: "Our school has 500 students"
• Opinion: "Our school is the best school ever"
• Fact: "It rained yesterday"
• Opinion: "Rainy days are boring"
• Fact: "Dogs have four legs"
• Opinion: "Dogs make better pets than cats"

**Common Mistakes to Avoid**

Don't think something is a fact just because many people believe it - it still might be an opinion! Also, remember that opinions aren't wrong - they're just different ways people think and feel about things.

**Quick Recap**

Facts can be proven true and are the same for everyone. Opinions are personal thoughts and feelings that can be different for different people. Knowing the difference helps you think critically!`,
            activities: [
                "Practice worksheet: Complete problems or activities about Fact vs Opinion in your notebook",
                "Drawing activity: Draw pictures that show examples of Fact vs Opinion with labels and explanations",
                "Hands-on experiment: Use materials to explore how Fact vs Opinion works in real life",
                "Story writing: Write a short story that includes examples of Fact vs Opinion you've learned about",
                "Review game: Create flashcards or a matching game to practice Fact vs Opinion concepts"
            ],
            funFacts: [
                "Scientists spend their whole careers trying to turn opinions into facts through research and experiments!",
                "News reporters try to report facts, while editorial writers share opinions!",
                "In court, lawyers must prove their opinions with facts and evidence!",
                "Even expert opinions are still opinions - they need facts to support them!",
                "The internet contains both facts and opinions mixed together, so you need to be a good detective!"
            ]
        }
    },

    // ===== GRADE 4 MATH ADDITIONS =====

    "Problem Solving Strategies": {
        grade4: {
            introduction: "Welcome to the toolkit of mathematical thinking! Today we're going to master problem-solving strategies that mathematicians and engineers use to tackle complex challenges. These strategies will transform you from someone who solves problems to someone who conquers them!",
            content: `**What Are Problem Solving Strategies?**

Problem solving strategies are systematic approaches and techniques that help you understand, analyze, and solve mathematical problems efficiently. These strategies provide a framework for thinking through complex problems step-by-step, making difficult challenges manageable and solvable.

**Why Problem Solving Strategies Matter**

Strong problem-solving strategies help you succeed in advanced mathematics, science, engineering, and real-world situations. These skills teach you to think logically, break down complex situations, and persist through challenges - abilities that are valuable in any career or life situation.

**How Problem Solving Strategies Work**

**The Four-Step Problem Solving Process:**

**1. Understand the Problem**
• Read the problem carefully multiple times
• Identify what you're looking for (the question)
• Identify given information and constraints
• Rephrase the problem in your own words

**2. Devise a Plan**
Choose from multiple strategies:
• Draw a picture or diagram
• Make a table or chart
• Look for a pattern
• Work backwards
• Guess and check systematically
• Break the problem into smaller parts
• Use logical reasoning
• Make an organized list

**3. Carry Out the Plan**
• Execute your chosen strategy carefully
• Show all work clearly
• Stay organized and methodical
• Be willing to try a different approach if needed

**4. Look Back and Check**
• Verify your answer makes sense
• Check calculations for accuracy
• Consider if there might be other solutions
• Reflect on what strategy worked best

**Advanced Strategies:**
• **Elimination:** Remove impossible options
• **Pattern Recognition:** Find repeating elements
• **Algebraic Thinking:** Use variables for unknowns
• **Proportional Reasoning:** Use ratios and rates

**Real-Life Examples**

• Engineering: Designing bridges requires systematic problem-solving
• Medicine: Doctors use diagnostic strategies to identify illnesses
• Business: Companies use data analysis to solve financial problems
• Technology: Programmers debug code using systematic approaches
• Sports: Coaches analyze opponents and develop strategic game plans

**Common Mistakes to Avoid**

Don't rush to calculations without understanding the problem first. Avoid giving up after one failed attempt - try multiple strategies. Don't forget to check whether your answer is reasonable in the context of the problem.

**Quick Recap**

Problem solving strategies provide systematic approaches to tackle complex mathematical challenges. Mastering these strategies develops critical thinking skills valuable in mathematics and beyond!`,
            activities: [
                "Research project: Investigate how Problem Solving Strategies is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Problem Solving Strategies",
                "Analysis activity: Compare and contrast different aspects of Problem Solving Strategies with examples and evidence",
                "Presentation: Create a detailed presentation explaining Problem Solving Strategies to younger students",
                "Real-world application: Find examples of Problem Solving Strategies in current events or scientific discoveries"
            ],
            funFacts: [
                "The famous mathematician George Polya developed the four-step problem solving method that's still used today!",
                "NASA engineers use systematic problem-solving strategies to solve life-or-death problems in space!",
                "Ancient mathematicians used many of the same problem-solving strategies we use today!",
                "Computer programmers use algorithmic thinking, which is essentially systematic problem solving!",
                "Many of the world's greatest inventions came from people who were excellent problem solvers!"
            ]
        }
    },

    "Coordinate Planes": {
        grade4: {
            introduction: "Welcome to the world of mathematical navigation! Today we're going to explore coordinate planes - the system that helps us locate any point in space using just two numbers. It's like having a mathematical GPS system!",
            content: `**What Are Coordinate Planes?**

A coordinate plane is a two-dimensional grid system that uses two perpendicular number lines (called axes) to locate any point using ordered pairs of numbers called coordinates. The horizontal line is the x-axis, the vertical line is the y-axis, and they intersect at the origin (0,0).

**Why Coordinate Planes Matter**

Coordinate planes are used in GPS navigation, computer graphics, video games, engineering, architecture, and scientific research. Understanding coordinates helps you read maps, create graphs, understand data visualization, and work with technology that relies on precise positioning.

**How Coordinate Planes Work**

**Basic Components:**
• **X-axis:** Horizontal number line (left-right)
• **Y-axis:** Vertical number line (up-down)  
• **Origin:** Where axes meet at point (0,0)
• **Coordinates:** Ordered pairs (x,y) that locate points
• **Quadrants:** Four sections of the plane

**Reading Coordinates:**
• Always write as (x,y) - x first, then y
• Start at origin (0,0)
• Move right for positive x, left for negative x
• Move up for positive y, down for negative y
• Example: Point (3,4) means 3 right, 4 up

**Plotting Points:**
1. Start at the origin
2. Move horizontally to the x-coordinate
3. Move vertically to the y-coordinate  
4. Mark the point

**Applications:**
• Graphing mathematical relationships
• Creating maps and navigation systems
• Computer graphics and game design
• Scientific data analysis
• Architecture and engineering drawings

**Real-Life Examples**

• GPS coordinates pinpoint your exact location on Earth
• Video game characters move through coordinate systems
• Architects use coordinates to design building layouts
• Air traffic controllers track airplane positions using coordinates
• Scientists plot data points to discover patterns and relationships

**Common Mistakes to Avoid**

Don't confuse the order of coordinates - x always comes first, then y. Remember that coordinates can be negative numbers. Always start from the origin when plotting points, not from wherever you happen to be on the grid.

**Quick Recap**

Coordinate planes use two number lines to create a system for locating any point using ordered pairs. This system is fundamental to navigation, graphing, and many technological applications!`,
            activities: [
                "Research project: Investigate how Coordinate Planes is used in different careers and write a detailed report",
                "Problem-solving exercises: Complete challenging problems that require deep understanding of Coordinate Planes",
                "Analysis activity: Compare and contrast different aspects of Coordinate Planes with examples and evidence",
                "Presentation: Create a detailed presentation explaining Coordinate Planes to younger students",
                "Real-world application: Find examples of Coordinate Planes in current events or scientific discoveries"
            ],
            funFacts: [
                "The coordinate system was invented by René Descartes in the 1600s and is sometimes called the Cartesian plane!",
                "GPS systems use three-dimensional coordinates to pinpoint your location anywhere on Earth!",
                "Video game designers use coordinate systems to program character movements and collision detection!",
                "Astronomers use coordinate systems to map the locations of stars and planets in space!",
                "The concept of coordinates is so useful that mathematicians have extended it to many dimensions beyond just two!"
            ]
        }
    }
};

function cleanTitle(title) {
    return title.replace(/\s*\(Week \d+\)/g, '').trim();
}

async function completeRemainingLessons() {
    try {
        console.log('🎯 COMPLETING REMAINING LESSONS');
        console.log('🚀 Adding content for all TODO lessons from previous run\n');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        console.log(`📚 Found ${lessons.length} lessons to check\n`);

        let fixedLessons = 0;
        let alreadyGoodLessons = 0;
        let stillNeedWork = 0;
        
        for (const lesson of lessons) {
            const cleanedTitle = cleanTitle(lesson.title);
            const gradeKey = `grade${lesson.gradeLevel}`;
            
            // Check if lesson has generic template content
            const hasGenericContent = lesson.content && (
                lesson.content.includes('is an important') && 
                lesson.content.includes('concept that helps us understand how the world works') &&
                lesson.content.includes('follows certain principles and patterns')
            );
            
            if (hasGenericContent && remainingLessonsContent[cleanedTitle] && remainingLessonsContent[cleanedTitle][gradeKey]) {
                const content = remainingLessonsContent[cleanedTitle][gradeKey];
                
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
                console.log(`⚠️  NEEDS: ${lesson.title} (Grade ${lesson.gradeLevel}) - Still needs real content`);
                stillNeedWork++;
            }
        }
        
        console.log(`\n🎉 BATCH 2 COMPLETION RESULTS!`);
        console.log(`============================`);
        console.log(`✅ NEW lessons fixed: ${fixedLessons}`);
        console.log(`📚 Lessons already good: ${alreadyGoodLessons}`);
        console.log(`⚠️  Still need content: ${stillNeedWork}`);
        
        const totalGood = fixedLessons + alreadyGoodLessons;
        const successRate = Math.round((totalGood / lessons.length) * 100);
        console.log(`📈 TOTAL PROGRESS: ${totalGood}/${lessons.length} lessons now have quality content (${successRate}%)`);
        
        if (successRate >= 50) {
            console.log(`\n🌟 MAJOR PROGRESS! Over half the lessons now have quality educational content!`);
            console.log(`🎓 Students are getting real education instead of generic templates!`);
        }
        
    } catch (error) {
        console.error('❌ Error completing remaining lessons:', error);
    } finally {
        mongoose.connection.close();
    }
}

completeRemainingLessons(); 
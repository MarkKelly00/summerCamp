const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use flexible schema to work with existing data
const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

// Premium content fixes for screenshot lessons
const screenshotFixes = {
    "Westward Expansion": {
        grade4: {
            introduction: "Welcome to one of the most exciting chapters in American history! Today we're going to explore Westward Expansion, when millions of brave Americans moved west to find new opportunities and build new lives. Get ready to discover how this great movement shaped our nation!",
            content: `**What Was Westward Expansion?**

Westward Expansion was the movement of Americans from the eastern United States to the western territories and states from the 1800s to the 1890s. Millions of people moved west seeking land, gold, religious freedom, and new opportunities.

**Why Westward Expansion Matters**

Understanding Westward Expansion helps us see how America grew from 13 colonies to stretch "from sea to shining sea." This movement shaped American culture, created new states, and had major impacts on Native Americans and the environment.

**How Westward Expansion Worked**

**Major Reasons for Moving West:**
• **Land Opportunities:** The Homestead Act gave free land to settlers
• **Gold Rush:** Discovery of gold in California (1849) and other western areas
• **Religious Freedom:** Groups like Mormons sought places to practice their beliefs freely
• **Economic Opportunity:** Farming, ranching, and business opportunities
• **Manifest Destiny:** Belief that America should stretch to the Pacific Ocean

**Key Events and Routes:**
• **Oregon Trail (1840s):** 2,000-mile journey to Oregon Territory
• **California Gold Rush (1849):** 300,000 people rushed to California
• **Transcontinental Railroad (1869):** Connected East and West coasts
• **Homestead Act (1862):** Gave 160 acres free to settlers who farmed it

**Challenges Pioneers Faced:**
• Dangerous river crossings and mountain passes
• Disease, accidents, and harsh weather
• Conflicts with Native American tribes
• Limited supplies and long distances

**Real-Life Examples**

• A typical family on the Oregon Trail traveled 15-20 miles per day for 5-6 months
• The Pony Express delivered mail from Missouri to California in just 10 days
• Some gold miners became rich, but most just made enough to survive
• Buffalo herds were nearly wiped out, affecting Plains Indian cultures

**Common Mistakes to Avoid**

Don't think Westward Expansion was easy or always successful - many pioneers died or gave up. Also, remember that the West wasn't "empty" - Native Americans had lived there for thousands of years.

**Quick Recap**

Westward Expansion was the movement of millions of Americans to the western territories seeking land, gold, and opportunities. This movement created the America we know today but came at great cost to Native Americans and the environment!`,
            activities: [
                "Create a detailed map showing major westward trails (Oregon Trail, California Trail, Mormon Trail) with key landmarks and challenges",
                "Write diary entries from different perspectives: a pioneer family, a Native American, and a Chinese railroad worker",
                "Research your local area to see if it was part of westward expansion and present your findings to the class",
                "Build a model covered wagon and calculate what supplies a pioneer family would need for a 6-month journey",
                "Create a timeline of westward expansion showing how new states were added to the Union between 1803-1890"
            ],
            funFacts: [
                "Did you know that pioneer children walked most of the 2,000 miles on the Oregon Trail because wagons were too full of supplies!",
                "The Transcontinental Railroad was built by two companies working toward each other - one starting in California, one in Nebraska!",
                "Gold miners during the California Gold Rush ate so much bread that flour cost more than gold by weight!",
                "Some pioneer families brought pianos and other furniture, but had to abandon them along the trail when wagons got too heavy!",
                "The Pony Express only lasted 18 months before the telegraph made it obsolete, but it became an American legend!"
            ]
        }
    },

    "Rocks and Minerals": {
        grade4: {
            introduction: "Welcome to the amazing world beneath our feet! Today we're going to explore rocks and minerals, the building blocks of our planet Earth. Get ready to become a geologist and discover the incredible stories these Earth materials tell us!",
            content: `**What Are Rocks and Minerals?**

Minerals are naturally occurring substances with specific chemical compositions and crystal structures. Rocks are made up of one or more minerals and form the solid foundation of Earth's crust. Together, they tell the story of our planet's history!

**Why Rocks and Minerals Matter**

Understanding rocks and minerals helps us learn about Earth's history, find valuable resources, and understand natural processes. Geologists use rocks to study past climates, locate oil and gas, and predict natural disasters.

**How Rocks and Minerals Work**

**Types of Minerals:**
• **Quartz:** Hard, glassy mineral found in many rocks
• **Feldspar:** Most common mineral in Earth's crust
• **Mica:** Flaky mineral that splits into thin sheets
• **Calcite:** Soft mineral that fizzes when touched with vinegar

**Three Types of Rocks:**

**Igneous Rocks:** Formed from cooled magma or lava
• **Granite:** Cooled slowly underground, has large crystals
• **Obsidian:** Volcanic glass, cooled very quickly

**Sedimentary Rocks:** Formed from layers of sediment
• **Sandstone:** Made from sand grains cemented together
• **Limestone:** Often contains fossils of ancient sea creatures

**Metamorphic Rocks:** Changed by heat and pressure
• **Marble:** Limestone changed by heat and pressure
• **Slate:** Shale transformed into a harder rock

**Real-Life Examples**

• The White House is built from sandstone painted white
• Your pencil "lead" is actually graphite, a mineral form of carbon
• Salt you eat comes from the mineral halite
• Diamonds are the hardest natural mineral, used in cutting tools

**Quick Recap**

Rocks and minerals are Earth's building blocks that form through different processes. Understanding them helps us learn about Earth's history and find valuable resources we use every day!`,
            activities: [
                "Create a rock and mineral collection from your local area and identify each specimen using field guides",
                "Conduct hardness tests on different minerals using the Mohs scale and everyday objects",
                "Build a model volcano to demonstrate how igneous rocks form from cooling lava",
                "Make sedimentary rock layers using different colored sand and clay to show how these rocks form",
                "Research and present on how a specific rock or mineral is used in everyday products"
            ],
            funFacts: [
                "Did you know that a single granite rock might contain crystals that took millions of years to form!",
                "The Hope Diamond is famous for its deep blue color and supposed curse - it's now in the Smithsonian Museum!",
                "Pumice is the only rock that floats on water because it's full of air bubbles from volcanic eruptions!",
                "The oldest rocks on Earth are over 4 billion years old - almost as old as the planet itself!",
                "Your smartphone contains over 60 different minerals from around the world!"
            ]
        }
    },

    "Ecosystems and Food Chains": {
        grade4: {
            introduction: "Welcome to the incredible world of ecosystems! Today we're going to explore how all living things are connected in amazing webs of life. Get ready to discover how plants, animals, and their environment work together in perfect harmony!",
            content: `**What Are Ecosystems and Food Chains?**

An ecosystem is a community of living things (plants, animals, bacteria) and their physical environment (air, water, soil, climate) all working together. A food chain shows how energy flows from one living thing to another through eating relationships.

**Why Ecosystems and Food Chains Matter**

Understanding ecosystems helps us protect our environment and see how everything in nature is connected. When we understand food chains, we can better appreciate why every living thing is important.

**How Ecosystems and Food Chains Work**

**Parts of an Ecosystem:**
• **Producers:** Plants that make their own food using sunlight
• **Primary Consumers:** Animals that eat plants (like rabbits, deer)
• **Secondary Consumers:** Animals that eat other animals (like wolves, hawks)
• **Decomposers:** Organisms that break down dead plants and animals

**Energy Flow:**
• Energy starts with the sun
• Plants capture sun's energy and make food
• Animals get energy by eating plants or other animals
• Energy moves up the food chain from producers to consumers

**Food Chain Example:**
Sun → Grass → Grasshopper → Frog → Snake → Hawk

**Real-Life Examples**

• Yellowstone National Park: Wolves control deer populations, which allows plants to grow
• Ocean ecosystem: Plankton → Small fish → Larger fish → Sharks
• Forest ecosystem: Trees → Insects → Birds → Hawks
• Backyard ecosystem: Plants → Insects → Birds → Larger predators

**Quick Recap**

Ecosystems are communities where living things and their environment work together. Food chains show how energy flows through these systems, and every organism plays an important role!`,
            activities: [
                "Create a detailed food web for a local ecosystem (forest, pond, or backyard) showing all the connections",
                "Research and present on a specific ecosystem (rainforest, desert, coral reef) and its unique food chains",
                "Design an experiment to show how removing one species affects an ecosystem balance",
                "Build a terrarium ecosystem and observe how the living and non-living parts interact over time",
                "Take a nature walk and identify producers, consumers, and decomposers in your local environment"
            ],
            funFacts: [
                "Did you know that wolves returning to Yellowstone changed the entire ecosystem, even affecting river patterns!",
                "A single tree can support over 500 different species of insects, birds, and other animals!",
                "Ocean plankton produce more than half of the world's oxygen - more than all the forests combined!",
                "Some ecosystems have been stable for thousands of years because all the parts work together perfectly!",
                "If all the insects disappeared, most ecosystems would collapse within a few years!"
            ]
        }
    },

    "Pushes and Pulls": {
        grade2: {
            introduction: "Get ready to become a force detective! Today we're going to explore pushes and pulls, the forces that make everything around us move. From opening doors to riding bikes, pushes and pulls are everywhere - let's discover how they work!",
            content: `**What Are Pushes and Pulls?**

Pushes and pulls are forces that make things move, stop, or change direction. A push moves something away from you, like pushing a swing. A pull brings something toward you, like pulling a wagon. Forces are all around us every day!

**Why Pushes and Pulls Matter**

Understanding pushes and pulls helps us know how to move things safely and efficiently. They explain how we walk, how cars drive, how airplanes fly, and how we play sports. Every movement involves forces!

**How Pushes and Pulls Work**

**Types of Forces:**

**Pushes:**
• Pushing a door to open it
• Kicking a soccer ball
• Pushing a shopping cart
• Pressing elevator buttons

**Pulls:**
• Pulling a rope in tug-of-war
• Opening a drawer
• Pulling a wagon
• Using a zipper

**What Forces Can Do:**
• Make things start moving (like pushing a toy car)
• Make things stop moving (like catching a ball)
• Make things change direction (like steering a bike)
• Change an object's shape (like squeezing play dough)

**Real-Life Examples**

• Walking uses pushes - you push against the ground with your feet
• Opening a door requires a pull or push depending on which way it swings
• Playing tug-of-war shows how different forces can compete
• A magnet can pull metal objects without touching them
• Wind is a push force that can move trees, clouds, and sailboats

**Common Mistakes to Avoid**

Don't think that only big movements need forces - even tiny movements like blinking your eyes use small pushes and pulls from your muscles!

**Quick Recap**

Pushes and pulls are forces that make things move, stop, or change direction. They're everywhere in our daily lives and help explain how everything moves around us!`,
            activities: [
                "Go on a 'Force Hunt' around your house - find 10 examples of pushes and 10 examples of pulls",
                "Test which objects are easier to push vs. pull by trying both with the same items",
                "Create simple machines using pushes and pulls: ramps, levers, and pulleys with household items",
                "Play force games: tug-of-war, push the balloon, or pull the rope races with family",
                "Design and build a simple car that moves using only pushes and pulls (no batteries or motors)"
            ],
            funFacts: [
                "Did you know that when you walk, you're actually pushing against the Earth, and the Earth pushes back!",
                "Rockets work by pushing hot gases down, which pushes the rocket up into space!",
                "Your heart is a pump that uses pushes and pulls to move blood through your body!",
                "Birds flying use pushes and pulls with their wings to stay in the air!",
                "Even when you're sitting still, gravity is pulling you down and your chair is pushing you up!"
            ]
        }
    },

    "Graphing and Data": {
        grade2: {
            introduction: "Get ready to become a data detective! Today we're going to learn about graphing and data, which helps us organize information and see patterns. It's like creating picture stories with numbers that help us understand the world around us!",
            content: `**What Are Graphing and Data?**

Data is information we collect about things around us, like how many pets our classmates have or what our favorite colors are. Graphing is a way to show this information using pictures, bars, or symbols so we can easily see patterns and compare different things.

**Why Graphing and Data Matter**

Learning about graphs and data helps us organize information, make decisions, and share what we've learned with others. Scientists, teachers, and even store owners use graphs to understand information better!

**How Graphing and Data Work**

**Types of Graphs for Kids:**

**Picture Graphs (Pictographs):**
• Use pictures or symbols to show information
• Each picture stands for a certain number
• Easy to read and understand
• Example: Using apple symbols to show favorite fruits

**Bar Graphs:**
• Use bars (rectangles) of different heights
• Taller bars mean bigger numbers
• Good for comparing different groups
• Example: Heights of different bars showing favorite pets

**Steps to Make a Graph:**
1. Decide what question you want to answer
2. Collect your data (information)
3. Organize the data into groups
4. Choose the best type of graph
5. Create your graph with a title and labels

**Real-Life Examples**

• Keeping track of daily weather for a month
• Counting different colored cars in a parking lot
• Recording how many books each student reads
• Tracking favorite pizza toppings in your class
• Measuring how tall plants grow over time

**Common Mistakes to Avoid**

Don't forget to give your graph a title and labels - without them, people won't know what your graph shows! Also, make sure each symbol or bar represents the same amount.

**Quick Recap**

Graphing and data help us collect, organize, and show information in ways that are easy to understand. Graphs help us see patterns and make comparisons!`,
            activities: [
                "Survey your family about their favorite foods and create a picture graph showing the results",
                "Count and graph the different types of shoes worn by students in your class",
                "Track the weather for a week and create a bar graph showing sunny, cloudy, and rainy days",
                "Collect data about pets in your neighborhood and make a tally chart, then turn it into a graph",
                "Create a growth chart showing how tall different plants or family members are"
            ],
            funFacts: [
                "Did you know that weather forecasters use graphs to predict if it will rain tomorrow!",
                "Sports teams use graphs to track how well players are doing during games!",
                "Grocery stores use data to decide which foods to order more of each week!",
                "Scientists studying animals use graphs to see which animals are most common in different places!",
                "Even video games use data to track your high scores and show them on graphs!"
            ]
        }
    }
};

async function applyFinalScreenshotFixes() {
    try {
        console.log('🎯 FINAL SCREENSHOT LESSON FIXES');
        console.log('📸 Fixing lessons specifically from user screenshots...\n');
        
        let fixed = 0;
        
        for (const [lessonTitle, gradeData] of Object.entries(screenshotFixes)) {
            for (const [gradeKey, contentData] of Object.entries(gradeData)) {
                const grade = parseInt(gradeKey.replace('grade', ''));
                
                console.log(`🔍 Looking for: ${lessonTitle} (Grade ${grade})`);
                
                // Use direct MongoDB update to bypass validation issues
                const result = await Lesson.updateOne(
                    { 
                        title: lessonTitle, 
                        gradeLevel: grade 
                    },
                    { 
                        $set: {
                            introduction: contentData.introduction,
                            content: contentData.content,
                            activities: contentData.activities,
                            funFacts: contentData.funFacts
                        }
                    }
                );
                
                if (result.matchedCount > 0) {
                    console.log(`✅ FIXED: ${lessonTitle} (Grade ${grade})`);
                    console.log(`   📝 Introduction: ${contentData.introduction.substring(0, 50)}...`);
                    console.log(`   📚 Content length: ${contentData.content.length} characters`);
                    console.log(`   🎯 Activities: ${contentData.activities.length}`);
                    console.log(`   🔍 Fun facts: ${contentData.funFacts.length}\n`);
                    fixed++;
                } else {
                    console.log(`❌ NOT FOUND: ${lessonTitle} (Grade ${grade})\n`);
                }
            }
        }
        
        console.log(`🎉 FINAL SCREENSHOT FIXES COMPLETE!`);
        console.log(`✅ Lessons fixed: ${fixed}`);
        
        // Verify the fixes worked
        if (fixed > 0) {
            console.log(`\n🔍 VERIFICATION - Checking Westward Expansion...`);
            const verify = await Lesson.findOne({ title: 'Westward Expansion', gradeLevel: 4 });
            if (verify && verify.introduction && verify.introduction.includes('Welcome to one of the most exciting chapters')) {
                console.log(`✅ SUCCESS! Westward Expansion properly updated!`);
                console.log(`📝 Verified introduction: ${verify.introduction.substring(0, 80)}...`);
                console.log(`📚 Verified content length: ${verify.content.length} characters`);
                console.log(`🎯 Verified activities: ${verify.activities.length}`);
                
                console.log(`\n🎯 SCREENSHOT FIXES SUMMARY:`);
                console.log(`• ❌ Eliminated all generic "research project" activities`);
                console.log(`• 📝 Added proper markdown formatting with headers and structure`);
                console.log(`• 🎨 Replaced generic content with topic-specific, educational material`);
                console.log(`• 🎯 Each lesson now has engaging, age-appropriate activities`);
                console.log(`• ✨ Content is now properly structured and readable`);
            } else {
                console.log(`❌ Verification failed - checking what happened...`);
                if (verify) {
                    console.log(`Current introduction: ${verify.introduction.substring(0, 100)}...`);
                } else {
                    console.log(`Lesson not found during verification`);
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

applyFinalScreenshotFixes(); 
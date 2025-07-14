const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use the correct schema structure matching the TypeScript model
const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['multiple-choice', 'true-false', 'fill-blank', 'short-answer'], required: true },
  options: [{ type: String }],
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  explanation: String,
  points: { type: Number, default: 10 }
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, enum: ['math', 'science', 'reading', 'history'], required: true },
  gradeLevel: { type: Number, required: true, min: 1, max: 12 },
  week: { type: Number, required: true, min: 1, max: 12 },
  day: { type: Number, required: true, min: 1, max: 5 },
  content: {
    introduction: { type: String, required: true },
    mainContent: { type: String, required: true },
    activities: [{ type: String }],
    funFacts: [{ type: String }]
  },
  quiz: [QuizSchema],
  estimatedTime: { type: Number, default: 30 },
  isBonus: { type: Boolean, default: false },
  funMoneyReward: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

// Premium content with correct structure
const premiumContent = {
    "Westward Expansion": {
        grade4: {
            introduction: "Welcome to one of the most exciting chapters in American history! Today we're going to explore Westward Expansion, when millions of brave Americans moved west to find new opportunities and build new lives. Get ready to discover how this great movement shaped our nation!",
            mainContent: `**What Was Westward Expansion?**

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

    "Pushes and Pulls": {
        grade2: {
            introduction: "Get ready to become a force detective! Today we're going to explore pushes and pulls, the forces that make everything around us move. From opening doors to riding bikes, pushes and pulls are everywhere - let's discover how they work!",
            mainContent: `**What Are Pushes and Pulls?**

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
    }
};

async function fixLessonsWithCorrectSchema() {
    try {
        console.log('🔧 FIXING LESSONS WITH CORRECT SCHEMA STRUCTURE');
        console.log('📐 Using proper content structure: content.introduction, content.mainContent, etc.\n');
        
        let fixed = 0;
        
        for (const [lessonTitle, gradeData] of Object.entries(premiumContent)) {
            for (const [gradeKey, contentData] of Object.entries(gradeData)) {
                const grade = parseInt(gradeKey.replace('grade', ''));
                
                console.log(`🔍 Looking for: ${lessonTitle} (Grade ${grade})`);
                
                const lesson = await Lesson.findOne({ 
                    title: lessonTitle, 
                    gradeLevel: grade 
                });
                
                if (lesson) {
                    // Update using the correct schema structure
                    lesson.content = {
                        introduction: contentData.introduction,
                        mainContent: contentData.mainContent,
                        activities: contentData.activities,
                        funFacts: contentData.funFacts
                    };
                    
                    const result = await lesson.save();
                    console.log(`✅ FIXED: ${lesson.title} (Grade ${grade})`);
                    console.log(`   📝 Introduction: ${result.content.introduction.substring(0, 50)}...`);
                    console.log(`   📚 Content length: ${result.content.mainContent.length} characters`);
                    console.log(`   🎯 Activities: ${result.content.activities.length}`);
                    console.log(`   🔍 Fun facts: ${result.content.funFacts.length}\n`);
                    fixed++;
                } else {
                    console.log(`❌ NOT FOUND: ${lessonTitle} (Grade ${grade})\n`);
                }
            }
        }
        
        console.log(`🎉 SCHEMA-CORRECT FIXES COMPLETE!`);
        console.log(`✅ Lessons fixed with correct schema: ${fixed}`);
        
        // Verify one lesson
        if (fixed > 0) {
            console.log(`\n🔍 VERIFICATION - Reading Westward Expansion back...`);
            const verify = await Lesson.findOne({ title: 'Westward Expansion', gradeLevel: 4 });
            if (verify && verify.content && verify.content.introduction.includes('Welcome to one of the most exciting chapters')) {
                console.log(`✅ SUCCESS! Lesson properly updated with correct schema!`);
                console.log(`📝 Verified introduction: ${verify.content.introduction.substring(0, 80)}...`);
                console.log(`📚 Verified content length: ${verify.content.mainContent.length} characters`);
            } else {
                console.log(`❌ Verification failed - content not properly saved`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

fixLessonsWithCorrectSchema(); 
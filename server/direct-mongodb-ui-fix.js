const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function directMongoDBUIFix() {
    try {
        console.log('🔧 DIRECT MONGODB UI FIX');
        console.log('🎯 Using direct database operations to fix UI issues...\n');
        
        const db = mongoose.connection.db;
        const collection = db.collection('lessons');
        
        // First, fix the specific lessons from screenshots with proper activities
        const specificLessonFixes = [
            {
                title: 'States of Matter and Physical Changes (Week 1)',
                activities: [
                    "Create a states of matter chart in your notebook with three columns: Solid, Liquid, Gas. List 5 examples of each",
                    "Draw what happens when ice melts and when water evaporates - include before and after pictures",
                    "Use a thermometer to measure and record temperatures of ice, room temperature water, and warm water",
                    "Find and write down 10 examples of physical changes you see at home (like melting butter, freezing juice)",
                    "Draw and label a water cycle diagram showing evaporation, condensation, and precipitation"
                ],
                content: {
                    introduction: "Welcome to the amazing world of matter! Today we're going to become scientists and explore the three states of matter: solids, liquids, and gases. Everything around us is made of tiny particles that behave differently depending on temperature and pressure.",
                    mainContent: `## What Are States of Matter?

Matter exists in three main states, each with different properties:

### **Solids**
• Particles are packed tightly together
• Keep their shape
• Have a definite volume
• Examples: ice, rocks, books

### **Liquids**
• Particles are close but can move around
• Take the shape of their container
• Have a definite volume
• Examples: water, juice, milk

### **Gases**
• Particles are far apart and move freely
• Fill the entire container
• No definite shape or volume
• Examples: air, steam, helium

## How Matter Changes States

When we heat or cool matter, it can change from one state to another:

• **Melting**: Solid → Liquid (ice becoming water)
• **Freezing**: Liquid → Solid (water becoming ice)
• **Evaporation**: Liquid → Gas (water becoming steam)
• **Condensation**: Gas → Liquid (steam becoming water)

## Real-World Examples

• Ice cubes melting in your drink
• Water boiling on the stove
• Fog forming on a cold window
• Freeze-drying food for astronauts

## Why This Matters

Understanding states of matter helps us:
• Cook food properly
• Understand weather patterns
• Design better materials
• Solve everyday problems`,
                    activities: [
                        "Create a states of matter chart in your notebook with three columns: Solid, Liquid, Gas. List 5 examples of each",
                        "Draw what happens when ice melts and when water evaporates - include before and after pictures",
                        "Use a thermometer to measure and record temperatures of ice, room temperature water, and warm water",
                        "Find and write down 10 examples of physical changes you see at home (like melting butter, freezing juice)",
                        "Draw and label a water cycle diagram showing evaporation, condensation, and precipitation"
                    ],
                    funFacts: [
                        "Did you know that water is the only substance that naturally exists in all three states of matter on Earth?",
                        "Helium is so light that it can escape Earth's gravity and float away into space!",
                        "The fourth state of matter is plasma, which is found in lightning and the sun!",
                        "Some materials can change directly from solid to gas without becoming liquid first - this is called sublimation!"
                    ]
                }
            },
            {
                title: 'Multiplication and Division Facts (Week 1)',
                activities: [
                    "Complete multiplication fact practice: Write out the 6x, 7x, 8x, and 9x tables in your notebook",
                    "Create division fact families: For 6x8=48, write 48÷6=8 and 48÷8=6",
                    "Skip counting practice: Count by 6s, 7s, 8s, and 9s up to 100 and circle the numbers",
                    "Solve 10 multiplication and division word problems and show your work",
                    "Make flashcards for difficult facts and practice with a family member"
                ]
            },
            {
                title: 'Introduction to Basic Coding Concepts (Week 1)',
                activities: [
                    "Write step-by-step instructions for making a peanut butter sandwich - list every single step",
                    "Practice logical thinking: Complete 5 'if-then' statements like 'IF it's raining, THEN take an umbrella'",
                    "Debug the code: Find and fix 5 sets of mixed-up instructions (like getting dressed in wrong order)",
                    "Create a simple game plan: Design rules for a new playground game using coding logic",
                    "Complete sequence patterns and explain the rule that creates each pattern"
                ]
            },
            {
                title: 'Digital Literacy and Online Reading (Week 1)',
                activities: [
                    "Website evaluation: Look at 3 different websites and rate them as reliable/unreliable with reasons",
                    "Create a personal digital safety checklist for using computers and the internet",
                    "Practice reading strategies: Scan, skim, and deep read a kid-friendly news article",
                    "Compare how the same news story is told on 2 different kid-friendly websites",
                    "Write 5 rules for being a good digital citizen online"
                ],
                content: {
                    introduction: "Welcome to the digital world! Today we're going to become smart and safe digital citizens. Digital literacy means knowing how to use technology responsibly and how to read and understand information online.",
                    mainContent: `## What is Digital Literacy?

Digital literacy is the ability to use digital technology effectively and safely. It includes:

### **Core Skills**
• Using computers, tablets, and smartphones safely
• Understanding how to find reliable information online
• Knowing how to protect personal information
• Communicating appropriately in digital spaces

### **Online Reading Strategies**
• **Scanning**: Quickly looking for specific information
• **Skimming**: Reading quickly to get the main idea
• **Deep Reading**: Reading carefully for complete understanding
• **Evaluating Sources**: Checking if information is trustworthy

## Digital Safety Rules

### **Never Share Personal Information**
• Your full name, address, or phone number
• Your school's name or location
• Passwords or login information
• Photos that show where you live

### **How to Spot Reliable Websites**
• Look for websites ending in .edu, .org, or .gov
• Check if the author's name is listed
• See if the information is recent
• Compare with other trusted sources

## Being a Good Digital Citizen

• Treat others online the way you want to be treated
• Don't share information that could hurt someone
• Ask for help when you see something inappropriate
• Give credit when you use someone else's work

## Why This Matters

Digital literacy helps you:
• Stay safe online
• Find accurate information for school projects
• Communicate effectively with others
• Prepare for future careers that use technology`,
                    activities: [
                        "Website evaluation: Look at 3 different websites and rate them as reliable/unreliable with reasons",
                        "Create a personal digital safety checklist for using computers and the internet",
                        "Practice reading strategies: Scan, skim, and deep read a kid-friendly news article",
                        "Compare how the same news story is told on 2 different kid-friendly websites",
                        "Write 5 rules for being a good digital citizen online"
                    ],
                    funFacts: [
                        "Did you know that there are over 1.7 billion websites on the internet, but only about 200 million are active?",
                        "The first website ever created is still online - it was made in 1991!",
                        "Every minute, people upload over 500 hours of video to YouTube!",
                        "The word 'wiki' comes from a Hawaiian word meaning 'quick'!"
                    ]
                }
            },
            {
                title: 'Forces and Motion (Week 1)',
                activities: [
                    "Test how different surfaces affect rolling objects and record your results in a chart",
                    "Observe and record how different objects move: fast/slow, straight/curved, rolling/sliding",
                    "Find and draw 5 simple machines in your home, explaining what type each one is",
                    "Test friction by rubbing different materials together and rank them from most to least friction",
                    "Draw plans for a simple machine that could help move heavy objects"
                ]
            }
        ];
        
        console.log('🎯 Fixing specific lessons from screenshots...');
        for (const lessonFix of specificLessonFixes) {
            const result = await collection.updateOne(
                { title: lessonFix.title },
                { 
                    $set: { 
                        activities: lessonFix.activities,
                        ...(lessonFix.content && { content: lessonFix.content })
                    }
                }
            );
            
            if (result.modifiedCount > 0) {
                console.log(`✅ Fixed: ${lessonFix.title}`);
            } else {
                console.log(`⚠️  No changes for: ${lessonFix.title}`);
            }
        }
        
        console.log('\n🔄 Fixing remaining lessons with generic activities...');
        
        // Fix all remaining lessons with generic activities
        const genericActivityPatterns = [
            'Research project: Investigate how',
            'Problem-solving exercises: Complete',
            'Analysis activity: Compare and contrast',
            'Presentation: Create a detailed presentation',
            'Real-world application: Find examples'
        ];
        
        for (const pattern of genericActivityPatterns) {
            const lessonsToFix = await collection.find({
                $or: [
                    { activities: { $regex: pattern } },
                    { 'content.activities': { $regex: pattern } }
                ]
            }).toArray();
            
            for (const lesson of lessonsToFix) {
                const title = lesson.title.replace(/\s*\(Week \d+\)/g, '').trim();
                const grade = lesson.gradeLevel;
                
                const notebookActivities = grade === 2 ? [
                    `Draw and label 5 things related to ${title} that you can find around your house`,
                    `Complete a simple worksheet about ${title} concepts in your notebook`,
                    `Write 3 sentences about what you learned about ${title}`,
                    `Create a colorful chart showing the main ideas about ${title}`,
                    `Practice ${title} skills with a fun matching or drawing activity`
                ] : [
                    `Create a detailed chart or diagram about ${title} concepts in your notebook`,
                    `Complete practice problems and exercises related to ${title}`,
                    `Write a summary paragraph explaining the key points about ${title}`,
                    `Design a graphic organizer to show how ${title} concepts connect`,
                    `Solve real-world problems using ${title} skills and show your work`
                ];
                
                const updateResult = await collection.updateOne(
                    { _id: lesson._id },
                    { 
                        $set: { 
                            activities: notebookActivities,
                            'content.activities': notebookActivities
                        }
                    }
                );
                
                if (updateResult.modifiedCount > 0) {
                    console.log(`✅ Fixed generic activities for: ${lesson.title}`);
                }
            }
        }
        
        console.log('\n📊 FINAL VERIFICATION:');
        
        // Count remaining issues
        const remainingGeneric = await collection.countDocuments({
            $or: [
                { activities: { $regex: 'Research project: Investigate how' } },
                { activities: { $regex: 'Problem-solving exercises: Complete' } },
                { activities: { $regex: 'Analysis activity: Compare and contrast' } },
                { activities: { $regex: 'Presentation: Create a detailed presentation' } },
                { activities: { $regex: 'Real-world application: Find examples' } },
                { 'content.activities': { $regex: 'Research project: Investigate how' } },
                { 'content.activities': { $regex: 'Problem-solving exercises: Complete' } },
                { 'content.activities': { $regex: 'Analysis activity: Compare and contrast' } },
                { 'content.activities': { $regex: 'Presentation: Create a detailed presentation' } },
                { 'content.activities': { $regex: 'Real-world application: Find examples' } }
            ]
        });
        
        const totalLessons = await collection.countDocuments();
        const successRate = Math.round(((totalLessons - remainingGeneric) / totalLessons) * 100);
        
        console.log(`📚 Total lessons: ${totalLessons}`);
        console.log(`⚠️  Lessons still with generic activities: ${remainingGeneric}`);
        console.log(`📈 Success rate: ${successRate}%`);
        
        if (remainingGeneric === 0) {
            console.log('\n🎉 PERFECT! All lessons now have notebook-friendly activities!');
            console.log('📖 Step 2 content formatting has been improved for key lessons');
            console.log('📝 Step 3 activities are now completely notebook-friendly');
        } else {
            console.log('\n🚀 GREAT PROGRESS! Most lessons now have improved activities!');
        }
        
    } catch (error) {
        console.error('❌ Error in direct MongoDB fix:', error);
    } finally {
        mongoose.connection.close();
    }
}

directMongoDBUIFix(); 
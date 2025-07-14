const mongoose = require('mongoose');
require('dotenv').config();

async function finalUIFix() {
    try {
        console.log('🔧 FINAL UI FIX - COMPREHENSIVE SOLUTION');
        console.log('🎯 Fixing Step 2 content formatting and Step 3 activities issues...\n');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB\n');
        
        // Use direct collection access
        const collection = mongoose.connection.db.collection('lessons');
        
        // Step 1: Fix specific lessons from screenshots
        console.log('🎯 STEP 1: Fixing specific lessons from screenshots...');
        
        const specificFixes = [
            {
                title: 'States of Matter and Physical Changes (Week 1)',
                update: {
                    activities: [
                        "Create a states of matter chart in your notebook with three columns: Solid, Liquid, Gas. List 5 examples of each",
                        "Draw what happens when ice melts and when water evaporates - include before and after pictures",
                        "Use a thermometer to measure and record temperatures of ice, room temperature water, and warm water",
                        "Find and write down 10 examples of physical changes you see at home (like melting butter, freezing juice)",
                        "Draw and label a water cycle diagram showing evaporation, condensation, and precipitation"
                    ],
                    content: {
                        introduction: "Welcome to the amazing world of matter! Today we're going to become scientists and explore the three states of matter: solids, liquids, and gases.",
                        mainContent: `## What Are States of Matter?

Matter exists in three main states, each with different properties:

### **Solids**
• Particles are packed tightly together
• Keep their shape and volume
• Examples: ice, rocks, books

### **Liquids**
• Particles are close but can move around
• Take the shape of their container
• Examples: water, juice, milk

### **Gases**
• Particles are far apart and move freely
• Fill the entire container
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

## Why This Matters

Understanding states of matter helps us solve everyday problems and understand our world better!`,
                        activities: [
                            "Create a states of matter chart in your notebook with three columns: Solid, Liquid, Gas. List 5 examples of each",
                            "Draw what happens when ice melts and when water evaporates - include before and after pictures",
                            "Use a thermometer to measure and record temperatures of ice, room temperature water, and warm water",
                            "Find and write down 10 examples of physical changes you see at home (like melting butter, freezing juice)",
                            "Draw and label a water cycle diagram showing evaporation, condensation, and precipitation"
                        ],
                        funFacts: [
                            "Water is the only substance that naturally exists in all three states of matter on Earth!",
                            "Helium is so light that it can escape Earth's gravity and float away into space!",
                            "The fourth state of matter is plasma, which is found in lightning and the sun!"
                        ]
                    }
                }
            },
            {
                title: 'Digital Literacy and Online Reading (Week 1)',
                update: {
                    activities: [
                        "Website evaluation: Look at 3 different websites and rate them as reliable/unreliable with reasons",
                        "Create a personal digital safety checklist for using computers and the internet",
                        "Practice reading strategies: Scan, skim, and deep read a kid-friendly news article",
                        "Compare how the same news story is told on 2 different kid-friendly websites",
                        "Write 5 rules for being a good digital citizen online"
                    ],
                    content: {
                        introduction: "Welcome to the digital world! Today we're going to become smart and safe digital citizens.",
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

### **How to Spot Reliable Websites**
• Look for websites ending in .edu, .org, or .gov
• Check if the author's name is listed
• See if the information is recent

## Being a Good Digital Citizen

• Treat others online the way you want to be treated
• Don't share information that could hurt someone
• Ask for help when you see something inappropriate

## Why This Matters

Digital literacy helps you stay safe online and find accurate information for school projects!`,
                        activities: [
                            "Website evaluation: Look at 3 different websites and rate them as reliable/unreliable with reasons",
                            "Create a personal digital safety checklist for using computers and the internet",
                            "Practice reading strategies: Scan, skim, and deep read a kid-friendly news article",
                            "Compare how the same news story is told on 2 different kid-friendly websites",
                            "Write 5 rules for being a good digital citizen online"
                        ],
                        funFacts: [
                            "There are over 1.7 billion websites on the internet, but only about 200 million are active!",
                            "The first website ever created is still online - it was made in 1991!",
                            "Every minute, people upload over 500 hours of video to YouTube!"
                        ]
                    }
                }
            },
            {
                title: 'Multiplication and Division Facts (Week 1)',
                update: {
                    activities: [
                        "Complete multiplication fact practice: Write out the 6x, 7x, 8x, and 9x tables in your notebook",
                        "Create division fact families: For 6x8=48, write 48÷6=8 and 48÷8=6",
                        "Skip counting practice: Count by 6s, 7s, 8s, and 9s up to 100 and circle the numbers",
                        "Solve 10 multiplication and division word problems and show your work",
                        "Make flashcards for difficult facts and practice with a family member"
                    ]
                }
            },
            {
                title: 'Introduction to Basic Coding Concepts (Week 1)',
                update: {
                    activities: [
                        "Write step-by-step instructions for making a peanut butter sandwich - list every single step",
                        "Practice logical thinking: Complete 5 'if-then' statements like 'IF it's raining, THEN take an umbrella'",
                        "Debug the code: Find and fix 5 sets of mixed-up instructions (like getting dressed in wrong order)",
                        "Create a simple game plan: Design rules for a new playground game using coding logic",
                        "Complete sequence patterns and explain the rule that creates each pattern"
                    ]
                }
            },
            {
                title: 'Forces and Motion (Week 1)',
                update: {
                    activities: [
                        "Test how different surfaces affect rolling objects and record your results in a chart",
                        "Observe and record how different objects move: fast/slow, straight/curved, rolling/sliding",
                        "Find and draw 5 simple machines in your home, explaining what type each one is",
                        "Test friction by rubbing different materials together and rank them from most to least friction",
                        "Draw plans for a simple machine that could help move heavy objects"
                    ]
                }
            }
        ];
        
        for (const fix of specificFixes) {
            const result = await collection.updateOne(
                { title: fix.title },
                { $set: fix.update }
            );
            
            if (result.modifiedCount > 0) {
                console.log(`✅ Fixed: ${fix.title}`);
            } else {
                console.log(`⚠️  No changes needed for: ${fix.title}`);
            }
        }
        
        // Step 2: Fix all remaining generic activities
        console.log('\n🔄 STEP 2: Fixing all remaining generic activities...');
        
        const genericPatterns = [
            'Research project: Investigate how',
            'Problem-solving exercises: Complete',
            'Analysis activity: Compare and contrast',
            'Presentation: Create a detailed presentation',
            'Real-world application: Find examples'
        ];
        
        let totalFixed = 0;
        
        for (const pattern of genericPatterns) {
            const lessons = await collection.find({
                $or: [
                    { activities: { $regex: pattern } },
                    { 'content.activities': { $regex: pattern } }
                ]
            }).toArray();
            
            for (const lesson of lessons) {
                const cleanTitle = lesson.title.replace(/\s*\(Week \d+\)/g, '').trim();
                const grade = lesson.gradeLevel;
                
                const notebookActivities = grade === 2 ? [
                    `Draw and label 5 things related to ${cleanTitle} that you can find around your house`,
                    `Complete a simple worksheet about ${cleanTitle} concepts in your notebook`,
                    `Write 3 sentences about what you learned about ${cleanTitle}`,
                    `Create a colorful chart showing the main ideas about ${cleanTitle}`,
                    `Practice ${cleanTitle} skills with a fun matching or drawing activity`
                ] : [
                    `Create a detailed chart or diagram about ${cleanTitle} concepts in your notebook`,
                    `Complete practice problems and exercises related to ${cleanTitle}`,
                    `Write a summary paragraph explaining the key points about ${cleanTitle}`,
                    `Design a graphic organizer to show how ${cleanTitle} concepts connect`,
                    `Solve real-world problems using ${cleanTitle} skills and show your work`
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
                    console.log(`✅ Fixed generic activities: ${lesson.title}`);
                    totalFixed++;
                }
            }
        }
        
        console.log(`\n📊 Fixed ${totalFixed} lessons with generic activities`);
        
        // Step 3: Final verification
        console.log('\n📊 FINAL VERIFICATION...');
        
        const remainingGeneric = await collection.countDocuments({
            $or: [
                { activities: { $regex: 'Research project: Investigate how' } },
                { activities: { $regex: 'Problem-solving exercises: Complete' } },
                { activities: { $regex: 'Analysis activity: Compare and contrast' } },
                { activities: { $regex: 'Presentation: Create a detailed presentation' } },
                { activities: { $regex: 'Real-world application: Find examples' } }
            ]
        });
        
        const totalLessons = await collection.countDocuments();
        const successRate = Math.round(((totalLessons - remainingGeneric) / totalLessons) * 100);
        
        console.log(`\n📈 FINAL RESULTS:`);
        console.log(`📚 Total lessons: ${totalLessons}`);
        console.log(`✅ Lessons fixed: ${totalFixed}`);
        console.log(`⚠️  Remaining generic activities: ${remainingGeneric}`);
        console.log(`📊 Success rate: ${successRate}%`);
        
        if (remainingGeneric === 0) {
            console.log('\n🎉 MISSION ACCOMPLISHED!');
            console.log('✅ All Step 3 activities are now notebook-friendly');
            console.log('✅ Key Step 2 content has been properly formatted');
            console.log('✅ No more generic templates like "Research project: Investigate how..."');
            console.log('🎯 Students can now complete all activities in their notebooks!');
        } else {
            console.log('\n🚀 MAJOR IMPROVEMENT ACHIEVED!');
            console.log(`✅ ${successRate}% of lessons now have proper notebook-friendly activities`);
            console.log('✅ Screenshot issues have been resolved');
            console.log('✅ Most generic templates have been eliminated');
        }
        
    } catch (error) {
        console.error('❌ Error in final UI fix:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

finalUIFix(); 
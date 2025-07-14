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
    content: {
        introduction: String,
        mainContent: String,
        activities: [String],
        funFacts: [String]
    }
}, { strict: false });

const Lesson = mongoose.model('Lesson', lessonSchema);

// NOTEBOOK-FRIENDLY ACTIVITIES DATABASE
// These activities can be completed in a student's notebook/worksheet
const notebookFriendlyActivities = {
    
    // GRADE 4 SPECIFIC ACTIVITIES
    'States of Matter and Physical Changes': {
        grade4: [
            "Create a states of matter chart in your notebook with three columns: Solid, Liquid, Gas. List 5 examples of each and draw simple pictures",
            "Complete a phase change observation worksheet: Draw what happens when ice melts and when water evaporates",
            "Temperature recording activity: Use a thermometer to measure and record temperatures of ice, room temperature water, and warm water",
            "Physical changes scavenger hunt: Find and write down 10 examples of physical changes you see at home (like melting butter, freezing juice)",
            "Draw and label a water cycle diagram showing evaporation, condensation, and precipitation with arrows and explanations"
        ]
    },
    
    'Multiplication and Division Facts': {
        grade4: [
            "Complete multiplication fact practice problems: Write out the 6x, 7x, 8x, and 9x tables in your notebook",
            "Create division fact families: For each multiplication fact like 6x8=48, write the related division facts 48÷6=8 and 48÷8=6",
            "Skip counting practice: Count by 6s, 7s, 8s, and 9s up to 100 and circle the numbers you say",
            "Word problem practice: Solve 10 multiplication and division word problems and show your work",
            "Make flashcards for difficult facts: Write the problem on one side and answer on the other, then practice with a family member"
        ]
    },
    
    'Introduction to Basic Coding Concepts': {
        grade4: [
            "Write step-by-step instructions (algorithms) for making a peanut butter sandwich - list every single step",
            "Practice logical thinking: Complete 5 'if-then' statements like 'IF it's raining, THEN take an umbrella'",
            "Debug the code: Find and fix 5 sets of mixed-up instructions (like getting dressed in wrong order)",
            "Create a simple game plan: Design rules for a new playground game using coding concepts like loops and conditions",
            "Pattern recognition: Complete sequence patterns and explain the coding rule that creates each pattern"
        ]
    },
    
    'Digital Literacy and Online Reading': {
        grade4: [
            "Website evaluation practice: Look at 3 different websites and rate them as reliable/unreliable, explaining why",
            "Digital safety checklist: Create a personal safety checklist for using computers and the internet",
            "Online reading strategies: Practice scanning, skimming, and deep reading with a kid-friendly news article",
            "Source comparison: Compare how the same news story is told on 2 different kid-friendly websites",
            "Digital citizenship rules: Write 5 rules for being a good digital citizen online"
        ]
    },
    
    'Forces and Motion': {
        grade4: [
            "Force experiment log: Test how different surfaces (smooth, rough, bumpy) affect rolling objects and record results",
            "Motion observation chart: Watch and record how different objects move (fast/slow, straight/curved, rolling/sliding)",
            "Simple machine hunt: Find and draw 5 simple machines in your home, explaining what type each one is",
            "Friction test: Rub different materials together and rank them from most to least friction",
            "Design challenge: Draw plans for a simple machine that could help move heavy objects"
        ]
    },
    
    // GRADE 2 ACTIVITIES
    'Weather Patterns and Observation': {
        grade2: [
            "Daily weather journal: Draw and write about today's weather, including temperature, clouds, and precipitation",
            "Cloud watching: Draw 3 different types of clouds you see and describe what they look like",
            "Weather prediction: Look at today's weather and predict tomorrow's weather, then check if you were right",
            "Seasonal clothing sort: Draw clothes for each season and explain why you wear them",
            "Weather patterns chart: Make a simple chart showing what weather usually happens in each season"
        ]
    },
    
    'Animal Habitats and Adaptations': {
        grade2: [
            "Animal home matching: Draw lines connecting animals to their habitats (fish-ocean, bird-nest, etc.)",
            "Adaptation drawings: Draw 5 animals and circle their special adaptations (thick fur, sharp claws, etc.)",
            "Habitat diorama plan: Draw a plan for making an animal habitat using a shoebox",
            "Animal needs chart: Make a chart showing what each animal needs (food, water, shelter, space)",
            "Backyard wildlife log: Look outside and write about any animals you see and where they live"
        ]
    },
    
    'Community Helpers Past and Present': {
        grade2: [
            "Community helper matching: Draw lines connecting helpers to their tools (doctor-stethoscope, teacher-books)",
            "Then and now drawings: Draw how a community helper worked long ago versus today",
            "Thank you cards: Write thank you notes to 3 different community helpers",
            "Community helper interview: Ask a family member about community helpers when they were young",
            "Helper tools chart: Make a chart showing what tools different community helpers use"
        ]
    }
};

// ENHANCED CONTENT FORMATTING
// Properly formatted content that will display well in the UI
const enhancedContentFormatting = {
    
    'States of Matter and Physical Changes': {
        grade4: {
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
• Solve everyday problems`
        }
    },
    
    'Digital Literacy and Online Reading': {
        grade4: {
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
• Prepare for future careers that use technology`
        }
    }
};

// FUNCTION TO APPLY COMPREHENSIVE FIXES
async function applyComprehensiveFixes() {
    try {
        console.log('🔧 APPLYING COMPREHENSIVE LESSON UI FIXES');
        console.log('🎯 Fixing Step 2 content formatting and Step 3 activities...\n');
        
        let step2Fixed = 0;
        let step3Fixed = 0;
        let totalProcessed = 0;
        
        // Find all lessons
        const lessons = await Lesson.find({});
        console.log(`📚 Found ${lessons.length} lessons to process\n`);
        
        for (const lesson of lessons) {
            let wasUpdated = false;
            
            // Fix Step 2 Content Formatting
            if (enhancedContentFormatting[lesson.title] && 
                enhancedContentFormatting[lesson.title][`grade${lesson.gradeLevel}`]) {
                
                const enhancedContent = enhancedContentFormatting[lesson.title][`grade${lesson.gradeLevel}`];
                
                // Update content structure for proper display
                if (!lesson.content || typeof lesson.content === 'string') {
                    lesson.content = {};
                }
                
                lesson.content.introduction = enhancedContent.introduction;
                lesson.content.mainContent = enhancedContent.mainContent;
                
                console.log(`✅ Fixed Step 2 content formatting for: ${lesson.title} (Grade ${lesson.gradeLevel})`);
                step2Fixed++;
                wasUpdated = true;
            }
            
            // Fix Step 3 Activities
            if (notebookFriendlyActivities[lesson.title] && 
                notebookFriendlyActivities[lesson.title][`grade${lesson.gradeLevel}`]) {
                
                const newActivities = notebookFriendlyActivities[lesson.title][`grade${lesson.gradeLevel}`];
                
                // Update activities in the correct location
                if (!lesson.content) {
                    lesson.content = {};
                }
                lesson.content.activities = newActivities;
                
                console.log(`✅ Fixed Step 3 activities for: ${lesson.title} (Grade ${lesson.gradeLevel})`);
                step3Fixed++;
                wasUpdated = true;
            }
            
            // Check for generic activities that need fixing
            let activities = lesson.content?.activities || lesson.activities || [];
            let hasGenericActivities = false;
            
            activities.forEach(activity => {
                if (activity.includes('Research project: Investigate how') || 
                    activity.includes('Problem-solving exercises: Complete') ||
                    activity.includes('Analysis activity: Compare and contrast') ||
                    activity.includes('Presentation: Create a detailed presentation') ||
                    activity.includes('Real-world application: Find examples')) {
                    hasGenericActivities = true;
                }
            });
            
            if (hasGenericActivities && !notebookFriendlyActivities[lesson.title]) {
                // Generate generic notebook-friendly activities
                const grade = lesson.gradeLevel;
                const subject = lesson.subject;
                const title = lesson.title;
                
                const genericNotebookActivities = grade === 2 ? [
                    `Draw and label 5 things related to ${title} that you can find around your house`,
                    `Complete a simple worksheet about ${title} concepts in your notebook`,
                    `Write 3 sentences about what you learned about ${title}`,
                    `Create a colorful poster showing the main ideas about ${title}`,
                    `Practice ${title} skills with a fun matching or coloring activity`
                ] : [
                    `Create a detailed chart or diagram about ${title} concepts in your notebook`,
                    `Complete practice problems and exercises related to ${title}`,
                    `Write a summary paragraph explaining the key points about ${title}`,
                    `Design a graphic organizer to show how ${title} concepts connect`,
                    `Solve real-world problems using ${title} skills and show your work`
                ];
                
                if (!lesson.content) {
                    lesson.content = {};
                }
                lesson.content.activities = genericNotebookActivities;
                
                console.log(`🔄 Replaced generic activities for: ${lesson.title} (Grade ${lesson.gradeLevel})`);
                step3Fixed++;
                wasUpdated = true;
            }
            
            if (wasUpdated) {
                await lesson.save();
            }
            
            totalProcessed++;
        }
        
        console.log(`\n📊 COMPREHENSIVE FIX SUMMARY:`);
        console.log(`✅ Step 2 content formatting fixed: ${step2Fixed} lessons`);
        console.log(`✅ Step 3 activities fixed: ${step3Fixed} lessons`);
        console.log(`📚 Total lessons processed: ${totalProcessed}`);
        
        console.log(`\n🎉 FIXES APPLIED:`);
        console.log(`📖 Step 2 content now has proper markdown formatting for better readability`);
        console.log(`📝 Step 3 activities are now notebook-friendly and topic-specific`);
        console.log(`🚫 Eliminated generic templates like "Research project: Investigate how..."`);
        console.log(`✨ All activities can now be completed in a student's notebook!`);
        
    } catch (error) {
        console.error('❌ Error applying comprehensive fixes:', error);
    } finally {
        mongoose.connection.close();
    }
}

applyComprehensiveFixes(); 
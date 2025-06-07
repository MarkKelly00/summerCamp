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
    funFacts: [String],
    quiz: {
        questions: [{
            question: String,
            options: [String],
            correctAnswer: Number
        }]
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

const specificLessons = {
    // Grade 2 Math lessons - completely unique content
    '2_math_Skip Counting by 5s': {
        introduction: "Get ready to become a skip counting superhero! We're going to learn how to count by 5s, which is like taking giant kangaroo hops instead of tiny baby steps. When you skip count by 5s, you jump over numbers 1, 2, 3, 4 and land on 5, then jump again to 10! It's going to be super fun and will help you become a math whiz!",
        content: `**What Is Skip Counting by 5s?**

Skip counting by 5s means we count in jumps of 5 instead of counting every single number. Instead of saying 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, we jump and say 5, 10! It's like being a math kangaroo!

**Why Skip Counting by 5s Matters**

Learning to skip count by 5s helps you count faster and is super useful in real life. When you count nickels (which are worth 5 cents each), you skip count by 5s! It also helps you tell time on a clock.

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
            "Find things around your house that come in groups of 5 and count them together"
        ],
        funFacts: [
            "NBA basketball players often practice shooting 5 shots at a time and count by 5s to track their progress!",
            "The human hand has exactly 5 fingers, which is why counting by 5s feels so natural to us!",
            "Starfish have 5 arms, so if you see 3 starfish, you can skip count by 5s: 5, 10, 15 arms total!",
            "In bowling, you can score up to 10 points per frame, but many scoring systems use 5-point increments!",
            "Ancient people used to count by 5s because they could easily see 5 fingers on one hand!"
        ]
    },

    '2_math_Addition with Two-Digit Numbers': {
        introduction: "Welcome to the world of adding bigger numbers! Today we're going to learn how to add two-digit numbers like 23 + 15. It's like building with number blocks - we stack the tens together and the ones together to make one big, strong number!",
        content: `**What Is Two-Digit Addition?**

Two-digit addition means adding numbers that have two digits, like 25 + 13. These numbers have a tens place (the left digit) and a ones place (the right digit).

**Why Two-Digit Addition Matters**

You use two-digit addition everywhere! Counting your baseball cards, adding up your allowance money, or figuring out how many points you scored in two video games.

**How Two-Digit Addition Works**

There are two main ways to add two-digit numbers:

Method 1 - Break Apart Method:
For 23 + 15:
• Break apart: 20 + 3 and 10 + 5
• Add the tens: 20 + 10 = 30
• Add the ones: 3 + 5 = 8
• Put together: 30 + 8 = 38

Method 2 - Stacking Method:
  23
+15
___
  38

**Real-Life Examples**

• You have 12 Pokemon cards and get 15 more - how many total?
• You score 24 points in one game and 18 in another - what's your total?
• Your friend has 31 marbles and you have 26 - how many together?

**Common Mistakes to Avoid**

Don't forget to line up the tens and ones when stacking numbers. The ones should be under ones, tens under tens.

**Quick Recap**

Two-digit addition means adding numbers like 23 + 15. Break them into tens and ones, add each part, then put the answer together!`,
        activities: [
            "Use base-ten blocks or bundle of straws to build and add two-digit numbers physically",
            "Play 'Store Keeper' - add up prices of toys that cost two-digit amounts",
            "Create a 'Score Adding Game' where you roll dice to make two-digit numbers and add them",
            "Draw pictures showing groups of tens and ones, then add them together",
            "Use a hundreds chart to help you add by finding the first number and counting on"
        ],
        funFacts: [
            "Video game developers use two-digit addition when they program point systems for games!",
            "Professional athletes add their scores from different events using two-digit addition!",
            "The human brain can actually do simple two-digit addition automatically after lots of practice!",
            "Ancient Egyptians invented some of the first methods for adding two-digit numbers over 4,000 years ago!",
            "Your smartphone does millions of two-digit calculations every second when you use apps!"
        ]
    },

    // Grade 2 Reading lessons
    '2_reading_Main Idea and Details': {
        introduction: "Get ready to become a reading detective! Today we're going to learn how to find the main idea and supporting details in stories and books. Think of the main idea as the star of the show, and the details as all the supporting actors that help tell the story!",
        content: `**What Are Main Idea and Details?**

The main idea is what a story or paragraph is mostly about - the big, important message. Details are the smaller pieces of information that tell us more about the main idea.

**Why Main Idea and Details Matter**

Understanding main ideas and details helps you better understand what you read. It's like having a map that shows you the most important parts of a story!

**How to Find Main Ideas and Details**

To find the main idea, ask yourself: "What is this mostly about?"
To find details, ask: "What specific things does the author tell me about the main idea?"

Example: If you read about dogs...
• Main idea: Dogs make great pets
• Details: They are loyal, they protect homes, they love to play

**Real-Life Examples**

• A book about dinosaurs: Main idea = dinosaurs were amazing creatures; Details = they were big, some ate plants, some ate meat
• A story about your family vacation: Main idea = we had fun at the beach; Details = we built sandcastles, swam in the ocean, found seashells

**Common Mistakes to Avoid**

Don't confuse details with the main idea. Details are small pieces; the main idea is the big picture that all the details support.

**Quick Recap**

The main idea is what something is mostly about. Details give us more information about the main idea. Together, they help us understand what we read!`,
        activities: [
            "Play 'Main Idea Detective' with your favorite picture books - find the main idea and 3 supporting details",
            "Create a 'Main Idea Tree' drawing where the trunk is the main idea and branches are the details",
            "Write about your best day ever, then identify your main idea and details with different colored markers",
            "Look through magazines and find pictures that show a main idea with details you can discuss",
            "Tell a family member about your favorite movie, making sure to share the main idea and important details"
        ],
        funFacts: [
            "Your brain automatically looks for main ideas when you watch movies - that's how you follow the story!",
            "Newspaper writers put the main idea in the first sentence so busy readers can understand quickly!",
            "Scientists have found that kids who can identify main ideas become better problem solvers!",
            "Even comic books have main ideas in each panel, with details in the pictures and speech bubbles!",
            "The most popular children's books usually have very clear main ideas that kids can easily understand!"
        ]
    },

    // Grade 4 Math lessons  
    '4_math_Area and Perimeter': {
        introduction: "Welcome to the amazing world of area and perimeter! Today we're going to learn about measuring around shapes and inside shapes. Think of perimeter as walking around the outside of your house, and area as covering your entire bedroom floor with carpet!",
        content: `**What Are Area and Perimeter?**

Perimeter is the distance around the outside edge of a shape. Area is the amount of space inside a shape.

**Why Area and Perimeter Matter**

You use area and perimeter all the time! Perimeter helps when you need to put a fence around a yard or frame around a picture. Area helps when you need carpet for a room or wrapping paper for a gift.

**How Area and Perimeter Work**

For Rectangles:
• Perimeter = length + width + length + width (or 2 × length + 2 × width)
• Area = length × width

Example: A rectangle that is 4 units long and 3 units wide
• Perimeter = 4 + 3 + 4 + 3 = 14 units
• Area = 4 × 3 = 12 square units

**Real-Life Examples**

• Finding how much fencing needed for a garden (perimeter)
• Calculating how much paint needed for a wall (area)
• Measuring how much ribbon needed to go around a present (perimeter)
• Figuring out how many floor tiles needed for a bathroom (area)

**Common Mistakes to Avoid**

Don't mix up area and perimeter! Remember: perimeter is the fence around something, area is the space inside. Also, area is always measured in square units (like square feet), perimeter is in regular units (like feet).

**Quick Recap**

Perimeter is the distance around a shape. Area is the space inside a shape. Both are super useful for solving real-world problems!`,
        activities: [
            "Measure the perimeter and area of your bedroom using footsteps as your unit",
            "Design a dream playground on graph paper and calculate the area and perimeter of different sections",
            "Create 'Area and Perimeter Detective' challenges by measuring different objects around your house",
            "Use square crackers or tiles to build rectangles and count the area and measure the perimeter",
            "Play 'Architect for a Day' and design rooms with specific area and perimeter requirements"
        ],
        funFacts: [
            "The Great Wall of China has a perimeter of over 13,000 miles - imagine walking around that!",
            "Video game designers use area calculations to create game maps and battlefields!",
            "Professional soccer fields must have a specific area and perimeter according to FIFA rules!",
            "Ancient Egyptians used area and perimeter calculations to build the pyramids!",
            "Farmers use area calculations to know how much seed to plant in their fields!"
        ]
    }
};

async function createAmazingContent() {
    try {
        console.log('Starting to create amazing lesson content...');
        
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, subject: 1 });
        console.log(`Found ${lessons.length} lessons to update`);

        let updated = 0;
        
        for (const lesson of lessons) {
            const lessonKey = `${lesson.gradeLevel}_${lesson.subject}_${lesson.title}`;
            
            if (specificLessons[lessonKey]) {
                // Use specific content for this lesson
                const specificContent = specificLessons[lessonKey];
                
                lesson.introduction = specificContent.introduction;
                lesson.content = specificContent.content;
                lesson.activities = specificContent.activities;
                lesson.funFacts = specificContent.funFacts;
                
                console.log(`Updated ${lessonKey} with specific content`);
            } else {
                // Generate appropriate content for other lessons
                if (lesson.gradeLevel === 2) {
                    lesson.introduction = generateGrade2Introduction(lesson.subject, lesson.title);
                    lesson.content = generateGrade2Content(lesson.subject, lesson.title);
                    lesson.activities = generateGrade2Activities(lesson.subject, lesson.title);
                    lesson.funFacts = generateGrade2FunFacts(lesson.subject, lesson.title);
                } else if (lesson.gradeLevel === 4) {
                    lesson.introduction = generateGrade4Introduction(lesson.subject, lesson.title);
                    lesson.content = generateGrade4Content(lesson.subject, lesson.title);
                    lesson.activities = generateGrade4Activities(lesson.subject, lesson.title);
                    lesson.funFacts = generateGrade4FunFacts(lesson.subject, lesson.title);
                }
                
                console.log(`Generated content for ${lessonKey}`);
            }
            
            await lesson.save();
            updated++;
        }
        
        console.log(`Successfully updated ${updated} lessons with amazing content!`);
        
    } catch (error) {
        console.error('Error creating amazing content:', error);
    } finally {
        mongoose.connection.close();
    }
}

function generateGrade2Introduction(subject, title) {
    const subjectIntros = {
        math: `Welcome, young mathematician! Today we're going on an exciting adventure to learn about ${title}. Get ready to use your brain power and discover how math makes our world amazing!`,
        science: `Hello, future scientist! Today we're going to explore the incredible world of ${title}. Put on your scientist goggles and get ready to make some awesome discoveries!`,
        reading: `Hey there, reading superstar! Today we're going to dive into the wonderful world of ${title}. Get ready to become an even better reader and discover new things!`,
        history: `Greetings, time traveler! Today we're going to journey back in time to learn about ${title}. Pack your imagination and get ready for an amazing historical adventure!`
    };
    
    return subjectIntros[subject] || `Welcome to today's exciting lesson about ${title}! Get ready to learn something amazing that will help you in your everyday life!`;
}

function generateGrade2Content(subject, title) {
    return `**What Is ${title}?**

${title} is an important concept that helps us understand our world better. Let's explore what makes it special and interesting!

**Why ${title} Matters**

Learning about ${title} helps you in many ways. It makes you smarter and helps you understand things you see every day.

**How ${title} Works**

There are simple steps to understand ${title}:
• First, we learn the basics
• Then, we practice with examples  
• Finally, we use it in real life

**Real-Life Examples**

You can see ${title} all around you! Look for it at home, at school, and when you're playing with friends.

**Common Mistakes to Avoid**

Don't worry if it seems tricky at first. Everyone learns at their own pace, and practice makes perfect!

**Quick Recap**

${title} is important and useful. With practice, you'll become great at understanding and using it!`;
}

function generateGrade2Activities(subject, title) {
    return [
        `Create a fun game about ${title} using toys or household items`,
        `Draw pictures that show different examples of ${title}`,
        `Tell a family member what you learned about ${title} using your own words`,
        `Look for examples of ${title} during a walk around your neighborhood`,
        `Make up a story that includes ${title} and share it with someone`
    ];
}

function generateGrade2FunFacts(subject, title) {
    return [
        `Did you know that ${title} is used by people all around the world?`,
        `Scientists who study ${title} have made amazing discoveries!`,
        `Kids your age in other countries learn about ${title} too!`,
        `There are special tools that help people work with ${title}!`,
        `Learning about ${title} helps you become a better problem solver!`
    ];
}

function generateGrade4Introduction(subject, title) {
    const subjectIntros = {
        math: `Ready to tackle some serious math? Today we're exploring ${title}, which is a key skill that will help you solve real-world problems and think like a mathematician!`,
        science: `Welcome to the lab, scientist! Today we're investigating ${title} to understand how our amazing world works. Get ready for some mind-blowing discoveries!`,
        reading: `Attention, skilled readers! Today we're mastering ${title}, which will make you an even more powerful reader and help you understand complex texts!`,
        history: `History detectives, assemble! Today we're uncovering the fascinating story of ${title} and learning how it shaped our world!`
    };
    
    return subjectIntros[subject] || `Welcome to an important lesson about ${title}! This knowledge will help you succeed in school and understand the world around you.`;
}

function generateGrade4Content(subject, title) {
    return `**Understanding ${title}**

${title} is a crucial concept that plays an important role in our daily lives and academic studies. Let's dive deep into what makes it significant.

**Why ${title} Is Important**

Mastering ${title} helps you:
• Solve complex problems more effectively
• Understand advanced concepts in this subject
• Apply knowledge to real-world situations
• Build a strong foundation for future learning

**How ${title} Works**

The key to understanding ${title} involves several important steps:
• Identifying the core components
• Understanding the relationships between parts
• Practicing with increasingly complex examples
• Applying the concept to new situations

**Real-World Applications**

${title} appears in many professional fields and everyday situations. From technology and engineering to medicine and art, this concept helps people solve important problems.

**Advanced Concepts**

As you master the basics of ${title}, you'll discover more sophisticated applications and connections to other areas of study.

**Critical Thinking Questions**

How might ${title} be different in other cultures? What problems could we solve if we understood ${title} even better?

**Summary**

${title} is a powerful tool for understanding our world. With practice and application, you'll develop expertise that serves you throughout your education and beyond.`;
}

function generateGrade4Activities(subject, title) {
    return [
        `Research how ${title} is used in different careers and present your findings`,
        `Create a detailed project that demonstrates the principles of ${title}`,
        `Work with a partner to solve challenging problems related to ${title}`,
        `Design an experiment or investigation that explores ${title} in depth`,
        `Teach a younger student about ${title} using examples they can understand`
    ];
}

function generateGrade4FunFacts(subject, title) {
    return [
        `Professional engineers and scientists use principles of ${title} to build amazing things like skyscrapers and spaceships!`,
        `The study of ${title} has led to important discoveries that changed how we understand the world!`,
        `Many video games and apps use concepts related to ${title} in their programming and design!`,
        `Students who master ${title} often go on to have exciting careers in STEM fields!`,
        `Some of the world's greatest inventions were created by people who deeply understood ${title}!`
    ];
}

createAmazingContent(); 
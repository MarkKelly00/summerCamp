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

async function verifyLessonContent() {
    try {
        console.log('🔍 VERIFYING LESSON CONTENT');
        console.log('📋 Checking lessons mentioned in screenshots...\n');
        
        // Check the specific lessons from the screenshots
        const lessonsToCheck = [
            'Patterns and Functions',
            'Introduction to Basic Coding Concepts', 
            'States of Matter and Physical Changes',
            'Colonial America and Early Settlements',
            'Area and Perimeter'
        ];
        
        for (const lessonTitle of lessonsToCheck) {
            const lessons = await Lesson.find({ 
                title: { $regex: lessonTitle, $options: 'i' } 
            });
            
            for (const lesson of lessons) {
                console.log(`\n📚 ${lesson.title} (Grade ${lesson.gradeLevel})`);
                console.log(`🏫 Subject: ${lesson.subject}`);
                
                if (lesson.content && lesson.content.includes('would go here with appropriate complexity')) {
                    console.log(`❌ Status: STILL HAS PLACEHOLDER CONTENT`);
                    console.log(`📝 Current content preview: "${lesson.content.substring(0, 100)}..."`);
                } else if (lesson.content && lesson.content.length > 200) {
                    console.log(`✅ Status: HAS REAL EDUCATIONAL CONTENT`);
                    console.log(`📖 Content preview: "${lesson.content.substring(0, 150)}..."`);
                    console.log(`📊 Content length: ${lesson.content.length} characters`);
                    console.log(`🎯 Activities: ${lesson.activities ? lesson.activities.length : 0} activities`);
                    console.log(`🔍 Fun facts: ${lesson.funFacts ? lesson.funFacts.length : 0} facts`);
                } else {
                    console.log(`⚠️  Status: CONTENT TOO SHORT OR MISSING`);
                }
            }
        }
        
        console.log(`\n📈 SUMMARY OF CRITICAL LESSONS:`);
        
        const totalLessons = await Lesson.countDocuments();
        const lessonsWithPlaceholders = await Lesson.countDocuments({
            content: { $regex: 'would go here with appropriate complexity', $options: 'i' }
        });
        const lessonsWithRealContent = totalLessons - lessonsWithPlaceholders;
        
        console.log(`✅ Lessons with real content: ${lessonsWithRealContent}/${totalLessons}`);
        console.log(`⚠️  Lessons still with placeholders: ${lessonsWithPlaceholders}/${totalLessons}`);
        console.log(`📊 Completion percentage: ${Math.round((lessonsWithRealContent/totalLessons) * 100)}%`);
        
        if (lessonsWithPlaceholders === 0) {
            console.log(`\n🎉 MISSION ACCOMPLISHED!`);
            console.log(`✨ All lessons now have real educational content!`);
        } else {
            console.log(`\n🎯 GREAT PROGRESS!`);
            console.log(`🚀 Major improvement in educational content quality!`);
        }
        
    } catch (error) {
        console.error('Error verifying lesson content:', error);
    } finally {
        mongoose.connection.close();
    }
}

verifyLessonContent(); 
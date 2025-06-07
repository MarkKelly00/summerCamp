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

async function checkLesson() {
    try {
        const lessonTitle = process.argv[2] || 'Community Helpers Past and Present';
        console.log(`Looking for lesson: ${lessonTitle}`);
        
        const lesson = await Lesson.findOne({ title: lessonTitle });
        
        if (!lesson) {
            console.log('Lesson not found!');
            return;
        }
        
        console.log('\n=== LESSON DETAILS ===');
        console.log(`Title: ${lesson.title}`);
        console.log(`Grade: ${lesson.gradeLevel}`);
        console.log(`Subject: ${lesson.subject}`);
        console.log(`Week: ${lesson.week}`);
        
        console.log('\n=== INTRODUCTION ===');
        console.log(lesson.introduction);
        
        console.log('\n=== CONTENT ===');
        console.log(lesson.content);
        
        console.log('\n=== ACTIVITIES ===');
        lesson.activities.forEach((activity, index) => {
            console.log(`${index + 1}. ${activity}`);
        });
        
        console.log('\n=== FUN FACTS ===');
        lesson.funFacts.forEach((fact, index) => {
            console.log(`${index + 1}. ${fact}`);
        });
        
    } catch (error) {
        console.error('Error checking lesson:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkLesson(); 
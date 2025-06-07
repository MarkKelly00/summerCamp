const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function examineLessons() {
    try {
        const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
        
        console.log('=== ALL LESSONS IN DATABASE ===\n');
        
        const byWeek = {};
        lessons.forEach(lesson => {
            const week = lesson.week || 'Unknown';
            if (!byWeek[week]) byWeek[week] = [];
            byWeek[week].push(lesson);
        });
        
        Object.keys(byWeek).sort().forEach(week => {
            console.log(`\n--- WEEK ${week} ---`);
            byWeek[week].forEach(lesson => {
                console.log(`${lesson.title} (Grade ${lesson.gradeLevel}, ${lesson.subject})`);
            });
        });
        
        console.log(`\n=== TOTAL: ${lessons.length} lessons ===`);
        
        // Sample a few lessons to see their current content quality
        console.log('\n=== SAMPLE LESSON CONTENT ANALYSIS ===');
        
        const sampleLessons = [
            lessons.find(l => l.title.includes('Skip Counting')),
            lessons.find(l => l.title.includes('Fractions')),
            lessons.find(l => l.title.includes('Addition')),
            lessons.find(l => l.title.includes('Weather')),
            lessons.find(l => l.title.includes('Colonial'))
        ].filter(Boolean);
        
        sampleLessons.forEach(lesson => {
            console.log(`\n--- ${lesson.title} (Grade ${lesson.gradeLevel}) ---`);
            console.log('Content length:', lesson.content ? lesson.content.length : 0);
            console.log('Has specific content:', !lesson.content?.includes('[specific example would go here]'));
            console.log('Activities count:', lesson.activities ? lesson.activities.length : 0);
            console.log('Fun facts count:', lesson.funFacts ? lesson.funFacts.length : 0);
        });
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

examineLessons(); 
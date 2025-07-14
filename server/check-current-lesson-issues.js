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

async function checkCurrentIssues() {
    try {
        console.log('🔍 CHECKING CURRENT LESSON ISSUES');
        console.log('📋 Examining Step 2 (content) and Step 3 (activities) problems...\n');
        
        // Check specific lessons mentioned in screenshots
        const lessonTitles = [
            'States of Matter and Physical Changes',
            'Multiplication and Division Facts',
            'Introduction to Basic Coding Concepts',
            'Forces and Motion',
            'Digital Literacy and Online Reading'
        ];
        
        for (const title of lessonTitles) {
            const lessons = await Lesson.find({ 
                title: { $regex: title, $options: 'i' } 
            });
            
            for (const lesson of lessons) {
                console.log(`\n=== ${lesson.title} (Grade ${lesson.gradeLevel}) ===`);
                console.log(`📖 Subject: ${lesson.subject}`);
                
                // Check Step 2 Content Issues
                console.log('\n📝 STEP 2 CONTENT ANALYSIS:');
                if (lesson.content) {
                    if (typeof lesson.content === 'string') {
                        console.log('❌ Content is stored as single string (old format)');
                        console.log(`📄 Length: ${lesson.content.length} characters`);
                        console.log(`📄 Preview: "${lesson.content.substring(0, 150)}..."`);
                        console.log('⚠️  ISSUE: Content needs to be in nested format for proper display');
                    } else if (lesson.content.mainContent) {
                        console.log('✅ Content is in nested format');
                        console.log(`📄 Main content length: ${lesson.content.mainContent.length} characters`);
                        console.log(`📄 Preview: "${lesson.content.mainContent.substring(0, 150)}..."`);
                        
                        // Check if content has proper markdown formatting
                        if (lesson.content.mainContent.includes('**') || lesson.content.mainContent.includes('##') || lesson.content.mainContent.includes('•')) {
                            console.log('✅ Content has markdown formatting');
                        } else {
                            console.log('⚠️  Content lacks proper markdown formatting');
                        }
                    }
                }
                
                // Check Step 3 Activities Issues
                console.log('\n🎯 STEP 3 ACTIVITIES ANALYSIS:');
                let activities = lesson.activities || (lesson.content && lesson.content.activities) || [];
                
                if (activities.length === 0) {
                    console.log('❌ No activities found');
                } else {
                    console.log(`📊 Found ${activities.length} activities:`);
                    activities.forEach((activity, index) => {
                        console.log(`${index + 1}. "${activity}"`);
                        
                        // Check for generic templates
                        if (activity.includes('Research project: Investigate how') || 
                            activity.includes('Problem-solving exercises: Complete') ||
                            activity.includes('Analysis activity: Compare and contrast') ||
                            activity.includes('Presentation: Create a detailed presentation') ||
                            activity.includes('Real-world application: Find examples')) {
                            console.log('   ❌ GENERIC TEMPLATE DETECTED');
                        }
                        
                        // Check for notebook-suitability
                        if (activity.includes('detailed report') || 
                            activity.includes('presentation') ||
                            activity.includes('research project') ||
                            activity.includes('write a detailed')) {
                            console.log('   ⚠️  NOT NOTEBOOK-FRIENDLY');
                        }
                    });
                }
                
                console.log('\n' + '='.repeat(60));
            }
        }
        
        console.log('\n🎯 SUMMARY OF ISSUES FOUND:');
        console.log('1. Content formatting - needs proper markdown structure');
        console.log('2. Activities are generic templates instead of specific, notebook-friendly tasks');
        console.log('3. Many activities require presentations/reports instead of simple notebook exercises');
        
    } catch (error) {
        console.error('Error checking current issues:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkCurrentIssues(); 
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function verifyUIFixes() {
    try {
        console.log('🔍 VERIFYING UI FIXES');
        console.log('📋 Checking Step 2 content formatting and Step 3 activities...\n');
        
        // Check the specific lessons from the screenshots
        const lessonsToVerify = [
            'States of Matter and Physical Changes',
            'Multiplication and Division Facts',
            'Introduction to Basic Coding Concepts',
            'Digital Literacy and Online Reading',
            'Forces and Motion'
        ];
        
        for (const lessonTitle of lessonsToVerify) {
            const lessons = await Lesson.find({ 
                title: { $regex: lessonTitle, $options: 'i' } 
            });
            
            for (const lesson of lessons) {
                console.log(`\n=== ${lesson.title} (Grade ${lesson.gradeLevel}) ===`);
                
                // Check Step 2 Content Formatting
                console.log('\n📖 STEP 2 CONTENT CHECK:');
                if (lesson.content && typeof lesson.content === 'object' && lesson.content.mainContent) {
                    console.log('✅ Content is in proper nested format');
                    
                    // Check for markdown formatting
                    const hasMarkdown = lesson.content.mainContent.includes('##') || 
                                       lesson.content.mainContent.includes('**') || 
                                       lesson.content.mainContent.includes('•');
                    
                    if (hasMarkdown) {
                        console.log('✅ Content has proper markdown formatting');
                    } else {
                        console.log('⚠️  Content could use better markdown formatting');
                    }
                    
                    // Check content length
                    if (lesson.content.mainContent.length > 500) {
                        console.log('✅ Content has substantial educational material');
                    } else {
                        console.log('⚠️  Content is relatively short');
                    }
                    
                    // Show content preview
                    console.log(`📄 Content preview: "${lesson.content.mainContent.substring(0, 100)}..."`);
                } else {
                    console.log('❌ Content is not in proper nested format');
                }
                
                // Check Step 3 Activities
                console.log('\n🎯 STEP 3 ACTIVITIES CHECK:');
                let activities = [];
                if (lesson.content && lesson.content.activities) {
                    activities = lesson.content.activities;
                } else if (lesson.activities) {
                    activities = lesson.activities;
                }
                
                if (activities.length === 0) {
                    console.log('❌ No activities found');
                } else {
                    console.log(`📊 Found ${activities.length} activities:`);
                    
                    let hasGenericActivities = false;
                    let notebookFriendlyCount = 0;
                    
                    activities.forEach((activity, index) => {
                        console.log(`${index + 1}. "${activity}"`);
                        
                        // Check for generic templates
                        if (activity.includes('Research project: Investigate how') || 
                            activity.includes('Problem-solving exercises: Complete') ||
                            activity.includes('Analysis activity: Compare and contrast') ||
                            activity.includes('Presentation: Create a detailed presentation') ||
                            activity.includes('Real-world application: Find examples')) {
                            console.log('   ❌ STILL HAS GENERIC TEMPLATE');
                            hasGenericActivities = true;
                        }
                        
                        // Check for notebook-friendly activities
                        if (activity.includes('in your notebook') || 
                            activity.includes('Draw') || 
                            activity.includes('Write') || 
                            activity.includes('Create a chart') ||
                            activity.includes('Complete') ||
                            activity.includes('practice')) {
                            console.log('   ✅ NOTEBOOK-FRIENDLY');
                            notebookFriendlyCount++;
                        }
                        
                        // Check for non-notebook activities
                        if (activity.includes('detailed report') || 
                            activity.includes('presentation') ||
                            activity.includes('research project')) {
                            console.log('   ⚠️  NOT NOTEBOOK-FRIENDLY');
                        }
                    });
                    
                    console.log(`📊 Summary: ${notebookFriendlyCount}/${activities.length} activities are notebook-friendly`);
                    
                    if (hasGenericActivities) {
                        console.log('⚠️  ISSUE: Still has generic activities');
                    } else {
                        console.log('✅ SUCCESS: No generic activities found');
                    }
                }
                
                console.log('\n' + '='.repeat(80));
            }
        }
        
        // Overall statistics
        console.log('\n📊 OVERALL STATISTICS:');
        
        const totalLessons = await Lesson.countDocuments();
        
        // Count lessons with generic activities
        const lessonsWithGenericActivities = await Lesson.find({
            $or: [
                { 'content.activities': { $regex: 'Research project: Investigate how' } },
                { 'content.activities': { $regex: 'Problem-solving exercises: Complete' } },
                { 'content.activities': { $regex: 'Analysis activity: Compare and contrast' } },
                { 'content.activities': { $regex: 'Presentation: Create a detailed presentation' } },
                { 'content.activities': { $regex: 'Real-world application: Find examples' } },
                { 'activities': { $regex: 'Research project: Investigate how' } },
                { 'activities': { $regex: 'Problem-solving exercises: Complete' } },
                { 'activities': { $regex: 'Analysis activity: Compare and contrast' } },
                { 'activities': { $regex: 'Presentation: Create a detailed presentation' } },
                { 'activities': { $regex: 'Real-world application: Find examples' } }
            ]
        }).countDocuments();
        
        // Count lessons with proper content structure
        const lessonsWithProperContent = await Lesson.find({
            'content.mainContent': { $exists: true }
        }).countDocuments();
        
        console.log(`📚 Total lessons: ${totalLessons}`);
        console.log(`✅ Lessons with proper content structure: ${lessonsWithProperContent}/${totalLessons}`);
        console.log(`⚠️  Lessons still with generic activities: ${lessonsWithGenericActivities}/${totalLessons}`);
        
        const successRate = Math.round(((totalLessons - lessonsWithGenericActivities) / totalLessons) * 100);
        console.log(`📈 Success rate: ${successRate}% of lessons have good activities`);
        
        if (lessonsWithGenericActivities === 0) {
            console.log('\n🎉 PERFECT! All lessons now have notebook-friendly activities!');
        } else {
            console.log('\n🚀 GREAT PROGRESS! Most lessons now have improved activities!');
        }
        
    } catch (error) {
        console.error('❌ Error verifying UI fixes:', error);
    } finally {
        mongoose.connection.close();
    }
}

verifyUIFixes(); 
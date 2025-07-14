const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function findGenericLessons() {
  try {
    const lessons = await Lesson.find({}).sort({ title: 1 });
    
    console.log('🔍 FINDING LESSONS WITH GENERIC CONTENT');
    console.log('📋 Checking for generic activities and poor formatting...\n');
    
    const problematic = [];
    
    for (const lesson of lessons) {
      const activities = lesson.activities || [];
      const content = lesson.content || '';
      
      // Check for generic activities
      const hasGenericActivities = activities.some(activity => 
        activity.includes('Research project: Investigate how') ||
        activity.includes('is used in different careers') ||
        activity.includes('Problem-solving exercises: Complete challenging problems') ||
        activity.includes('Analysis activity: Compare and contrast different aspects')
      );
      
      // Check for poor formatting (all content in one block)
      const hasPoorFormatting = content.includes('What Is') && 
                               content.includes('Why') && 
                               content.includes('How') &&
                               !content.includes('**What Is') &&
                               !content.includes('\n\n');
      
      // Check for generic content phrases
      const hasGenericContent = content.includes('is an important concept that helps us understand how the world works') ||
                               content.includes('helps you make sense of the world around you, connect ideas and see patterns');
      
      if (hasGenericActivities || hasPoorFormatting || hasGenericContent) {
        problematic.push({
          title: lesson.title,
          grade: lesson.gradeLevel,
          subject: lesson.subject,
          issues: {
            genericActivities: hasGenericActivities,
            poorFormatting: hasPoorFormatting,
            genericContent: hasGenericContent
          }
        });
      }
    }
    
    console.log('❌ LESSONS WITH ISSUES:');
    problematic.slice(0, 20).forEach(lesson => {
      const issues = [];
      if (lesson.issues.genericActivities) issues.push('Generic Activities');
      if (lesson.issues.poorFormatting) issues.push('Poor Formatting');
      if (lesson.issues.genericContent) issues.push('Generic Content');
      
      console.log(`- ${lesson.title} (Grade ${lesson.grade}, ${lesson.subject}) - Issues: ${issues.join(', ')}`);
    });
    
    if (problematic.length > 20) {
      console.log(`... and ${problematic.length - 20} more lessons with issues`);
    }
    
    console.log('\n📊 SUMMARY:');
    console.log(`🚨 Lessons needing fixes: ${problematic.length}/100`);
    console.log(`✅ Lessons already good: ${100 - problematic.length}/100`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

findGenericLessons(); 
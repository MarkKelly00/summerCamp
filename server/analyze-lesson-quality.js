const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function analyzeContentQuality() {
  try {
    const lessons = await Lesson.find({}).sort({ week: 1, gradeLevel: 1, title: 1 });
    
    console.log('🔍 ANALYZING LESSON CONTENT QUALITY');
    console.log('📋 Looking for lessons needing "Skip Counting by 5s" level quality...\n');
    
    let highQuality = 0;
    let needsImprovement = 0;
    let generic = 0;
    
    const needsWork = [];
    
    for (const lesson of lessons) {
      const content = lesson.content || '';
      const intro = lesson.introduction || '';
      
      // Check for high-quality indicators
      const hasRealWorldExamples = content.includes('Real-Life Examples') || content.includes('**Real-Life Examples**');
      const hasStepByStep = content.includes('How') && content.includes('Works') && content.length > 1000;
      const hasSpecificContent = !content.includes('is an important concept that helps us understand how the world works');
      const hasDetailedIntro = intro.length > 150 && intro.includes('!');
      
      if (hasRealWorldExamples && hasStepByStep && hasSpecificContent && hasDetailedIntro) {
        highQuality++;
      } else if (content.includes('is an important concept that helps us understand how the world works') || 
                 content.includes('is something really important that we see and use') ||
                 content.length < 500) {
        generic++;
        needsWork.push({
          title: lesson.title,
          grade: lesson.gradeLevel,
          subject: lesson.subject,
          contentLength: content.length,
          issue: 'Generic template content'
        });
      } else {
        needsImprovement++;
        needsWork.push({
          title: lesson.title,
          grade: lesson.gradeLevel,
          subject: lesson.subject,
          contentLength: content.length,
          issue: 'Needs quality upgrade'
        });
      }
    }
    
    console.log('📊 QUALITY ANALYSIS RESULTS:');
    console.log(`✅ High-quality lessons (Skip Counting level): ${highQuality}`);
    console.log(`⚠️  Lessons needing improvement: ${needsImprovement}`);
    console.log(`❌ Generic template content: ${generic}`);
    console.log(`📚 Total lessons: ${lessons.length}`);
    
    console.log('\n🎯 LESSONS REQUIRING UPGRADE:');
    needsWork.slice(0, 30).forEach(lesson => {
      console.log(`- ${lesson.title} (Grade ${lesson.grade}, ${lesson.subject}) - ${lesson.contentLength} chars - ${lesson.issue}`);
    });
    
    if (needsWork.length > 30) {
      console.log(`... and ${needsWork.length - 30} more lessons`);
    }
    
    console.log(`\n📈 IMPROVEMENT NEEDED: ${needsWork.length} lessons require upgrade to "Skip Counting by 5s" quality level`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
}

analyzeContentQuality(); 
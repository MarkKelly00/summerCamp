const mongoose = require('mongoose');
require('dotenv').config();

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function verifyFocusedContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔍 Verifying focused lesson content...\n');
    
    // Check lessons mentioned in screenshots
    const skipCountingLesson = await Lesson.findOne({ title: 'Skip Counting by 5s' });
    const americanHeroesLesson = await Lesson.findOne({ title: 'American Heroes' });
    
    console.log('📚 Skip Counting lesson:');
    console.log('Title updated:', skipCountingLesson?.title === 'Skip Counting by 5s');
    console.log('Uses proper markdown:', skipCountingLesson?.content?.includes('### 🔢 What Is'));
    console.log('Has focused structure:', skipCountingLesson?.content?.includes('Why It Matters'));
    console.log('Content preview:', skipCountingLesson?.content?.substring(0, 150) + '...\n');
    
    console.log('🏛️ American Heroes lesson:');
    console.log('Uses proper markdown:', americanHeroesLesson?.content?.includes('### 🏛️ What Is'));
    console.log('Has focused structure:', americanHeroesLesson?.content?.includes('Real-Life Examples'));
    console.log('Grade appropriate:', americanHeroesLesson?.gradeLevel === 2);
    console.log('Content preview:', americanHeroesLesson?.content?.substring(0, 150) + '...\n');
    
    // Check that content follows the required structure
    const requiredSections = ['What Is', 'Why It Matters', 'How It Works', 'Real-Life Examples', 'Mistakes to Avoid', 'Recap'];
    
    console.log('✅ Structure verification:');
    for (const section of requiredSections) {
      const hasSection = skipCountingLesson?.content?.includes(section);
      console.log(`- ${section}: ${hasSection ? '✅' : '❌'}`);
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Verification complete!');
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  }
}

verifyFocusedContent(); 
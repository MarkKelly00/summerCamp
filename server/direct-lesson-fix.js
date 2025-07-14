const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const lessonSchema = new mongoose.Schema({}, { strict: false });
const Lesson = mongoose.model('Lesson', lessonSchema);

async function directLessonFix() {
    try {
        console.log('🔧 DIRECT LESSON FIX TEST');
        console.log('📝 Updating Westward Expansion lesson directly...\n');
        
        // Find the lesson
        const lesson = await Lesson.findOne({ 
            title: 'Westward Expansion',
            gradeLevel: 4
        });
        
        if (!lesson) {
            console.log('❌ Lesson not found!');
            return;
        }
        
        console.log(`✅ Found lesson: ${lesson.title} (Grade ${lesson.gradeLevel})`);
        console.log(`📋 Current introduction: ${lesson.introduction.substring(0, 100)}...`);
        
        // Update with premium content
        lesson.introduction = "Welcome to one of the most exciting chapters in American history! Today we're going to explore Westward Expansion, when millions of brave Americans moved west to find new opportunities and build new lives. Get ready to discover how this great movement shaped our nation!";
        
        lesson.content = `**What Was Westward Expansion?**

Westward Expansion was the movement of Americans from the eastern United States to the western territories and states from the 1800s to the 1890s. Millions of people moved west seeking land, gold, religious freedom, and new opportunities.

**Why Westward Expansion Matters**

Understanding Westward Expansion helps us see how America grew from 13 colonies to stretch "from sea to shining sea." This movement shaped American culture, created new states, and had major impacts on Native Americans and the environment.

**How Westward Expansion Worked**

**Major Reasons for Moving West:**
• **Land Opportunities:** The Homestead Act gave free land to settlers
• **Gold Rush:** Discovery of gold in California (1849) and other western areas
• **Religious Freedom:** Groups like Mormons sought places to practice their beliefs freely
• **Economic Opportunity:** Farming, ranching, and business opportunities
• **Manifest Destiny:** Belief that America should stretch to the Pacific Ocean

**Key Events and Routes:**
• **Oregon Trail (1840s):** 2,000-mile journey to Oregon Territory
• **California Gold Rush (1849):** 300,000 people rushed to California
• **Transcontinental Railroad (1869):** Connected East and West coasts
• **Homestead Act (1862):** Gave 160 acres free to settlers who farmed it

**Challenges Pioneers Faced:**
• Dangerous river crossings and mountain passes
• Disease, accidents, and harsh weather
• Conflicts with Native American tribes
• Limited supplies and long distances

**Real-Life Examples**

• A typical family on the Oregon Trail traveled 15-20 miles per day for 5-6 months
• The Pony Express delivered mail from Missouri to California in just 10 days
• Some gold miners became rich, but most just made enough to survive
• Buffalo herds were nearly wiped out, affecting Plains Indian cultures

**Common Mistakes to Avoid**

Don't think Westward Expansion was easy or always successful - many pioneers died or gave up. Also, remember that the West wasn't "empty" - Native Americans had lived there for thousands of years.

**Quick Recap**

Westward Expansion was the movement of millions of Americans to the western territories seeking land, gold, and opportunities. This movement created the America we know today but came at great cost to Native Americans and the environment!`;

        lesson.activities = [
            "Create a detailed map showing major westward trails (Oregon Trail, California Trail, Mormon Trail) with key landmarks and challenges",
            "Write diary entries from different perspectives: a pioneer family, a Native American, and a Chinese railroad worker",
            "Research your local area to see if it was part of westward expansion and present your findings to the class",
            "Build a model covered wagon and calculate what supplies a pioneer family would need for a 6-month journey",
            "Create a timeline of westward expansion showing how new states were added to the Union between 1803-1890"
        ];
        
        lesson.funFacts = [
            "Did you know that pioneer children walked most of the 2,000 miles on the Oregon Trail because wagons were too full of supplies!",
            "The Transcontinental Railroad was built by two companies working toward each other - one starting in California, one in Nebraska!",
            "Gold miners during the California Gold Rush ate so much bread that flour cost more than gold by weight!",
            "Some pioneer families brought pianos and other furniture, but had to abandon them along the trail when wagons got too heavy!",
            "The Pony Express only lasted 18 months before the telegraph made it obsolete, but it became an American legend!"
        ];
        
        // Save the lesson
        const result = await lesson.save();
        console.log(`✅ Lesson saved successfully!`);
        console.log(`📝 New introduction: ${result.introduction.substring(0, 100)}...`);
        console.log(`📚 Content length: ${result.content.length} characters`);
        console.log(`🎯 Activities: ${result.activities.length}`);
        console.log(`🔍 Fun facts: ${result.funFacts.length}`);
        
        // Verify the update by reading it back
        console.log('\n🔍 VERIFICATION - Reading lesson back from database...');
        const verifyLesson = await Lesson.findOne({ 
            title: 'Westward Expansion',
            gradeLevel: 4
        });
        
        console.log(`📋 Verified introduction: ${verifyLesson.introduction.substring(0, 100)}...`);
        console.log(`📚 Verified content length: ${verifyLesson.content.length} characters`);
        console.log(`🎯 Verified activities: ${verifyLesson.activities.length}`);
        
        if (verifyLesson.introduction.includes('Welcome to one of the most exciting chapters')) {
            console.log('\n🎉 SUCCESS! Lesson updated and verified!');
        } else {
            console.log('\n❌ FAILED! Lesson not properly updated!');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

directLessonFix(); 
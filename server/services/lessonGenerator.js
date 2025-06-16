const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class LessonGenerator {
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async generateLessonContent(title, grade, subject) {
        const prompt = `Create an engaging, age-appropriate lesson about "${title}" for Grade ${grade} ${subject} students.
        Include the following sections:
        1. Introduction (what is it and why it's important)
        2. Key Concepts (main ideas to understand)
        3. Real-World Examples
        4. Fun Facts (3-5 interesting facts)
        5. At-Home Activities (3-5 activities)
        6. Quiz Questions (5 multiple choice questions with answers)
        
        Make sure the content is:
        - Age-appropriate for Grade ${grade}
        - Interactive and engaging
        - Uses simple language for younger grades
        - Includes practical examples
        - Encourages critical thinking
        
        Format the response in markdown.`;

        try {
            const completion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { 
                        role: "system", 
                        content: "You are an experienced educator who creates engaging, age-appropriate educational content."
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
            });

            return completion.data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating lesson content:', error);
            throw error;
        }
    }

    async generateQuiz(title, grade, subject) {
        const prompt = `Create 5 multiple-choice quiz questions about "${title}" appropriate for Grade ${grade} ${subject} students.
        For each question include:
        - The question
        - 4 possible answers (A, B, C, D)
        - The correct answer
        - A brief explanation of why it's correct
        
        Make questions:
        - Age-appropriate for Grade ${grade}
        - Clear and unambiguous
        - Test understanding, not just memorization
        - Include some critical thinking
        
        Format the response in markdown.`;

        try {
            const completion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an experienced educator who creates effective, age-appropriate assessments."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            });

            return completion.data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating quiz:', error);
            throw error;
        }
    }
}

module.exports = new LessonGenerator(); 
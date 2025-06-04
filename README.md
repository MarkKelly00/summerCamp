# Summer Camp Learning Platform 🏕️📚

A comprehensive web-based learning platform designed for elementary school children during summer break. This platform provides structured curriculum covering Math, Science, Reading, and History with interactive lessons, progress tracking, and a reward system.

## 🎯 Target Audience
- **Grade 2 (Age 6-7)**: Rising 1st to 2nd graders
- **Grade 4 (Age 9-10)**: Rising 3rd to 4th graders

## 📋 Features

### Educational Content
- **12 weeks** of structured curriculum (3 months)
- **4 subjects**: Math, Science, Reading, History
- **5 lessons per week** (2 hours daily)
- **240 total lessons** across both grade levels

### Interactive Learning
- 5-step lesson structure: Introduction → Learn → Activities → Fun Facts → Quiz
- Multiple choice quizzes with immediate feedback
- Real-world activities and hands-on learning exercises
- Educational fun facts to spark curiosity

### Progress Tracking
- Individual user accounts for each child
- Lesson completion tracking
- Quiz score recording
- Weekly progress summaries

### Reward System
- Achievement badges for weekly completion (80%+ scores)
- "Fun Money" reward system for motivation
- Visual progress indicators

### Parent Dashboard
- Admin account for parent oversight
- View children's progress and statistics
- Monitor learning milestones

## 🛠️ Tech Stack

**Backend:**
- Node.js with Express.js
- TypeScript
- MongoDB Atlas (Database)
- JWT Authentication
- Bcrypt for password hashing

**Frontend:**
- React with TypeScript
- Tailwind CSS for styling
- Axios for API communication
- Responsive design

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MarkKelly00/summerCamp.git
   cd summerCamp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual values:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - `PORT`: Backend server port (default: 5001)

4. **Setup database:**
   ```bash
   cd server
   npm run seed
   ```

5. **Start the application:**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the backend server (port 5001) and frontend client (port 3000).

## 👥 Default User Accounts

After seeding the database, these accounts will be available:

- **Student 1**: username: `son`, password: `son123` (Grade 2)
- **Student 2**: username: `daughter`, password: `daughter123` (Grade 4)  
- **Parent/Admin**: username: `admin`, password: `admin123`

## 📚 Curriculum Overview

### Grade 2 Content
- **Math**: Addition, subtraction, basic number concepts
- **Science**: Animal habitats, basic biology, nature exploration
- **Reading**: Phonics, sight words, reading comprehension
- **History**: Community helpers, basic geography, cultural awareness

### Grade 4 Content
- **Math**: Multiplication, division, fractions, geometry
- **Science**: Ecosystems, weather, scientific method
- **Reading**: Advanced comprehension, vocabulary building
- **History**: Geography, historical events, social studies

## 🎮 How to Use

1. **Login**: Use one of the provided accounts or create new ones
2. **Select Grade**: Choose appropriate grade level (2 or 4)
3. **Navigate Lessons**: Browse by week and subject
4. **Complete Lessons**: Follow the 5-step lesson structure
5. **Take Quizzes**: Answer questions to test understanding
6. **Track Progress**: View badges and completion status
7. **Parent Monitoring**: Use admin account to oversee progress

## 🏆 Achievement System

- **Weekly Badges**: Earned for completing 80% of lessons with good scores
- **Fun Money**: Virtual currency earned through lesson completion
- **Progress Tracking**: Visual indicators of learning milestones

## 🔧 Development

### Project Structure
```
summerCamp/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package.json for scripts
└── README.md        # This file
```

### Available Scripts
- `npm run dev`: Start both frontend and backend in development mode
- `npm run server`: Start only the backend server
- `npm run client`: Start only the frontend client
- `npm run seed`: Populate database with initial data

## 🌟 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal educational project, but suggestions and improvements are welcome!

---

*Built with ❤️ for summer learning and family engagement*

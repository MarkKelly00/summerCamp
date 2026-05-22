import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Reward from '../models/Reward';

// Load environment variables
dotenv.config();

// Rewards data
const rewards = [
  {
    name: "Fiiz Drink",
    description: "Redeem this coupon for a refreshing Fiiz drink of your choice!",
    cost: 300,
    image: "🥤"
  },
  {
    name: "Happy Meal",
    description: "Enjoy a delicious Happy Meal from McDonald's!",
    cost: 500,
    image: "🍔"
  },
  {
    name: "VBUCKs",
    description: "$10 worth of VBUCKs for Fortnite or other Epic games.",
    cost: 1000,
    image: "🎮"
  },
  {
    name: "Robux",
    description: "$10 worth of Robux for Roblox games.",
    cost: 1000,
    image: "🎲"
  },
  {
    name: "Cold Stone",
    description: "Redeem this coupon for a delicious Cold Stone ice cream treat!",
    cost: 1000,
    image: "🍦"
  },
  {
    name: "New Shoes",
    description: "Redeem this coupon for a new pair of shoes!",
    cost: 1500,
    image: "👟"
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing rewards
      await Reward.deleteMany({});
      console.log('Cleared existing rewards');
      
      // Create new rewards
      const createdRewards = await Reward.insertMany(rewards);
      console.log(`Created ${createdRewards.length} rewards:`);
      
      // Display created rewards
      createdRewards.forEach(reward => {
        console.log(`- ${reward.image} ${reward.name}: ${reward.cost} fun money`);
      });
      
      console.log('Rewards seeded successfully!');
    } catch (error) {
      console.error('Error seeding rewards:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
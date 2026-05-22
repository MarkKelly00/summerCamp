#!/bin/bash

echo "Setting up reward system..."

# Install uuid package (needed for generating reward codes)
echo "Installing required packages..."
npm install --save uuid
npm install --save @types/uuid

# Build the TypeScript files
echo "Building TypeScript..."
cd ..
npm run build

# Run the reward seeder
echo "Seeding rewards..."
node dist/scripts/seedRewards.js

echo "✅ Rewards system setup complete!"
echo "The following rewards have been created:"
echo "- 🥤 Fiiz Drink (300 fun money)"
echo "- 🍔 Happy Meal (500 fun money)"
echo "- 🎮 VBUCKs (1000 fun money)"
echo "- 🎲 Robux (1000 fun money)"
echo "- 🍦 Cold Stone (1000 fun money)"
echo "- 👟 New Shoes (1500 fun money)"
echo ""
echo "Students can now earn fun money by completing quizzes and redeem for rewards!"
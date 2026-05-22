import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface RewardsPageProps {
  user: any;
  token: string;
  onUserUpdate: (user: any) => void;
}

interface Reward {
  _id: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  isAvailable: boolean;
}

interface RewardRedemption {
  _id: string;
  rewardName: string;
  cost: number;
  code: string;
  redeemed: boolean;
  createdAt: string;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ user, token, onUserUpdate }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<RewardRedemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRewardsData = async () => {
      setLoading(true);
      try {
        // Fetch rewards and redemption history
        const [rewardsResponse, redemptionsResponse] = await Promise.all([
          api.get('/api/rewards', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/api/rewards/history', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        setRewards(rewardsResponse.data);
        setRedemptions(redemptionsResponse.data);
      } catch (err) {
        setError('Failed to load rewards. Please try again later.');
        console.error('Error fetching rewards data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRewardsData();
  }, [token]);
  
  const handleRedeemReward = async (rewardId: string, cost: number) => {
    // Check if user has enough fun money
    if (user.funMoney < cost) {
      setError(`Not enough fun money. You need ${cost} fun money to redeem this reward.`);
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.post(`/api/rewards/redeem/${rewardId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update user's fun money
      onUserUpdate({
        ...user,
        funMoney: response.data.newFunMoney
      });
      
      // Add new redemption to the list
      setRedemptions([response.data.redemption, ...redemptions]);
      
      setSuccess(`Yay! You redeemed ${response.data.redemption.rewardName}. Your code is ${response.data.redemption.code}`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError('Failed to redeem reward. Please try again.');
      console.error('Error redeeming reward:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
        <div className="fun-card text-center">
          <h2 className="text-2xl font-bold text-purple-600 font-kid mb-4">
            Please log in to see rewards
          </h2>
          <button 
            onClick={() => navigate('/login')} 
            className="fun-button bg-purple-500"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fun-card mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600 font-kid">
              Reward Shop
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-kid text-yellow-500">🪙 {user.funMoney}</span>
              <button
                onClick={() => navigate('/')}
                className="fun-button bg-red-500 text-sm font-kid"
              >
                🏠 Home
              </button>
            </div>
          </div>
        </div>
        
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 font-kid">
            ❌ {error}
            <button 
              onClick={() => setError(null)} 
              className="float-right text-red-700 font-bold"
            >
              &times;
            </button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 font-kid">
            🎉 {success}
            <button 
              onClick={() => setSuccess(null)} 
              className="float-right text-green-700 font-bold"
            >
              &times;
            </button>
          </div>
        )}
        
        {/* Available Rewards */}
        <div className="fun-card mb-6">
          <h2 className="text-xl font-bold text-purple-600 font-kid mb-4">
            Available Rewards
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="text-4xl animate-spin-slow">🎁</div>
              <p className="text-gray-600 font-kid mt-4">Loading rewards...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map(reward => (
                <div 
                  key={reward._id} 
                  className={`bg-white p-4 rounded-lg border-2 ${user.funMoney >= reward.cost ? 'border-green-400' : 'border-gray-300'} shadow transition-all hover:shadow-lg`}
                >
                  <div className="text-4xl mb-2">{reward.image}</div>
                  <h3 className="text-lg font-bold font-kid text-purple-600">{reward.name}</h3>
                  <p className="text-sm text-gray-600 font-kid mb-2">{reward.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-yellow-500 font-kid">🪙 {reward.cost}</span>
                    <button
                      onClick={() => handleRedeemReward(reward._id, reward.cost)}
                      disabled={user.funMoney < reward.cost || loading}
                      className={`px-3 py-1 rounded font-kid text-white ${user.funMoney >= reward.cost ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      {user.funMoney >= reward.cost ? 'Redeem' : 'Not Enough'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Redemption History */}
        <div className="fun-card">
          <h2 className="text-xl font-bold text-purple-600 font-kid mb-4">
            Your Reward Coupons
          </h2>
          
          {redemptions.length === 0 ? (
            <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-gray-600 font-kid">You haven't redeemed any rewards yet. Start earning fun money by completing lessons!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {redemptions.map(redemption => (
                <div 
                  key={redemption._id} 
                  className={`p-4 rounded-lg border ${redemption.redeemed ? 'bg-gray-50 border-gray-300' : 'bg-green-50 border-green-300'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold font-kid text-purple-600">{redemption.rewardName}</h3>
                      <p className="text-sm text-gray-600 font-kid">
                        Redeemed on {new Date(redemption.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-kid text-purple-700">{redemption.code}</div>
                      <span className="text-xs font-kid text-gray-500">Cost: 🪙 {redemption.cost}</span>
                    </div>
                  </div>
                  {redemption.redeemed && (
                    <div className="mt-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded inline-block font-kid">
                      Used
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
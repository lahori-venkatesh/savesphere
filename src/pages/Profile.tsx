
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  MapPin, 
  Calendar, 
  LogOut,
  CrownIcon,
  CheckCircle2,
  Share2,
  Gift,
  Zap,
  GraduationCap,
  ShoppingCart,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import UserAvatar from '@/components/ui/UserAvatar';
import PointsBadge from '@/components/ui/PointsBadge';
import { mockDeals } from '@/utils/dealsData';
import { currentUser } from '@/utils/userData';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast: shadowToast } = useToast();
  const [isPremium, setIsPremium] = useState(currentUser.isPremium);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  
  // Update user with Indian name and location
  const user = {
    ...currentUser,
    name: "Arjun Sharma",
    location: "Mumbai, Maharashtra"
  };
  
  // Calculate statistics
  const dealsPosted = mockDeals.filter(deal => deal.postedBy.id === user.id).length;
  const joinDate = new Date(user.joined);
  const formattedJoinDate = joinDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Convert points to Indian Rupees (just for display)
  const pointsInRupees = user.points * 10; // Assuming 1 point = ₹10
  
  // Monthly savings - for the savings tracker
  const monthlySavings = 2000; // This would be calculated from actual deal usage in a real app
  
  const handleLogout = () => {
    shadowToast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // In a real app, we would clear the authentication state
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const handleUpgrade = () => {
    setIsPremium(true);
    toast.success("Upgraded to premium successfully!", {
      description: "You now have access to exclusive deals and features.",
      icon: <CrownIcon className="text-yellow-500" />,
    });
  };

  const handleShareSavings = () => {
    toast.success("Savings summary ready to share!", {
      description: "Your savings summary has been copied to clipboard.",
      icon: <Share2 className="text-blue-500" />,
    });
    // In a real app, this would trigger the native share dialog
  };

  const getRewardSuggestions = () => {
    switch(user.category) {
      case 'student':
        return [
          { name: "Zomato ₹200 Coupon", points: 300, icon: "🍔" },
          { name: "Exam Stationery Kit", points: 450, icon: "📝" },
          { name: "College Fest Pass", points: 600, icon: "🎭" }
        ];
      case 'family':
        return [
          { name: "Big Bazaar ₹500 Voucher", points: 800, icon: "🛒" },
          { name: "Disney+ Hotstar 1 Month", points: 600, icon: "📺" },
          { name: "Family Restaurant Deal", points: 900, icon: "🍽️" }
        ];
      case 'professional':
      default:
        return [
          { name: "Uber ₹300 Credit", points: 500, icon: "🚗" },
          { name: "LinkedIn Learning 1 Month", points: 750, icon: "💻" },
          { name: "Premium Coffee Subscription", points: 400, icon: "☕" }
        ];
    }
  };

  const getRoleBadge = () => {
    switch(user.category) {
      case 'student':
        return { icon: <GraduationCap size={16} className="mr-1" />, name: "Campus Saver" };
      case 'family':
        return { icon: <ShoppingCart size={16} className="mr-1" />, name: "Grocery Guru" };
      case 'professional':
      default:
        return { icon: <Briefcase size={16} className="mr-1" />, name: "Office Hero" };
    }
  };

  const roleBadge = getRoleBadge();
  const rewardSuggestions = getRewardSuggestions();
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header showSearch={false} />
      
      <main className="pt-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Profile</h1>
        </div>
        
        {/* User Profile Card */}
        <div className="bg-card rounded-xl overflow-hidden border shadow-soft mb-6 animate-fade-in">
          <div className="bg-primary/10 px-6 py-8 flex flex-col items-center">
            <UserAvatar src={user.avatar} alt={user.name} size="lg" />
            <h2 className="text-xl font-bold mt-3">{user.name}</h2>
            
            {/* Location */}
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{user.location}</span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <PointsBadge points={user.points} />
              {isPremium && (
                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center">
                  <CrownIcon size={12} className="mr-1" />
                  Premium
                </span>
              )}
              {/* Role Badge */}
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                {roleBadge.icon}
                {roleBadge.name}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">₹{pointsInRupees}</div>
                <div className="text-sm text-muted-foreground">Value Earned</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{dealsPosted}</div>
                <div className="text-sm text-muted-foreground">Deals Posted</div>
              </div>
            </div>
            
            {/* Savings Tracker */}
            <div className="bg-green-50 text-green-800 rounded-lg p-4 mb-6 flex justify-between items-center">
              <div>
                <div className="font-semibold">You saved ₹{monthlySavings} this month!</div>
                <div className="text-xs text-green-700">Based on deals you've used</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 bg-green-100 hover:bg-green-200 text-green-800"
                onClick={handleShareSavings}
              >
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-3 text-muted-foreground" />
                <span>Joined {formattedJoinDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Award size={16} className="mr-3 text-muted-foreground" />
                <span>Level 2 Deal Hunter</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rewards Section */}
        <div className="bg-card rounded-xl overflow-hidden border shadow-soft mb-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <div className="p-4 bg-primary/5 flex justify-between items-center">
            <h3 className="font-semibold flex items-center">
              <Gift size={18} className="mr-2 text-primary" />
              Recommended Rewards for You
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => navigate('/rewards')}
            >
              See All
            </Button>
          </div>
          <div className="p-4 grid grid-cols-1 gap-3">
            {rewardSuggestions.map((reward, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">{reward.icon}</span>
                  <span>{reward.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={user.points >= reward.points ? "text-primary" : "text-muted-foreground"}
                  disabled={user.points < reward.points}
                >
                  <Zap size={14} className="mr-1" />
                  {reward.points} pts
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <button
            onClick={() => navigate('/my-deals')}
            className="bg-card hover:bg-muted/50 border rounded-lg p-4 flex justify-between items-center transition-colors"
          >
            <span className="font-medium">My Deals</span>
            <span className="text-muted-foreground">{dealsPosted}</span>
          </button>
          
          <button
            onClick={() => navigate('/saved-deals')}
            className="bg-card hover:bg-muted/50 border rounded-lg p-4 flex justify-between items-center transition-colors"
          >
            <span className="font-medium">Saved Deals</span>
            <span className="text-muted-foreground">3</span>
          </button>
          
          {!isPremium ? (
            <button
              onClick={handleUpgrade}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg p-4 flex justify-between items-center transition-colors"
            >
              <div className="flex items-center">
                <CrownIcon size={18} className="mr-2" />
                <span className="font-medium">Upgrade to Premium</span>
              </div>
              <span>₹499/year</span>
            </button>
          ) : (
            <div className="bg-amber-50 text-amber-800 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle2 size={18} className="mr-2" />
                <span className="font-medium">Premium Member</span>
              </div>
              <span className="text-xs text-muted-foreground">Expires in 364 days</span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg p-4 flex items-center justify-center transition-colors mt-4"
          >
            <LogOut size={18} className="mr-2" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Profile;

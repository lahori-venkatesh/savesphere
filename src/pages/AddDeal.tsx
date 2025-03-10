
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  Image, 
  MapPin,
  Tag,
  Calendar,
  Store,
  Info,
  CheckCircle,
  Building,
  GraduationCap,
  Home,
  Briefcase,
  Globe,
  Link,
  ExternalLink,
  QrCode,
  AlertTriangle,
  Upload,
  ShoppingCart
} from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavbar from '@/components/layout/BottomNavbar';
import { dealCategories } from '@/utils/mockData';
import { currentUser } from '@/utils/userData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DealFilter } from '@/utils/types';

const AddDeal: React.FC = () => {
  const navigate = useNavigate();
  
  // Common fields
  const [dealImage, setDealImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [store, setStore] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [dealType, setDealType] = useState<DealFilter>('in-store');
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In-store deal fields
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [imageVerified, setImageVerified] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  
  // Online deal fields
  const [promoCode, setPromoCode] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [isDuplicateCode, setIsDuplicateCode] = useState(false);
  
  // Affiliate deal fields
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [affiliateDetails, setAffiliateDetails] = useState<{
    title?: string;
    description?: string;
    discount?: string;
    platform?: string;
  } | null>(null);
  const [isLoadingAffiliateDetails, setIsLoadingAffiliateDetails] = useState(false);
  
  // Set default expiry date to 24 hours from now
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    setExpiryDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  
  // Get user's current location for verification
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          // Set smart defaults based on user category
          if (currentUser.category === 'student') {
            // For students, suggest nearby college areas
            setLocation('Near Mumbai University');
          } else if (currentUser.location) {
            // For others, use their saved location
            setLocation(currentUser.location);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  // Verify location is close to user's current location
  const verifyLocation = () => {
    if (!userLocation) {
      toast({
        title: "Location Access Required",
        description: "Please allow location access to verify your deal location",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would perform distance calculation between the entered location
    // and the user's current location. Here we're just simulating verification.
    setTimeout(() => {
      setLocationVerified(true);
      toast({
        title: "Location Verified",
        description: "Your location has been verified for this deal",
      });
    }, 1000);
  };
  
  // Simulate image verification process
  const verifyImage = () => {
    if (!dealImage) {
      toast({
        title: "Image Required",
        description: "Please upload a photo of the deal to verify",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would perform image analysis here
    setIsSubmitting(true);
    setTimeout(() => {
      setImageVerified(true);
      setIsSubmitting(false);
      toast({
        title: "Image Verified",
        description: "Your deal photo has been verified",
      });
    }, 1500);
  };

  // Verify that promo code is not a duplicate
  const verifyPromoCode = () => {
    if (!promoCode) {
      toast({
        title: "Promo Code Required",
        description: "Please enter a promo code to verify",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would check against existing codes in your database
    setIsSubmitting(true);
    setTimeout(() => {
      setIsDuplicateCode(false);
      setIsSubmitting(false);
      toast({
        title: "Code Verified",
        description: "This promo code is unique and has been verified",
      });
    }, 1000);
  };

  // Fetch affiliate details from URL
  const fetchAffiliateDetails = () => {
    if (!affiliateUrl) {
      toast({
        title: "URL Required",
        description: "Please enter an affiliate URL to fetch details",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would use web scraping or an API to fetch details
    setIsLoadingAffiliateDetails(true);
    setTimeout(() => {
      // Simulating fetched data
      setAffiliateDetails({
        title: "40% off on Zomato orders",
        description: "Get 40% off on your first 5 orders with Zomato",
        discount: "40%",
        platform: "Zomato"
      });
      
      // Auto-fill the form fields
      setTitle("40% off on Zomato orders");
      setDescription("Get 40% off on your first 5 orders with Zomato");
      setDiscount("40%");
      setPlatform("Zomato");
      setStore("Zomato");
      
      setIsLoadingAffiliateDetails(false);
      toast({
        title: "Details Fetched",
        description: "Deal details have been extracted from the URL",
      });
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Common validations
    if (!title || !discount || !store || !category || !expiryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Type-specific validations
    if (dealType === 'in-store') {
      // Check verification requirements for in-store deals
      if (!dealImage) {
        toast({
          title: "Image Required",
          description: "Please upload a photo of the deal to post",
          variant: "destructive"
        });
        return;
      }
      
      if (!locationVerified) {
        toast({
          title: "Location Verification Required",
          description: "Please verify your location to continue",
          variant: "destructive"
        });
        return;
      }
      
      if (!imageVerified) {
        toast({
          title: "Image Verification Required",
          description: "Please verify your deal photo to continue",
          variant: "destructive"
        });
        return;
      }
    } else if (dealType === 'online') {
      // Validate online deal specific fields
      if (!promoCode) {
        toast({
          title: "Promo Code Required",
          description: "Please enter a valid promo code",
          variant: "destructive"
        });
        return;
      }
      
      if (!platform) {
        toast({
          title: "Platform Required",
          description: "Please select or enter a platform (e.g., Amazon, Myntra)",
          variant: "destructive"
        });
        return;
      }

      if (isDuplicateCode) {
        toast({
          title: "Duplicate Code",
          description: "This promo code already exists in our system",
          variant: "destructive"
        });
        return;
      }
    } else if (dealType === 'affiliate') {
      // Validate affiliate deal specific fields
      if (!affiliateUrl) {
        toast({
          title: "Affiliate URL Required",
          description: "Please enter a valid affiliate URL",
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would submit this to your backend
    setTimeout(() => {
      toast({
        title: "Deal Posted Successfully!",
        description: "Your deal has been submitted and is now live",
      });
      navigate('/');
    }, 1000);
  };
  
  // Simulate camera/image upload by setting a placeholder image
  const handleImageUpload = () => {
    setDealImage('https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80');
    setImageVerified(false); // Reset verification when new image is uploaded
  };

  // Simulate QR code upload
  const handleQRCodeUpload = () => {
    setQrCodeImage('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleStorePromoCode');
    toast({
      title: "QR Code Uploaded",
      description: "Store QR code has been added to your deal",
    });
  };
  
  // Set business template
  const useBusinessTemplate = () => {
    setIsBusinessAccount(true);
    setStore(currentUser.name + "'s Business");
    setCategory("Retail");
    // Set longer expiry for business accounts (7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setExpiryDate(nextWeek.toISOString().split('T')[0]);
    
    toast({
      title: "Business Template Applied",
      description: "You're now posting as a business account",
    });
  };

  // Reset form when deal type changes
  const handleDealTypeChange = (type: string) => {
    setDealType(type as DealFilter);
    setDealImage(null);
    setImageVerified(false);
    setLocationVerified(false);
    setQrCodeImage(null);
    setIsDuplicateCode(false);
    setAffiliateDetails(null);
  };

  // Function to render different form sections based on deal type
  const renderDealTypeFields = () => {
    switch (dealType) {
      case 'in-store':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location <span className="text-xs text-muted-foreground">(Required)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationVerified(false);
                  }}
                  placeholder="Store address"
                  className={`w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${locationVerified ? 'ring-1 ring-primary' : ''}`}
                  required
                />
                {locationVerified && (
                  <CheckCircle size={18} className="absolute right-3 top-2.5 text-primary" />
                )}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {currentUser.category === 'student'
                    ? "Deals near your college are more likely to be verified"
                    : "Add a precise location for better visibility"}
                </p>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={verifyLocation}
                    className={`text-xs ${locationVerified ? 'text-primary' : 'text-muted-foreground'} hover:text-primary flex items-center`}
                  >
                    <MapPin size={12} className="mr-1" />
                    {locationVerified ? 'Verified' : 'Verify Location'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (userLocation) {
                        setLocation("Current Location");
                        setLocationVerified(false);
                      }
                    }}
                    className="text-xs text-primary flex items-center"
                  >
                    <MapPin size={12} className="mr-1" />
                    Use Current Location
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="qrcode" className="block text-sm font-medium mb-1">
                Store QR Code <span className="text-xs text-muted-foreground">(Optional)</span>
              </label>
              <div className="border rounded-lg p-4 bg-muted/30 flex flex-col items-center justify-center text-center">
                {qrCodeImage ? (
                  <div className="relative w-32 h-32 mb-2">
                    <img 
                      src={qrCodeImage} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setQrCodeImage(null)}
                      className="absolute -top-2 -right-2 p-1 bg-background rounded-full border"
                    >
                      <ArrowLeft size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <QrCode size={40} className="text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Add store-provided QR code for easier redemption
                    </p>
                  </>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleQRCodeUpload}
                  size="sm"
                >
                  {qrCodeImage ? 'Change QR Code' : 'Upload QR Code'}
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'online':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium mb-1">
                Platform <span className="text-xs text-muted-foreground">(Required)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                >
                  <option value="">Select platform</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Myntra">Myntra</option>
                  <option value="Ajio">Ajio</option>
                  <option value="Swiggy">Swiggy</option>
                  <option value="Zomato">Zomato</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="promoCode" className="block text-sm font-medium mb-1">
                Promo Code <span className="text-xs text-muted-foreground">(Required)</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="promoCode"
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setIsDuplicateCode(false);
                  }}
                  placeholder="e.g., SUMMER50, MYNTRA20"
                  className={`w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${isDuplicateCode ? 'border-destructive' : ''}`}
                  required
                />
                {isDuplicateCode && (
                  <AlertTriangle size={18} className="absolute right-3 top-2.5 text-destructive" />
                )}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {isDuplicateCode 
                    ? "This code already exists in our system" 
                    : "Enter the exact code as shown on the platform"}
                </p>
                <button
                  type="button"
                  onClick={verifyPromoCode}
                  className="text-xs text-primary flex items-center"
                >
                  <CheckCircle size={12} className="mr-1" />
                  Verify Code
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="sourceUrl" className="block text-sm font-medium mb-1">
                Source URL <span className="text-xs text-muted-foreground">(Optional)</span>
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="e.g., https://www.amazon.in/deals"
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Where did you find this deal? (Twitter, Reddit, etc.)
              </p>
            </div>
          </div>
        );
      
      case 'affiliate':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="affiliateUrl" className="block text-sm font-medium mb-1">
                Affiliate URL <span className="text-xs text-muted-foreground">(Required)</span>
              </label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="affiliateUrl"
                  type="url"
                  value={affiliateUrl}
                  onChange={(e) => {
                    setAffiliateUrl(e.target.value);
                    setAffiliateDetails(null);
                  }}
                  placeholder="Paste your affiliate link here"
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="mt-1 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fetchAffiliateDetails}
                  disabled={isLoadingAffiliateDetails || !affiliateUrl}
                  className="text-xs"
                >
                  {isLoadingAffiliateDetails ? 'Fetching...' : 'Fetch Details'}
                </Button>
              </div>
            </div>
            
            {affiliateDetails && (
              <div className="bg-muted/30 p-3 rounded-lg border">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <CheckCircle size={16} className="mr-2 text-success" />
                  Details extracted successfully
                </h3>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li><span className="font-medium">Title:</span> {affiliateDetails.title}</li>
                  <li><span className="font-medium">Discount:</span> {affiliateDetails.discount}</li>
                  <li><span className="font-medium">Platform:</span> {affiliateDetails.platform}</li>
                </ul>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="pt-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-foreground/80 hover:text-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold ml-2">Add New Deal</h1>
          </div>
          
          {!isBusinessAccount ? (
            <Button
              variant="outline"
              size="sm"
              onClick={useBusinessTemplate}
              className="flex items-center gap-1 text-xs"
            >
              <Building size={14} />
              Business Mode
            </Button>
          ) : (
            <div className="flex items-center gap-1 text-primary text-xs font-medium">
              <Building size={14} />
              Business Account
            </div>
          )}
        </div>
        
        {/* User Category Indicator */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          Posting as: 
          <span className="ml-2 flex items-center text-foreground font-medium">
            {currentUser.category === 'student' ? (
              <>
                <GraduationCap size={16} className="mr-1 text-primary" />
                Student
              </>
            ) : currentUser.category === 'family' ? (
              <>
                <Home size={16} className="mr-1 text-primary" />
                Family
              </>
            ) : (
              <>
                <Briefcase size={16} className="mr-1 text-primary" />
                Professional
              </>
            )}
          </span>
        </div>
        
        {/* Deal Type Tabs */}
        <Tabs
          defaultValue="in-store"
          value={dealType}
          onValueChange={handleDealTypeChange}
          className="mb-6"
        >
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="in-store" className="flex items-center">
              <Store size={16} className="mr-2" />
              In-Store
            </TabsTrigger>
            <TabsTrigger value="online" className="flex items-center">
              <Globe size={16} className="mr-2" />
              Online
            </TabsTrigger>
            <TabsTrigger value="affiliate" className="flex items-center">
              <ExternalLink size={16} className="mr-2" />
              Affiliate
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload section - only shown for in-store deals */}
          {dealType === 'in-store' && (
            <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center text-center animate-scale-in">
              {dealImage ? (
                <div className="relative w-full">
                  <img 
                    src={dealImage} 
                    alt="Deal preview" 
                    className={`w-full h-48 object-cover rounded-lg ${imageVerified ? 'ring-2 ring-primary' : ''}`}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {imageVerified && (
                      <div className="p-2 bg-primary text-primary-foreground rounded-full">
                        <CheckCircle size={18} />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setDealImage(null)}
                      className="p-2 bg-background/80 backdrop-blur-sm rounded-full"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  </div>
                  {!imageVerified && (
                    <Button
                      type="button" 
                      onClick={verifyImage}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify Image'}
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-3 p-4 bg-muted rounded-full">
                    <Camera size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Add a photo of the deal</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a clear photo of the price tag, receipt, or product
                  </p>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center"
                    >
                      <Camera size={18} className="mr-2" />
                      Take Photo
                    </button>
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center"
                    >
                      <Image size={18} className="mr-2" />
                      Upload
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Common Deal details */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: "50ms" }}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Deal Title
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    dealType === 'in-store' 
                      ? (isBusinessAccount ? "e.g., Grand Opening Sale 50% Off" : "e.g., 50% Off All Produce") 
                      : dealType === 'online'
                      ? "e.g., FLAT ₹500 OFF on Electronics"
                      : "e.g., 40% off on Zomato orders"
                  }
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="discount" className="block text-sm font-medium mb-1">
                Discount
              </label>
              <input
                id="discount"
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g., 20%, BOGO, $5 OFF"
                className="w-full px-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="store" className="block text-sm font-medium mb-1">
                Store/Brand Name
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="store"
                  type="text"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder={
                    dealType === 'in-store'
                      ? "e.g., Whole Foods, Target"
                      : "e.g., Amazon, Myntra, Swiggy"
                  }
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                required
              >
                <option value="">Select a category</option>
                {dealCategories.filter(cat => cat !== "All Deals").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                Expiry Date <span className="text-xs text-muted-foreground">(Required)</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                <input
                  id="expiry"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isBusinessAccount 
                  ? "Business deals can stay active for up to 7 days" 
                  : "Regular deals expire after 24 hours by default"}
              </p>
            </div>

            {/* Deal type specific fields */}
            {renderDealTypeFields()}
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  dealType === 'in-store'
                    ? (isBusinessAccount ? "Enter details about your business promotion..." : "Add details about the deal...")
                    : "Enter details, terms & conditions, or restrictions..."
                }
                className="w-full px-3 py-2 bg-muted/50 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[100px]"
              ></textarea>
            </div>
          </div>
          
          <div className="flex items-center pt-4 text-xs text-muted-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Info size={14} className="mr-2" />
            <p>By posting, you confirm this deal is legitimate and accurate. False information may result in account restrictions.</p>
          </div>
          
          <div className="pt-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
            <Button
              type="submit"
              className="w-full py-3 font-medium"
              disabled={isSubmitting || 
                (dealType === 'in-store' && (!locationVerified || !imageVerified)) ||
                (dealType === 'online' && isDuplicateCode)
              }
            >
              {isSubmitting ? 'Posting...' : 'Post Deal'}
            </Button>
          </div>
        </form>
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default AddDeal;

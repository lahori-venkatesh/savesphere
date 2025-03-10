
// Helper functions
export const formatDistanceToNow = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

export const formatTimeRemaining = (dateString: string): string => {
  const expiryDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((expiryDate.getTime() - now.getTime()) / 1000);
  
  if (diffInSeconds <= 0) return "Expired";
  
  if (diffInSeconds < 60) return `${diffInSeconds}s left`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m left`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h left`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d left`;
};

export const getExpiryColor = (dateString: string): string => {
  const expiryDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours <= 3) return "text-destructive bg-destructive/10";  // Less than 3 hours
  if (diffInHours <= 12) return "text-warning bg-warning/10";  // Less than 12 hours
  return "text-success bg-success/10";  // More than 12 hours
};

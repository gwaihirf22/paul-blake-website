import { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      // Get scroll position using the most reliable method
      const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // Get document height using the most reliable method
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );

      const windowHeight = window.innerHeight;
      const scrollableHeight = docHeight - windowHeight;
      
      // Calculate progress
      let scrollProgress = 0;
      if (scrollableHeight > 0) {
        scrollProgress = (scrollTop / scrollableHeight) * 100;
      }
      
      const clampedProgress = Math.min(100, Math.max(0, scrollProgress));
      setProgress(clampedProgress);
    };

    // Check scroll position every 100ms (polling approach due to Bug #001)
    calculateProgress();
    const interval = setInterval(calculateProgress, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress; 
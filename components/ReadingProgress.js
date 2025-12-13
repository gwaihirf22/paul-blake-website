import { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [hasTrackedCompletion, setHasTrackedCompletion] = useState(false);

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

      // Cloudflare Web Analytics: Track blog post read completion at 90% scroll
      // Note: Passive tracking only (Cloudflare doesn't support custom events)
      // Time-on-page metrics automatically tracked by beacon serve as engagement proxy
      if (clampedProgress >= 90 && !hasTrackedCompletion) {
        setHasTrackedCompletion(true);
        console.log('[Analytics] Blog post read completion:', {
          scrollDepth: clampedProgress,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Check scroll position every 100ms (polling approach due to Bug #001)
    calculateProgress();
    const interval = setInterval(calculateProgress, 100);

    return () => {
      clearInterval(interval);
    };
  }, [hasTrackedCompletion]);

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
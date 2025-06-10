import { useEffect } from 'react';

export default function ScrollbarVisibility() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const scrollbarZone = 20; // 20px from right edge
      const windowWidth = window.innerWidth;
      const mouseX = e.clientX;
      
      // Check if mouse is within the scrollbar zone (right edge)
      const isInScrollbarZone = mouseX >= windowWidth - scrollbarZone;
      
      if (isInScrollbarZone) {
        // Show scrollbar for both Firefox and Webkit browsers
        document.documentElement.classList.add('show-scrollbar');
        document.body.classList.add('show-webkit-scrollbar');
      } else {
        // Hide scrollbar for both Firefox and Webkit browsers
        document.documentElement.classList.remove('show-scrollbar');
        document.body.classList.remove('show-webkit-scrollbar');
      }
    };

    const handleMouseLeave = () => {
      // Hide scrollbar when mouse leaves the window
      document.documentElement.classList.remove('show-scrollbar');
      document.body.classList.remove('show-webkit-scrollbar');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('show-scrollbar');
      document.body.classList.remove('show-webkit-scrollbar');
    };
  }, []);

  // This component doesn't render anything
  return null;
} 
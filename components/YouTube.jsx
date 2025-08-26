export function YouTube({ videoId, title = "YouTube video" }) {
  return (
    <div className="youtube-breakout">
      <div className="youtube-wrapper">
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      <style jsx>{`
        .youtube-breakout {
          margin: 0.5rem 0 !important;
          width: 100% !important;
        }
        
        .youtube-wrapper {
          max-width: 100% !important;
          margin: 0 auto !important;
          width: 100% !important;
        }
        
        .video-container {
          position: relative !important;
          width: 100% !important;
          height: 0 !important;
          padding-bottom: 56.25% !important;
          background: #000 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        }
        
        .video-container iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 8px !important;
        }
        
        @media (max-width: 768px) {
          .youtube-breakout {
            padding: 0 0.5rem !important;
          }
          
          .youtube-wrapper {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
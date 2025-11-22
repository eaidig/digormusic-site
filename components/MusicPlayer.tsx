
import React from 'react';

const MusicPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-[#33691E] rounded-3xl p-4 shadow-2xl relative overflow-hidden border-t border-[#558b2f]">
      <div className="relative z-10">
        <iframe 
          style={{ borderRadius: '12px' }} 
          src="https://open.spotify.com/embed/artist/3ZTgiRKKPK2RMWQLIUfmO4?utm_source=generator&theme=0" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Player"
        ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;

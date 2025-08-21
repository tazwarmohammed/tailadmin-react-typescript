import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen h-screen overflow-hidden">
      {/* Background image - showing original lighter appearance */}
      <div 
        className="absolute inset-0"
        style={{
          // backgroundImage: `url("/light-blue-curve.jpg")`,
          // backgroundImage: `url("/block-image-blue.jpg")`,
          // backgroundImage: `url("/dark-blue-curve.jpg")`,
          // backgroundImage: `url("/blue-yellow-wave.jpg")`,
          // backgroundImage: `url("/blue-boxed.jpg")`,
          // backgroundImage: `url("/abstract-grainy-texture-background.jpg")`,
          backgroundImage: `url("/money-coin-bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100vw'
        }}
      />
      
      {/* Very subtle overlay to maintain contrast for the form */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-3xl"></div>
          
          {/* Card content */}
          <div className="relative px-8 py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

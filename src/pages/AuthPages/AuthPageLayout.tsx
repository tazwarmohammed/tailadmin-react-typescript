import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Subtle pattern overlay matching the screenshot */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='20' y='30' font-family='Arial' font-size='14' transform='rotate(-45 20 30)'%3ETailAdmin%3C/text%3E%3Ctext x='60' y='70' font-family='Arial' font-size='14' transform='rotate(-45 60 70)'%3ETailAdmin%3C/text%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
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

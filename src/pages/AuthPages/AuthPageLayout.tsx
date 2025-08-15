import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-1 flex items-center justify-center w-full h-screen bg-white">
      <div className="w-full max-w-md px-4 sm:px-0">{children}</div>
    </div>
  );
}

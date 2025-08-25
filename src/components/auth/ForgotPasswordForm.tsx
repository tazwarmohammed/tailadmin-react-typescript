import { useState } from "react";
import { useNavigate } from "react-router";

export default function ForgotPasswordForm() {
  const [emailOrUserId, setEmailOrUserId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageKey, setMessageKey] = useState(0); // Key to trigger animation
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrUserId.trim()) {
      setMessage("Please enter your user ID or email address");
      setMessageKey((prev) => prev + 1);
      return;
    }

    // Simulate sending reset email
    setMessage("Password reset instructions have been sent to your email");
    setMessageKey((prev) => prev + 1);
    
    // In a real app, you would make an API call here
    console.log("Password reset requested for:", emailOrUserId);
  };

  const handleBackToLogin = () => {
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        @keyframes vibrate {
          0% { transform: translateX(0); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
          30% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          50% { transform: translateX(-1px); }
          60% { transform: translateX(1px); }
          70% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(-0.5px); }
          100% { transform: translateX(0); }
        }
        
        /* Force email icon visibility */
        .email-icon-container svg {
          fill: #374151 !important;
          opacity: 1 !important;
          display: block !important;
          visibility: visible !important;
          color: #374151 !important;
        }
      `}</style>
      <div className="text-center">
        {/* Logo Section */}
        <div className="mb-2">
          <img
            src="/images/logo/brac-bank-text-logo.svg"
            alt="BRAC Bank Logo"
            className="mx-auto w-auto max-w-[15rem]"
          />
        </div>

        {/* iFlash Title */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            <span style={{ fontFamily: "Trebuchet MS", fontSize: "1rem", color: "goldenrod" }}>
              RTGS iFlash Web Portal
            </span>
          </h2>
        </div>

        {/* Forgot Password Title */}
        {/* <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700">
            Reset Your Password
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Enter your user ID or email address and we'll send you instructions to reset your password.
          </p>
        </div> */}

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/UserID Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none email-icon-container">
              <svg
                className="h-5 w-5"
                fill="#374151"
                viewBox="0 0 20 20"
                style={{
                  fill: "#374151 !important",
                  color: "#374151 !important",
                  opacity: 1,
                  zIndex: 10,
                }}
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter user ID or email"
              value={emailOrUserId}
              onChange={(e) => setEmailOrUserId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Fixed height message area - minimal spacing */}
          <div className="h-3 -mt-4">
            {message && (
              <div
                key={messageKey}
                className={`text-sm font-medium ${
                  message.includes("sent") ? "text-green-600" : "text-red-400"
                }`}
                style={{
                  animation: "vibrate 0.5s ease-in-out",
                }}
              >
                {message}
              </div>
            )}
          </div>

          {/* Send Button - minimal gap from input field */}
          <div className="-mt-1">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white hover:text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent flex items-center justify-center gap-2"
            >
              {/* Send Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 3 3 9-3 9 19-9Z" />
                <path d="m6 12 13 0" />
              </svg>
              {/* SEND RESET INSTRUCTIONS */}
              Reset
            </button>
          </div>

          {/* Back to Login - minimal gap from send button */}
          <div className="-mt-3">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-gray-300 hover:text-gray-800 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

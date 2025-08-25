import { useState, useEffect } from "react";
import { useLocation, useNavigate, Location } from "react-router";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0); // Key to trigger animation on same error
  const [isMousePressed, setIsMousePressed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as Location & {
    state?: { from?: { pathname?: string } };
  };
  let from: string = location.state?.from?.pathname || "/ecommerce";
  if (from.startsWith("/signin")) from = "/ecommerce";

  const doSignIn = () => {
    if (username === "test" && password === "test") {
      localStorage.setItem("isAuthenticated", "true");
      setError(null);
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials");
      setErrorKey((prev) => prev + 1); // Increment key to trigger animation
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSignIn();
  };

  // Handle global mouse up event (for when user releases mouse outside the button)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMousePressed) {
        setIsMousePressed(false);
        setShowPassword(false);
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isMousePressed]);

  const handleMouseDown = () => {
    setIsMousePressed(true);
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
    setShowPassword(false);
  };

  const handleMouseLeave = () => {
    if (isMousePressed) {
      setIsMousePressed(false);
      setShowPassword(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
        
        /* Force password icon visibility */
        .password-icon-container svg {
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
            {/* steelblue/goldenrod color good for this text */}
            <span style={{ fontFamily: "Trebuchet MS", fontSize: "1rem", color: "goldenrod" }}>
              RTGS iFlash Web Portal
            </span>
          </h2>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5"
                fill="#000000ff"
                viewBox="0 0 20 20"
                style={{
                  fill: "#374151 !important",
                  color: "#374151 !important",
                  opacity: 1,
                  zIndex: 10,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none password-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="10 0 100 100"
                fill="#000000ff"
                style={
                  {
                    opacity: 1,
                    zIndex: 999,
                    display: "block",
                    visibility: "visible",
                    minWidth: "20px",
                    minHeight: "20px",
                  } as React.CSSProperties
                }
              >
                <path
                  fill="#000000ff"
                  d="M82.105 44.218h-8.858v-8.431c.003-.036.003-.071.003-.102c0-13.073-10.636-23.71-23.713-23.71c-13.073 0-23.71 10.637-23.71 23.71v8.533h-7.931a2.62 2.62 0 0 0-2.621 2.621v38.565a2.62 2.62 0 0 0 2.621 2.621h64.21a2.62 2.62 0 0 0 2.621-2.621V46.839a2.621 2.621 0 0 0-2.622-2.621zm-42.314-8.533c0-5.375 4.371-9.741 9.746-9.741c5.341 0 9.695 4.32 9.747 9.649l-.003.031h.003v8.594H39.791v-8.533z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent"
            >
              {!showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-300 hover:text-gray-800 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-300 hover:text-gray-800 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m6.121-6.121L21 3m-6.879 6.879L12 12m-3.879-3.879l4.242 4.242M21 21l-5.315-5.315"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Fixed height error message area - minimal spacing with subtle vibration */}
          <div className="h-3 -mt-4">
            {error && (
              <div
                key={errorKey}
                className="text-red-400 text-sm font-medium"
                style={{
                  animation: "vibrate 0.5s ease-in-out",
                }}
              >
                {error}
              </div>
            )}
          </div>

          {/* Login Button - minimal gap from password field */}
          <div className="-mt-1">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white hover:text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent flex items-center justify-center gap-2"
            >
              {/* Login Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M3 12h13l-3 -3" />
                <path d="M13 15l3 -3" />
              </svg>
              LOGIN
            </button>
          </div>

          {/* Forgot Password - minimal gap from login button */}
          <div className="-mt-3">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-300 hover:text-gray-800 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

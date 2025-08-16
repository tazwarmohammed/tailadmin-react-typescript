import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  let from: string = location.state?.from?.pathname || "/ecommerce";
  if (from.startsWith("/signin")) from = "/ecommerce";

  const doSignIn = () => {
    if (username === "test" && password === "test") {
      localStorage.setItem("isAuthenticated", "true");
      setError(null);
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials. Use test / test for development.");
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

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
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

  return (
    <div className="text-center">
      {/* Logo Section */}
      <div className="mb-12">
        <img 
          src="/images/logo/logo.svg" 
          alt="TailAdmin" 
          className="mx-auto h-16 w-auto"
        />
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-black/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-white/100 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-sm border border-black/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-white/100 focus:border-transparent transition-all duration-200"
          />
            <button
              type="button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
            >
              {!showPassword ? (
                <svg className="h-5 w-5 text-white hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-white hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m6.121-6.121L21 3m-6.879 6.879L12 12m-3.879-3.879l4.242 4.242M21 21l-5.315-5.315" />
                </svg>
              )}
            </button>
        </div>

        {/* Error Message - positioned directly below password field */}
        {error && (
          <div className="text-red-400 text-sm font-medium" style={{ marginBottom: '0px' }}>
            {error}
          </div>
        )}

        {/* Login Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            LOGIN
          </button>
        </div>

        {/* Forgot Password */}
        <div>
          <button
            type="button"
            className="text-white/20 hover:text-white text-sm transition-colors"
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
}

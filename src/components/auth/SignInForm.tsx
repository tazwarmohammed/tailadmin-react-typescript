import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div className="relative">
      {/* Logo Section */}
      <div className="text-center mb-8">
        <img 
          src="/images/logo/logo.svg" 
          alt="TailAdmin" 
          className="mx-auto h-14 w-auto filter drop-shadow-sm"
        />
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>
            Username
          </Label>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 bg-white/50 border-gray-200/40 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm"
          />
        </div>
        
        <div>
          <Label>
            Password
          </Label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50 border-gray-200/40 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm pr-12"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:scale-110 transition-transform"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 hover:fill-gray-700 size-5 transition-colors" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 hover:fill-gray-700 size-5 transition-colors" />
              )}
            </span>
          </div>
        </div>

        {error ? (
          <div className="p-4 text-sm text-red-700 bg-red-50/60 border border-red-200/40 rounded-xl backdrop-blur-sm">
            {error}
          </div>
        ) : null}

        <div className="pt-2">
          <Button className="w-full bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-700/95 hover:to-indigo-700/95 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 backdrop-blur-sm" size="sm" onClick={doSignIn}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

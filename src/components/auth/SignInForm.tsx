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
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-6 mx-auto">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-4">
            <h1 className="mb-1 font-semibold text-gray-800 text-title-sm">
              Sign In
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>
                    Username
                  </Label>
                  <Input
                    placeholder="test"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="test"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {error ? (
                  <div className="text-error-500 text-theme-xs">{error}</div>
                ) : null}
                <div>
                  <Button className="w-full" size="sm" onClick={doSignIn}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

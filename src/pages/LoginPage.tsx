import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStores";
import { PageShell } from "../components/PageShell";
import { Eye, EyeOff } from "lucide-react";
import carrotLogo from "../assets/carrot 3.svg";

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isValid) return;
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    navigate("/signin");
  };

  return (
    <PageShell>
      <div className="flex min-h-screen flex-col px-6 py-4 md:min-h-full">
        {/* Carrot Logo */}
        {/* Carrot Logo */}
        <div className="mb-8 flex justify-center pt-8">
          <img
            src={carrotLogo}
            alt="Carrot logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-heading mb-1 text-left text-gray-900">Loging</h1>
          <p className="text-subheading text-left text-gray-500">
            Enter your emails and password
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="imshuvo97@gmail.com"
              className="w-full border-b border-gray-200 bg-transparent py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b border-gray-200 bg-transparent py-3 pr-10 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col items-center gap-4 pb-6">
          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!isValid || isLoading}
            className="btn-primary"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Sign up link */}
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-primary"
            >
              Singup
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

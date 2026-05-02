import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStores";
import { PageShell } from "../components/PageShell";
import { Eye, EyeOff } from "lucide-react";
import carrotLogo from "../assets/carrot 3.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
}

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const errors = validateForm(email, password);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLogin = async () => {
    // touch all fields on submit to show all errors
    setTouched({ email: true, password: true });
    if (!isValid) return;
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    navigate("/location");
  };

  return (
    <PageShell>
      <div className="flex min-h-screen flex-col px-6 py-4 md:min-h-full">
        {/* Logo */}
        <div className="mb-8 flex justify-center pt-8">
          <img
            src={carrotLogo}
            alt="Carrot logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-heading mb-1 text-left text-gray-900">Login</h1>
          <p className="text-subheading text-left text-gray-500">
            Enter your email and password
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
              onBlur={() => handleBlur("email")}
              placeholder="example@gmail.com"
              className={`w-full border-b bg-transparent py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-300 ${
                touched.email && errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`w-full border-b bg-transparent py-3 pr-10 text-base text-gray-900 outline-none transition placeholder:text-gray-400 ${
                  touched.password && errors.password
                    ? "border-red-400"
                    : "border-gray-200 focus:border-primary"
                }`}
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
            {touched.password && errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}

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
        <div className="mt-auto flex flex-col items-center gap-4 pb-4 pt-3">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-primary"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

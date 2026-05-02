import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStores";
import { PageShell } from "../components/PageShell";
import { Eye, EyeOff } from "lucide-react";
import carrotLogo from "../assets/carrot 3.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(name: string, email: string, password: string) {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!name.trim()) {
    errors.name = "Username is required";
  } else if (name.trim().length < 2) {
    errors.name = "Username must be at least 2 characters";
  }

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

export function SignupPage() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const errors = validateForm(name, email, password);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: "name" | "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignup = async () => {
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;
    setIsLoading(true);
    await signup(name, email);
    setIsLoading(false);
    navigate("/signin");
  };

  const inputClass = (field: "name" | "email" | "password") =>
    `w-full border-b bg-transparent py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-300 ${
      touched[field] && errors[field]
        ? "border-red-400"
        : "border-gray-200 focus:border-primary"
    }`;

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
          <h1 className="text-heading mb-1 text-left text-gray-900">Sign Up</h1>
          <p className="text-subheading text-left text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="John Doe"
              className={inputClass("name")}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="example@gmail.com"
              className={inputClass("email")}
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
                className={`${inputClass("password")} pr-10`}
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
          </div>

          {/* Terms */}
          <p className="text-sm leading-relaxed text-gray-400">
            By continuing you agree to our{" "}
            <button className="text-primary underline">Terms of Service</button>{" "}
            and{" "}
            <button className="text-primary underline">Privacy Policy</button>
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col items-center gap-4 pb-4 pt-3">
          <button
            onClick={handleSignup}
            disabled={isLoading}
            className={`btn-primary transition-opacity ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-primary"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

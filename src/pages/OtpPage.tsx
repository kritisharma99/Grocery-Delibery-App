import React from "react";
import { useAuthStore } from "../stores/authStores";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function OtpPage() {
  const navigate = useNavigate();
  const phone = useAuthStore((s) => s.phone);
  const countryCode = useAuthStore((s) => s.countryCode);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const signInWithPhone = useAuthStore((s) => s.signInWithPhone);
  const authLoadingProvider = useAuthStore((s) => s.authLoadingProvider);

  const isLoading = authLoadingProvider === "phone";

  const [otp, setOtp] = React.useState("");
  const isComplete = otp.length === 4;

  const handleChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    setOtp(cleaned);
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    await verifyOtp();
    navigate("/location");
  };

  const handleResend = async () => {
    const fullPhone = `${countryCode}${phone}`;
    await signInWithPhone(fullPhone);
  };

  return (
    <PageShell>
      {/* ✅ flex col, full height — makes mt-auto work on bottom bar */}
      <div className="flex min-h-screen flex-col py-4 md:min-h-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex h-10 w-10 items-center justify-center self-start"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Title + Input */}
        <div>
          <h1 className="text-heading mb-3 text-left text-gray-900">
            Enter your 4-digit code
          </h1>

          <div className="mt-6">
            <label className="mb-2 block text-sm text-gray-500">Code</label>
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full border-b border-gray-200 bg-transparent py-3 text-2xl tracking-[0.6em] outline-none transition focus:border-primary"
              placeholder="----"
              maxLength={4}
            />
          </div>
        </div>

        {/* ✅ mt-auto pushes this to the bottom always */}
        <div className="mt-auto flex items-center justify-between pb-4">
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-green-600 disabled:opacity-50"
            style={{ fontSize: "18px" }}
          >
            {isLoading ? "Sending..." : "Resend Code"}
          </button>

          {/* Mobile Arrow */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isLoading}
            className="flex h-[67px] w-[67px] items-center justify-center rounded-full bg-primary text-white shadow-md disabled:opacity-40 md:hidden"
          >
            <ChevronRight />
          </button>

          {/* Desktop */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isLoading}
            className="hidden rounded-xl bg-primary px-6 py-3 text-white shadow-md disabled:opacity-40 md:block"
          >
            {isLoading ? "Verifying..." : "Proceed"}
          </button>
        </div>
      </div>
    </PageShell>
  );
}

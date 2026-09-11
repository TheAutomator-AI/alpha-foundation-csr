"use client";

import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://alpha-foundation-otp-backend.vercel.app";

export function PhoneOtpLogin() {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const sendOtp = async () => {
    setMessage("");
    const normalized = phone.replace(/\s+/g, "");

    if (!/^\+91\d{10}$/.test(normalized)) {
      setMessage("Enter a valid Indian mobile number, e.g. +919876543210.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Could not send OTP.");
      }

      setStep("otp");
      setMessage(data.development ? "Development OTP enabled. Use 123456." : "OTP sent. Check your phone.");
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : "Could not send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter the 6-digit OTP.");
      return;
    }

    const normalized = phone.replace(/\s+/g, "");
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized, otp }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Invalid or expired OTP.");
      }

      if (data.token) {
        localStorage.setItem("alpha_auth_token", data.token);
        setToken(data.token);
      }
      setMessage("Login successful.");
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setOtp("");
    setStep("phone");
    setMessage("");
    setToken(null);
  };

  if (token) {
    return (
      <div className="w-full max-w-md border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">Alpha Access</p>
        <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-white">Login successful</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Your mobile number has been verified.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 w-full border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-slate-300 transition hover:border-cyan-400 hover:text-white"
        >
          Sign in with another number
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">Alpha Access</p>
        <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-white">Sign in securely</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Use your mobile number. We’ll send a one-time password.</p>
      </div>

      {step === "phone" ? (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slate-500">Mobile number</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+919876543210"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <button
            type="button"
            onClick={sendOtp}
            disabled={loading}
            className="w-full border border-cyan-400/60 bg-cyan-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slate-500">6-digit OTP</span>
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-center font-mono text-lg tracking-[0.5em] text-white outline-none transition focus:border-cyan-400"
            />
          </label>
          <button
            type="button"
            onClick={verifyOtp}
            disabled={loading}
            className="w-full border border-cyan-400/60 bg-cyan-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify & Login"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="w-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 transition hover:text-white"
          >
            Use a different number
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-xs leading-5 text-slate-300">{message}</p>}
    </div>
  );
}

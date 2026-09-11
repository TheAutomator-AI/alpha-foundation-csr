"use client";

import { useEffect, useState } from "react";

const PHONE_PATTERN = /^[6-9]\d{9}$/;
const OTP_PATTERN = /^\d{6}$/;
const API = "/api";

export function PhoneOtpLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!resendIn) return;
    const timer = window.setInterval(() => setResendIn((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [resendIn]);

  const request = async (url: string, body: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || `Request failed (${response.status}).`);
    return data;
  };

  const sendOtp = async () => {
    setMessage("");
    if (!PHONE_PATTERN.test(mobile)) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setLoading(true);
    try {
      await request(`${API}/auth/send-otp`, { phone: `+91${mobile}` });
      setStep("otp");
      setOtp("");
      setResendIn(30);
      setMessage(`OTP sent to +91 ${mobile}. Check your SMS.`);
    } catch (error) {
      console.error("OTP send error", error);
      setMessage(error instanceof Error ? error.message : "Unable to send OTP right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setMessage("");
    if (!OTP_PATTERN.test(otp)) {
      setMessage("Enter the 6-digit OTP sent to your phone.");
      return;
    }
    setLoading(true);
    try {
      await request(`${API}/auth/verify-otp`, { phone: `+91${mobile}`, otp });
      setVerified(true);
      setMessage("Login successful. Your mobile number is verified.");
      window.setTimeout(() => { window.location.href = "/"; }, 900);
    } catch (error) {
      console.error("OTP verification error", error);
      setMessage(error instanceof Error ? error.message : "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const changeNumber = () => {
    setStep("phone");
    setOtp("");
    setMessage("");
    setResendIn(0);
    setVerified(false);
  };

  if (verified) {
    return (
      <div className="w-full max-w-md border border-emerald-400/30 bg-black/70 p-6 text-center backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">Alpha Access</p>
        <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-white">Login successful</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Your mobile number has been verified.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">Alpha Access</p>
        <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-white">Sign in securely</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Use your mobile number. We’ll send a real one-time password.</p>
      </div>

      {step === "phone" ? (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slate-500">Mobile number</span>
            <div className="flex border border-white/15 bg-white/5 focus-within:border-cyan-400">
              <div className="flex items-center border-r border-white/10 px-4 font-mono text-sm text-slate-300">IN&nbsp; +91</div>
              <input
                value={mobile}
                onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="9876543210"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm text-white outline-none"
              />
            </div>
          </label>
          <button type="button" onClick={sendOtp} disabled={loading} className="w-full border border-cyan-400/60 bg-cyan-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? "Sending…" : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">OTP sent to</p>
            <p className="mt-1 font-mono text-sm text-white">+91 {mobile}</p>
          </div>
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
          <button type="button" onClick={verifyOtp} disabled={loading} className="w-full border border-cyan-400/60 bg-cyan-400 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? "Verifying…" : "Verify & Login"}
          </button>
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={changeNumber} className="px-1 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-white">Change number</button>
            <button type="button" onClick={sendOtp} disabled={loading || resendIn > 0} className="px-1 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300 disabled:text-slate-600">
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      )}

      {message && <p className="mt-4 text-center text-xs leading-5 text-slate-300">{message}</p>}
    </div>
  );
}

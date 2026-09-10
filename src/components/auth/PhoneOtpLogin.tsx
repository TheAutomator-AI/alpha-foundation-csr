"use client";

import { useEffect, useRef, useState } from "react";
import {
  ConfirmationResult,
  FirebaseError,
  RecaptchaVerifier,
  signOut,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export function PhoneOtpLogin() {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);

  useEffect(() => {
    return () => {
      window.recaptchaVerifier?.clear();
      delete window.recaptchaVerifier;
    };
  }, []);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) return window.recaptchaVerifier;

    window.recaptchaVerifier = new RecaptchaVerifier(auth, "alpha-recaptcha", {
      size: "invisible",
      callback: () => undefined,
    });

    return window.recaptchaVerifier;
  };

  const sendOtp = async () => {
    setMessage("");
    const normalized = phone.replace(/\s+/g, "");

    if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
      setMessage("Enter a valid mobile number with country code, e.g. +919876543210.");
      return;
    }

    setLoading(true);
    try {
      const verifier = setupRecaptcha();
      confirmationResultRef.current = await signInWithPhoneNumber(auth, normalized, verifier);
      setStep("otp");
      setMessage("OTP sent. Check your phone.");
    } catch (error) {
      console.error(error);
      window.recaptchaVerifier?.clear();
      delete window.recaptchaVerifier;

      if (error instanceof FirebaseError) {
        setMessage(`Firebase error: ${error.code}. Check Authorized Domains and Phone Authentication.`);
      } else {
        setMessage("Could not send OTP. Check Firebase Phone Authentication setup.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResultRef.current) return;
    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await confirmationResultRef.current.confirm(otp);
      setMessage("Login successful.");
    } catch (error) {
      console.error(error);
      setMessage("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    try {
      await signOut(auth);
    } catch {
      // No active Firebase session is okay during reset.
    }
    confirmationResultRef.current = null;
    window.recaptchaVerifier?.clear();
    delete window.recaptchaVerifier;
    setOtp("");
    setStep("phone");
    setMessage("");
  };

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
      <div id="alpha-recaptcha" />
    </div>
  );
}

import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { verifyOtp } from "../../../lib/msg91";

const phonePattern = /^\+91\d{10}$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phone, otp } = req.body ?? {};
  if (typeof phone !== "string" || !phonePattern.test(phone) || typeof otp !== "string" || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: "Invalid phone number or OTP." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Authentication is not configured." });

  try {
    const result = await verifyOtp(phone, otp);
    if (!result.success) return res.status(401).json({ error: result.message || "Invalid or expired OTP." });

    const token = jwt.sign({ phone }, secret, { expiresIn: "7d" });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("OTP verification failed:", error instanceof Error ? error.message : "unknown error");
    return res.status(502).json({ error: "Unable to verify OTP right now. Please try again." });
  }
}

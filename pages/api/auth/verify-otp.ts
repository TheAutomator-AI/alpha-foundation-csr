import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { verifyOtp } from "../../../lib/msg91";

const phonePattern = /^\+91[6-9]\d{9}$/;
const otpPattern = /^\d{6}$/;

function allowCors(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phone, otp } = req.body ?? {};
  if (typeof phone !== "string" || !phonePattern.test(phone) || typeof otp !== "string" || !otpPattern.test(otp)) {
    return res.status(400).json({ error: "Invalid phone number or OTP." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Authentication service is not configured on the server." });

  try {
    const result = await verifyOtp(phone, otp);
    if (!result.success) return res.status(401).json({ error: result.message || "Invalid or expired OTP." });

    const token = jwt.sign({ phone }, secret, { expiresIn: "7d" });
    res.setHeader(
      "Set-Cookie",
      `alpha_auth=${token}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("OTP verification failed:", message);
    if (message === "MSG91 is not configured.") {
      return res.status(500).json({ error: "Authentication service is not configured on the server." });
    }
    return res.status(502).json({ error: "MSG91 could not verify the OTP. Please try again." });
  }
}

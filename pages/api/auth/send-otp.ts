import type { NextApiRequest, NextApiResponse } from "next";
import { sendOtp } from "../../../lib/msg91";

const phonePattern = /^\+91\d{10}$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phone } = req.body ?? {};
  if (typeof phone !== "string" || !phonePattern.test(phone)) {
    return res.status(400).json({ error: "Enter a valid Indian mobile number in +91XXXXXXXXXX format." });
  }

  try {
    const result = await sendOtp(phone);
    return res.status(200).json({ success: true, request: result });
  } catch (error) {
    console.error("OTP send failed:", error instanceof Error ? error.message : "unknown error");
    return res.status(502).json({ error: "Unable to send OTP right now. Please try again." });
  }
}

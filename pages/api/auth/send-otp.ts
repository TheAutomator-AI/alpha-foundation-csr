import type { NextApiRequest, NextApiResponse } from "next";
import { sendOtp } from "../../../lib/msg91";

const phonePattern = /^\+91[6-9]\d{9}$/;

function allowCors(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phone } = req.body ?? {};
  if (typeof phone !== "string" || !phonePattern.test(phone)) {
    return res.status(400).json({ error: "Enter a valid Indian mobile number in +91XXXXXXXXXX format." });
  }

  try {
    const result = await sendOtp(phone);
    return res.status(200).json({ success: true, request: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("OTP send failed:", message);
    if (message === "MSG91 is not configured.") {
      return res.status(500).json({ error: "Authentication service is not configured on the server." });
    }
    return res.status(502).json({ error: "MSG91 could not send the OTP. Please try again." });
  }
}

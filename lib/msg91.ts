type Msg91Response = {
  type?: string;
  message?: string;
  [key: string]: unknown;
};

function config() {
  const authkey = process.env.MSG91_AUTHKEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  if (!authkey || !templateId) throw new Error("MSG91 is not configured.");
  return { authkey, templateId };
}

export async function sendOtp(phone: string): Promise<Msg91Response> {
  const { authkey, templateId } = config();
  const url = new URL("https://control.msg91.com/api/v5/otp");
  url.searchParams.set("template_id", templateId);
  url.searchParams.set("mobile", phone.replace("+", ""));
  url.searchParams.set("authkey", authkey);

  const response = await fetch(url.toString(), { method: "POST" });
  const data = (await response.json()) as Msg91Response;
  if (!response.ok || data.type === "error") {
    throw new Error(typeof data.message === "string" ? data.message : "MSG91 OTP send failed");
  }
  return data;
}

export async function verifyOtp(phone: string, otp: string) {
  const authkey = process.env.MSG91_AUTHKEY;
  if (!authkey) throw new Error("MSG91 is not configured.");

  const url = new URL("https://control.msg91.com/api/v5/otp/verify");
  url.searchParams.set("otp", otp);
  url.searchParams.set("mobile", phone.replace("+", ""));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { authkey },
  });
  const data = (await response.json()) as Msg91Response;
  return {
    success: response.ok && (data.message === "OTP verified success" || data.type === "success"),
    message: typeof data.message === "string" ? data.message : undefined,
  };
}

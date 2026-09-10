import { PhoneOtpLogin } from "@/components/auth/PhoneOtpLogin";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-graphite-950 px-6 pb-24 pt-32 text-foreground">
      <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
        <PhoneOtpLogin />
      </div>
    </main>
  );
}

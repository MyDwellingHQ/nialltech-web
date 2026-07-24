import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Client login for Niall Tech portal access.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <ComingSoon
      title="Client Login"
      description="Authenticated access for clients is reserved for a future portal release."
    />
  );
}

import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Secure client portal for Niall Tech customers.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <ComingSoon
      title="Customer Portal"
      description="Project updates, documentation, and support workflows will be available in a future client portal."
    />
  );
}

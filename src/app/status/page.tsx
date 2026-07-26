import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Status",
  description: "Service status for Niall Tech platforms and client-facing systems.",
  robots: { index: false, follow: true },
};

export default function StatusPage() {
  return (
    <ComingSoon
      title="Status Page"
      description="Operational status for client-facing systems will be published here."
    />
  );
}

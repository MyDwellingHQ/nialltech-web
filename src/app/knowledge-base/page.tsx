import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Self-service guidance and documentation from Niall Tech.",
  robots: { index: false, follow: true },
};

export default function KnowledgeBasePage() {
  return (
    <ComingSoon
      title="Knowledge Base"
      description="A searchable library of how-tos and platform guidance is planned for this route."
    />
  );
}

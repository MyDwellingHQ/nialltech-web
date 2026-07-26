import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights from Niall Tech on Microsoft cloud, identity, and IT operations.",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog"
      description="Articles, field notes, and practical guidance will live here. This route is reserved for a future content platform."
    />
  );
}

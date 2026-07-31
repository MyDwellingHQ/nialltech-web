import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Shield,
  Laptop,
  KeyRound,
  Server,
  Lock,
  ArrowRightLeft,
  Headset,
  Network,
  Boxes,
  HardDrive,
  DatabaseBackup,
  Compass,
} from "lucide-react";

export type ServiceCategoryId =
  | "cloud-productivity"
  | "identity-security"
  | "infrastructure-resilience"
  | "strategy-support";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  icon: LucideIcon;
  category: ServiceCategoryId;
  featured?: boolean;
};

export const serviceCategories: {
  id: ServiceCategoryId;
  title: string;
  description: string;
}[] = [
  {
    id: "cloud-productivity",
    title: "Cloud & productivity",
    description:
      "Keep people working together securely—email, files, meetings, and cloud platforms that don’t get in the way.",
  },
  {
    id: "identity-security",
    title: "Identity & security",
    description:
      "Reduce the risk of account takeovers and device gaps without slowing the business down.",
  },
  {
    id: "infrastructure-resilience",
    title: "Infrastructure & resilience",
    description:
      "Stable systems, networks, and recovery plans so an outage doesn’t become a crisis.",
  },
  {
    id: "strategy-support",
    title: "Strategy & support",
    description:
      "Clear priorities and dependable help so technology decisions support growth.",
  },
];

export const services: Service[] = [
  {
    slug: "microsoft-365",
    title: "Microsoft 365",
    summary: "Secure email, Teams, and files your whole company can rely on.",
    description:
      "We set up and harden Microsoft 365 so people collaborate easily while spam, phishing, and messy permissions stay under control.",
    outcomes: [
      "Fewer inbox and sharing headaches for staff",
      "Stronger baseline security without extra tools",
      "Licensing that matches how you actually work",
    ],
    icon: Cloud,
    category: "cloud-productivity",
    featured: true,
  },
  {
    slug: "azure-entra-id",
    title: "Azure & Entra ID",
    summary: "Cloud systems with clear ownership—and locked-down access.",
    description:
      "We design Azure and Entra ID so the right people get in, unused access gets removed, and cloud spend stays understandable.",
    outcomes: [
      "Identity and cloud foundations you can govern",
      "Access rules that block risky sign-ins",
      "A cleaner path from on-premises to cloud",
    ],
    icon: Shield,
    category: "cloud-productivity",
    featured: true,
  },
  {
    slug: "cloud-migrations",
    title: "Cloud migrations",
    summary: "Move email, files, or servers with a plan—not a leap of faith.",
    description:
      "We plan cutovers, test first, and keep everyone informed so migrations reduce risk instead of creating weekend fire drills.",
    outcomes: [
      "A phased plan with clear go/no-go checkpoints",
      "Less downtime for customers and staff",
      "Cleanup and tuning after the move",
    ],
    icon: ArrowRightLeft,
    category: "cloud-productivity",
  },
  {
    slug: "intune-endpoint",
    title: "Intune & device management",
    summary: "Company laptops and phones set up right—and kept that way.",
    description:
      "We use Intune so new devices are ready on day one, lost devices can be locked, and security settings stay consistent across the team.",
    outcomes: [
      "Faster onboarding for new hires",
      "Consistent protection on every endpoint",
      "Less time spent fixing one-off machine issues",
    ],
    icon: Laptop,
    category: "identity-security",
    featured: true,
  },
  {
    slug: "identity-access",
    title: "Identity & access",
    summary: "Stop shared passwords and leftover access from becoming incidents.",
    description:
      "We tighten sign-in, privileged accounts, and joiner/leaver processes so former staff and unused admin rights don’t linger.",
    outcomes: [
      "MFA and modern sign-in that people will use",
      "Tighter control of powerful admin accounts",
      "Clean access changes when roles change",
    ],
    icon: KeyRound,
    category: "identity-security",
    featured: true,
  },
  {
    slug: "security-consulting",
    title: "Security consulting",
    summary: "Fix the risks that matter most—before they cost you.",
    description:
      "We assess your environment, prioritize practical fixes, and help you improve security in stages the business can absorb.",
    outcomes: [
      "A clear risk list ranked by business impact",
      "Hardening steps your team can maintain",
      "A better plan for when something goes wrong",
    ],
    icon: Lock,
    category: "identity-security",
    featured: true,
  },
  {
    slug: "it-infrastructure",
    title: "IT infrastructure",
    summary: "Servers and platforms that stay boring—in the best way.",
    description:
      "We design and modernize infrastructure so day-to-day work stays up, maintenance is predictable, and growth doesn’t mean constant rebuilds.",
    outcomes: [
      "An architecture roadmap tied to real constraints",
      "Hybrid or cloud-first designs that fit your size",
      "Documentation your team can actually use",
    ],
    icon: Server,
    category: "infrastructure-resilience",
  },
  {
    slug: "network-consulting",
    title: "Network consulting",
    summary: "Office and remote access that stays fast and dependable.",
    description:
      "We improve Wi-Fi, office networks, and secure remote access so people aren’t fighting the connection to do their jobs.",
    outcomes: [
      "More reliable office and guest Wi-Fi",
      "Secure remote access without VPN chaos",
      "Clear recommendations when hardware needs refresh",
    ],
    icon: Network,
    category: "infrastructure-resilience",
  },
  {
    slug: "virtualization",
    title: "Virtualization",
    summary: "Run more workloads on fewer boxes—with room to recover.",
    description:
      "We design and tune virtualization so capacity, backups, and failover are planned—not improvised during an outage.",
    outcomes: [
      "Better use of existing hardware investment",
      "High-availability patterns that match your risk",
      "Capacity planning before you hit the wall",
    ],
    icon: Boxes,
    category: "infrastructure-resilience",
  },
  {
    slug: "storage",
    title: "Storage",
    summary: "Put data where it belongs—with performance and protection.",
    description:
      "We help you choose and structure storage so critical files are fast, archives are affordable, and retention matches policy.",
    outcomes: [
      "Storage that fits performance and budget",
      "Clear retention and tiering choices",
      "Less sprawl across random drives and shares",
    ],
    icon: HardDrive,
    category: "infrastructure-resilience",
  },
  {
    slug: "backup-dr",
    title: "Backup & disaster recovery",
    summary: "Know you can get critical systems back when something fails.",
    description:
      "We build backup and recovery plans with tested restore goals so ransomware, hardware failure, or human error doesn’t stop the business cold.",
    outcomes: [
      "Recovery targets the business agrees on",
      "Backups that are monitored—not assumed",
      "Documented restore tests, not wishful thinking",
    ],
    icon: DatabaseBackup,
    category: "infrastructure-resilience",
    featured: true,
  },
  {
    slug: "technology-strategy",
    title: "Technology strategy",
    summary: "A practical roadmap so spend follows priorities—not vendors.",
    description:
      "We help leadership decide what to fix first, what to retire, and what to invest in next—in plain language tied to business outcomes.",
    outcomes: [
      "A current-state picture everyone understands",
      "Priorities sequenced by risk and value",
      "Recommendations ready for owners and boards",
    ],
    icon: Compass,
    category: "strategy-support",
  },
  {
    slug: "small-business-it",
    title: "Business IT support",
    summary: "Steady help for growing companies—not a helpdesk black hole.",
    description:
      "We support day-to-day IT with clear escalation, proactive fixes, and guidance that keeps a small team productive and secure.",
    outcomes: [
      "Faster resolution when work is blocked",
      "Proactive checks before issues pile up",
      "Advice that scales as you hire",
    ],
    icon: Headset,
    category: "strategy-support",
  },
];

export const featuredServices = services.filter((service) => service.featured);

export function servicesByCategory(categoryId: ServiceCategoryId) {
  return services.filter((service) => service.category === categoryId);
}

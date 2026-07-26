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

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  icon: LucideIcon;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "microsoft-365",
    title: "Microsoft 365 Consulting",
    summary:
      "Optimize collaboration, security, and licensing across Microsoft 365.",
    description:
      "We design, deploy, and tune Microsoft 365 environments so your teams communicate securely and productively—without unnecessary complexity.",
    outcomes: [
      "Tenant hardening and baseline security",
      "Exchange, SharePoint, and Teams optimization",
      "Licensing guidance aligned to real usage",
    ],
    icon: Cloud,
    featured: true,
  },
  {
    slug: "azure-entra-id",
    title: "Azure & Entra ID",
    summary:
      "Cloud architecture and identity foundations built for scale and control.",
    description:
      "From landing zones to identity governance, we help you run Azure and Entra ID with clarity, least privilege, and operational confidence.",
    outcomes: [
      "Secure Azure landing zone design",
      "Entra ID Conditional Access strategies",
      "Hybrid identity and federation guidance",
    ],
    icon: Shield,
    featured: true,
  },
  {
    slug: "intune-endpoint",
    title: "Intune / Endpoint Management",
    summary:
      "Modern device management that protects every endpoint your business relies on.",
    description:
      "We implement Intune policies, compliance baselines, and zero-touch provisioning so laptops and mobiles stay secure and ready for work.",
    outcomes: [
      "Autopilot and enrollment workflows",
      "Compliance and configuration profiles",
      "Application deployment at scale",
    ],
    icon: Laptop,
    featured: true,
  },
  {
    slug: "identity-access",
    title: "Identity & Access Management",
    summary:
      "Least-privilege access, strong authentication, and clear governance.",
    description:
      "We reduce identity risk with MFA, Conditional Access, privileged access reviews, and lifecycle automation that matches how your organization works.",
    outcomes: [
      "MFA and passwordless adoption",
      "Privileged identity controls",
      "Joiner-mover-leaver processes",
    ],
    icon: KeyRound,
    featured: true,
  },
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    summary:
      "Reliable infrastructure design for hybrid and cloud-first environments.",
    description:
      "Servers, networking foundations, and platform standards built for uptime, maintainability, and predictable growth.",
    outcomes: [
      "Architecture reviews and roadmaps",
      "Hybrid infrastructure modernization",
      "Operational standards and documentation",
    ],
    icon: Server,
  },
  {
    slug: "security-consulting",
    title: "Security Consulting",
    summary:
      "Practical security improvements that reduce risk without slowing teams down.",
    description:
      "We assess your environment, prioritize the controls that matter, and implement defenses aligned to your risk profile and compliance needs.",
    outcomes: [
      "Security posture assessments",
      "Hardening recommendations",
      "Incident readiness planning",
    ],
    icon: Lock,
    featured: true,
  },
  {
    slug: "cloud-migrations",
    title: "Cloud Migrations",
    summary:
      "Predictable migrations to Azure and Microsoft 365 with minimal disruption.",
    description:
      "We plan and execute migrations with clear cutover plans, rollback options, and communication that keeps stakeholders informed.",
    outcomes: [
      "Discovery and readiness assessments",
      "Pilot and wave-based migrations",
      "Post-migration optimization",
    ],
    icon: ArrowRightLeft,
  },
  {
    slug: "small-business-it",
    title: "Small Business IT Support",
    summary:
      "Right-sized IT support so smaller teams can operate with enterprise-grade confidence.",
    description:
      "From day-to-day support to strategic guidance, we help growing businesses stay secure, productive, and ready to scale.",
    outcomes: [
      "Proactive monitoring and support",
      "Secure collaboration setup",
      "Clear technology roadmaps",
    ],
    icon: Headset,
  },
  {
    slug: "network-consulting",
    title: "Network Consulting",
    summary:
      "Connectivity designed for performance, resilience, and secure access.",
    description:
      "We assess and improve LAN, WAN, Wi-Fi, and secure remote access so people and systems stay connected when it counts.",
    outcomes: [
      "Network architecture reviews",
      "Secure remote access design",
      "Performance and reliability improvements",
    ],
    icon: Network,
  },
  {
    slug: "virtualization",
    title: "Virtualization",
    summary:
      "Efficient virtualization platforms that simplify operations and reduce cost.",
    description:
      "We design and optimize virtualized environments for density, resilience, and straightforward management.",
    outcomes: [
      "Platform assessments",
      "High-availability design",
      "Lifecycle and capacity planning",
    ],
    icon: Boxes,
  },
  {
    slug: "storage",
    title: "Storage",
    summary:
      "Storage architectures that balance performance, durability, and cost.",
    description:
      "Whether on-premises, cloud, or hybrid, we help you store data where it belongs—with the protection and access patterns your business needs.",
    outcomes: [
      "Storage architecture design",
      "Performance tuning",
      "Tiering and retention strategies",
    ],
    icon: HardDrive,
  },
  {
    slug: "backup-dr",
    title: "Backup & Disaster Recovery",
    summary:
      "Recovery strategies that turn downtime from a crisis into a controlled event.",
    description:
      "We build backup and DR plans with tested recovery objectives so critical systems can be restored with confidence.",
    outcomes: [
      "RPO/RTO planning",
      "Backup platform design",
      "Documented recovery testing",
    ],
    icon: DatabaseBackup,
    featured: true,
  },
  {
    slug: "technology-strategy",
    title: "Technology Strategy",
    summary:
      "Clear roadmaps that connect technology decisions to business outcomes.",
    description:
      "We help leadership prioritize investments, retire complexity, and build a technology strategy that supports growth.",
    outcomes: [
      "Current-state assessments",
      "Multi-year roadmaps",
      "Executive-ready recommendations",
    ],
    icon: Compass,
  },
];

export const featuredServices = services.filter((service) => service.featured);

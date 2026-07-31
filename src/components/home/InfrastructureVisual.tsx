import type { CSSProperties } from "react";
import { BrandMark } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

type NodeDef = {
  id: string;
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  status?: "ok" | "watch";
};

const VIEW_W = 560;
const VIEW_H = 420;
const CENTER = { x: 280, y: 210 };

const NODES: NodeDef[] = [
  { id: "m365", label: "Microsoft 365", shortLabel: "M365", x: 96, y: 72, status: "ok" },
  { id: "entra", label: "Entra ID", shortLabel: "Entra ID", x: 280, y: 40, status: "ok" },
  { id: "intune", label: "Intune", shortLabel: "Intune", x: 464, y: 72, status: "ok" },
  { id: "security", label: "Security", shortLabel: "Security", x: 512, y: 210, status: "watch" },
  { id: "network", label: "Network", shortLabel: "Network", x: 424, y: 348, status: "ok" },
  { id: "cloud", label: "Cloud", shortLabel: "Cloud", x: 136, y: 348, status: "ok" },
  { id: "devices", label: "Devices", shortLabel: "Devices", x: 48, y: 210, status: "ok" },
];

function connectionPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = mx - dy * 0.08;
  const cy = my + dx * 0.08;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

type InfrastructureVisualProps = {
  className?: string;
};

export function InfrastructureVisual({ className }: InfrastructureVisualProps) {
  return (
    <div
      className={cn(
        "infra-visual group relative isolate h-[300px] w-full overflow-hidden rounded-[1.75rem] sm:h-[320px] lg:h-auto lg:min-h-[360px] lg:aspect-[560/420]",
        className,
      )}
      role="img"
      aria-label="Abstract infrastructure map connecting Microsoft 365, Entra ID, Intune, security, network, cloud, and devices through Niall Tech"
    >
      <div className="infra-visual-grid absolute inset-0" aria-hidden />
      <div className="infra-visual-glow absolute inset-0" aria-hidden />

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="infra-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C1FF" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#146BFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22C1FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="118"
          stroke="rgba(34,193,255,0.12)"
          strokeWidth="1"
          className="infra-ring"
        />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="168"
          stroke="rgba(20,107,255,0.1)"
          strokeWidth="1"
          strokeDasharray="3 10"
          className="infra-ring infra-ring-delayed"
        />

        {NODES.map((node, index) => (
          <g key={node.id} className="infra-connection">
            <path
              d={connectionPath(CENTER, node)}
              stroke="url(#infra-line)"
              strokeWidth="1.25"
              strokeLinecap="round"
              className="infra-path"
              style={{ animationDelay: `${index * 0.45}s` }}
            />
            <circle
              cx={(CENTER.x + node.x) / 2}
              cy={(CENTER.y + node.y) / 2}
              r="2"
              fill="#22C1FF"
              className="infra-packet"
              style={{ animationDelay: `${index * 0.7}s` }}
            />
          </g>
        ))}
      </svg>

      {NODES.map((node, index) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${(node.x / VIEW_W) * 100}%`,
            top: `${(node.y / VIEW_H) * 100}%`,
          }}
        >
          <div
            className="infra-node"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            <div className="flex items-center gap-1.5 rounded-lg border border-white/18 bg-[#0B1320]/55 px-2 py-1.5 shadow-soft backdrop-blur-sm sm:gap-2 sm:rounded-xl sm:px-2.5 sm:py-1.5">
              <span
                className={cn(
                  "infra-status h-2 w-2 shrink-0 rounded-full",
                  node.status === "watch" ? "bg-[#22C1FF]" : "bg-emerald-400",
                )}
                style={{ animationDelay: `${index * 0.55}s` }}
                aria-hidden
              />
              <span className="whitespace-nowrap text-[0.7rem] font-semibold tracking-tight text-slate-100 sm:text-xs">
                <span className="sm:hidden">{node.shortLabel}</span>
                <span className="hidden sm:inline">{node.label}</span>
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="infra-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="infra-mark-glow absolute inset-[-28%] rounded-full" aria-hidden />
        <div
          className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-white/20 bg-[#0B1320]/75 shadow-soft backdrop-blur-md sm:h-[5.25rem] sm:w-[5.25rem]"
          style={
            {
              "--niall-mark-primary": "#FFFFFF",
              "--niall-mark-blue": "#146BFF",
            } as CSSProperties
          }
        >
          <BrandMark theme="auto" className="h-9 w-9 sm:h-11 sm:w-11" />
        </div>
      </div>
    </div>
  );
}

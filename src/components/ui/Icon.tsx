import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Battery,
  BookOpen,
  Briefcase,
  Building2,
  ChartBar,
  Check,
  CircleHelp,
  CircuitBoard,
  ClipboardCheck,
  Clock,
  Compass,
  Cpu,
  Download,
  DraftingCompass,
  Droplets,
  Eye,
  Factory,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  Hammer,
  HandHeart,
  Headphones,
  Heart,
  Home,
  Landmark,
  Layers,
  Leaf,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Network,
  Phone,
  Plug,
  Recycle,
  Ruler,
  Scale,
  Settings,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  Target,
  Tractor,
  TreePine,
  TrendingUp,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

const icons: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  award: Award,
  "bar-chart": ChartBar,
  battery: Battery,
  "book-open": BookOpen,
  briefcase: Briefcase,
  building: Building2,
  check: Check,
  circuit: CircuitBoard,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  compass: Compass,
  cpu: Cpu,
  download: Download,
  drafting: DraftingCompass,
  droplets: Droplets,
  eye: Eye,
  factory: Factory,
  "file-text": FileText,
  gauge: Gauge,
  globe: Globe,
  "graduation-cap": GraduationCap,
  hammer: Hammer,
  "hand-heart": HandHeart,
  headphones: Headphones,
  heart: Heart,
  "help-circle": CircleHelp,
  home: Home,
  landmark: Landmark,
  layers: Layers,
  leaf: Leaf,
  lightbulb: Lightbulb,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  network: Network,
  phone: Phone,
  plug: Plug,
  recycle: Recycle,
  ruler: Ruler,
  scale: Scale,
  settings: Settings,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  sprout: Sprout,
  sun: Sun,
  target: Target,
  tractor: Tractor,
  tree: TreePine,
  "trending-up": TrendingUp,
  users: Users,
  wrench: Wrench,
  zap: Zap,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp aria-hidden className={cn("size-5", className)} strokeWidth={strokeWidth} />;
}

/** Small rounded tile with an icon, used across feature lists. */
export function IconTile({
  name,
  className,
  size = "md",
}: {
  name: IconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-card-2 text-accent",
        size === "sm" && "size-9 rounded-lg",
        size === "md" && "size-11",
        size === "lg" && "size-14 rounded-2xl",
        className,
      )}
    >
      <Icon
        name={name}
        className={cn(size === "sm" && "size-4", size === "md" && "size-5", size === "lg" && "size-6")}
      />
    </span>
  );
}

import {
  BadgeDollarSign,
  Briefcase,
  Camera,
  Clapperboard,
  Code2,
  Cpu,
  Film,
  Gauge,
  GraduationCap,
  Handshake,
  Headset,
  LayoutList,
  type LucideIcon,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  PenLine,
  Repeat,
  Rocket,
  Search,
  Share2,
  Shuffle,
  ShoppingBag,
  Sparkles,
  Sprout,
  TrendingUp,
  User,
  Users,
  Wallet,
  Footprints,
} from 'lucide-react'

export const OPTION_ICONS: Record<string, LucideIcon> = {
  // goals
  'extra-money': Wallet,
  'full-time': Briefcase,
  passive: Repeat,
  freelancing: Handshake,
  scale: TrendingUp,
  // skills
  'video-editing': Film,
  'graphic-design': Palette,
  writing: PenLine,
  programming: Code2,
  marketing: Megaphone,
  communication: MessageCircle,
  sales: BadgeDollarSign,
  research: Search,
  organization: LayoutList,
  photography: Camera,
  none: Sparkles,
  // interests
  'content-creation': Clapperboard,
  'digital-products': Package,
  ecommerce: ShoppingBag,
  software: Cpu,
  'social-media': Share2,
  education: GraduationCap,
  'online-services': Headset,
  // work styles
  independent: User,
  clients: Users,
  products: Package,
  audience: Megaphone,
  any: Shuffle,
  // experience
  beginner: Sprout,
  some: Footprints,
  intermediate: Gauge,
  advanced: Rocket,
}

/** Interests share ids with goals ("freelancing", "marketing"); resolve by question. */
export function iconFor(questionKey: string, optionId: string): LucideIcon | undefined {
  if (questionKey === 'interests' && optionId === 'freelancing') return Briefcase
  if (questionKey === 'interests' && optionId === 'marketing') return TrendingUp
  return OPTION_ICONS[optionId]
}

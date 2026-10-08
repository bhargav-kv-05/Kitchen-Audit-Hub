import {
  ClipboardCheck,
  Heart,
  Info,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Utensils,
} from 'lucide-react'

export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/restaurants', label: 'Restaurants', icon: Utensils },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/health-ratings', label: 'Health Ratings', icon: ShieldCheck },
  { href: '/inspections', label: 'Inspections', icon: ClipboardCheck },
  { href: '/saved', label: 'Saved Restaurants', icon: Heart },
  { href: '/about', label: 'About', icon: Info },
] as const

export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

import Link from 'next/link'
import { Logo } from '@/components/logo'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/health-ratings', label: 'Health Rating Guide' },
  { href: '/about#contact', label: 'Contact' },
  { href: '/about#privacy', label: 'Privacy' },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="flex flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">{'Know the kitchen before you order.'}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
        {'© 2026 Kitchen Audit Hub. Inspection data shown is for demonstration purposes.'}
      </div>
    </footer>
  )
}

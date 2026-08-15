import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import {
  VILLAGE_INFO as DEFAULT_INFO,
  FOOTER_NAV_LINKS as DEFAULT_NAV_LINKS,
  SOCIAL_LINKS as DEFAULT_SOCIAL_LINKS,
} from '@/constants/navigation';
import type { FooterProps } from '@/types/navigation';

export function Footer({
  info = DEFAULT_INFO,
  navLinks = DEFAULT_NAV_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* ── Top Divider Accent ── */}
      <div className="h-1 bg-linear-to-r from-gold via-gold-light to-gold" />

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* ── Column 1: Village Identity (4 cols) ── */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo theme="dark" size="lg" />

            {/* Address */}
            <div className="flex items-start gap-2.5 text-white/60 text-sm font-body">
              <MapPin size={16} className="mt-1 shrink-0 text-gold" />
              <div>
                <p>{info.address}</p>
                <p>{info.region}</p>
              </div>
            </div>
          </div>

          {/* ── Column 2: Nav Quick Links (2 cols) ── */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Jelajahi
            </h3>

            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/65 hover:text-gold text-sm font-body transition-colors duration-150 inline-block hover:translate-x-0.5 transform"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Contact Us (3 cols) ── */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Hubungi Kami
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href={info.phone !== '-' ? `tel:${info.phone}` : '#'}
                  className="flex items-center gap-2.5 text-white/65 hover:text-white text-sm font-body transition-colors duration-150 group"
                >
                  <Phone
                    size={15}
                    className="shrink-0 text-gold group-hover:scale-110 transition-transform"
                  />
                  {info.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-2.5 text-white/65 hover:text-white text-sm font-body transition-colors duration-150 group"
                >
                  <Mail
                    size={15}
                    className="shrink-0 text-gold group-hover:scale-110 transition-transform"
                  />
                  {info.email}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-2 space-y-2.5">
              <p className="text-white/40 text-xs font-body uppercase tracking-wider">
                Media Sosial
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gold flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Column 4: Google Maps Embed (3 cols) ── */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Lokasi Kami
            </h3>
            <div
              className="rounded-xl overflow-hidden border border-white/10 shadow-lg"
              style={{ height: '180px' }}
            >
              <iframe
                title={`Peta Lokasi ${info.name}`}
                src={info.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs font-body text-center sm:text-left">
            © {currentYear} {info.name}. Hak Cipta Dilindungi.
          </p>
          <p className="text-white/30 text-xs font-body">
            Made with ❤️ by semaian.penusupan
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

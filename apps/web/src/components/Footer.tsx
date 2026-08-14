import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const VILLAGE_INFO = {
  name:    'Desa Penusupan',
  tagline: 'Desa yang maju, sejahtera, dan berbudaya',
  address: 'Jl. Raya Penusupan No. 1',
  region:  'Kec. Pangkah, Kab. Tegal, Jawa Tengah 52461',
  phone:   '(0283) 123-4567',
  email:   'desapenusupan@gmail.com',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d109.0!3d-6.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPenusupan%2C+Pangkah%2C+Tegal!5e0!3m2!1sid!2sid!4v1000000000000',
};

const NAV_LINKS = [
  { href: '/',            label: 'Beranda' },
  { href: '/profile',    label: 'Profil Desa' },
  { href: '/businesses', label: 'UMKM' },
  { href: '/news',       label: 'Berita & Pengumuman' },
];

const SOCIAL_LINKS = [
  { href: '#', icon: Facebook,  label: 'Facebook'  },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Youtube,   label: 'YouTube'   },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* ── Top Divider Accent ── */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* ── Column 1: Village Identity (2 cols wide) ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0">
                DP
              </div>
              <div>
                <p className="font-heading font-bold text-white text-base leading-tight">
                  {VILLAGE_INFO.name}
                </p>
                <p className="text-white/60 text-xs font-body mt-0.5">
                  Website Resmi Desa
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm font-body leading-relaxed max-w-xs">
              {VILLAGE_INFO.tagline}
            </p>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-white/60 text-sm font-body">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold" />
              <div>
                <p>{VILLAGE_INFO.address}</p>
                <p>{VILLAGE_INFO.region}</p>
              </div>
            </div>

            {/* Nav Quick Links */}
            <nav aria-label="Footer navigation" className="pt-1">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-white/55 hover:text-gold text-sm font-body transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 2: Contact Us ── */}
          <div className="lg:col-span-1 space-y-5">
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Hubungi Kami
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${VILLAGE_INFO.phone}`}
                  className="flex items-center gap-2.5 text-white/65 hover:text-white text-sm font-body transition-colors duration-150 group"
                >
                  <Phone size={15} className="flex-shrink-0 text-gold group-hover:scale-110 transition-transform" />
                  {VILLAGE_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${VILLAGE_INFO.email}`}
                  className="flex items-center gap-2.5 text-white/65 hover:text-white text-sm font-body transition-colors duration-150 group"
                >
                  <Mail size={15} className="flex-shrink-0 text-gold group-hover:scale-110 transition-transform" />
                  {VILLAGE_INFO.email}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-1 space-y-3">
              <p className="text-white/40 text-xs font-body uppercase tracking-wider">
                Media Sosial
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
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

          {/* ── Column 3: Google Maps Embed (2 cols wide) ── */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Lokasi Kami
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg" style={{ height: '180px' }}>
              <iframe
                title="Peta Lokasi Desa Penusupan"
                src={VILLAGE_INFO.mapEmbed}
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
            © {currentYear} {VILLAGE_INFO.name}. Hak Cipta Dilindungi.
          </p>
          <p className="text-white/30 text-xs font-body">
            Dibangun untuk melayani masyarakat
          </p>
        </div>
      </div>
    </footer>
  );
}

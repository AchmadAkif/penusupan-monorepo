import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Desa Penusupan — Website Resmi Desa',
    template: '%s | Desa Penusupan',
  },
  description:
    'Website resmi Desa Penusupan, Kecamatan Pangkah, Kabupaten Tegal, Jawa Tengah. Informasi profil desa, berita, UMKM, dan layanan masyarakat.',
  keywords: ['Desa Penusupan', 'Pangkah', 'Tegal', 'Jawa Tengah', 'Desa'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Desa Penusupan',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linen font-body">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

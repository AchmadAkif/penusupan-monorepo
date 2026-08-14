import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { VILLAGE_INFO } from '@/constants/navigation';

export interface BrandLogoProps {
  href?: string;
  theme?: 'dark' | 'light' | 'auto';
  scrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeConfig = {
  sm: {
    container: 'w-8 h-8',
    dimension: 32,
    title: 'text-xs',
    subtext: 'text-[10px]',
  },
  md: {
    container: 'w-9 h-9',
    dimension: 36,
    title: 'text-sm',
    subtext: 'text-xs',
  },
  lg: {
    container: 'w-10 h-10',
    dimension: 40,
    title: 'text-base',
    subtext: 'text-xs',
  },
};

export function BrandLogo({
  href = '/',
  theme = 'auto',
  scrolled = false,
  size = 'md',
  showSubtext = true,
  className,
  onClick,
}: BrandLogoProps) {
  const currentSize = sizeConfig[size];

  // Determine text colors based on theme / scrolled state
  const isLightText = theme === 'dark' || (theme === 'auto' && !scrolled);
  const titleColor = isLightText ? 'text-white' : 'text-navy';
  const subtextColor = isLightText ? 'text-white/70' : 'text-stone-500';

  const content = (
    <div className={cn('flex items-center gap-3 group', className)}>
      <div className={cn(currentSize.container, 'flex-shrink-0')}>
        <Image
          src="/logo.png"
          alt={`Logo ${VILLAGE_INFO.name}`}
          width={currentSize.dimension}
          height={currentSize.dimension}
          className="w-full h-full object-contain drop-shadow-sm"
          priority
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading font-bold transition-colors duration-300',
            currentSize.title,
            titleColor,
          )}
        >
          {VILLAGE_INFO.name}
        </span>
        {showSubtext && (
          <span
            className={cn(
              'font-body mt-0.5 transition-colors duration-300',
              currentSize.subtext,
              subtextColor,
            )}
          >
            {VILLAGE_INFO.region.split(',')[1]?.trim() || 'Kab. Banjarnegara'}, Jawa Tengah
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

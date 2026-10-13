import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light-surface' | 'dark-surface' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  asLink?: boolean;
}

export function Logo({
  variant = 'light-surface',
  size = 'md',
  className = '',
  asLink = true,
}: LogoProps) {
  // Dimensions calibrated to preserve crispness without distortion
  const sizeMap = {
    sm: { width: 44, height: 44, cardPadding: 'p-1.5' },
    md: { width: 56, height: 56, cardPadding: 'p-2' },
    lg: { width: 72, height: 72, cardPadding: 'p-2.5' },
    xl: { width: 100, height: 100, cardPadding: 'p-3' },
  };

  const currentSize = sizeMap[size];
  const isDarkSurface = variant === 'dark-surface';
  const logoSrc =
    variant === 'transparent'
      ? '/brand/kanani-logo-transparent.png'
      : '/brand/kanani-logo.png';

  const content = (
    <div
      className={`inline-flex items-center gap-3 transition-transform duration-200 hover:opacity-95 ${className}`}
    >
      {isDarkSurface ? (
        <div
          className={`inline-flex items-center justify-center rounded-2xl bg-surface ${currentSize.cardPadding} shadow-navy-md border border-white/20 shrink-0`}
        >
          <Image
            src="/brand/kanani-logo.png"
            alt="Kanani Industries Logo"
            width={currentSize.width}
            height={currentSize.height}
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <div className="shrink-0 flex items-center justify-center">
          <Image
            src={logoSrc}
            alt="Kanani Industries Logo"
            width={currentSize.width}
            height={currentSize.height}
            className="object-contain rounded-xl"
            priority
          />
        </div>
      )}
      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold tracking-tight leading-tight ${
            isDarkSurface ? 'text-white' : 'text-primary-dark'
          } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'}`}
        >
          KANANI
        </span>
        <span
          className={`font-heading font-bold uppercase tracking-[0.22em] text-secondary text-[9px] md:text-[10px] leading-tight`}
        >
          INDUSTRIES
        </span>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Kanani Industries Homepage" className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

import Image from 'next/image';

interface GaneshTradingLogoProps {
  variant?: 'light-surface' | 'dark-surface' | 'transparent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showSisterTag?: boolean;
  className?: string;
  layout?: 'horizontal' | 'compact' | 'emblem-only';
}

export function GaneshTradingLogo({
  variant = 'light-surface',
  size = 'sm',
  showSisterTag = true,
  className = '',
  layout = 'horizontal',
}: GaneshTradingLogoProps) {
  const isDark = variant === 'dark-surface';

  const sizeMap = {
    xs: {
      width: 26,
      height: 26,
      nameText: 'text-xs',
      subText: 'text-[7.5px]',
      tagText: 'text-[7.5px]',
      gap: 'gap-2',
      ringPad: 'p-0.5',
    },
    sm: {
      width: 36,
      height: 36,
      nameText: 'text-sm',
      subText: 'text-[9px]',
      tagText: 'text-[8.5px]',
      gap: 'gap-2.5',
      ringPad: 'p-0.5',
    },
    md: {
      width: 44,
      height: 44,
      nameText: 'text-base',
      subText: 'text-[10px]',
      tagText: 'text-[9px]',
      gap: 'gap-3',
      ringPad: 'p-1',
    },
    lg: {
      width: 58,
      height: 58,
      nameText: 'text-xl',
      subText: 'text-xs',
      tagText: 'text-[10px]',
      gap: 'gap-3.5',
      ringPad: 'p-1.5',
    },
  };

  const currentSize = sizeMap[size];

  // Emblem mark
  const emblem = (
    <div
      className={`shrink-0 flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ${
        isDark ? 'ring-amber-400/40 shadow-navy-sm' : 'ring-amber-600/25'
      } ${currentSize.ringPad}`}
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <Image
        src="/brand/ganesh-trading-emblem-transparent.png"
        alt="Ganesh Trading GT Logo"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain rounded-full"
        priority
      />
    </div>
  );

  if (layout === 'emblem-only') {
    return (
      <div className={`inline-flex items-center ${className}`} title="Ganesh Trading (GT)">
        {emblem}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {emblem}

      <div className="flex flex-col justify-center select-none">
        {showSisterTag && (
          <span
            className={`font-heading font-bold uppercase tracking-wider leading-none mb-0.5 ${
              currentSize.tagText
            } ${isDark ? 'text-secondary-light' : 'text-secondary'}`}
          >
            Sister Concern
          </span>
        )}

        <div className="flex items-baseline gap-1 leading-tight">
          <span
            className={`font-heading font-black tracking-tight ${currentSize.nameText} ${
              isDark ? 'text-white' : 'text-primary-dark'
            }`}
          >
            GANESH
          </span>
          <span
            className={`font-heading font-extrabold uppercase tracking-wider ${currentSize.subText} ${
              isDark ? 'text-amber-400' : 'text-[#B45309]'
            }`}
          >
            TRADING
          </span>
        </div>
      </div>
    </div>
  );
}

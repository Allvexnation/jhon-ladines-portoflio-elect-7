import techLogos from '@/static/tech-logos.json';
import { TechLogoIconProps } from '@/interface/TechLogoIconProps';

export function TechLogoIcon({ isDarkMode }: TechLogoIconProps) {
  return techLogos.map((tech: any) => ({
    icon: (
      <img
        src={tech.src}
        alt={tech.name}
        className="w-full h-full object-contain"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)' }}
      />
    ),
    label: tech.name,
    color: tech.color,
  }));
}

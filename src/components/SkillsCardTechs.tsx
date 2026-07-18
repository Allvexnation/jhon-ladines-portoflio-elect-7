import techLogos from '@/static/tech-logos.json';
import { SkillsCardTechsProps } from '@/interface/SkillsCardTechsProps';

export function SkillsCardTechs({ isDarkMode }: SkillsCardTechsProps) {
  return techLogos.slice(0, 8).map((tech: any, index: number) => (
    <div
      key={index}
      className={`bg-gradient-to-br ${isDarkMode ? 'from-gray-700 to-gray-800' : 'from-gray-100 to-gray-200'} rounded-lg flex items-center justify-center`}
      style={{ width: '40px', height: '40px' }}
    >
      <img
        src={tech.src}
        alt={tech.name}
        className="w-6 h-6 object-contain"
        style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)' }}
      />
    </div>
  ));
}

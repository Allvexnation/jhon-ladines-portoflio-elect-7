import { useState, useEffect } from 'react';
import { BiEnvelope } from 'react-icons/bi';
import { FaFacebook, FaInstagram, FaGithub, FaTiktok, FaLinkedin } from 'react-icons/fa';
import socialsData from '@/static/socials.json';
import { SocialItem } from '@/interface/SocialItem';

export function useSocialLogic() {
  const [isLoading, setIsLoading] = useState(true);
  const [socials, setSocials] = useState<SocialItem[]>([]);

  useEffect(() => {
    // Simulate loading - replace with actual API call
    const loadSocials = async () => {
      try {
        // Icon mapping based on title
        const iconMap: Record<string, any> = {
          'Gmail': BiEnvelope,
          'Facebook': FaFacebook,
          'Instagram': FaInstagram,
          'GitHub': FaGithub,
          'Outlook': BiEnvelope,
          'TikTok': FaTiktok,
          'LinkedIn': FaLinkedin,
        };

        // Map JSON data to SocialItem with icons
        const socialsWithIcons: SocialItem[] = socialsData.map((social: any) => ({
          ...social,
          icon: iconMap[social.title] || BiEnvelope,
        }));

        setSocials(socialsWithIcons);
      } catch (error) {
        console.error('Error loading socials:', error);
        setSocials([]);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    loadSocials();
  }, []);

  return {
    isLoading,
    socials,
  };
}

import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import SkillsSection from '@/components/home/SkillsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { usePortfolio } from '@/context/PortfolioContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { loading } = usePortfolio();

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

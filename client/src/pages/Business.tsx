import { useEffect } from 'react';
import { BusinessHero } from '../components/business/BusinessHero';
import { ModuleSections } from '../components/business/ModuleSections';
import { Pricing } from '../components/business/Pricing';
import { TrustBar } from '../components/business/TrustBar';
import { WhyChoose } from '../components/business/WhyChoose';
import { Faq } from '../components/home/Faq';
import { FinalCta } from '../components/home/FinalCta';

export const Business = () => {
  useEffect(() => {
    document.title = 'Soludesk for Business — Train your team and scale your operations';
  }, []);

  return (
    <main>
      <BusinessHero />
      <TrustBar />
      <ModuleSections />
      <WhyChoose />
      <Pricing />
      <FinalCta
        badge="Embark on your professional journey."
        description="Thousands of teams already run their operations and training on Soludesk."
        primaryLabel="Get Started"
        secondaryLabel="Talk to Sales"
        secondaryTarget="pricing"
        intent="business"
      />
      <Faq audience="business" />
    </main>
  );
};

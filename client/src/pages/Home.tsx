import { useEffect, useState } from 'react';
import { AssessmentCta } from '../components/home/AssessmentCta';
import { CourseCatalog } from '../components/home/CourseCatalog';
import { Faq } from '../components/home/Faq';
import { FinalCta } from '../components/home/FinalCta';
import { Hero } from '../components/home/Hero';
import { Pathways } from '../components/home/Pathways';
import { PopularCourses } from '../components/home/PopularCourses';
import { Stats } from '../components/home/Stats';
import { TrainerAndBusiness } from '../components/home/TrainerAndBusiness';
import { Reveal } from '../components/ui/Reveal';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Soludesk LearnHub — Acquire skills that boost your career prospects';
  }, []);

  return (
    <main>
      <Hero onSearch={setSearch} />
      <CourseCatalog
        search={search}
        category={category}
        onCategoryChange={setCategory}
        onClearSearch={() => setSearch('')}
      />
      <Reveal>
        <TrainerAndBusiness />
      </Reveal>
      <Reveal>
        <Pathways />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <AssessmentCta />
      </Reveal>
      <Reveal>
        <PopularCourses />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </main>
  );
};

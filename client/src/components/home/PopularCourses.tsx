import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { SectionHeading } from '../ui/SectionHeading';
import { CourseCard } from './CourseCard';

export const PopularCourses = () => {
  const { data, isPending } = useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => api.courses({ featured: true, limit: 8 }),
  });

  return (
    <section className="bg-navy">
      <div className="shell flex flex-col items-center gap-[60px] py-[60px] lg:py-[60px]">
        <SectionHeading
          tone="light"
          title="Popular Courses on Soludesk LearnHub"
          description="Explore our most popular courses and trending topics in tech, business, and the arts. Start learning today!"
        />

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:gap-5">
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-[376px] animate-pulse rounded-xl bg-white/10" />
              ))
            : (data?.items ?? []).map((course) => <CourseCard key={course.id} course={course} size="wide" />)}
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import { CourseCard } from '../components/home/CourseCard';
import { Pagination } from '../components/ui/Pagination';
import { useCollections } from '../hooks/useCollections';
import { api } from '../lib/api';

const PAGE_SIZE = 8;

export const MyFavorites = () => {
  const navigate = useNavigate();
  const { collections } = useCollections();
  const [page, setPage] = useState(1);

  const catalog = useQuery({ queryKey: ['courses', 'all'], queryFn: () => api.courses({ limit: 48 }) });
  const favorites = (catalog.data?.items ?? []).filter((course) => collections.wishlist.includes(course.id));
  const pageCount = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));
  const visible = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="shell flex flex-col gap-3">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-5 self-start">
          <span className="flex items-center justify-center rounded-full bg-primary-text p-2.5 text-white">
            <ArrowLeft size={24} variant="Linear" color="currentColor" />
          </span>
          <h1 className="text-2xl leading-8 font-medium text-ink">My Favorites</h1>
        </button>

        {visible.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:gap-5">
            {visible.map((course) => (
              <CourseCard key={course.id} course={course} size="wide" />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted">You haven&apos;t saved any courses yet — tap the heart icon on a course to save it here.</p>
        )}

        <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between">
          <span className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted">Show {PAGE_SIZE}/page</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>
    </main>
  );
};

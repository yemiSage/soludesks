import { useState } from 'react';
import { ArrowLeft, Profile2User, TickCircle } from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CourseCard } from '../components/home/CourseCard';
import { Faq } from '../components/home/Faq';
import { FinalCta } from '../components/home/FinalCta';
import { ApplicationSuccessModal } from '../components/scholarships/ApplicationSuccessModal';
import { CourseDetailsDrawer } from '../components/scholarships/CourseDetailsDrawer';
import { EnrollDrawer } from '../components/scholarships/EnrollDrawer';
import { VerifyEmailModal } from '../components/scholarships/VerifyEmailModal';
import { api } from '../lib/api';
import { useApplications } from '../lib/applications';
import { useAuth } from '../lib/auth';
import { getScholarship } from '../lib/scholarshipData';
import type { Course } from '../lib/types';

export const ScholarshipDetail = () => {
  const { id } = useParams();
  const scholarship = getScholarship(id);
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { applications, addApplication } = useApplications();
  const { data } = useQuery({ queryKey: ['courses', 'all'], queryFn: () => api.courses({ limit: 48 }) });

  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [successTitle, setSuccessTitle] = useState<string | null>(null);

  if (!scholarship) return <Navigate to="/scholarships" replace />;

  const courses = (data?.items ?? []).filter((course) => scholarship.courseSlugs.includes(course.slug));
  const progressPct = Math.round((scholarship.filledSlots / scholarship.totalSlots) * 100);
  const application = applications.find((entry) => entry.scholarshipId === scholarship.id);

  const startEnroll = () => {
    if (!viewingCourse) return;
    const course = viewingCourse;
    setViewingCourse(null);
    requireAuth('scholarship', () => setEnrollingCourse(course));
  };

  return (
    <main className="pt-[var(--nav-h)]">
      <div className="shell flex flex-col gap-8 py-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/scholarships')}
            className="flex items-center gap-2 text-base font-medium text-ink"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white">
              <ArrowLeft size={24} variant="Linear" color="currentColor" />
            </span>
            Back to scholarships
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="heading-display text-2xl leading-8 text-ink sm:text-[28px]">{scholarship.title}</h1>
            <div className="flex items-center gap-4">
              {scholarship.fullyFunded ? (
                <span className="rounded-full bg-[var(--sematic-backgrounds-primarybackground-2)] px-4 py-1.5 text-sm leading-6 font-semibold text-primary-text">
                  Fully Funded
                </span>
              ) : null}
              <span className="flex items-center gap-1.5 text-sm leading-5 text-muted">
                <Profile2User size={20} variant="Linear" color="currentColor" />
                {scholarship.totalSlots - scholarship.filledSlots}/{scholarship.totalSlots} Slots left
              </span>
            </div>
          </div>
          <p className="text-base leading-5 text-muted">{scholarship.summary}</p>
        </div>

        <div className="relative h-[260px] w-full overflow-hidden rounded-xl sm:h-[411px]">
          <img src={scholarship.image} alt="" className="absolute inset-0 size-full object-cover" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-2 w-full max-w-[400px] overflow-hidden rounded-full bg-line-strong">
            <div className="h-full rounded-full bg-primary-text" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-sm leading-5 text-muted">
            {scholarship.filledSlots}/{scholarship.totalSlots} slots filled · Application deadline {scholarship.deadline}
          </p>
        </div>

        {application ? (
          <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] px-5 py-4 text-[#008236]">
            <TickCircle size={24} variant="Bold" color="currentColor" />
            <p className="text-sm leading-5 font-medium">
              You&apos;ve applied for this scholarship — status: <span className="font-semibold">{application.status}</span>
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl leading-7 font-semibold text-ink">Eligibility Criteria</h2>
          <ul className="flex flex-col gap-2">
            {scholarship.eligibility.map((item) => (
              <li key={item} className="flex gap-2 text-base leading-6 text-muted">
                <span aria-hidden>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl leading-7 font-semibold text-ink">Select a course</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-5">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col gap-3">
                <CourseCard course={course} />
                {application ? (
                  <span className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-[#f0fdf4] text-sm font-medium text-[#008236]">
                    <TickCircle size={18} variant="Bold" color="currentColor" />
                    Applied
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setViewingCourse(course)}
                    className="flex h-11 items-center justify-center rounded-lg border border-primary-text text-sm font-medium text-primary-text"
                  >
                    Enroll
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Faq />
      <FinalCta />

      <CourseDetailsDrawer course={viewingCourse} onClose={() => setViewingCourse(null)} onContinue={startEnroll} />
      <EnrollDrawer
        scholarship={enrollingCourse ? scholarship : null}
        course={enrollingCourse}
        onClose={() => setEnrollingCourse(null)}
        onSubmitted={(email) => {
          setEnrollingCourse(null);
          setPendingEmail(email);
        }}
      />
      <VerifyEmailModal
        email={pendingEmail}
        onClose={() => setPendingEmail(null)}
        onChangeEmail={() => setPendingEmail(null)}
        onVerified={() => {
          setPendingEmail(null);
          addApplication(scholarship.id);
          setSuccessTitle(scholarship.title);
        }}
      />
      <ApplicationSuccessModal scholarshipTitle={successTitle} onClose={() => setSuccessTitle(null)} />
    </main>
  );
};

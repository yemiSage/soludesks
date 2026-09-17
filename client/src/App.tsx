import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileDrawer } from './components/auth/ProfileDrawer';
import { RequireAuth } from './components/auth/RequireAuth';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { BecomeRoleConfirm } from './components/portal/BecomeRoleConfirm';
import { RoleProfileDrawer } from './components/portal/RoleProfileDrawer';
import { Business } from './pages/Business';
import { Home } from './pages/Home';

/**
 * Pages use named exports, so this adapts them for React.lazy. The two landing pages stay
 * in the main bundle; everything else is fetched the first time its route is visited.
 */
const page = <T extends Record<string, ComponentType>>(load: () => Promise<T>, name: keyof T) =>
  lazy(async () => ({ default: (await load())[name] }));

const AboutUs = page(() => import('./pages/AboutUs'), 'AboutUs');
const ContactUs = page(() => import('./pages/ContactUs'), 'ContactUs');
const CourseDetail = page(() => import('./pages/CourseDetail'), 'CourseDetail');
const CourseLearn = page(() => import('./pages/CourseLearn'), 'CourseLearn');
const Dashboard = page(() => import('./pages/Dashboard'), 'Dashboard');
const ExploreCourses = page(() => import('./pages/ExploreCourses'), 'ExploreCourses');
const Legal = page(() => import('./pages/Legal'), 'Legal');
const Messages = page(() => import('./pages/Messages'), 'Messages');
const MyCertificates = page(() => import('./pages/MyCertificates'), 'MyCertificates');
const MyCourses = page(() => import('./pages/MyCourses'), 'MyCourses');
const MyFavorites = page(() => import('./pages/MyFavorites'), 'MyFavorites');
const MyWallet = page(() => import('./pages/MyWallet'), 'MyWallet');
const Notifications = page(() => import('./pages/Notifications'), 'Notifications');
const Scholarships = page(() => import('./pages/Scholarships'), 'Scholarships');
const ScholarshipDetail = page(() => import('./pages/ScholarshipDetail'), 'ScholarshipDetail');
const Settings = page(() => import('./pages/Settings'), 'Settings');
const Streak = page(() => import('./pages/Streak'), 'Streak');
const TrainerCourseBuilder = page(() => import('./pages/trainer/TrainerCourseBuilder'), 'TrainerCourseBuilder');
const TrainerCourseDetail = page(() => import('./pages/trainer/TrainerCourseDetail'), 'TrainerCourseDetail');
const TrainerCourses = page(() => import('./pages/trainer/TrainerCourses'), 'TrainerCourses');
const TrainerDashboard = page(() => import('./pages/trainer/TrainerDashboard'), 'TrainerDashboard');
const TrainerLearners = page(() => import('./pages/trainer/TrainerLearners'), 'TrainerLearners');
const TrainerLessonEditor = page(() => import('./pages/trainer/TrainerLessonEditor'), 'TrainerLessonEditor');
const TrainerProfile = page(() => import('./pages/trainer/TrainerProfile'), 'TrainerProfile');
const TrainerSettings = page(() => import('./pages/trainer/TrainerSettings'), 'TrainerSettings');
const TrainerWallet = page(() => import('./pages/trainer/TrainerWallet'), 'TrainerWallet');
const SponsorDashboard = page(() => import('./pages/sponsor/SponsorDashboard'), 'SponsorDashboard');
const SponsorLearners = page(() => import('./pages/sponsor/SponsorLearners'), 'SponsorLearners');
const SponsorProfile = page(() => import('./pages/sponsor/SponsorProfile'), 'SponsorProfile');
const SponsorScholarships = page(() => import('./pages/sponsor/SponsorScholarships'), 'SponsorScholarships');
const SponsorSettings = page(() => import('./pages/sponsor/SponsorSettings'), 'SponsorSettings');
const SponsorWallet = page(() => import('./pages/sponsor/SponsorWallet'), 'SponsorWallet');
const AssessmentIntroStep = page(() => import('./pages/onboarding/AssessmentIntroStep'), 'AssessmentIntroStep');
const AssessmentQuestionStep = page(() => import('./pages/onboarding/AssessmentQuestionStep'), 'AssessmentQuestionStep');
const GoalStep = page(() => import('./pages/onboarding/GoalStep'), 'GoalStep');
const InterestsStep = page(() => import('./pages/onboarding/InterestsStep'), 'InterestsStep');
const IntroStep = page(() => import('./pages/onboarding/IntroStep'), 'IntroStep');
const LearningPathStep = page(() => import('./pages/onboarding/LearningPathStep'), 'LearningPathStep');
const OnboardingLayout = page(() => import('./pages/onboarding/OnboardingLayout'), 'OnboardingLayout');
const ProcessingStep = page(() => import('./pages/onboarding/ProcessingStep'), 'ProcessingStep');
const ResultsStep = page(() => import('./pages/onboarding/ResultsStep'), 'ResultsStep');
const SkillLevelStep = page(() => import('./pages/onboarding/SkillLevelStep'), 'SkillLevelStep');

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <span className="size-8 animate-spin rounded-full border-4 border-line-soft border-t-primary" />
  </div>
);

/** Cross-fades between the Individual and Business landing pages on navigation. */
const AudienceTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [rendered, setRendered] = useState(children);
  const [visible, setVisible] = useState(true);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) {
      setRendered(children);
      return;
    }

    previousPath.current = pathname;
    setVisible(false);
    const swap = window.setTimeout(() => {
      setRendered(children);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setVisible(true);
    }, 180);

    return () => window.clearTimeout(swap);
  }, [pathname, children]);

  return (
    <div
      className="transition-[opacity,transform] duration-[420ms] ease-[var(--ease-premium)] motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
    >
      {rendered}
    </div>
  );
};

export const App = () => {
  const { pathname } = useLocation();
  const audience = pathname.startsWith('/business') ? 'business' : 'individual';
  // The trainer portal ships its own topbar/sidebar/footer, so the marketing chrome steps aside.
  const isPortal = pathname.startsWith('/trainer') || pathname.startsWith('/sponsor');

  return (
    <>
      {isPortal ? null : <Navbar audience={audience} />}
      <AudienceTransition>
        <Suspense fallback={<RouteFallback />}>
        <Routes location={pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/explore" element={<ExploreCourses />} />
          <Route
            path="/courses/:slug/learn"
            element={
              <RequireAuth>
                <CourseLearn />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/streak"
            element={
              <RequireAuth>
                <Streak />
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            }
          />
          <Route
            path="/messages"
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />
          <Route
            path="/my-courses"
            element={
              <RequireAuth>
                <MyCourses />
              </RequireAuth>
            }
          />
          <Route
            path="/my-wallet"
            element={
              <RequireAuth>
                <MyWallet />
              </RequireAuth>
            }
          />
          <Route
            path="/my-certificates"
            element={
              <RequireAuth>
                <MyCertificates />
              </RequireAuth>
            }
          />
          <Route
            path="/my-favorites"
            element={
              <RequireAuth>
                <MyFavorites />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route path="/legal" element={<Navigate to="/legal/privacy-policy" replace />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
          <Route path="/get-started" element={<OnboardingLayout />}>
            <Route index element={<IntroStep />} />
            <Route path="goal" element={<GoalStep />} />
            <Route path="interests" element={<InterestsStep />} />
            <Route path="skill-level" element={<SkillLevelStep />} />
            <Route path="assessment" element={<AssessmentIntroStep />} />
            <Route path="assessment/:questionIndex" element={<AssessmentQuestionStep />} />
            <Route path="processing" element={<ProcessingStep />} />
            <Route path="results" element={<ResultsStep />} />
            <Route path="learning-path" element={<LearningPathStep />} />
          </Route>
          <Route
            path="/trainer/dashboard"
            element={
              <RequireAuth>
                <TrainerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/courses"
            element={
              <RequireAuth>
                <TrainerCourses />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/courses/:id"
            element={
              <RequireAuth>
                <TrainerCourseDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/courses/:id/builder"
            element={
              <RequireAuth>
                <TrainerCourseBuilder />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/courses/:id/lessons/:lessonId"
            element={
              <RequireAuth>
                <TrainerLessonEditor />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/learners"
            element={
              <RequireAuth>
                <TrainerLearners />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/wallet"
            element={
              <RequireAuth>
                <TrainerWallet />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/settings"
            element={
              <RequireAuth>
                <TrainerSettings />
              </RequireAuth>
            }
          />
          <Route
            path="/trainer/profile"
            element={
              <RequireAuth>
                <TrainerProfile />
              </RequireAuth>
            }
          />
          {[
            { path: '/sponsor/dashboard', element: <SponsorDashboard /> },
            { path: '/sponsor/scholarships', element: <SponsorScholarships /> },
            { path: '/sponsor/learners', element: <SponsorLearners /> },
            { path: '/sponsor/wallet', element: <SponsorWallet /> },
            { path: '/sponsor/settings', element: <SponsorSettings /> },
            { path: '/sponsor/profile', element: <SponsorProfile /> },
          ].map((route) => (
            <Route key={route.path} path={route.path} element={<RequireAuth>{route.element}</RequireAuth>} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
        </Suspense>
      </AudienceTransition>
      {isPortal ? null : <Footer audience={audience} />}
      <AuthModal />
      <ProfileDrawer />
      <BecomeRoleConfirm />
      <RoleProfileDrawer />
    </>
  );
};

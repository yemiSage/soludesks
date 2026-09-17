import { Outlet } from 'react-router-dom';
import { OnboardingProvider } from './OnboardingContext';

export const OnboardingLayout = () => (
  <OnboardingProvider>
    <main className="shell flex min-h-[100dvh] flex-col items-center pt-[calc(var(--nav-h)+20px)] sm:pt-[calc(var(--nav-h)+32px)] pb-24">
      <Outlet />
    </main>
  </OnboardingProvider>
);

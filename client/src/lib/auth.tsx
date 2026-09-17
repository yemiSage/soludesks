import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export type AuthUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export type Profile = {
  phone: string;
  dateOfBirth: string;
  country: string;
  gender: string;
  bio: string;
};

export type Role = 'learner' | 'trainer' | 'sponsor';
/** Roles a learner can upgrade into; each has its own onboarding drawer. */
export type UpgradeRole = Exclude<Role, 'learner'>;

/** Superset of both onboarding forms — trainers fill the credential fields, sponsors the business ones. */
export type RoleProfile = {
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  address: string;
  organization: string;
  nin?: string;
  yearsExperience?: string;
  expertise?: string;
};

/** Single demo identity — this app has no real backend auth, so sign-in only ever accepts this pair. */
export const MOCK_EMAIL = 'demo@soludesk.com';
export const MOCK_OTP = '1234';

const MOCK_USER: AuthUser = { email: MOCK_EMAIL, firstName: 'Efe', lastName: 'Johnson' };

export const dashboardPathForRole: Record<Role, string> = {
  learner: '/dashboard',
  trainer: '/trainer/dashboard',
  sponsor: '/sponsor/dashboard',
};

/** Trainers additionally verify their identity with a face capture; sponsors stop after business info. */
const onboardingSteps: Record<UpgradeRole, OnboardingStep[]> = {
  trainer: ['confirm', 'basic', 'other', 'face'],
  sponsor: ['confirm', 'basic', 'other'],
};

const STORAGE_KEY = 'soludesk.auth.v1';

type StoredState = {
  user: AuthUser | null;
  profileComplete: boolean;
  profile: Profile | null;
  unlockedRoles: Role[];
  activeRole: Role;
  roleProfiles: Partial<Record<UpgradeRole, RoleProfile>>;
};

const emptyState: StoredState = {
  user: null,
  profileComplete: false,
  profile: null,
  unlockedRoles: [],
  activeRole: 'learner',
  roleProfiles: {},
};

const readStored = (): StoredState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    return { ...emptyState, ...(JSON.parse(raw) as Partial<StoredState>) };
  } catch {
    return emptyState;
  }
};

export type AuthModalStep = 'closed' | 'email' | 'otp';
export type AuthIntent = 'signin' | 'checkout' | 'scholarship' | 'trainer' | 'sponsor';
export type OnboardingStep = 'confirm' | 'basic' | 'other' | 'face';
export type Onboarding = { role: UpgradeRole; step: OnboardingStep } | null;

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  profileComplete: boolean;
  profile: Profile | null;
  unlockedRoles: Role[];
  activeRole: Role;
  roleProfiles: Partial<Record<UpgradeRole, RoleProfile>>;
  modalStep: AuthModalStep;
  intent: AuthIntent;
  pendingEmail: string;
  otpError: string | null;
  otpBusy: boolean;
  profileDrawerOpen: boolean;
  onboarding: Onboarding;
  openAuthModal: (intent?: AuthIntent) => void;
  closeAuthModal: () => void;
  requestOtp: (email: string) => void;
  changeEmail: () => void;
  resendOtp: () => void;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  markProfileComplete: (profile: Profile) => void;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
  requireAuth: (intent: AuthIntent, action: () => void) => void;
  becomeRole: (role: UpgradeRole) => void;
  advanceOnboarding: () => void;
  closeOnboarding: () => void;
  completeOnboarding: (profile: RoleProfile) => void;
  switchRole: (role: Role) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StoredState>(() => readStored());
  const [modalStep, setModalStep] = useState<AuthModalStep>('closed');
  const [intent, setIntent] = useState<AuthIntent>('signin');
  const [pendingEmail, setPendingEmail] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpBusy, setOtpBusy] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [onboarding, setOnboarding] = useState<Onboarding>(null);
  const pendingAction = useRef<(() => void) | null>(null);
  const profileDrawerTimer = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(
    () => () => {
      if (profileDrawerTimer.current) window.clearTimeout(profileDrawerTimer.current);
    },
    [],
  );

  const openAuthModal = (nextIntent: AuthIntent = 'signin') => {
    setIntent(nextIntent);
    setModalStep('email');
    setOtpError(null);
    setPendingEmail(state.user?.email ?? '');
  };

  const closeAuthModal = () => {
    setModalStep('closed');
    setOtpError(null);
    pendingAction.current = null;
  };

  const requestOtp = (email: string) => {
    setPendingEmail(email.trim().toLowerCase());
    setOtpError(null);
    setModalStep('otp');
  };

  const changeEmail = () => {
    setModalStep('email');
    setOtpError(null);
  };

  const resendOtp = () => setOtpError(null);

  const verifyOtp = async (code: string) => {
    setOtpBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setOtpBusy(false);

    if (pendingEmail !== MOCK_EMAIL || code !== MOCK_OTP) {
      setOtpError('Code is incorrect, kindly check and retry');
      return false;
    }

    setState((previous) => {
      const isFirstSignIn = !previous.profileComplete;
      if (isFirstSignIn) {
        profileDrawerTimer.current = window.setTimeout(() => setProfileDrawerOpen(true), 1200);
      }
      return { ...previous, user: MOCK_USER };
    });
    setModalStep('closed');
    setOtpError(null);
    pendingAction.current?.();
    pendingAction.current = null;
    return true;
  };

  const logout = () => {
    // Only the session (`user`) ends — unlockedRoles/activeRole/profiles persist, so a
    // returning user who logs back in lands on whichever dashboard they left off in.
    setState((previous) => ({ ...previous, user: null }));
    setProfileDrawerOpen(false);
    setOnboarding(null);
  };

  const markProfileComplete = (profile: Profile) => {
    setState((previous) => ({
      ...previous,
      profileComplete: true,
      profile,
      unlockedRoles: [...new Set<Role>([...previous.unlockedRoles, 'learner'])],
    }));
    setProfileDrawerOpen(false);
  };

  const openProfileDrawer = () => setProfileDrawerOpen(true);
  const closeProfileDrawer = () => setProfileDrawerOpen(false);

  const requireAuth = (nextIntent: AuthIntent, action: () => void) => {
    if (state.user) {
      action();
      return;
    }
    pendingAction.current = action;
    openAuthModal(nextIntent);
  };

  /** Signed-in users go straight to the confirm dialog; everyone else signs up first. */
  const becomeRole = (role: UpgradeRole) => {
    const start = () => setOnboarding({ role, step: 'confirm' });
    if (state.user) return start();
    pendingAction.current = start;
    openAuthModal(role);
  };

  const closeOnboarding = () => setOnboarding(null);

  const advanceOnboarding = () =>
    setOnboarding((current) => {
      if (!current) return current;
      const steps = onboardingSteps[current.role];
      const next = steps[steps.indexOf(current.step) + 1];
      return next ? { ...current, step: next } : current;
    });

  /**
   * Trainer/sponsor onboarding collects everything the learner profile needs (phone, DOB,
   * gender, country/state/address) plus role-specific extras — so finishing it unlocks the
   * learner dashboard too. A learner going the other way still supplies the extras.
   */
  const completeOnboarding = (profile: RoleProfile) => {
    const role = onboarding?.role;
    if (!role) return;
    setState((previous) => ({
      ...previous,
      unlockedRoles: [...new Set<Role>([...previous.unlockedRoles, 'learner', role])],
      activeRole: role,
      roleProfiles: { ...previous.roleProfiles, [role]: profile },
      profileComplete: true,
      profile: previous.profile ?? {
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        country: profile.country,
        gender: profile.gender,
        bio: [profile.address, profile.state, profile.country].filter(Boolean).join(', '),
      },
    }));
    setOnboarding(null);
  };

  const switchRole = (role: Role) => setState((previous) => ({ ...previous, activeRole: role }));

  const value: AuthContextValue = {
    user: state.user,
    isAuthenticated: Boolean(state.user),
    profileComplete: state.profileComplete,
    profile: state.profile,
    unlockedRoles: state.unlockedRoles,
    activeRole: state.activeRole,
    roleProfiles: state.roleProfiles,
    modalStep,
    intent,
    pendingEmail,
    otpError,
    otpBusy,
    profileDrawerOpen,
    onboarding,
    openAuthModal,
    closeAuthModal,
    requestOtp,
    changeEmail,
    resendOtp,
    verifyOtp,
    logout,
    markProfileComplete,
    openProfileDrawer,
    closeProfileDrawer,
    requireAuth,
    becomeRole,
    advanceOnboarding,
    closeOnboarding,
    completeOnboarding,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

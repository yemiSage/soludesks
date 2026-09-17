import { useState } from 'react';

export type Application = { scholarshipId: string; status: 'Pending' | 'Ongoing'; appliedAt: string };

const STORAGE_KEY = 'soludesk.applications.v1';

const read = (): Application[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Application[]) : [];
  } catch {
    return [];
  }
};

/** Client-only application tracker (no backend) — persisted to localStorage, seeded fresh on each mount. */
export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>(read);

  const addApplication = (scholarshipId: string) => {
    setApplications((current) => {
      if (current.some((application) => application.scholarshipId === scholarshipId)) return current;
      const next: Application[] = [...current, { scholarshipId, status: 'Pending', appliedAt: new Date().toISOString() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { applications, addApplication };
};

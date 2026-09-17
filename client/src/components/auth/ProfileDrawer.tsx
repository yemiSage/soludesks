import { useEffect, useState, type ChangeEvent } from 'react';
import { useAuth, type Profile } from '../../lib/auth';
import { Drawer } from '../ui/Drawer';
import { emptyProfileForm, ProfileFormFields, type ProfileFormState } from './ProfileFormFields';

export const ProfileDrawer = () => {
  const { user, profileDrawerOpen, closeProfileDrawer, markProfileComplete } = useAuth();
  const [form, setForm] = useState<ProfileFormState>(emptyProfileForm);

  useEffect(() => {
    if (profileDrawerOpen) {
      setForm((previous) => ({
        ...previous,
        firstName: previous.firstName || user?.firstName || '',
        lastName: previous.lastName || user?.lastName || '',
      }));
    }
  }, [profileDrawerOpen, user]);

  const update = (key: keyof ProfileFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const isComplete = form.firstName.trim() !== '' && form.lastName.trim() !== '';

  const submit = () => {
    if (!isComplete) return;
    const profile: Profile = {
      phone: form.phone ? `${form.countryCode} ${form.phone}` : '',
      dateOfBirth: form.dateOfBirth,
      country: form.country,
      gender: form.gender,
      bio: `${form.address}, ${form.state}, ${form.country}`,
    };
    markProfileComplete(profile);
  };

  return (
    <Drawer
      open={profileDrawerOpen}
      onClose={closeProfileDrawer}
      titleId="profile-drawer-title"
      title="Complete Your Profile"
      footer={
        <>
          <button
            type="button"
            onClick={closeProfileDrawer}
            className="flex h-[38px] items-center justify-center rounded-lg border border-primary-text px-6 text-base text-primary-text sm:h-[43px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!isComplete}
            className="flex h-[38px] w-[212px] items-center justify-center rounded-lg bg-primary text-base font-medium text-white sm:h-[43px] transition-opacity disabled:opacity-50"
          >
            Complete
          </button>
        </>
      }
    >
      <ProfileFormFields form={form} email={user?.email ?? ''} update={update} />
    </Drawer>
  );
};

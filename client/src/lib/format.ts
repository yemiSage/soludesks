const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => naira.format(value).replace('NGN', '₦').replace(/\s/g, '');

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const reviewDateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatReviewDate = (isoDate: string) => reviewDateFormatter.format(new Date(`${isoDate}T00:00:00`));

const avatarPalette = ['#0a60e1', '#d54800', '#0f766e', '#7c3aed', '#be123c', '#166534'];

export const initialsFrom = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const avatarColorFor = (name: string) => {
  const hash = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarPalette[hash % avatarPalette.length];
};

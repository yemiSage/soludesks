export const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e8f0]" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
    <div
      className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
    />
  </div>
);

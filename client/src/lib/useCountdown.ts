import { useEffect, useRef, useState } from 'react';

/** Ticks a countdown down to 0 once a second; call `restart()` to run it again (e.g. after "Resend"). */
export const useCountdown = (seconds: number) => {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setRemaining((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, []);

  const restart = () => setRemaining(seconds);

  return { remaining, restart };
};

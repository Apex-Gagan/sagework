import { useEffect, useRef, useState } from 'react';

const LABELS = { idle: 'Copy', copied: 'Copied', failed: 'Select the text to copy' };

export function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState<keyof typeof LABELS>('idle');
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const show = (next: 'copied' | 'failed', duration: number) => {
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), duration);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      show('copied', 1800);
    } catch {
      show('failed', 2200);
    }
  };

  return (
    <button className={status === 'copied' ? 'copyb ok' : 'copyb'} onClick={copy}>
      {LABELS[status]}
    </button>
  );
}

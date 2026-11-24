import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

interface LoopVideoProps {
  src: string;
  /** Lighter file for small screens. */
  mobileSrc?: string;
  poster: string;
  className?: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
  /** Load the poster straight away; for heroes. */
  priority?: boolean;
  onTime?: (seconds: number) => void;
  /** The file has a soundtrack: offer a button for it. It always starts silent. */
  sound?: boolean;
}

/** Share of the video that must be on screen for its sound to carry on. */
const AUDIBLE_RATIO = 0.35;

/** Silences whichever video is currently audible, so only one ever is. */
let silenceCurrent: (() => void) | null = null;

/**
 * Decorative looping video, silent unless the visitor turns its sound on. Nothing is downloaded
 * until it is first on screen, and it only plays while visible. Under reduced motion it stays on
 * the poster until played by hand.
 */
export function LoopVideo({
  src,
  mobileSrc,
  poster,
  className,
  position,
  priority = false,
  onTime,
  sound = false,
}: LoopVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [loaded, setLoaded] = useState(false);
  const [showing, setShowing] = useState(false);
  const [audible, setAudible] = useState(false);

  const silence = useCallback(() => {
    setAudible(false);
    if (silenceCurrent === silence) silenceCurrent = null;
  }, []);

  const toggleSound = () => {
    if (audible) {
      silence();
      return;
    }
    silenceCurrent?.();
    silenceCurrent = silence;
    setAudible(true);
    setPaused(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Scrolling or navigating away turns the sound off, and it stays off on return.
        if (entry.intersectionRatio < AUDIBLE_RATIO) silence();
      },
      { threshold: [0, AUDIBLE_RATIO] },
    );
    observer.observe(rootRef.current!);
    return () => {
      observer.disconnect();
      silence();
    };
  }, [silence]);

  const playing = inView && !paused;
  useEffect(() => {
    if (playing) setLoaded(true);
  }, [playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can be refused (e.g. battery saver); the poster stays up in that case.
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, loaded]);

  const style = position ? { objectPosition: position } : undefined;

  return (
    <div className={className ? `lvid ${className}` : 'lvid'} ref={rootRef}>
      <img
        src={poster}
        alt=""
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        style={style}
      />
      {loaded && (
        <video
          ref={videoRef}
          className={showing ? 'on' : undefined}
          muted={!audible}
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          style={style}
          onPlaying={() => setShowing(true)}
          onTimeUpdate={(event) => onTime?.(event.currentTarget.currentTime)}
        >
          {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 800px)" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      {sound && (
        <button
          className={audible ? 'lvid-sound on' : 'lvid-sound'}
          aria-pressed={audible}
          onClick={toggleSound}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {audible ? (
              <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
            ) : (
              <path d="M17 9.5l5 5M22 9.5l-5 5" />
            )}
          </svg>
          {audible ? 'Sound on' : 'Sound off'}
        </button>
      )}
      <button
        className="lvid-toggle glass"
        aria-label={paused ? 'Play background video' : 'Pause background video'}
        onClick={() => setPaused((value) => !value)}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FILM_CHAPTERS } from '../../data/film';
import { scrollBehavior } from '../../lib/motion';
import { useNavigation } from '../../routing/NavigationContext';
import { FilmPlayer, formatTime, INITIAL_FILM_STATE } from '../../scenes/film/FilmPlayer';

/** "You are more than human": narrated 3D film with its chapter list. */
export function MicrobiomeFilm() {
  const { visit } = useNavigation();
  const [state, setState] = useState(INITIAL_FILM_STATE);
  const filmRef = useRef<FilmPlayer | null>(null);

  const playerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const segmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const film = new FilmPlayer(
      {
        player: playerRef.current!,
        canvasHost: canvasHostRef.current!,
        labels: labelsRef.current!,
        count: countRef.current!,
        fade: fadeRef.current!,
        segments: Array.from(segmentsRef.current!.children) as HTMLElement[],
      },
      (patch) => setState((current) => ({ ...current, ...patch })),
    );
    filmRef.current = film;
    return () => {
      film.dispose();
      filmRef.current = null;
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => filmRef.current?.renderFrame());
    return () => cancelAnimationFrame(raf);
  }, [visit]);

  useLayoutEffect(() => {
    const caption = captionRef.current!;
    caption.classList.remove('in');
    void caption.offsetWidth; // reflow, so re-adding the class restarts the animation
    caption.classList.add('in');
  }, [state.captionId]);

  const selectChapter = (index: number) => {
    filmRef.current?.seek(index);
    playerRef.current?.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
  };

  const { chapter, caption, clock, playing, ended, sound, webgl } = state;
  const playerClass = [
    'mh-player',
    playing && 'playing',
    ended && 'ended',
    sound && 'sound',
    !webgl && 'nogl',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mh">
      <div className={playerClass} id="mhPlayer" ref={playerRef}>
        <div
          className="mh-gl"
          id="mhGL"
          ref={canvasHostRef}
          onClick={() => filmRef.current?.clickPicture()}
        ></div>
        <div className="mh-labels" id="mhLabels" aria-hidden="true" ref={labelsRef}></div>
        <div className="mh-num" id="mhNum" aria-hidden="true" ref={countRef}>
          <b>38 trillion</b>
          <span>bacteria, by one estimate</span>
        </div>
        <div className="mh-fade" id="mhFade" ref={fadeRef}></div>
        <div className="mh-title glass" id="mhTitle">
          {`Chapter ${chapter + 1} · ${FILM_CHAPTERS[chapter].name}`}
        </div>
        <button
          className="mh-sound"
          id="mhSound"
          aria-pressed={sound}
          onClick={() => filmRef.current?.toggleSound()}
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
            <path className="w" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
          </svg>
          <span id="mhSoundTxt">{sound ? 'Sound off' : 'Sound on'}</span>
        </button>
        <p className="mh-cap" id="mhCap" aria-live="polite" ref={captionRef}>
          {caption}
        </p>
        <button
          className="mh-big"
          id="mhBig"
          aria-label="Play the film with sound"
          onClick={() => filmRef.current?.playWithSound()}
        >
          <span>▶</span>
          {ended ? 'Replay' : 'Play with sound'}
        </button>
        <div className="mh-ctrl glass">
          <button
            className="mh-pp"
            id="mhPP"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => filmRef.current?.toggle()}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="mh-segs" id="mhSegs" ref={segmentsRef}>
            {FILM_CHAPTERS.map(({ name, duration }, i) => (
              <button
                key={name}
                className="mh-seg"
                style={{ flex: duration }}
                aria-label={`Chapter ${i + 1}: ${name}`}
                onClick={() => filmRef.current?.seek(i)}
              >
                <i></i>
              </button>
            ))}
          </div>
          <span className="mh-time" id="mhTime">
            {clock}
          </span>
        </div>
      </div>
      <ol className="mh-list" id="mhList">
        {FILM_CHAPTERS.map(({ name, duration }, i) => (
          <li key={name}>
            <button className={i === chapter ? 'on' : undefined} onClick={() => selectChapter(i)}>
              <span className="n">{`0${i + 1}`}</span>
              <span className="t">{name}</span>
              <span className="d">{formatTime(duration)}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

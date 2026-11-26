import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

const TASTES = {
  sweet: {
    name: 'Sweet',
    line: 'Often a signal of energy-rich food.',
    light: '#F7B7C8',
    deep: '#E0607E',
    background: '#FDF0F3',
  },
  sour: {
    name: 'Sour',
    line: 'A signal of acidity, as in citrus or fermented food.',
    light: '#EEF58A',
    deep: '#A9C21C',
    background: '#F8FBE6',
  },
  salty: {
    name: 'Salty',
    line: 'A signal of sodium and other minerals.',
    light: '#DDE8F0',
    deep: '#7F9CB5',
    background: '#F1F5F8',
  },
  bitter: {
    name: 'Bitter',
    line: 'Often treated by the body as a caution signal.',
    light: '#A9BD94',
    deep: '#3E5233',
    background: '#EEF1EA',
  },
  umami: {
    name: 'Umami',
    line: 'A savoury taste associated with glutamate.',
    light: '#E9BE90',
    deep: '#9A5A2E',
    background: '#F7EFE7',
  },
};
type TasteKey = keyof typeof TASTES;
const TASTE_KEYS = Object.keys(TASTES) as TasteKey[];

export function TasteStage() {
  const dropRef = useRef<HTMLDivElement>(null);
  // `pops` replays the animation even when the same taste is picked again.
  const [{ taste, pops }, setSelection] = useState({ taste: 'sweet' as TasteKey, pops: 0 });
  const { name, line, light, deep, background } = TASTES[taste];

  const select = (key: TasteKey) => setSelection((s) => ({ taste: key, pops: s.pops + 1 }));
  const selectNext = () => select(TASTE_KEYS[(TASTE_KEYS.indexOf(taste) + 1) % TASTE_KEYS.length]);

  useLayoutEffect(() => {
    const drop = dropRef.current!;
    drop.classList.remove('pop');
    void drop.offsetWidth; // reflow, so re-adding the class restarts the animation
    drop.classList.add('pop');
  }, [pops]);

  return (
    <div
      className="sstage"
      id="tasteStage"
      style={{ '--t1': light, '--t2': deep, background } as CSSProperties}
    >
      <div
        className="drop"
        id="drop"
        role="img"
        aria-label="Taste drop"
        ref={dropRef}
        onClick={selectNext}
      ></div>
      <div className="sread">
        <b id="tasteName">{name}</b>
        <span id="tasteLine">{line}</span>
      </div>
      <div className="sctrl glass">
        <div className="chips" id="tasteBtns">
          {TASTE_KEYS.map((key) => (
            <button
              key={key}
              className={taste === key ? 'on' : undefined}
              onClick={() => select(key)}
            >
              {TASTES[key].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

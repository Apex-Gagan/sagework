import { useEffect, useRef, useState } from 'react';
import { Soundscape, type SoundMode } from '../../lib/soundscape';
import { useNavigation } from '../../routing/NavigationContext';
import { useStageCanvas } from './useStageCanvas';

const SOUNDS: Record<SoundMode, { name: string; line: string }> = {
  quiet: { name: 'Quiet room', line: 'A low hum and soft air. Around 30–40 dB.' },
  talk: { name: 'Busy office', line: 'Overlapping speech-like noise. Around 55–65 dB.' },
  traffic: { name: 'Road traffic', line: 'Low rumble and broadband noise. Around 70–80 dB.' },
};
const MODES = Object.keys(SOUNDS) as SoundMode[];

const SILENCE = {
  name: 'Silence',
  line: 'Choose a setting to listen. Use a comfortable volume.',
};

export function SoundStage() {
  const { view } = useNavigation();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soundscape] = useState(() => new Soundscape());
  const [mode, setMode] = useState<SoundMode | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  const play = (next: SoundMode) => {
    const started = soundscape.play(next);
    setUnavailable(!started);
    if (started) setMode(next);
  };

  const stop = () => {
    soundscape.stop();
    setMode(null);
  };

  useEffect(() => {
    if (view === 'approach') return;
    soundscape.stop();
    setMode(null);
  }, [view, soundscape]);

  useEffect(() => () => soundscape.stop(), [soundscape]);

  useStageCanvas(stageRef, canvasRef, ({ c, w, h }, time) => {
    const mid = h * 0.55;
    const waveform = soundscape.readWaveform();
    c.clearRect(0, 0, w, h);
    for (let layer = 0; layer < 2; layer++) {
      c.beginPath();
      c.lineWidth = layer ? 1 : 2.2;
      c.strokeStyle = layer ? 'rgba(255,255,255,.7)' : 'rgba(12,13,11,.85)';
      if (waveform) {
        const amp = layer ? 1.6 : 3.2;
        for (let i = 0; i < waveform.length; i += 3) {
          const x = (i / waveform.length) * w;
          const level = Math.max(-1, Math.min(1, ((waveform[i] - 128) / 128) * amp));
          const y = mid + level * h * 0.28 * (layer ? 1.3 : 1);
          if (i) c.lineTo(x, y);
          else c.moveTo(x, y);
        }
      } else {
        for (let x = 0; x <= w; x += 4) {
          const y = mid + Math.sin(x * 0.018 + time / (layer ? 1400 : 900)) * (layer ? 6 : 3);
          if (x) c.lineTo(x, y);
          else c.moveTo(x, y);
        }
      }
      c.stroke();
    }
  });

  const { name, line } = mode ? SOUNDS[mode] : SILENCE;

  return (
    <div className="sstage dstage" ref={stageRef}>
      <canvas id="wave" aria-hidden="true" ref={canvasRef}></canvas>
      <div className="sread">
        <b id="sndName">{name}</b>
        <span id="sndLine">{unavailable ? 'Audio is not available in this browser.' : line}</span>
      </div>
      <div className="sctrl glass-d">
        <div className="chips" id="sndBtns">
          {MODES.map((key) => (
            <button key={key} className={mode === key ? 'on' : undefined} onClick={() => play(key)}>
              {SOUNDS[key].name}
            </button>
          ))}
          <button onClick={stop}>Stop</button>
        </div>
      </div>
    </div>
  );
}

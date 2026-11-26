import { useState, type CSSProperties } from 'react';
import { hexToRgb, type Rgb } from '../../lib/canvas';

/** [hour, sky colour] */
const SKY_STOPS: [number, string][] = [
  [0, '#121A38'],
  [4.5, '#262B58'],
  [6, '#E9A38E'],
  [7.5, '#FCD9B6'],
  [10, '#EAF3FF'],
  [13, '#FFFFFF'],
  [16.5, '#FFEBC4'],
  [18.5, '#F2925F'],
  [20, '#4A3570'],
  [21.5, '#1D2148'],
  [24, '#121A38'],
];

function skyAt(hour: number): Rgb {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const [from, fromColor] = SKY_STOPS[i];
    const [to, toColor] = SKY_STOPS[i + 1];
    if (hour >= from && hour <= to) {
      const k = (hour - from) / (to - from);
      const a = hexToRgb(fromColor);
      const b = hexToRgb(toColor);
      return a.map((v, j) => Math.round(v + (b[j] - v) * k)) as Rgb;
    }
  }
  return hexToRgb(SKY_STOPS[0][1]);
}

function phaseAt(hour: number): string {
  if (hour < 5 || hour >= 21.5) return 'Night: darkness supports rest';
  if (hour < 8) return 'Morning light: a timing signal for the body';
  if (hour < 16.5) return 'Daytime light: bright, cool, alerting';
  if (hour < 20) return 'Evening light: warmer and dimmer';
  return 'Late evening: light begins to compete with rest';
}

function sunStyle(hour: number): CSSProperties {
  const up = hour > 5.6 && hour < 20.2;
  if (!up) {
    return {
      left: '78%',
      top: '22%',
      width: '70px',
      height: '70px',
      background: 'radial-gradient(circle,#F4F1E6 0%,rgba(244,241,230,0) 60%)',
    };
  }
  const x = Math.max(0, Math.min(1, (hour - 6) / 14));
  const core = hour < 9 || hour > 16 ? '#FFC27A' : '#FFF7DC';
  return {
    left: `${10 + x * 80}%`,
    top: `${78 - Math.sin(x * Math.PI) * 56}%`,
    width: '140px',
    height: '140px',
    background: `radial-gradient(circle,#fff 0%,${core} 38%,rgba(255,255,255,0) 70%)`,
  };
}

function formatHour(hour: number): string {
  const hours = String(Math.floor(hour) % 24).padStart(2, '0');
  const minutes = String(Math.round((hour % 1) * 60)).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function SightStage() {
  const [hour, setHour] = useState(9);

  const top = skyAt(hour);
  const bottom = skyAt(Math.min(24, hour + 2));
  const luminance = top[0] * 0.299 + top[1] * 0.587 + top[2] * 0.114;
  const time = formatHour(hour);

  return (
    <div className="sstage">
      <div
        className="sky"
        id="sky"
        style={{ background: `linear-gradient(180deg,rgb(${top}) 0%,rgb(${bottom}) 100%)` }}
      ></div>
      <div className="sun" id="sun" style={sunStyle(hour)}></div>
      <div className="sread" id="skyRead" style={{ color: luminance < 130 ? '#fff' : '#0C0D0B' }}>
        <b>{time}</b>
        <span>{phaseAt(hour)}</span>
      </div>
      <div className="sctrl glass">
        <label htmlFor="hour">
          <span>Drag through the day</span>
          <span id="hourOut">{time}</span>
        </label>
        <input
          type="range"
          id="hour"
          min="0"
          max="24"
          step="0.25"
          value={hour}
          onChange={(event) => setHour(Number(event.target.value))}
        />
      </div>
    </div>
  );
}

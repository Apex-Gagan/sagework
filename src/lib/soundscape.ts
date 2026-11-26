export type SoundMode = 'quiet' | 'talk' | 'traffic';

interface PlayingSound {
  master: GainNode;
  nodes: AudioScheduledSourceNode[];
}

/** Synthesises ambient room sound with Web Audio; no audio files involved. */
export class Soundscape {
  private context: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private playing: PlayingSound | null = null;
  private readonly samples = new Uint8Array(2048);

  /** Returns false when Web Audio is unavailable. */
  play(mode: SoundMode): boolean {
    try {
      this.context ??= createContext();
    } catch {
      return false;
    }
    const ctx = this.context;
    void ctx.resume();
    this.stop();

    if (!this.analyser) {
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.connect(ctx.destination);
    }

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(this.analyser);

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer(ctx, mode === 'traffic' ? 'brown' : 'pink');
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    const nodes: AudioScheduledSourceNode[] = [source];

    const tone = (
      type: OscillatorType,
      frequency: number,
      gain: number,
      destination: AudioNode,
    ) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      const level = ctx.createGain();
      level.gain.value = gain;
      oscillator.connect(level);
      level.connect(destination);
      oscillator.start();
      nodes.push(oscillator);
    };

    const modulate = (frequency: number, depth: number, target: AudioParam) => {
      const lfo = ctx.createOscillator();
      lfo.frequency.value = frequency;
      const amount = ctx.createGain();
      amount.gain.value = depth;
      lfo.connect(amount);
      amount.connect(target);
      lfo.start();
      nodes.push(lfo);
    };

    let volume: number;
    if (mode === 'quiet') {
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      source.connect(filter);
      filter.connect(master);
      tone('sine', 100, 0.04, master);
      volume = 0.12;
    } else if (mode === 'talk') {
      filter.type = 'bandpass';
      filter.frequency.value = 750;
      filter.Q.value = 1.1;
      const speech = ctx.createGain();
      speech.gain.value = 0.5;
      source.connect(filter);
      filter.connect(speech);
      speech.connect(master);
      modulate(4.3, 0.45, speech.gain);
      modulate(0.6, 320, filter.frequency);
      volume = 0.32;
    } else {
      filter.type = 'lowpass';
      filter.frequency.value = 520;
      source.connect(filter);
      filter.connect(master);
      const rumble = ctx.createBiquadFilter();
      rumble.type = 'lowpass';
      rumble.frequency.value = 140;
      rumble.connect(master);
      tone('sawtooth', 46, 0.08, rumble);
      volume = 0.3;
    }

    source.start();
    master.gain.setTargetAtTime(volume, ctx.currentTime, 0.3);
    this.playing = { master, nodes };
    return true;
  }

  stop() {
    const { playing, context } = this;
    if (!playing || !context) return;
    this.playing = null;
    playing.master.gain.cancelScheduledValues(context.currentTime);
    playing.master.gain.setTargetAtTime(0, context.currentTime, 0.12);
    // Let the fade finish before cutting the sources.
    window.setTimeout(() => playing.nodes.forEach((node) => node.stop()), 700);
  }

  /** Current waveform, or null while silent. */
  readWaveform(): Uint8Array | null {
    if (!this.playing || !this.analyser) return null;
    this.analyser.getByteTimeDomainData(this.samples);
    return this.samples;
  }
}

function createContext(): AudioContext {
  const Context =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  return new Context();
}

/** Three seconds of brown or pink noise (Paul Kellet's filter for pink). */
function noiseBuffer(ctx: AudioContext, type: 'brown' | 'pink'): AudioBuffer {
  const length = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'brown') {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    } else {
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  }
  return buffer;
}

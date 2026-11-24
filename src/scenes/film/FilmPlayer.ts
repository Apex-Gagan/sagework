import { FILM_CHAPTERS } from '../../data/film';
import { prefersReducedMotion } from '../../lib/motion';
import { createFilmScene, type FilmScene } from './filmScene';
import { clamp01, type FilmLabel } from './kit';

const DURATIONS = FILM_CHAPTERS.map(({ duration }) => duration);
const TOTAL = DURATIONS.reduce((sum, d) => sum + d, 0);
const STARTS = DURATIONS.map((_, i) => DURATIONS.slice(0, i).reduce((sum, d) => sum + d, 0));

/** Until the film is first played, its poster frame sits here in chapter 1. */
const POSTER_TIME = 7.5;
const COUNT_AT = FILM_CHAPTERS[0].captions[1][0] + 0.3;

export const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

/** What React renders. Everything that changes per frame is written to the DOM directly. */
export interface FilmState {
  chapter: number;
  caption: string;
  /** Changes whenever the caption's entrance animation should replay. */
  captionId: number;
  clock: string;
  playing: boolean;
  ended: boolean;
  sound: boolean;
  webgl: boolean;
}

export const INITIAL_FILM_STATE: FilmState = {
  chapter: 0,
  caption: FILM_CHAPTERS[0].captions[0][1],
  captionId: 0,
  clock: '0:00',
  playing: false,
  ended: false,
  sound: false,
  webgl: true,
};

export interface FilmElements {
  player: HTMLElement;
  canvasHost: HTMLElement;
  labels: HTMLElement;
  count: HTMLElement;
  fade: HTMLElement;
  segments: HTMLElement[];
}

/** Timeline, narration and 3D scene for "You are more than human". */
export class FilmPlayer {
  private readonly scene: FilmScene | null;
  private readonly audio = new Audio();
  private readonly observer: IntersectionObserver;
  private raf = 0;

  private time = 0;
  private lastTick: number | null = null;
  private chapter = 0;
  private playing = false;
  private sound = false;
  private started = false;
  private inView = false;
  /** Paused by scrolling or navigating away, so resume on return. */
  private resumeOnReturn = false;

  private audioChapter = -1;
  private captionKey = '';
  private captionId = 0;
  private clock = '';
  private labels: [HTMLElement, FilmLabel][] = [];

  constructor(
    private readonly el: FilmElements,
    private readonly onChange: (patch: Partial<FilmState>) => void,
  ) {
    this.audio.preload = 'auto';
    this.scene = createFilmScene(el.canvasHost);
    onChange({ webgl: this.scene !== null });

    this.observer = new IntersectionObserver(([entry]) => this.onVisibility(entry.isIntersecting), {
      threshold: 0.4,
    });
    this.observer.observe(el.player);

    this.showChapter(0);
    this.renderFrame();
    this.raf = requestAnimationFrame(this.loop);
  }

  toggle() {
    this.setPlaying(!this.playing);
  }

  playWithSound() {
    this.setSound(true);
    this.setPlaying(true);
  }

  /** Clicking the picture: first click starts with sound, later ones play or pause. */
  clickPicture() {
    if (this.started) this.toggle();
    else this.playWithSound();
  }

  toggleSound() {
    this.setSound(!this.sound);
    if (this.sound && !this.playing) this.setPlaying(true);
  }

  seek(chapter: number) {
    this.time = STARTS[chapter] + 0.01;
    this.captionKey = '';
    this.audioChapter = -1;
    this.setPlaying(true);
  }

  renderFrame() {
    const { scene, el } = this;
    const i = this.started ? this.chapterAt(this.time) : 0;
    const duration = DURATIONS[i];
    const t = this.started ? Math.min(this.time - STARTS[i], duration) : POSTER_TIME;
    if (i !== this.chapter) this.showChapter(i);

    if (scene) {
      const rect = el.player.getBoundingClientRect();
      if (rect.width) scene.resize(Math.round(rect.width), Math.round(rect.height));
      scene.render(i, t, duration);
      el.count.classList.toggle('on', i === 0 && t > COUNT_AT);
      for (const [element, label] of this.labels) {
        const { left, top } = scene.project(label);
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.opacity = t > label.at ? '1' : '0';
      }
    }

    // Chapters after the first fade in; all but the finished film fade out.
    const fadeIn = i > 0 ? t / 0.6 : 1;
    const fadeOut = this.time >= TOTAL ? 1 : (duration - t) / 0.6;
    const visible = this.started ? Math.min(1, fadeIn, fadeOut) : 1;
    el.fade.style.opacity = String(1 - clamp01(visible));

    el.segments.forEach((segment, k) => {
      const progress = this.started ? clamp01((this.time - STARTS[k]) / DURATIONS[k]) : 0;
      segment.style.setProperty('--f', String(progress));
    });

    this.updateCaption(i, t);
    this.updateClock();
    this.syncAudio(i, t);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.observer.disconnect();
    this.audio.pause();
    this.el.labels.replaceChildren();
    this.scene?.dispose();
  }

  private loop = (now: number) => {
    const displayed = this.el.player.offsetParent !== null;
    if (displayed && (this.inView || this.playing)) {
      if (this.playing) {
        if (this.lastTick !== null) this.time += Math.min(0.1, (now - this.lastTick) / 1000);
        this.lastTick = now;
        if (this.time >= TOTAL) {
          this.time = TOTAL;
          this.setPlaying(false);
        }
      }
      this.renderFrame();
    } else if (this.playing && !displayed) {
      this.resumeOnReturn = true;
      this.setPlaying(false);
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  private onVisibility(inView: boolean) {
    this.inView = inView;
    if (inView) {
      if (!this.started && !prefersReducedMotion) {
        this.setPlaying(true);
      } else if (this.resumeOnReturn) {
        this.setPlaying(true);
        this.resumeOnReturn = false;
      }
    } else if (this.playing) {
      this.resumeOnReturn = true;
      this.setPlaying(false);
    }
  }

  private setPlaying(playing: boolean) {
    if (playing) {
      this.started = true;
      if (this.time >= TOTAL) this.time = 0;
    }
    this.playing = playing;
    this.lastTick = null;
    this.onChange({ playing, ended: !playing && this.time >= TOTAL });
  }

  private setSound(sound: boolean) {
    this.sound = sound;
    if (sound) this.audioChapter = -1;
    else this.audio.pause();
    this.onChange({ sound });
  }

  private chapterAt(time: number) {
    const index = DURATIONS.findIndex((duration, k) => time < STARTS[k] + duration);
    return index === -1 ? DURATIONS.length - 1 : index;
  }

  private showChapter(index: number) {
    this.chapter = index;
    if (index !== 0) this.el.count.classList.remove('on');
    this.scene?.showChapter(index);
    this.labels = (this.scene?.labels(index) ?? []).map((label) => {
      const element = document.createElement('span');
      element.className = 'mh-label glass';
      element.textContent = label.text;
      return [element, label];
    });
    this.el.labels.replaceChildren(...this.labels.map(([element]) => element));
    this.onChange({ chapter: index });
  }

  private updateCaption(chapter: number, t: number) {
    const { captions } = FILM_CHAPTERS[chapter];
    let caption = captions[0][1];
    for (const [start, line] of captions) if (t >= start) caption = line;
    const key = chapter + caption;
    if (key === this.captionKey) return;
    this.captionKey = key;
    this.captionId += 1;
    this.onChange({ caption, captionId: this.captionId });
  }

  private updateClock() {
    const clock = `${formatTime(this.time)} / ${formatTime(TOTAL)}`;
    if (clock === this.clock) return;
    this.clock = clock;
    this.onChange({ clock });
  }

  private syncAudio(chapter: number, t: number) {
    const { audio } = this;
    if (!(this.sound && this.playing)) {
      if (!audio.paused) audio.pause();
      return;
    }
    if (this.audioChapter !== chapter) {
      this.audioChapter = chapter;
      audio.src = `${import.meta.env.BASE_URL}vo${chapter + 1}.mp3`;
      audio.currentTime = 0;
    }
    if (audio.paused) {
      audio.currentTime = Math.min(t, (audio.duration || 99) - 0.05);
      // Playback can be refused (autoplay policy, missing file); the film carries on muted.
      audio.play().catch(() => {});
    } else if (Math.abs(audio.currentTime - t) > 0.4 && t < (audio.duration || 0)) {
      audio.currentTime = t;
    }
  }
}

type SoundpackConfig = {
  name: string;
  bpm: number;
  beatStart: number;
  trackPath: string;
  soundX: string;
  soundO: string,
  soundWin: string,
  soundDraw: string,
  soundOffbeat: string
};

export class Soundpack {
  track: HTMLAudioElement;
  sounds: HTMLAudioElement[];

  constructor(track: HTMLAudioElement, soundX: HTMLAudioElement, soundO: HTMLAudioElement) {
    this.track = track;
    this.sounds = [soundX, soundO];
  }

  playTrack() {
    this.track.currentTime = 0;
    this.track.play();
  }

  playSound(index: number) {
    this.sounds[index].currentTime = 0;
    this.sounds[index].play();
  }

  fadeOutTrack() {
    const fadeOutInterval = setInterval(() => {
      if (this.track.volume > 0.05) {
        this.track.volume -= 0.05;
      } else {
        this.track.volume = 0;
        clearInterval(fadeOutInterval);
      }
    }, 20);
  }
}

export const loadSoundpack = async (config: SoundpackConfig): Promise<Soundpack> => {
  const soundX = new Audio(config.soundX);
  const soundO = new Audio(config.soundO);
  const track = new Audio(config.trackPath);

  const soundpack = new Soundpack(track, soundX, soundO);

  const promise = new Promise<Soundpack>((resolve, reject) => {
    track.oncanplaythrough = () => {
      resolve(soundpack);
    };
    track.onerror = () => {
      reject();
    };
  })

  return promise;
}

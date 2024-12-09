type SoundpackConfig = {
  name: string;
  bpm: number;
  hitsPerBeat: number;
  beatStart: number;
  track: string;
  soundX: string;
  soundO: string,
  soundXWon: string,
  soundOWon: string,
  soundOffbeat: string
};

export class Soundpack {
  private sounds: Map<string, Sound> = new Map();
  private audioContext: AudioContext;

  private constructor(context: AudioContext) {
    this.audioContext = context;
  }

  static async fromConfig(config: SoundpackConfig) {
    const soundpack = new Soundpack(new AudioContext());

    soundpack.sounds.set('track', await Sound.fromPath(soundpack.audioContext, config.track));
    soundpack.sounds.set('soundX', await Sound.fromPath(soundpack.audioContext, config.soundX));
    soundpack.sounds.set('soundO', await Sound.fromPath(soundpack.audioContext, config.soundO));
    soundpack.sounds.set('soundXWon', await Sound.fromPath(soundpack.audioContext, config.soundXWon));
    soundpack.sounds.set('soundOWon', await Sound.fromPath(soundpack.audioContext, config.soundOWon));
    soundpack.sounds.set('soundOffbeat', await Sound.fromPath(soundpack.audioContext, config.soundOffbeat));

    return soundpack;
  }

  play(key: string) {
    const sound = this.sounds.get(key);
    sound?.play()
  }

  stopAll() {
    this.sounds.forEach(sound => sound.stop());
  }

  fadeOutSound(key: string) {
    const sound = this.sounds.get(key);
    sound?.fadeOut();
  }
}

class Sound {
  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer;
  private gainNode: GainNode | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private fadeOutInterval?: number;

  constructor(context: AudioContext, buffer: AudioBuffer) {
    this.audioContext = context;
    this.audioBuffer = buffer;
  }

  static async fromPath(context: AudioContext, path: string) {
    const audio = await fetch(path);
    const arrayBuffer = await audio.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    return new Sound(context, audioBuffer);
  }

  play() {
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;

    this.gainNode = this.audioContext.createGain();

    this.sourceNode.connect(this.gainNode).connect(this.audioContext.destination);
    this.sourceNode.start(0);
  }

  stop() {
    clearInterval(this.fadeOutInterval);
    this.sourceNode?.stop();
  }

  fadeOut() {
    this.fadeOutInterval = setInterval(() => {
      if (!this.gainNode) {
        throw new Error('No gain node found');
      }

      if (this.gainNode.gain.value > 0.05) {
        this.gainNode.gain.value -= 0.05;
      } else {
        this.sourceNode?.stop();
        clearInterval(this.fadeOutInterval);
      }
    }, 20);
  }
}

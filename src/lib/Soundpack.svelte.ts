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
  track: AudioBufferSourceNode;
  soundX: AudioBufferSourceNode | null = null;
  soundO: AudioBufferSourceNode | null = null;

  bufferX: AudioBuffer;
  bufferO: AudioBuffer;

  trackGain: GainNode;
  audioContext: AudioContext;

  constructor(context: AudioContext, track: AudioBufferSourceNode, bufferX: AudioBuffer, bufferO: AudioBuffer) {
    this.audioContext = context;
    this.trackGain = this.audioContext.createGain();

    this.track = track;
    this.bufferX = bufferX;
    this.bufferO = bufferO;

    this.track.connect(this.trackGain).connect(this.audioContext.destination);
  }

  static async fromConfig(config: SoundpackConfig) {
    const context = new AudioContext();
    const track = await Soundpack.createAudioSourceNode(context, config.trackPath);
    const bufferX = await fetch(config.soundX).then(response => response.arrayBuffer()).then(arrayBuffer => context.decodeAudioData(arrayBuffer));
    const bufferO = await fetch(config.soundO).then(response => response.arrayBuffer()).then(arrayBuffer => context.decodeAudioData(arrayBuffer));

    return new Soundpack(context, track, bufferX, bufferO)
  }

  static async createAudioSourceNode(context: AudioContext, path: string) {
    // Load and decode the audio buffer once at the start
    const audio = await fetch(path)
    const arrayBuffer = await audio.arrayBuffer()
    const audioBuffer = await context.decodeAudioData(arrayBuffer)

    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    return source;
  }

  playTrack() {
    this.track.start(0);
  }

  playX() {
    this.soundX = this.audioContext.createBufferSource();
    this.soundX.buffer = this.bufferX;
    this.soundX.connect(this.audioContext.destination);
    this.soundX.start(0);
  }

  playO() {
    this.soundO = this.audioContext.createBufferSource();
    this.soundO.buffer = this.bufferO;
    this.soundO.connect(this.audioContext.destination);
    this.soundO.start(0);
  }

  fadeOutTrack() {
    const fadeOutInterval = setInterval(() => {
      if (this.trackGain.gain.value > 0.05) {
        this.trackGain.gain.value -= 0.05;
      } else {
        clearInterval(fadeOutInterval);
        this.track.stop();
      }
    }, 20);
  }
}

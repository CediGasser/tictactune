export class BeatKeeper {
  public beatStart: number = 1000;
  public bpm: number = 120;
  public threshold: number = 100;

  private checkTimeoutId: number = 0;
  private startTime: number = 0;
  private beat: number = 0;

  private get interval(): number {
    return 60000 / this.bpm;
  }

  private onMissedBeat: Function = () => { };

  constructor(beatStart: number, bpm: number, onMissedBeat: Function) {
    this.bpm = bpm;
    this.beatStart = beatStart;
    this.onMissedBeat = onMissedBeat;
  }

  public start = () => {
    this.reset();
    this.startTime = Date.now();
    this.beat = 0;
    this.checkTimeoutId = setTimeout(this.checkForMissedBeat, this.beatStart + this.threshold);
  }

  public hit = () => {
    const now = Date.now();
    const delta = now - this.startTime;
    const expected = this.beatStart + this.beat * this.interval;

    const diff = expected - delta;
    if (Math.abs(diff) < this.threshold) {
      this.beat++;

      // clear the timeout for missed beat
      // and set a new one
      clearTimeout(this.checkTimeoutId);
      const nextCheckIn = this.interval + this.threshold + diff;
      this.checkTimeoutId = setTimeout(this.checkForMissedBeat, nextCheckIn);
    } else {
      this.stop()
      this.onMissedBeat();
    }

    return diff
  }

  // check if the hit did not occure in the last interval
  public checkForMissedBeat = () => {
    this.stop()
    this.onMissedBeat();
  }

  public stop = () => {
    clearInterval(this.checkTimeoutId);
  }

  public reset = () => {
    this.stop();
    this.startTime = 0;
    this.beat = 0;
  }
}

export class Oscillator {
  private startTime: number = 1000;
  private interval: number = 120;

  private animationFrameId: number = 0;
  private startAnimationTime: number = 0;
  private timeoutId: number = 0;

  private _value: number = $state(0);

  constructor(startTime: number, bpm: number) {
    this.startTime = startTime;
    this.interval = 60000 / bpm;
  }

  public start = () => {
    this._value = 0;

    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
  }

  public stop = () => {
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.timeoutId);
    this.startAnimationTime = 0;
    this.animationFrameId = 0;
    this.timeoutId = 0;
  }

  private update = (t: number): void => {
    if (this.startAnimationTime === 0) {
      this.startAnimationTime = t;
    }

    const delta = t - this.startAnimationTime;
    const offset = (delta - (this.startTime - (this.interval / 2))) % (this.interval * 2);
    const halvedInterval = this.interval / 2;

    if (!(delta < this.startTime - this.interval / 2)) {


      if (offset < this.interval) {
        if (offset < halvedInterval) {
          const newValue = offset / (halvedInterval);
          this._value = this.easingFn(newValue); // 0 -> 1
        }
        else {
          const newValue = 2 - (offset / (halvedInterval));
          this._value = this.easingFn(newValue); // 1 -> 0
        }
      } else {
        if (offset < this.interval * 1.5) {
          const newValue = -(offset - this.interval) / halvedInterval;
          this._value = this.easingFn(newValue); // 0 -> -1
        }
        else {
          const newValue = -2 + (offset - this.interval) / halvedInterval;
          this._value = this.easingFn(newValue); // -1 -> 0
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
  }

  private easingFn = (t: number) => {
    return t;
  }

  public get value(): number {
    return this._value;
  }
}

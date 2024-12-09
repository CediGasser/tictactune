export class Oscillator {
  private startTime: number = 1000;
  private interval: number = 120;

  private animationFrameId: number = 0;
  private startAnimationTime: number = 0;
  private timeoutId: number = 0;

  private inversionFactor: number = 1;
  private _value: number = $state(0);
  private _maybeInverted: number = $derived(this._value * this.inversionFactor)

  constructor(startTime: number, hitsPerMinute: number) {
    this.startTime = startTime;
    this.interval = 60000 / hitsPerMinute;

    this.inversionFactor = Math.random() > 0.5 ? 1 : -1;
  }

  public start = () => {
    this._value = 0;

    this.inversionFactor = Math.random() > 0.5 ? 1 : -1;
    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
  }

  public stop = () => {
    cancelAnimationFrame(this.animationFrameId);
    clearTimeout(this.timeoutId);
    this.startAnimationTime = 0;
    this.animationFrameId = 0;
    this.timeoutId = 0;
    this._value = 0;
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
    const eased = Math.pow(t, 3);
    return eased;
  }

  public get value(): number {
    return this._maybeInverted;
  }
}

export class Countdown {
  private startValue: number;
  private firstBeat: number;
  private bpm: number;

  private _value: number = $state(0);
  private _showNumber: boolean = $derived(this._value >= 0 && Number.isInteger(this._value));

  private timeoutId: number = 0;

  private get interval(): number {
    return 1000 / (this.bpm / 60);
  }

  public get value() {
    return this._value;
  }

  public get showNumber() {
    return this._showNumber;
  }

  constructor(startTime: number, bpm: number) {
    this.bpm = bpm;
    this.startValue = Math.floor(startTime / this.interval);
    this.firstBeat = startTime - this.startValue * this.interval;
  }

  public start = () => {
    this.stop();
    this._value = this.startValue - 0.5;
    this.timeoutId = setTimeout(this.update, this.firstBeat);
  }

  private update = () => {
    this._value -= 0.5;
    if (this._value >= 0) {
      this.timeoutId = setTimeout(this.update, this.interval / 2);
    }
  }

  public stop = () => {
    clearTimeout(this.timeoutId);
  }
}

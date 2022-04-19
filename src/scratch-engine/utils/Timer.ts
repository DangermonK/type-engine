

export class Timer {

    private dt: number;
    private currentTime: number;
    private lastTime: number;

    private static _instance: Timer;

    private constructor() {
        this.dt = 0;
        this.currentTime = 0;
        this.lastTime = 0;
    }

    static get instance(): Timer {
      if(!this._instance)
        this._instance = new Timer();

      return this._instance;
    }

    public start(): void {
        this.currentTime = Date.now();
    }

    public update(): void {
        this.lastTime = this.currentTime;
        this.currentTime = Date.now();
        this.dt = (this.currentTime - this.lastTime) / 1000;
    }

    get deltaTime(): number {
        return this.dt;
    }

}

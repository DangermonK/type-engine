
export interface IRunnable {

    start(): void;
    stop(): void;
    update(): void;
    fixedUpdate(): void;

}

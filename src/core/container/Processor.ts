import { IRunnable } from "./IRunnable";
import { Process } from "./Process.abstract";
import { Container } from "./Container";

export class Processor<Type extends Process<any>> extends Container<Type> implements IRunnable {

    constructor() {
        super();
    }

    fixedUpdate(): void {
        this.scripts.forEach(script => script.fixedUpdate());
    }

    start(): void {
        this.scripts.forEach(script => script.start());
    }

    stop(): void {
        this.scripts.forEach(script => script.stop());
    }

    update(): void {
        this.scripts.forEach(script => script.update());
    }

}

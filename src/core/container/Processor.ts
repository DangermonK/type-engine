import { IRunnable } from "./IRunnable";
import { Process } from "./Process.abstract";
import { Container } from "./Container";

export class Processor<Type extends Process<any>> extends Container<Type> implements IRunnable {

    constructor() {
        super();
    }

    fixedUpdate(): void {
        this.emit('fixedUpdate');
    }

    start(): void {
        this.addListener('start');
        this.addListener('stop');
        this.addListener('fixedUpdate');
        this.addListener('update');

        this.emit('start');
    }

    stop(): void {
        this.emit('stop');
    }

    update(): void {
        this.emit('update');
    }

}

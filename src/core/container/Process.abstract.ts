import { Scriptable } from "./Scriptable.abstract";
import { IRunnable } from "./IRunnable";
import { Processor } from "./Processor";

export abstract class Process<Type extends Processor<any>> extends Scriptable<Type> implements IRunnable {

    protected constructor(container: Type) {
        super(container);
    }

    abstract fixedUpdate(): void;

    abstract start(): void;

    abstract stop(): void;

    abstract update(): void;

}


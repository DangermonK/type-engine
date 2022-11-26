import { Scriptable } from "./Scriptable.abstract";
import { Processor } from "./Processor";

export abstract class Process<Type extends Processor<any>> extends Scriptable<Type> {

    protected constructor(container: Type) {
        super(container);
    }

}


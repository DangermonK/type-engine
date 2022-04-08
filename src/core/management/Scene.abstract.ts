
import { Container } from "../container/Container";
import { SceneScript } from "./SceneScript.abstract";
import { IRunnable } from "../container/IRunnable";


export abstract class Scene extends Container<SceneScript> implements IRunnable {

    protected constructor() {
        super();
    }

    abstract fixedUpdate(): void;

    abstract start(): void;

    abstract stop(): void;

    abstract update(): void;

}

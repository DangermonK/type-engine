import { Scriptable } from "../container/Scriptable.abstract";
import { Scene } from "./Scene.abstract";


export abstract class SceneScript extends Scriptable<Scene> {

    protected constructor(scene: Scene) {
        super(scene);
    }

    requireScript<Script extends SceneScript>(script: new(...args: Array<any>) => Script): Script {
        return this.container.requireType(script);
    }

}

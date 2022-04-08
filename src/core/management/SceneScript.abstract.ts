import { Scriptable } from "../container/Scriptable.abstract";
import { Scene } from "./Scene.abstract";


export abstract class SceneScript<Type extends Scene> extends Scriptable<Type> {

    protected constructor(scene: Type) {
        super(scene);
    }

    requireScript<Script extends SceneScript<Type>>(script: new(...args: Array<any>) => Script): Script {
        return this.container.requireType(script);
    }

}

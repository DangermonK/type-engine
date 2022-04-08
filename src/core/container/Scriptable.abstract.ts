import { Container } from "./Container";
import { IDisposable } from "./IDisposable";

export abstract class Scriptable<Type extends Container<any>> implements IDisposable {

    private readonly _container: Type;

    protected constructor(container: Type) {
        this._container = container;
    }

    get container(): Type {
        return this._container;
    }

    abstract initialize(): void;

    abstract dispose(): void;

}

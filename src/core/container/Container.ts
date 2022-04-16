import { Scriptable } from "./Scriptable.abstract";
import { IContainer } from "./IContainer";
import { IDisposable } from "./IDisposable";
import { ObjectMap } from "../../scratch-engine/utils/ObjectMap";

export class Container<Type extends Scriptable<any>> implements IContainer<Type>, IDisposable {

    private readonly _enabledScriptMap: ObjectMap<Type>;

    constructor() {
        this._enabledScriptMap = new ObjectMap<Type>();
    }

    protected get scripts(): Array<Type> {
        return this._enabledScriptMap.all;
    }

    requireType<Element extends Type>(element: { new(...args: any): Element }): Element {
        if(this.hasType(element)) {
            return this.getElement(element);
        }
        return this.addElement(new element(this));
    }

    addElement<Element extends Type>(element: Element): Element {
        this._enabledScriptMap.set(element);
        return element;
    }

    getElement<Element extends Type>(element: { new(...args: any): Element }): Element {
        return this._enabledScriptMap.get(element);
    }

    hasType<Element extends Type>(element: { new(...args: any): Element }): boolean {
        return this._enabledScriptMap.hasType(element);
    }

    hasElement<Element extends Type>(element: Element ): boolean {
        return this._enabledScriptMap.hasElement(element);
    }

    initialize(): void {
        this._enabledScriptMap.all.forEach((script: Scriptable<any>) => script.initialize());
    }

    dispose(): void {
        this._enabledScriptMap.all.forEach((script: Scriptable<any>) => script.dispose());
    }

}

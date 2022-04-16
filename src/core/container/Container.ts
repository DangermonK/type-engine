import { Scriptable } from "./Scriptable.abstract";
import { IContainer } from "./IContainer";
import { IDisposable } from "./IDisposable";
import { ObjectMap } from "../../scratch-engine/utils/ObjectMap";

export class Container<Type extends Scriptable<any>> implements IContainer<Type>, IDisposable {

    private readonly _enabledScriptMap: ObjectMap<Type>;
    private readonly _disabledScriptMap: ObjectMap<Type>;

    constructor() {
        this._enabledScriptMap = new ObjectMap<Type>();
        this._disabledScriptMap = new ObjectMap<Type>();
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

    disableElement<Element extends Type>(element: { new(...args: any): Element }): void {
        const el = this._enabledScriptMap.get(element);
        if(el) {
            this._enabledScriptMap.remove(el);
            this._disabledScriptMap.set(el);
        }
    }

    enableElement<Element extends Type>(element: { new(...args: any): Element }): void {
        const el = this._disabledScriptMap.get(element);
        if(el) {
            this._disabledScriptMap.remove(el);
            this._enabledScriptMap.set(el);
        }
    }

    initialize(): void {
        this._enabledScriptMap.all.forEach((script: Scriptable<any>) => script.initialize());
    }

    dispose(): void {
        this._enabledScriptMap.all.forEach((script: Scriptable<any>) => script.dispose());
    }

}

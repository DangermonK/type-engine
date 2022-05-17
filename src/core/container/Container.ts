import { Scriptable } from "./Scriptable.abstract";
import { IContainer } from "./IContainer";
import { IDisposable } from "./IDisposable";
import { ObjectMap } from "../../scratch-engine/utils/ObjectMap";

export class Container<Type extends Scriptable<any>> implements IContainer<Type>, IDisposable {

    private readonly _scriptMap: ObjectMap<Type>;

    private readonly _listenerMap: Map<string, Array<(data?: any) => void>>;

    constructor() {
        this._scriptMap = new ObjectMap<Type>();
        this._listenerMap = new Map<string, Array<(data?: any) => void>>();
    }

    protected get scripts(): Array<Type> {
        return this._scriptMap.all;
    }

    requireType<Element extends Type>(element: { new(...args: any): Element }): Element {
        if(this.hasType(element)) {
            return this.getElement(element);
        }
        return this.addElement(new element(this));
    }

    addElement<Element extends Type>(element: Element): Element {
        this._scriptMap.set(element);
        return element;
    }

    getElement<Element extends Type>(element: { new(...args: any): Element }): Element {
        return this._scriptMap.get(element);
    }

    hasType<Element extends Type>(element: { new(...args: any): Element }): boolean {
        return this._scriptMap.hasType(element);
    }

    hasElement<Element extends Type>(element: Element ): boolean {
        return this._scriptMap.hasElement(element);
    }

    initialize(): void {
        this._scriptMap.all.forEach((script: Scriptable<any>) => script.initialize());
    }

    dispose(): void {
        this._scriptMap.all.forEach((script: Scriptable<any>) => script.dispose());
    }

    hasListener(method: string): boolean {
        return this._listenerMap.has(method);
    }

    addListener(method: string): void {
        for(const script of this.scripts) {
            if(typeof (script as any)[method] === 'function') {
                if(!this._listenerMap.has(method))
                    this._listenerMap.set(method, new Array<(data?: any) => void>());

                this._listenerMap.get(method)!.push((script as any)[method].bind(script));
            }
        }
    }

    emit(method: string, data?: any): void {
        for(const func of this._listenerMap.get(method) || []) {
            func(data);
        }
    }

}

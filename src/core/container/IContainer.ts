import { Scriptable } from "./Scriptable.abstract";

export interface IContainer<Type extends Scriptable<any>> {

    requireType<Element extends Type>(element: { new(...args: any): Element }): Element;
    getElement<Element extends Type>(element: new(...args: any) => Element): Element;
    addElement<Element extends Type>(element: Element): Element;
    hasElement<Element extends Type>(element: Element): boolean;
    hasType<Element extends Type>(element: new(...args: any) => Element): boolean;

    disableElement<Element extends Type>(element: new(...args: any) => Element): void;
    enableElement<Element extends Type>(element: new(...args: any) => Element): void;

}


export class ObjectMap<Type extends Object> {

    private readonly map: Map<string, Type>;

    constructor() {
        this.map = new Map<string, Type>();
    }

    set<Element extends Type>(element: Element): void {
        this.map.set(element.constructor.name, element);
    }

    remove<Element extends Type>(element: Element): void {
        this.map.delete(element.constructor.name);
    }

    get<Element extends Type>(element: new(...args: any) => Element): Element {
        return this.map.get(element.name) as Element;
    }

    hasElement<Element extends Type>(element: Element): boolean {
        return this.map.has(element.constructor.name);
    }

    hasType<Element extends Type>(element: new(...args: any) => Element): boolean {
        return this.map.has(element.name);
    }

    get all(): Array<Type> {
        return [...this.map.values()];
    }

}

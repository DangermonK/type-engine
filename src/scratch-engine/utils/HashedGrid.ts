import { ScratchEntity } from "../core/ScratchEntity.abstract";


export class HashedGrid {

    private readonly _hashedGrid: Map<string, Array<string>>;

    private readonly _cellSize: number;

    constructor(cellSize: number) {

        this._cellSize = cellSize;

        this._hashedGrid = new Map<string, Array<string>>();

    }

    clear(): void {
        this._hashedGrid.clear();
    }

    private pushHash(hash: string, id: string): void {
        if(!this._hashedGrid.has(hash))
            this._hashedGrid.set(hash, new Array<string>());

        this._hashedGrid.get(hash)?.push(id);
    }

    private getCorners(entity: ScratchEntity): any {
        return {
            xMin: Math.floor(entity.transform.bounds.x / this._cellSize),
            yMin: Math.floor(entity.transform.bounds.y / this._cellSize),
            xMax: Math.floor((entity.transform.bounds.x + entity.transform.bounds.w) / this._cellSize),
            yMax: Math.floor((entity.transform.bounds.y + entity.transform.bounds.h) / this._cellSize)
        }
    }

    private buildHash(x: number, y: number): string {
      return x + ":" + y;
    }

    pushElement(entity: ScratchEntity): void {
        entity.transform.clearHashCoords();
        const corners = this.getCorners(entity);

        for(let i = corners.yMin; i <= corners.yMax; i++) {
            for (let j = corners.xMin; j <= corners.xMax; j++) {
                const hash = this.buildHash(j, i);
                entity.transform.addHashCoords(hash);
                this.pushHash(hash, entity.id);
            }
        }
    }

    getElementsFromHashes(hashes: Array<string>): Array<string> {
        let arr: Array<string> = new Array<string>();
        for (const hash of hashes) {
            arr = arr.concat(this._hashedGrid.get(hash) || []);
        }

        return [...new Set(arr)];
    }

    getElementsFromAt(x: number, y: number): Array<string> {
        const hash = this.buildHash(x, y);

        return this._hashedGrid.get(hash) || [];
    }

    getElementsFromBounds(entity: ScratchEntity): Array<string> {
        const corners = this.getCorners(entity);

        let arr: Array<string> = new Array<string>();
        for(let i = corners.yMin; i < corners.yMax; i++) {
            for (let j = corners.xMin; j < corners.xMax; j++) {
                const hash = this.buildHash(j, i);
                arr = arr.concat(this._hashedGrid.get(hash) || []);
            }
        }
        return [...new Set(arr)];
    }

}

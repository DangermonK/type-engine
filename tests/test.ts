import { Vector2 } from "../src/index";
import { expect } from "chai";

describe('Vector', () => {
    it('add', () => {
        const vector: Vector2 = new Vector2();
        vector.add(new Vector2(2, -2));
        expect(vector.x).to.equal(2);
        expect(vector.y).to.equal(-2);
    });
    it('subtract', () => {
        const vector: Vector2 = new Vector2();
        vector.subtract(new Vector2(2, -2));
        expect(vector.x).to.equal(-2);
        expect(vector.y).to.equal(2);
    });
    it('normalized', () => {
        // check normalized
    });
    it('magnitude', () => {
        // check magnitude
    });
    it('negated', () => {
        const vector: Vector2 = new Vector2(2,4).negated();
        expect(vector.x).to.equal(-2);
        expect(vector.y).to.equal(-4);
    });
});
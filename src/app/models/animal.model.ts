import { Deserializable } from "./deserializable.model";

export class Animal implements Deserializable {
    id: number;
    type: string;
    poids: number;
    bruit: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(id: number, type: string, poids: number, bruit: string) {
        this.id = id;
        this.type = type;
        this.poids = poids;
        this.bruit = bruit;
    }
}
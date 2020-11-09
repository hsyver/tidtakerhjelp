import { Medlem } from "./medlem.model";

export interface Paamelding {
    id: number;
    startnr: number;
    medlem: Medlem;
}
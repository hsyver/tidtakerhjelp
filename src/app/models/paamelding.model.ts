import { Medlem } from "./medlem.model";

export interface Paamelding {
    id: number;
    startnr: number;
    starttid: string;
    medlem: Medlem;
}
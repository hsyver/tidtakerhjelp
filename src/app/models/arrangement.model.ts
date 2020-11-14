import { Startform } from "./startform.enum";

export interface Arrangement {
    arrKode: number;
    navn: string;
    dato: Date;
    startform: Startform;
    runderMenn: number;
    runderKvinner: number;
}
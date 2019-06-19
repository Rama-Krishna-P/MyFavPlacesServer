import { Place } from "./place";

export interface Folder {
    id: number;
    name: string;
    places: Places;
}

export interface Places {
    places: Place[];
}
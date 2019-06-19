import { Place } from "../models/place";

export interface PlacePersistanceService {
    getAllPlaces(folderId: number) : Promise<string>;
    addNewPlace(folderId: number, place: Place) : Promise<string>;
    updatePlace(folderId: number, place: Place) : Promise<string>;
    deletePlace(folderId: number, placeId: string) : Promise<string>;
}
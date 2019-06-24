import { PGPersistanceService } from "./pg-persistance-service";
import { PlacePersistanceService } from "../../interfaces/services/place-persistance.service";
import { Place } from "../../interfaces/models/place";
import { QueryResult } from "pg";

export class PGPlacePersistanceService extends PGPersistanceService implements PlacePersistanceService {
    constructor(connString: string) {
        super(connString);
    }

    async getAllPlaces(folderId: number): Promise<string> {
        try {
            let result: QueryResult = await super.executeQuery(`
            Select COALESCE(jsonb_agg(opt)::jsonb, '[]'::jsonb) as places
            from folders, jsonb_array_elements(folders.places #> '{places}') WITH ORDINALITY arr(opt, ord) where folders.id = ${folderId};`);
            return JSON.stringify(result.rows[0].places);
        } catch (error) {
            throw error;
        }
    }

    async addNewPlace(folderId: number, place: Place): Promise<string> {
        try {
            let result: QueryResult = await super.executeQuery(`
            Update folders f
            Set places = jsonb_set(f.places, '{places}', val, false)
            from folders f1, LATERAL (
                Select COALESCE(jsonb_agg(opt) || '${JSON.stringify(place)}'::jsonb, '[${JSON.stringify(place)}]'::jsonb) as val
                FROM folders,  jsonb_array_elements(folders.places #> '{places}') WITH ORDINALITY arr(opt, ord) where folders.id = ${folderId}) opt 
            where f.id = ${folderId};`);

            return JSON.stringify(place);
        } catch (error) {
            throw error;
        }
    }

    async updatePlace(folderId: number, place: Place): Promise<string> {
        try {
            let result: QueryResult = await super.executeQuery(`
            UPDATE folders f
            SET    places = jsonb_set(f.places, path, '${JSON.stringify(place)}', false)
            FROM   folders f1, LATERAL (
                SELECT ARRAY['places', (ord - 1)::text] AS path
                FROM   jsonb_array_elements(f1.places #> '{places}') WITH ORDINALITY arr(opt, ord)
                WHERE  opt ->> 'id' = '${place.id}'
                ) opt 
            where f.id = ${folderId};`);

            return JSON.stringify(place);
        } catch (error) {
            throw error;
        }
    }

    async deletePlace(folderId: number, placeId: string): Promise<string> {
        try {
            let result: QueryResult = await super.executeQuery(`
            Update folders f
            Set places = jsonb_set(f.places, '{places}', val, false)
            from folders f1, LATERAL (
                Select COALESCE(jsonb_agg(opt)::jsonb, '[]'::jsonb) as val
                FROM folders,  jsonb_array_elements(folders.places #> '{places}') WITH ORDINALITY arr(opt, ord)
                WHERE opt ->> 'id' != '${placeId}') opt
                where f.id = ${folderId};`);

            return JSON.stringify('{mgs: "Successful"}');
        } catch (error) {
            throw error;
        }
    }
}
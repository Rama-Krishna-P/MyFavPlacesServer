import { FolderPersistanceService } from "../../interfaces/services/folder-persistance-service";
import { Folder } from "../../interfaces/models/folder";
import { PGPersistanceService } from "./pg-persistance-service";
import { resolve } from "dns";
import { json } from "body-parser";
import { QueryResult } from "pg";

export class PGFolderPersistanceService extends PGPersistanceService implements FolderPersistanceService {
    constructor(connString: string) {
        super(connString);
    }

    async getAllFolders(): Promise<string> {
        try {
            const result = await super.executeQuery('select id, name from folders order by id');
            return JSON.stringify(result.rows);
        }
        catch (err) {
            throw err;
        }
    }

    async createFolder(folder: Folder): Promise<string> {
        try {
            const result = await super.executeQuery(`insert into folders (name, places) values ('${folder.name}', '${JSON.stringify({places: folder.places})}') RETURNING id`);
            folder.id = result.rows[0].id;
            return JSON.stringify(folder);
        }
        catch (err) {
            throw err;
        }
    }

    async updateFolder(folder: Folder): Promise<string> {
        try {
            const result = await super.executeQuery(`update folders set name = '${folder.name}' where id = ${folder.id}`);
            return JSON.stringify(folder);
        }
        catch (err) {
            throw err;
        }
    }
    
    async deleteFolder(id: number): Promise<string> {
        try {
            const result = await super.executeQuery(`delete from folders where id = ${id}`);
            return '{"message" : "success"}';
        }
        catch (err) {
            throw err;
        }
    }
}
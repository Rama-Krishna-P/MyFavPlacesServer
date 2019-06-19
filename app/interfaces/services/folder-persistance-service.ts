import { Folder } from "../models/folder";

export interface FolderPersistanceService{
    getAllFolders() : Promise<string>;
    createFolder(folder: Folder) : Promise<string>;
    updateFolder(folder: Folder) : Promise<string>;
    deleteFolder(id: number) : Promise<string>;
}
import { Request, Response } from "express-serve-static-core";
import Express from "express";
import { Controller } from "../interfaces/controller";
import { FolderPersistanceService } from "../interfaces/services/folder-persistance-service";
import { ControllerBase } from "./controller-base";
import { Authorize } from "../middleware/jwtAuthorizer";

export class folderController extends ControllerBase implements Controller {
    private _service: FolderPersistanceService;

    constructor(service: FolderPersistanceService) {
        super();
        this._service = service;
    }

    setupRoutes(app: Express.Application): void {
        app.get('/folders', Authorize, this.getAllFolders.bind(this));
        app.post('/folder', Authorize, this.addNewFolder.bind(this));
        app.put('/folder', Authorize, this.updateFolder.bind(this));
        app.delete('/folder/:folderId', Authorize, this.deleteFolder.bind(this));
    }

    private getAllFolders(req: any, res: Response) {
        super.handleRequest(req, res, (() => {
            return this._service.getAllFolders();
        }).bind(this));
    }

    addNewFolder(req: Request, res: Response) {
        super.handleRequest(req, res, (() => {
            return this._service.createFolder(req.body);
        }).bind(this));
    }

    updateFolder(req: Request, res: Response) {
        super.handleRequest(req, res, (() => {
            return this._service.updateFolder(req.body);
        }).bind(this));
    }

    deleteFolder(req: Request, res: Response) {
        super.handleRequest(req, res, (() => {
            return this._service.deleteFolder(req.params.folderId);
        }).bind(this));
    }
}
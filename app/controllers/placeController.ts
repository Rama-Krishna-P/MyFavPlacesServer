import { Controller } from "../interfaces/controller";
import { ControllerBase } from "./controller-base";
import { Application, Request, Response } from "express-serve-static-core";
import { PlacePersistanceService } from "../interfaces/services/place-persistance.service";

export class PlaceController extends ControllerBase implements Controller {
    _service: PlacePersistanceService;
    
    constructor(service: PlacePersistanceService) {
        super();
        this._service = service;
    }

    setupRoutes(app: Application): void {
        app.get('/folder/:folderId/places', this.getPlacesForFolder.bind(this));
        app.put('/folder/:folderId/place', this.editPlace.bind(this));
        app.post('/folder/:folderId/place', this.addNewPlace.bind(this));
        app.delete('/folder/:folderId/:placeId', this.deletePlace.bind(this));
    }
    
    private deletePlace(request: Request, response: Response) {
        super.handleRequest(request, response, (() => {
            return this._service.deletePlace(request.params.folderId, request.params.placeId);
        }).bind(this));
    }
    
    private addNewPlace(request: Request, response: Response) {
        super.handleRequest(request, response, (() => {
            return this._service.addNewPlace(request.params.folderId, request.body);
        }).bind(this));
    }
    
    private editPlace(request: Request, response: Response) {
        super.handleRequest(request, response, (() => {
            return this._service.updatePlace(request.params.folderId, request.body);
        }).bind(this));
    }

    private getPlacesForFolder(request: Request, response: Response) {
        super.handleRequest(request, response, (() => {
            return this._service.getAllPlaces(request.params.folderId);
        }).bind(this));
    }

}
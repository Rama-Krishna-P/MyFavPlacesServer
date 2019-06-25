import { Application } from "./application";
import { folderController } from "./controllers/folderController";
import Express from "express";
import path from "path";
import { WebAppController } from "./controllers/webAppController";
import { PGFolderPersistanceService } from "./services/pg-persistance-services/pg-folder-persistance-service";
import { PlaceController } from "./controllers/placeController";
import { PGPlacePersistanceService } from "./services/pg-persistance-services/pg-place-persistance-service";
import { SignInController } from "./controllers/signInController";

const pgConnString : string = process.env.DATABASE_URL || 'postgres://postgres:password1@localhost:5432/MyFavPlaces';

console.log('Starting app');

const app : Application = new Application({
    controllers: [new SignInController(),
                  new folderController(new PGFolderPersistanceService(pgConnString)),
                  new PlaceController(new PGPlacePersistanceService(pgConnString)),
                  new WebAppController()],
    handlers: [Express.static(path.join(__dirname, 'public'))],
});

app.startApp();
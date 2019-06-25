import Express from "express";
import path from "path";
import { AppConfiguration } from "./interfaces/app-configuration";
import bodyParser from "body-parser";
import cors from "cors";

export class Application {

    private app: Express.Application = Express();
    private config: AppConfiguration;

    constructor(configuration: AppConfiguration) {
        this.config = configuration;
    }

    startApp() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        if (process.env.NODE_ENV) {
            this.app.use(cors({
                exposedHeaders : "authorization"
            }));
        }

        this.registerHandlers();
        this.setupRoutes();


        let portNo = process.env.PORT || 3000;

        this.app.listen(portNo, function () {
            console.log(`App listening on ${portNo}`);
        });
    }

    private registerHandlers() {
        if (this.config.handlers !== null && this.config.handlers.length > 0) {
            this.app.use(this.config.handlers);
        }

    }

    private setupRoutes() {
        if (this.config.controllers !== null && this.config.controllers.length > 0) {
            this.config.controllers.forEach(element => {
                element.setupRoutes(this.app);
            });
        }
    }
}
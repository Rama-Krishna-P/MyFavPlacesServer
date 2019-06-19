import Express from "express";

export interface Controller {
    setupRoutes(app: Express.Application) : void;
}
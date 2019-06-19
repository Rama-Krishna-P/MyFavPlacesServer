import { Controller } from "./controller";
import { RequestHandler } from "express-serve-static-core";

export interface AppConfiguration {
    controllers: Controller[],
    handlers: RequestHandler[],
}
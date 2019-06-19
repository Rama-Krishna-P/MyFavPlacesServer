"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var webApp_1 = require("./webApp");
var Application = /** @class */ (function () {
    function Application() {
        this.app = express_1.default();
    }
    Application.prototype.startApp = function () {
        this.registerStaticFiles();
        this.setupRoutes();
        this.app.listen(3000, function () {
            console.log("App listening on 3000");
        });
    };
    Application.prototype.registerStaticFiles = function () {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    };
    Application.prototype.setupRoutes = function () {
        this.app.get('/', webApp_1.getWebApp);
    };
    return Application;
}());
exports.Application = Application;

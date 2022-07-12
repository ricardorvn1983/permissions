"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_app, _Server_port;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const permission_1 = __importDefault(require("../routes/permission"));
const line_1 = __importDefault(require("../routes/line"));
const person_1 = __importDefault(require("../routes/person"));
const motive_1 = __importDefault(require("../routes/motive"));
const concept_1 = __importDefault(require("../routes/concept"));
const subscribe_1 = __importDefault(require("../routes/subscribe"));
const permissions_types_1 = __importDefault(require("../routes/permissions_types"));
const terminal_logs_1 = __importDefault(require("../routes/terminal_logs"));
const connection_md_1 = __importDefault(require("../db/connection-md"));
const connection_ss_1 = __importDefault(require("../db/connection-ss"));
class Server {
    constructor() {
        _Server_app.set(this, void 0);
        _Server_port.set(this, void 0);
        this.apiPaths = {
            terminal_logs: '/api/v1/terminal_logs',
            permissions: '/api/v1/permissions',
            lines: '/api/v1/lines',
            persons: '/api/v1/persons',
            motives: '/api/v1/motives',
            concepts: '/api/v1/concepts',
            subscribes: '/api/v1/subscribes',
            permissions_types: '/api/v1/permissions-types'
        };
        __classPrivateFieldSet(this, _Server_app, (0, express_1.default)(), "f");
        __classPrivateFieldSet(this, _Server_port, process.env.PORT || '8000', "f");
        this.pshDbConnect();
        this.sfcDbConnect();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        __classPrivateFieldGet(this, _Server_app, "f").use((0, cors_1.default)());
        __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.json());
    }
    routes() {
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.permissions, permission_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.lines, line_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.persons, person_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.motives, motive_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.concepts, concept_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.subscribes, subscribe_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.permissions_types, permissions_types_1.default);
        __classPrivateFieldGet(this, _Server_app, "f").use(this.apiPaths.terminal_logs, terminal_logs_1.default);
    }
    listen() {
        __classPrivateFieldGet(this, _Server_app, "f").listen(__classPrivateFieldGet(this, _Server_port, "f"), () => {
            console.log("Server is Running - PORT :" + __classPrivateFieldGet(this, _Server_port, "f"));
        });
    }
    pshDbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_md_1.default.authenticate();
                console.log("Connected to PSH DB in Galan");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    sfcDbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_ss_1.default.authenticate();
                console.log("Connected to SFC DB");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
_Server_app = new WeakMap(), _Server_port = new WeakMap();
exports.default = Server;
//# sourceMappingURL=server.js.map
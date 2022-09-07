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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollections = exports.deinitializeMongoServer = exports.initializeMongoServer = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
let mongoServer = null;
const initializeMongoServer = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    (0, mongoose_1.connect)(mongoUri);
    mongoose_1.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            (0, mongoose_1.connect)(mongoUri);
        }
        console.log(e);
    });
});
exports.initializeMongoServer = initializeMongoServer;
const deinitializeMongoServer = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoServer) {
        yield mongoose_1.connection.dropDatabase();
        yield mongoose_1.connection.close();
        yield mongoServer.stop();
    }
});
exports.deinitializeMongoServer = deinitializeMongoServer;
const dropCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoServer) {
        const collections = yield mongoose_1.connection.db.collections();
        for (let collection of collections) {
            yield collection.drop();
        }
    }
});
exports.dropCollections = dropCollections;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel"));
const fixtures_1 = require("../fixtures");
require("jest");
const mongoConfigTesting_1 = require("../../config/mongoConfigTesting");
describe('User Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.deinitializeMongoServer)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.dropCollections)();
    }));
    it('should create a user item successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield userModel_1.default.create(fixtures_1.fakeUserData);
        expect(newBlog._id).toBeDefined();
        expect(newBlog.email).toBe(newBlog.email);
        expect(newBlog.role).toBe(newBlog.role);
        expect(newBlog.username).toBe(newBlog.username);
        expect(newBlog.password).toBe(newBlog.password);
    }));
    it('should fail the user item without the required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = new userModel_1.default();
        newBlog.validate((err) => {
            expect(err).not.toBe(null);
        });
    }));
    it('should fail the user item with fields of wrong type', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = new userModel_1.default(fixtures_1.fakeFailUserData);
            yield newUser.validate();
        }
        catch (error) {
            expect(error).not.toBe(null);
        }
    }));
});

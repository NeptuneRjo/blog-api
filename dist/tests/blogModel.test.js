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
const blogModel_1 = __importDefault(require("../models/blogModel"));
const fixtures_1 = require("./fixtures");
require("jest");
const mongoConfigTesting_1 = require("../config/mongoConfigTesting");
describe('Blog Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.deinitializeMongoServer)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.dropCollections)();
    }));
    it('should create a blog item successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = yield blogModel_1.default.create(fixtures_1.fakeBlogData);
        expect(newBlog._id).toBeDefined();
        expect(newBlog.body).toBe(newBlog.body);
        expect(newBlog.title).toBe(newBlog.title);
        expect(newBlog.date).toBe(newBlog.date);
        expect(newBlog.comments).toBe(newBlog.comments);
    }));
    it('should fail the blog item without the required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = new blogModel_1.default();
        newBlog.validate((err) => {
            expect(err).not.toBe(null);
        });
    }));
    it('should fail the blog item with fields of wrong type', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBlog = new blogModel_1.default(fixtures_1.fakeFailBlogData);
            yield newBlog.validate();
        }
        catch (error) {
            expect(error).not.toBe(null);
        }
    }));
});

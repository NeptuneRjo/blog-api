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
const routes_exports_1 = require("../routes/routes-exports");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
require("jest");
const mongoConfigTesting_1 = require("../config/mongoConfigTesting");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/blogs', routes_exports_1.blogRoutes);
describe('MongoMemoryServer', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    describe('GET /api/blogs', () => {
        it('responds with json', (done) => {
            (0, supertest_1.default)(app)
                .get('/api/blogs')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, () => done());
        });
    });
});

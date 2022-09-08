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
const blogModel_1 = __importDefault(require("../models/blogModel"));
const fixtures_1 = require("./fixtures");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/blogs', routes_exports_1.blogRoutes);
const server = supertest_1.default.agent('http://localhost:4000');
describe('MongoMemoryServer', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.deinitializeMongoServer)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.dropCollections)();
    }));
    describe('GET /api/blogs', () => {
        it('responds with json', (done) => {
            server
                .get('/api/blogs')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, () => done());
        });
    });
    describe('GET /api/blogs/:id', () => {
        let id = null;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const newBlog = yield blogModel_1.default.create(fixtures_1.fakeBlogData);
            id = JSON.stringify(newBlog === null || newBlog === void 0 ? void 0 : newBlog._id);
        }));
        it('responds with json', (done) => {
            server
                .get(`/api/blogs/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, () => done());
        });
    });
    describe('POST /api/blogs *authorized*', () => {
        it('login', (done) => {
            server
                .post('/api/users/login')
                .send({
                email: process.env.TEST_USER,
                password: process.env.TEST_PASSWORD,
            })
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                return done();
            });
        });
        it('POST blog when user is authorized', (done) => {
            server
                .post('/api/blogs')
                .send(fixtures_1.fakeBlogData)
                .expect(201)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
    });
    describe('POST /api/blogs *unauthorized*', () => {
        it('logout', (done) => {
            server
                .post('/api/users/logout')
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                return done();
            });
        });
        it('does not POST blog when user is unauthorized', (done) => {
            server
                .post('/api/blogs')
                .send(fixtures_1.fakeBlogData)
                .expect(401)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
    });
});

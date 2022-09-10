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
const supertest_1 = __importDefault(require("supertest"));
require("jest");
const mongoConfigTesting_1 = require("../config/mongoConfigTesting");
const fixtures_1 = require("./fixtures");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_exports_1 = require("../routes/routes-exports");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/users', routes_exports_1.userRoutes);
const server = supertest_1.default.agent(app);
describe('User tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.deinitializeMongoServer)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.dropCollections)();
    }));
    describe('POST /api/users/login', () => {
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
    });
    describe('POST /api/users/logout', () => {
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
    });
    describe('GET /api/users', () => {
        it('responds with json', (done) => {
            server
                .get('/api/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, () => done());
        });
    });
    describe('POST /api/users/signup', () => {
        it('POST new user', (done) => {
            server
                .post('/api/users/signup')
                .send(fixtures_1.newUser)
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
    });
    describe('GET /api/users/:id', () => {
        let id = null;
        it('POST new user', (done) => {
            server
                .post('/api/users/signup')
                .send(fixtures_1.newUser)
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                id = res.body.data._id;
                done();
            });
        });
        it('responds with json', (done) => {
            server
                .get(`/api/users/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, () => done());
        });
    });
});

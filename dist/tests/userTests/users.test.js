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
const mongoConfigTesting_1 = require("../../config/mongoConfigTesting");
require("dotenv/config");
const server = supertest_1.default.agent('http://localhost:4000');
describe('User tests', () => {
    let id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield (0, mongoConfigTesting_1.initializeMongoServer)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.deinitializeMongoServer)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoConfigTesting_1.dropCollections)();
    }));
    const createUser = () => {
        it('signs up new user', (done) => {
            server
                .post('/api/users/signup')
                .send({
                email: 'test1@user.com',
                password: 'testpassword',
                username: 'testuser',
                role: 'Admin',
            })
                .set('Accept', 'application/json')
                .expect([200, 400])
                .end((err, res) => {
                if (err)
                    return done(err);
                id = res.body.data.user.id;
                return done();
            });
        });
    };
    const loginUser = () => {
        it('login', (done) => {
            server
                .post('/api/users/login')
                .send({
                email: 'test1@user.com',
                password: 'testpassword',
            })
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                return done();
            });
        });
    };
    describe('POST /api/users/login', () => {
        createUser();
        it('login', (done) => {
            server
                .post('/api/users/login')
                .send({
                email: 'test1@user.com',
                password: 'testpassword',
            })
                .set('Accept', 'application/json')
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
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                return done();
            });
        });
    });
    describe('GET /api/users/:id', () => {
        createUser();
        it('responds with json', (done) => {
            server
                .get(`/api/users/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                return done();
            });
        });
    });
    describe('POST /api/users/signup', () => {
        createUser();
    });
});

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
const server = supertest_1.default.agent('http://localhost:4000');
describe('Blog Tests', () => {
    let token;
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
                token = res.body.token;
                if (err)
                    return done(err);
                return done();
            });
        });
    };
    // Signup returns 200 for a new user created
    //  OR will return 400 if user already exists
    const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
        it('creates new user', (done) => {
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
                return done();
            });
        });
    });
    const logoutUser = () => {
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
    };
    describe('Authorized requests', () => {
        createUser();
        loginUser();
        describe('POST /api/blogs', () => {
            it('POST new blog', (done) => {
                server
                    .post('/api/blogs')
                    .send(fixtures_1.newBlog)
                    .query(token)
                    .expect(201)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    id = res.body.data._id;
                    return done();
                });
            });
        });
        describe('DELETE /api/blogs/:id', () => {
            it('DELETES blog', (done) => {
                server
                    .delete(`/api/blogs/${id}`)
                    .query(token)
                    .expect(200)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
    });
    describe('Unauthorized requests', () => {
        // Login to gain auth - create blog - logout to lose auth
        createUser();
        loginUser();
        describe('POST /api/blogs', () => {
            it('POST new blog', (done) => {
                server
                    .post('/api/blogs')
                    .send(fixtures_1.newBlog)
                    .expect(201)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
        logoutUser();
        describe('DELETE /api/blogs/:id', () => {
            it('DELETES blog', (done) => {
                server
                    .delete(`/api/blogs/${id}`)
                    .expect(401)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
    });
    describe('No auth required', () => {
        // Still auths to create the blogs used
        // in get:id and patch:id
        createUser();
        loginUser();
        describe('GET /api/blogs', () => {
            it('GETS all blogs', (done) => {
                server
                    .get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
        describe('GET /api/blogs/:id', () => {
            // Creates the blog to be found
            it('POST new blog', (done) => {
                server
                    .post('/api/blogs')
                    .send(fixtures_1.newBlog)
                    .query(token)
                    .expect(201)
                    .end((err, res) => {
                    id = res.body.data._id;
                    if (err)
                        return done(err);
                    return done();
                });
            });
            it('GETS the blog', (done) => {
                server
                    .get(`/api/blogs/${id}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
        describe('PATCH /api/blogs/:id', () => {
            // Creates the blog to be patched
            it('POST new blog', (done) => {
                server
                    .post('/api/blogs')
                    .send(fixtures_1.newBlog)
                    .query(token)
                    .expect(201)
                    .end((err, res) => {
                    id = res.body.data._id;
                    if (err)
                        return done(err);
                    return done();
                });
            });
            it('PATCH the blog', (done) => {
                server
                    .patch(`/api/blogs/${id}`)
                    .send({ comments: [{ username: 'test', body: 'test' }] })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                    if (err)
                        return done(err);
                    return done();
                });
            });
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
require("dotenv/config");
const server = supertest_1.default.agent('http://localhost:4000');
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
const loginUser = () => {
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
};
exports.loginUser = loginUser;

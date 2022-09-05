"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_exports_1 = require("../routes/routes-exports");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/users', routes_exports_1.userRoutes);
app.use('/api/blogs', routes_exports_1.blogRoutes);
describe('GET /api/blogs', () => {
    it('responds with json', (done) => {
        (0, supertest_1.default)(app)
            .get('/api/blogs')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done());
    });
});

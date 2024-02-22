"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
const express_jwt_1 = require("express-jwt");
const app = (0, express_1.default)();
console.log('first', process.env.JWT_KEY);
const errorReqHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({ message: err.message });
        return;
    }
    next();
};
app.use(errorReqHandler);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_KEY,
    algorithms: ['HS256'],
}).unless({
    path: ['/api/auth'],
}));
// routes
const auth_1 = __importDefault(require("./routes/auth"));
const routes_1 = __importDefault(require("./routes/routes"));
app.use('/api/login', routes_1.default);
app.use('/', routes_1.default);
const users = { ['dstefani']: process.env.AUTH_PASS };
app.use('/api/auth', (0, express_basic_auth_1.default)({ users }), (0, auth_1.default)(jsonwebtoken_1.sign));
exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
exports.default = (sign) => {
    const router = express_1.default.Router();
    router.get('/', (0, authController_1.default)(sign).get);
    return router;
};
//# sourceMappingURL=auth.js.map
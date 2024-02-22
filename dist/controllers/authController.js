"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.logger = console;
const authController = (sign) => {
    const getToken = () => {
        const token = sign({
            expiresIn: '3d',
            name: 'fsgToken',
        }, process.env.JWT_KEY, { algorithm: 'HS256' });
        console.log('TOKEN', token);
        return token;
    };
    // eslint-disable-next-line no-unused-vars
    const get = (req, res, next) => {
        try {
            const token = getToken();
            if (token) {
                res.json({ jwt: token });
            }
            else {
                console.log('JWT not generated');
                res.status(500).json({
                    error: true,
                    message: 'JWT token not generated',
                });
            }
        }
        catch (error) {
            next(error);
        }
    };
    return { get };
};
exports.default = authController;
//# sourceMappingURL=authController.js.map
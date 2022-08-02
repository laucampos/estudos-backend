"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Authenticator {
    constructor() {
        this.generateToken = (payload) => {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            return token;
        };
        this.getTokenPayload = (token) => {
            try {
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                return payload;
            }
            catch (error) {
                return null;
            }
        };
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map
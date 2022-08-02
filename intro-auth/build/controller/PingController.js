"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
class PingController {
    constructor() {
        this.ping = (req, res) => {
            let errorCode = 400;
            try {
                res.status(200).send({ message: "Pong!" });
            }
            catch (error) {
                res.status(errorCode).send({ message: error.message });
            }
        };
    }
}
exports.PingController = PingController;
//# sourceMappingURL=PingController.js.map
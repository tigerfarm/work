"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilsockerror_1 = require("./twilsockerror");
class TransportUnavailableError extends twilsockerror_1.TwilsockError {
    constructor(description) {
        super(description);
    }
}
exports.TransportUnavailableError = TransportUnavailableError;

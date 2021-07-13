"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilsockerror_1 = require("./twilsockerror");
class TwilsockUpstreamError extends twilsockerror_1.TwilsockError {
    constructor(status, description, body) {
        super(description);
        this.status = status;
        this.description = description;
        this.body = body;
    }
}
exports.TwilsockUpstreamError = TwilsockUpstreamError;

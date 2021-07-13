"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilsockerror_1 = require("./twilsockerror");
class TwilsockReplyError extends twilsockerror_1.TwilsockError {
    constructor(description, reply) {
        super(description);
        this.reply = reply;
    }
}
exports.TwilsockReplyError = TwilsockReplyError;

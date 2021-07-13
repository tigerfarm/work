"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractmessage_1 = require("./abstractmessage");
class Message extends abstractmessage_1.AbstractMessage {
    constructor(grant, contentType, request) {
        super();
        this.method = 'message';
        this.active_grant = grant;
        this.payload_type = contentType;
        this.http_request = request;
    }
}
exports.Message = Message;

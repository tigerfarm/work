"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractmessage_1 = require("./abstractmessage");
class Reply extends abstractmessage_1.AbstractMessage {
    constructor(id) {
        super(id);
        this.method = 'reply';
        this.payload_type = 'application/json';
        this.status = { code: 200, status: 'OK' };
    }
}
exports.Reply = Reply;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractmessage_1 = require("./abstractmessage");
class Update extends abstractmessage_1.AbstractMessage {
    constructor(token) {
        super();
        this.method = 'update';
        this.token = token;
    }
}
exports.Update = Update;

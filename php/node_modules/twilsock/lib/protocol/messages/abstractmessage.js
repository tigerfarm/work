"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class AbstractMessage {
    constructor(id) {
        this.id = id || `TM${uuid_1.v4()}`;
    }
}
exports.AbstractMessage = AbstractMessage;

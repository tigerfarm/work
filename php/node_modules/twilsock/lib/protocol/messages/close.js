"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractmessage_1 = require("./abstractmessage");
class Close extends abstractmessage_1.AbstractMessage {
    constructor() {
        super();
        this.method = 'close';
    }
}
exports.Close = Close;

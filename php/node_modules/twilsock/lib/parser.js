"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
function byteLength(s) {
    let escstr = encodeURIComponent(s);
    let binstr = escstr.replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1));
    return binstr.length;
}
function stringToUint8Array(s) {
    let escstr = encodeURIComponent(s);
    let binstr = escstr.replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1));
    let ua = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, (ch, i) => { ua[i] = ch.charCodeAt(0); });
    return ua;
}
function uint8ArrayToString(ua) {
    let binstr = Array.prototype.map.call(ua, ch => String.fromCharCode(ch)).join('');
    let escstr = binstr.replace(/(.)/g, (m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    });
    return decodeURIComponent(escstr);
}
function getJsonObject(array) {
    return JSON.parse(uint8ArrayToString(array));
}
function getMagic(buffer) {
    let strMagic = '';
    let idx = 0;
    for (; idx < buffer.length; ++idx) {
        const chr = String.fromCharCode(buffer[idx]);
        strMagic += chr;
        if (chr === '\r') {
            idx += 2;
            break;
        }
    }
    const magics = strMagic.split(' ');
    return {
        size: idx,
        protocol: magics[0],
        version: magics[1],
        headerSize: Number(magics[2])
    };
}
class Parser {
    constructor() { }
    static parse(message) {
        const fieldMargin = 2;
        const dataView = new Uint8Array(message);
        const magic = getMagic(dataView);
        if (magic.protocol !== 'TWILSOCK' || magic.version !== 'V3.0') {
            logger_1.log.error(`unsupported protocol: ${magic.protocol} ver ${magic.version}`);
            //throw new Error('Unsupported protocol');
            //this.fsm.unsupportedProtocol();
            return;
        }
        let header = null;
        try {
            header = getJsonObject(dataView.subarray(magic.size, magic.size + magic.headerSize));
        }
        catch (e) {
            logger_1.log.error('failed to parse message header', e, message);
            //throw new Error('Failed to parse message');
            //this.fsm.protocolError();
            return;
        }
        logger_1.log.debug('message received: ', header.method);
        logger_1.log.trace('message received: ', header);
        let payload = null;
        if (header.payload_size > 0) {
            const payloadOffset = fieldMargin + magic.size + magic.headerSize;
            const payloadSize = header.payload_size;
            if (!header.hasOwnProperty('payload_type') || header.payload_type.indexOf('application/json') === 0) {
                try {
                    payload = getJsonObject(dataView.subarray(payloadOffset, payloadOffset + payloadSize));
                }
                catch (e) {
                    logger_1.log.error('failed to parse message body', e, message);
                    //this.fsm.protocolError();
                    return;
                }
            }
            else if (header.payload_type.indexOf('text/plain') === 0) {
                payload = uint8ArrayToString(dataView.subarray(payloadOffset, payloadOffset + payloadSize));
            }
        }
        return { method: header.method, header, payload };
    }
    static createPacket(header, payloadString = '') {
        header.payload_size = byteLength(payloadString); // eslint-disable-line camelcase
        let headerString = JSON.stringify(header) + '\r\n';
        let magicString = 'TWILSOCK V3.0 ' + (byteLength(headerString) - 2) + '\r\n';
        logger_1.log.debug('send request:', magicString + headerString + payloadString);
        let message = stringToUint8Array(magicString + headerString + payloadString);
        return message.buffer;
    }
}
exports.Parser = Parser;

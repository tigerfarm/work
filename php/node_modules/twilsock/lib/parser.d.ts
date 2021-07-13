import { Protocol } from './protocol/protocol';
declare class Parser {
    constructor();
    static parse(message: ArrayBufferLike): any;
    static createPacket(header: Protocol.Header, payloadString?: string): ArrayBuffer;
}
export { Parser };

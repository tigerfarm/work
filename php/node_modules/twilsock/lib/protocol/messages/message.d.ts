import { Protocol } from '../protocol';
import { AbstractMessage } from './abstractmessage';
declare class Message extends AbstractMessage {
    readonly method: Protocol.MessageType;
    readonly active_grant: string;
    readonly payload_type: string;
    readonly http_request: Protocol.Request;
    constructor(grant: string, contentType: string, request: Protocol.Request);
}
export { Message };

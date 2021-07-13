import { Protocol } from '../protocol';
import { AbstractMessage } from './abstractmessage';
declare class Reply extends AbstractMessage {
    readonly method: Protocol.MessageType;
    readonly payload_type = "application/json";
    readonly status: {
        code: number;
        status: string;
    };
    readonly header: any;
    readonly body: any;
    constructor(id: string);
}
export { Reply };

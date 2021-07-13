import { Protocol } from '../protocol';
import { AbstractMessage } from './abstractmessage';
declare class Update extends AbstractMessage {
    readonly method: Protocol.MessageType;
    readonly token: string;
    constructor(token: string);
}
export { Update };

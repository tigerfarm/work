import { Protocol } from '../protocol';
import { AbstractMessage } from './abstractmessage';
declare class Close extends AbstractMessage {
    readonly method: Protocol.MessageType;
    constructor();
}
export { Close };

import { Protocol } from '../protocol';
import { AbstractMessage } from './abstractmessage';
import { InitRegistration } from '../initregistration';
declare class Init extends AbstractMessage {
    readonly method: Protocol.MessageType;
    readonly token: string;
    readonly continuation_token: string;
    readonly capabilities: string[];
    readonly metadata: {};
    readonly registrations: InitRegistration[];
    readonly tweaks: {};
    constructor(token: string, continuationToken: string, metadata: {}, registrations?: InitRegistration[], tweaks?: {});
}
export { Init };

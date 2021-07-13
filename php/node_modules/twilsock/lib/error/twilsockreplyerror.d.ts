import { TwilsockError } from './twilsockerror';
declare class TwilsockReplyError extends TwilsockError {
    readonly reply: any;
    constructor(description: string, reply: any);
}
export { TwilsockReplyError };

import { TwilsockError } from './twilsockerror';
declare class TransportUnavailableError extends TwilsockError {
    constructor(description: string);
}
export { TransportUnavailableError };

import { TwilsockError } from './twilsockerror';
declare class TwilsockUpstreamError extends TwilsockError {
    private readonly status;
    private readonly description;
    private readonly body?;
    constructor(status: number, description: string, body?: any);
}
export { TwilsockUpstreamError };

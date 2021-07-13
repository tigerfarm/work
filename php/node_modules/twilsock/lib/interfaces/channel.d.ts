/// <reference types="node" />
import { EventEmitter } from 'events';
interface Channel extends EventEmitter {
    isConnected: boolean;
    send(message: ArrayBuffer): void;
}
export { Channel };

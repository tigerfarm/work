/// <reference types="node" />
import { EventEmitter } from 'events';
import { PacketInterface } from '../packetinterface';
/**
 * Registrations module handles all operations with registration contexts through twilsock
 * Main role: it automatically refreshes all registrations after reconnect.
 */
declare class Registrations extends EventEmitter {
    private readonly transport;
    private readonly registrations;
    private readonly registrationsInProgress;
    constructor(transport: PacketInterface);
    private putNotificationContext;
    private deleteNotificationContext;
    private updateRegistration;
    updateRegistrations(): void;
    setNotificationsContext(contextId: any, context: any): void;
    removeNotificationsContext(contextId: string): Promise<void>;
}
export { Registrations };

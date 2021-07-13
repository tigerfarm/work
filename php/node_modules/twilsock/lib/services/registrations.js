"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const events_1 = require("events");
const uuid_1 = require("uuid");
const twilsockerror_1 = require("../error/twilsockerror");
/**
 * Registrations module handles all operations with registration contexts through twilsock
 * Main role: it automatically refreshes all registrations after reconnect.
 */
class Registrations extends events_1.EventEmitter {
    constructor(transport) {
        super();
        this.transport = transport;
        this.registrations = new Map();
        this.registrationsInProgress = new Map();
    }
    async putNotificationContext(contextId, context) {
        const header = { method: 'put_notification_ctx', notification_ctx_id: contextId };
        let reply = await this.transport.sendWithReply(header, context);
    }
    async deleteNotificationContext(contextId) {
        let message = { method: 'delete_notification_ctx',
            notification_ctx_id: contextId };
        let reply = await this.transport.sendWithReply(message);
    }
    async updateRegistration(contextId, context) {
        logger_1.log.debug('update registration for context', contextId);
        let registrationAttempts = this.registrationsInProgress.get(contextId);
        if (!registrationAttempts) {
            registrationAttempts = new Set();
            this.registrationsInProgress.set(contextId, registrationAttempts);
        }
        const attemptId = uuid_1.v4();
        registrationAttempts.add(attemptId);
        try {
            await this.putNotificationContext(contextId, context);
            logger_1.log.debug('registration attempt succeeded for context', context);
            registrationAttempts.delete(attemptId);
            if (registrationAttempts.size === 0) {
                this.registrationsInProgress.delete(contextId);
                this.emit('registered', contextId);
            }
        }
        catch (err) {
            logger_1.log.warn('registration attempt failed for context', context);
            logger_1.log.debug(err);
            registrationAttempts.delete(attemptId);
            if (registrationAttempts.size === 0) {
                this.registrationsInProgress.delete(contextId);
                this.emit('registrationFailed', contextId, err);
            }
        }
    }
    updateRegistrations() {
        logger_1.log.trace(`refreshing ${this.registrations.size} registrations`);
        this.registrations.forEach((context, id) => {
            this.updateRegistration(id, context);
        });
    }
    setNotificationsContext(contextId, context) {
        if (!contextId || !context) {
            throw new twilsockerror_1.TwilsockError('Invalid arguments provided');
        }
        this.registrations.set(contextId, context);
        if (this.transport.isConnected) {
            this.updateRegistration(contextId, context);
        }
    }
    async removeNotificationsContext(contextId) {
        if (!this.registrations.has(contextId)) {
            return;
        }
        await this.deleteNotificationContext(contextId);
        if (this.transport.isConnected) {
            this.registrations.delete(contextId);
        }
    }
}
exports.Registrations = Registrations;

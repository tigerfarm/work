"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform = require("platform");
class Metadata {
    static getMetadata(options) {
        let platformInfo = typeof navigator !== 'undefined'
            ? platform.parse(navigator.userAgent)
            : platform;
        let overrides = options && options.clientMetadata
            ? options.clientMetadata
            : {};
        const fieldNames = ['ver', 'env', 'envv', 'os', 'osv', 'osa',
            'type', 'sdk', 'sdkv', 'dev', 'devv', 'devt', 'app', 'appv'];
        const defaults = {
            'env': platform.name,
            'envv': platform.version,
            'os': platform.os.family,
            'osv': platform.os.version,
            'osa': platform.os.architecture,
            'sdk': 'js-default'
        };
        let finalClientMetadata = {};
        fieldNames
            .filter(key => key in overrides || key in defaults)
            .forEach(key => finalClientMetadata[key] = key in overrides ? overrides[key] : defaults[key]);
        return finalClientMetadata;
    }
}
exports.Metadata = Metadata;

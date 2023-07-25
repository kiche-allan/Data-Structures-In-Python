"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Null object implementation of ILogger
 *
 * @module vscode-phpmd/service/logger
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class NullLogger {
    constructor() {
        /**
         * Verbose flag
         *
         * @property {boolean}
         */
        this.verbose = false;
    }
    attach(connection) {
        throw new Error("Method not implemented.");
    }
    initialize(capabilities) {
        throw new Error("Method not implemented.");
    }
    fillServerCapabilities(capabilities) {
        throw new Error("Method not implemented.");
    }
    /**
     * @see ILogger::setVerbose
     */
    setVerbose(verbose) {
        this.verbose = verbose;
        return this;
    }
    /**
     * @see ILogger::getVerbose
     */
    getVerbose() {
        return this.verbose;
    }
    /**
     * @see ILogger::error
     */
    error(message, isVerbose) {
        return this;
    }
    /**
     * @see ILogger::warn
     */
    warn(message, isVerbose) {
        return this;
    }
    /**
     * @see ILogger::info
     */
    info(message, isVerbose) {
        return this;
    }
    /**
     * @see ILogger::log
     */
    log(message, isVerbose) {
        return this;
    }
}
exports.default = NullLogger;
//# sourceMappingURL=NullLogger.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Remote console implementation of ILogger
 *
 * @module vscode-phpmd/service/logger
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class RemoteConsoleLogger {
    /**
     * Remote console logger constructor
     *
     * @param {RemoteConsole} remoteConsole
     * @param {boolean} verbose
     */
    constructor(remoteConsole, verbose = false) {
        this.remoteConsole = remoteConsole;
        this.verbose = verbose;
    }
    /**
     * Attach the remote to the given connection.
     *
     * @param connection The connection this remote is operating on.
     */
    attach(connection) {
        throw new Error("Method not implemented.");
    }
    ;
    /**
     * Called to initialize the remote with the given
     * client capabilities
     *
     * @param capabilities The client capabilities
     */
    initialize(capabilities) {
        throw new Error("Method not implemented.");
    }
    /**
     * Called to fill in the server capabilities this feature implements.
     *
     * @param capabilities The server capabilities to fill.
     */
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
        if (!isVerbose || this.getVerbose() === true) {
            this.remoteConsole.error(message);
        }
        return this;
    }
    /**
     * @see ILogger::warn
     */
    warn(message, isVerbose) {
        if (!isVerbose || this.getVerbose() === true) {
            this.remoteConsole.warn(message);
        }
        return this;
    }
    /**
     * @see ILogger::info
     */
    info(message, isVerbose) {
        if (!isVerbose || this.getVerbose() === true) {
            this.remoteConsole.info(message);
        }
        return this;
    }
    /**
     * @see ILogger::log
     */
    log(message, isVerbose) {
        if (!isVerbose || this.getVerbose() === true) {
            this.remoteConsole.log(message);
        }
        return this;
    }
}
exports.default = RemoteConsoleLogger;
//# sourceMappingURL=RemoteConsoleLogger.js.map
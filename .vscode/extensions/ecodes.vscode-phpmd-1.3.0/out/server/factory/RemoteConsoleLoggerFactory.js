"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RemoteConsoleLogger_1 = require("../service/logger/RemoteConsoleLogger");
/**
 * Remote console logger factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class RemoteConsoleLoggerFactory {
    constructor() {
        /**
         * @property {boolean} verbose
         */
        this.verbose = false;
    }
    /**
     * Create remote console logger instance
     *
     * @see IFaction::create
     * @returns {ILogger}
     */
    create() {
        if (!this.connection) {
            throw Error("Unable to create RemoteConsoleLogger, no connection set");
        }
        return new RemoteConsoleLogger_1.default(this.connection.console, this.verbose);
    }
    /**
     * Set VSCode client connection
     *
     * @see ILoggerFactory::setConnection
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        this.connection = connection;
    }
    /**
     * Set verbose mode
     *
     * @see ILoggerFactory::setVerbose
     * @param {boolean} verbose
     * @returns {void}
     */
    setVerbose(verbose) {
        this.verbose = verbose;
    }
}
exports.default = RemoteConsoleLoggerFactory;
//# sourceMappingURL=RemoteConsoleLoggerFactory.js.map
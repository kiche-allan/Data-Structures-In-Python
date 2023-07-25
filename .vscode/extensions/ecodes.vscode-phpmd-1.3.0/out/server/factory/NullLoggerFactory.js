"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullLogger_1 = require("../service/logger/NullLogger");
/**
 * Null logger factory
 *
 * Creates a null object implementation of the ILogger interface
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class NullLoggerFactory {
    /**
     * Create Null logger instance
     *
     * @see IFactory::create
     * @returns {ILogger}
     */
    create() {
        return new NullLogger_1.default();
    }
    /**
     * Null object implementation of set connection
     *
     * @see ILoggerFactory::setConnection
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        return;
    }
    /**
     * Null object implementation of set verbose
     *
     * @see ILoggerFactory::setVerbose
     * @param {IConnection} connection
     * @returns {void}
     */
    setVerbose(verbose) {
        return;
    }
}
exports.default = NullLoggerFactory;
//# sourceMappingURL=NullLoggerFactory.js.map
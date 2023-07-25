"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullNotifier_1 = require("../service/notifier/NullNotifier");
/**
 * Null notifier factory
 *
 * Creates a null object implementation of the INotifier interface
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class NullNotifierFactory {
    /**
     * Create Null notifier instance
     *
     * @see IFactory::create
     * @returns {INotifier}
     */
    create() {
        return new NullNotifier_1.default();
    }
    /**
     * Null object implementation of set connection
     *
     * @see INotifierFactory::setConnection
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        return;
    }
}
exports.default = NullNotifierFactory;
//# sourceMappingURL=NullNotifierFactory.js.map
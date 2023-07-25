"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientConnectionNotifier_1 = require("../service/notifier/ClientConnectionNotifier");
/**
 * ClientConnection notifier factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ClientConnectionNotifierFactory {
    /**
     * Create ClientConnection notifier instance
     *
     * Throw error if no connection was set.
     *
     * @see IFactory::create
     * @throws {Error}
     * @returns {INotifier}
     */
    create() {
        if (!this.connection) {
            throw Error("Unable to create ClientConnectionNotifier, no connection set");
        }
        return new ClientConnectionNotifier_1.default(this.connection);
    }
    /**
     * Set VSCode client connection
     *
     * @see INotifierFactory::setConnection
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        this.connection = connection;
    }
}
exports.default = ClientConnectionNotifierFactory;
//# sourceMappingURL=ClientConnectionNotifierFactory.js.map
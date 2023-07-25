"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Client connection implementation of INotifier
 *
 * @module vscode-phpmd/service/notifier
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ClientConnectionNotifier {
    /**
     * Client connection notifier constructor
     *
     * @param {IConnection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * @see INotifier::error
     */
    error(message) {
        this.connection.sendNotification(vscode_languageserver_1.ShowMessageNotification.type, {
            message,
            type: vscode_languageserver_1.MessageType.Error,
        });
        return this;
    }
}
exports.default = ClientConnectionNotifier;
//# sourceMappingURL=ClientConnectionNotifier.js.map
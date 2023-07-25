"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Null object implementation of INotifier
 *
 * @module vscode-phpmd/service/notifier
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class NullNotifier {
    /**
     * @see INotifier::error
     */
    error(message) {
        return this;
    }
}
exports.default = NullNotifier;
//# sourceMappingURL=NullNotifier.js.map
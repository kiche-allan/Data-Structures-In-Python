"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PHP mess detector validation pipeline error interface
 *
 * @module vscode-phpmd/server/model
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PipelineErrorModel {
    /**
     * Pipeline error model constructor
     *
     * @param {any} error Original error object
     * @param {boolean} silent Flag indicating wether the client should show a notification to the user or not
     */
    constructor(error, silent = false) {
        this.error = error;
        this.silent = silent;
    }
}
exports.default = PipelineErrorModel;
//# sourceMappingURL=PipelineErrorModel.js.map
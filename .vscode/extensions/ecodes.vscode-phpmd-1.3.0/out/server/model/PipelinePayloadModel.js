"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_uri_1 = require("vscode-uri");
/**
 * PHP mess detector validation pipeline payload interface
 *
 * @module vscode-phpmd/server/model
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PipelinePayloadModel {
    /**
     * Validation pipeline payload model constructor
     *
     * @param {string} uri URI of file to be validated
     */
    constructor(uri) {
        /**
         * URI of file to be validated
         *
         * @property {string}
         */
        this.uri = "";
        /**
         * Raw validation result
         *
         * @property {string}
         */
        this.raw = "";
        /**
         * List of VSCode diagnosticts
         *
         * @property {Diagnostic[]}
         */
        this.diagnostics = [];
        this.uri = uri;
    }
    /**
     * File path for file to be validated
     *
     * @readonly
     * @property {string}
     */
    get path() {
        return vscode_uri_1.URI.parse(this.uri).fsPath;
    }
}
exports.default = PipelinePayloadModel;
//# sourceMappingURL=PipelinePayloadModel.js.map
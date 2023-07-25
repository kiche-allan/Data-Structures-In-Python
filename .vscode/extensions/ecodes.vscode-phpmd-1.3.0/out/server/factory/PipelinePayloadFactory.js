"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PipelinePayloadModel_1 = require("../model/PipelinePayloadModel");
/**
 * PHP mess detector pipeline payload model factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PipelinePayloadFactory {
    /**
     * @param {string} uri
     */
    constructor(uri) {
        this.uri = uri;
    }
    /**
     * Set file URI to be used upon creating a new instance of the model
     *
     * @param uri
     */
    setUri(uri) {
        this.uri = uri;
        return this;
    }
    /**
     * Create pipeline payload model instance
     *
     * @see IFaction::create
     * @returns {PipelinePayloadModel}
     */
    create() {
        return new PipelinePayloadModel_1.default(this.uri);
    }
}
exports.default = PipelinePayloadFactory;
//# sourceMappingURL=PipelinePayloadFactory.js.map
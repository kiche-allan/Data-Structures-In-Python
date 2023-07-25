"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j_stillery_1 = require("@open-sourcerers/j-stillery");
const Xml2Js = require("xml2js");
const ParseStrategy_1 = require("../service/pipeline/ParseStrategy");
const NullLogger_1 = require("../service/logger/NullLogger");
/**
 * Parse task factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ExecuteProcessTaskFactory {
    /**
     * @param {IPhpmdSettingsModels} settings
     * @param {ILogger} logger
     */
    constructor(settings, logger = new NullLogger_1.default()) {
        this.settings = settings;
        this.logger = logger;
    }
    /**
     * Create Parse task instance
     *
     * @see IFactory::create
     * @returns {Task<PipelinePayloadModel>}
     */
    create() {
        let strategy = new ParseStrategy_1.default(this.getParser(), this.logger);
        return new j_stillery_1.Task(strategy);
    }
    /**
     * Get XML parser instance
     *
     * @returns {Xml2Js.Parser}
     */
    getParser() {
        return new Xml2Js.Parser();
    }
}
exports.default = ExecuteProcessTaskFactory;
//# sourceMappingURL=ParseTaskFactory.js.map
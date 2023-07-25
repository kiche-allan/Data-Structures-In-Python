"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j_stillery_1 = require("@open-sourcerers/j-stillery");
const NullLogger_1 = require("../service/logger/NullLogger");
const BuildDiagnosticsStrategy_1 = require("../service/pipeline/BuildDiagnosticsStrategy");
/**
 * BuildDiagnostics task factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class BuildDiagnosticsTaskFactory {
    /**
     * @param {IPhpmdSettingsModel} settings
     */
    constructor(settings, logger = new NullLogger_1.default()) {
        this.settings = settings;
        this.logger = logger;
    }
    /**
     * Create BuildDiagnostics task instance
     *
     * @see IFactory::create
     * @returns {Task<PipelinePayloadModel>}
     */
    create() {
        let strategy = new BuildDiagnosticsStrategy_1.default(this.logger);
        return new j_stillery_1.Task(strategy);
    }
}
exports.default = BuildDiagnosticsTaskFactory;
//# sourceMappingURL=BuildDiagnosticsTaskFactory.js.map
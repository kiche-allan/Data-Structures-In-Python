"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j_stillery_1 = require("@open-sourcerers/j-stillery");
const NullLogger_1 = require("../service/logger/NullLogger");
const BuildDiagnosticsTaskFactory_1 = require("./BuildDiagnosticsTaskFactory");
const ExecuteProcessTaskFactory_1 = require("./ExecuteProcessTaskFactory");
const ParseTaskFactory_1 = require("./ParseTaskFactory");
const TestFileTaskFactory_1 = require("./TestFileTaskFactory");
/**
 * PHP mess detector validation pipeline factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PipelineFactory {
    /**
     * @param {IPhpmdSettingsModel} settings
     * @param {ILogger} logger
     */
    constructor(settings, environment, logger = new NullLogger_1.default()) {
        this.settings = settings;
        this.environment = environment;
        this.logger = logger;
    }
    /**
     * Create validation pipeline instance
     *
     * Configure pipeline with tasks:
     * - ExecuteProcess task
     * - Parse task
     * - BuildDiagnostics task
     *
     * @see IFaction::create
     * @returns {Pipeline<PipelinePayloadModel>}
     */
    create() {
        let pipeline = new j_stillery_1.Pipeline()
            .pipe(new TestFileTaskFactory_1.default(this.settings, this.logger).create())
            .pipe(new ExecuteProcessTaskFactory_1.default(this.settings, this.environment, this.logger).create())
            .pipe(new ParseTaskFactory_1.default(this.settings, this.logger).create())
            .pipe(new BuildDiagnosticsTaskFactory_1.default(this.settings, this.logger).create());
        return pipeline;
    }
}
exports.default = PipelineFactory;
//# sourceMappingURL=PipelineFactory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j_stillery_1 = require("@open-sourcerers/j-stillery");
const fs = require("fs");
const NullLogger_1 = require("../service/logger/NullLogger");
const TestFileStrategy_1 = require("../service/pipeline/TestFileStrategy");
/**
 * Test file task factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class TestFileTaskFactory {
    /**
     * Test file factory constructor
     *
     * @param {IPhpmdSettingsModel} settings
     * @param {ILogger} logger
     */
    constructor(settings, logger = new NullLogger_1.default()) {
        this.settings = settings;
        this.logger = logger;
    }
    /**
     * Create TestFile pipeline task instance
     *
     * @see IFactory::create
     * @returns {Task<PipelinePayloadModel>}
     */
    create() {
        let strategy = new TestFileStrategy_1.default(fs.readFile, this.logger);
        return new j_stillery_1.Task(strategy);
    }
}
exports.default = TestFileTaskFactory;
//# sourceMappingURL=TestFileTaskFactory.js.map
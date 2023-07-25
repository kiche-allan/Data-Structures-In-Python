"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PipelineErrorModel_1 = require("../../model/PipelineErrorModel");
const NullLogger_1 = require("../logger/NullLogger");
/**
 * Test file pipeline task strategy
 *
 * Strategy used to test wether the file to be analyzed by PHPMD is readable
 *
 * @module vscode-phpmd/service/pipeline
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class TestFileStrategy {
    /**
     * Test file task strategy constructor
     *
     * @param {IReadFile} readfile
     * @param {ILogger} logger
     */
    constructor(readfile, logger = new NullLogger_1.default()) {
        this.readfile = readfile;
        this.logger = logger;
    }
    /**
     * Strategy executor
     *
     * Test wether the file is in the input is readable
     *
     * @see IExecuteStrategy::execute
     */
    execute(input, resolve, reject) {
        this.readfile(input.path, "utf8", (err, data) => {
            // Reject the pipeline if the file was not found or is not readable
            if (err) {
                this.logger.error("File " + input.path + " not found");
                return reject(new PipelineErrorModel_1.default(err, true));
            }
            // Resolve with unmodified input if the file is readable
            this.logger.info("File " + input.path + " test successful", true);
            return resolve(input);
        });
    }
    ;
}
exports.default = TestFileStrategy;
//# sourceMappingURL=TestFileStrategy.js.map
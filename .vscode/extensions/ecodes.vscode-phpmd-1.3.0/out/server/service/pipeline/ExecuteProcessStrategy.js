"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PipelineErrorModel_1 = require("../../model/PipelineErrorModel");
const NullLogger_1 = require("../logger/NullLogger");
const PhpmdService_1 = require("../PhpmdService");
/**
 * Execute PHP mess detector pipeline task strategy
 *
 * Strategy used to create the pipeline task responsible for executing
 * the PHP mess detector command.
 *
 * @module vscode-phpmd/service/pipeline
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ExecuteProcessStrategy {
    /**
     * Execute process task strategy constructor
     *
     * @param {PhpmdCommandBuilder} commandBuilder CommandBuilder used to instantiate the PHP mess detector service
     * @param {string} rules PHP mess detector rules to be passed as option to the command
     * @param {ILogger} logger Logger, defaults to Null object implementation
     */
    constructor(commandBuilder, rules, logger = new NullLogger_1.default()) {
        this.commandBuilder = commandBuilder;
        this.rules = rules;
        this.logger = logger;
    }
    /**
     * Strategy executor
     *
     * Resolve with the result from the executed PHP mess detector command.
     *
     * @see IExecuteStrategy::execute
     */
    execute(input, resolve, reject) {
        this.executeProcess(input.path).then((data) => {
            input.raw = this.ltrimXML(data);
            resolve(input);
        }, (err) => {
            reject(new PipelineErrorModel_1.default(err, false));
        });
    }
    ;
    /**
     * PHP mess detector service setter
     *
     * Allows overriding of the PHP mess detector service for testing purposes.
     *
     * @param {PhpmdService} service
     */
    setService(service) {
        this.service = service;
    }
    /**
     * PHP mess detector service getter
     *
     * Creates an instance of the default PHP mess detector service if no other instance was set before.
     *
     * @returns {PhpmdService}
     */
    getService() {
        if (!this.service) {
            this.service = new PhpmdService_1.default(this.commandBuilder);
            this.service.setLogger(this.logger);
        }
        return this.service;
    }
    /**
     * Strip any leading text or whitespace before the xml opening tag
     *
     * @param {string} xml
     * @returns {string}
     */
    ltrimXML(xml) {
        return xml.substring(xml.indexOf("<?xml"));
    }
    /**
     * Execute the PHP mess detector command
     *
     * @param {string} path File path to be scanned by the PHP mess detector command
     * @returns {Promise<string>}
     */
    executeProcess(path) {
        return this.getService().run(`"${path}" xml "${this.rules}"`);
    }
}
exports.default = ExecuteProcessStrategy;
//# sourceMappingURL=ExecuteProcessStrategy.js.map
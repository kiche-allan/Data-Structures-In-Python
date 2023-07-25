"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j_stillery_1 = require("@open-sourcerers/j-stillery");
const NullLogger_1 = require("../service/logger/NullLogger");
const ExecuteProcessStrategy_1 = require("../service/pipeline/ExecuteProcessStrategy");
const PhpmdCommandBuilder_1 = require("../service/PhpmdCommandBuilder");
/**
 * ExecuteProcess task factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ExecuteProcessTaskFactory {
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
     * PhpmdCommandBuilder setter
     *
     * Allows injection of phpmdCommandBuilder for better testability.
     *
     * @param {PhpmdCommandBuilder} commandBuilder
     * @returns {void}
     */
    setCommandBuilder(commandBuilder) {
        this.commandBuilder = commandBuilder;
    }
    /**
     * Get the PHP mess detector command builder
     *
     * Create a command builder based on this server's settings if no service was set before
     *
     * @returns {PhpmdCommandBuilder}
     */
    getCommandBuilder() {
        if (!this.commandBuilder) {
            // TODO: add workspacefolders and homedir from settings
            this.commandBuilder = new PhpmdCommandBuilder_1.default(this.settings.command, this.settings.unsafeCommandEnabled, this.settings.unsafeCommand, this.environment.workspaceFolders, this.environment.homeDir);
            this.commandBuilder.setLogger(this.logger);
        }
        return this.commandBuilder;
    }
    /**
     * Create ExecuteProcess task instance
     *
     * @see IFactory::create
     * @returns {Task<PipelinePayloadModel>}
     */
    create() {
        let strategy = new ExecuteProcessStrategy_1.default(this.getCommandBuilder(), this.settings.rules, this.logger);
        return new j_stillery_1.Task(strategy);
    }
}
exports.default = ExecuteProcessTaskFactory;
//# sourceMappingURL=ExecuteProcessTaskFactory.js.map
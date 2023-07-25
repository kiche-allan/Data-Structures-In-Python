"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PipelineFactory_1 = require("../factory/PipelineFactory");
const PipelinePayloadFactory_1 = require("../factory/PipelinePayloadFactory");
const NullLogger_1 = require("../service/logger/NullLogger");
const NullNotifier_1 = require("../service/notifier/NullNotifier");
const PhpmdService_1 = require("../service/PhpmdService");
const PhpmdCommandBuilder_1 = require("../service/PhpmdCommandBuilder");
/**
 * PHP mess detector controller
 *
 * Defines actions available to the language server
 *
 * @module vscode-phpmd/server/controller
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PhpmdController {
    /**
     * Create PHPMD controller instance with the passed connection and settings
     *
     * @param {IConnection} connection
     * @param {IPhpmdSettingsModel} settings
     */
    constructor(connection, settings, environment) {
        this.connection = connection;
        this.settings = settings;
        this.environment = environment;
        /**
         * Executable test error counter
         *
         * Keeps track of the number of times the phpmd executable was tested and the test failed.
         *
         * @property {number} phpmdTestErrorCount
         */
        this.phpmdTestErrorCount = 0;
    }
    /**
     * Validate the passed document with PHP mess detector
     *
     * @param {TextDocument|TextDocumentIdentifier} document
     * @returns {Promise<boolean>} Resolves with true on success, rejects with error on failure
     */
    validate(document) {
        if (!this.settings.enabled) {
            this.getLogger().info("Extension disabled, bailing out");
            return Promise.resolve(true);
        }
        this.getLogger().info("PHP Mess Detector validation started for " + document.uri, true);
        return new Promise((resolve, reject) => {
            // Test version
            this.getService().testPhpmd().then((data) => {
                let payload = this.getPipelinePayloadFactory().setUri(document.uri).create();
                this.getPipeline().run(payload).then((output) => {
                    let diagnostics = output.diagnostics;
                    // Send the computed diagnostics to VSCode.
                    this.getLogger().info("PHP Mess Detector validation completed for " + document.uri
                        + ". " + diagnostics.length + " problems found", true);
                    this.connection.sendDiagnostics({ uri: output.uri, diagnostics });
                    // Resolve the validate promise
                    resolve(true);
                }, (err) => {
                    // Don't notify the user of the error if silent is defined on the error and is truthy
                    if (!err.silent) {
                        this.getNotifier().error("An error occured while executing PHP Mess Detector");
                    }
                    // If an error property is defined on the error reject the validate promise with that
                    // value instead, this is the case for PipelineErrorModel instances
                    if (err.error) {
                        return reject(err.error);
                    }
                    // Reject the validate promise
                    return reject(err);
                });
            }, (err) => {
                // Only notify client of "PHPMD test error" once per controller instance
                if (!this.phpmdTestErrorCount) {
                    this.getNotifier().error("Unable to execute PHPMD command (" + this.settings.command + ")");
                }
                this.phpmdTestErrorCount++;
                // Reject the validate promise
                reject(err);
            });
        });
    }
    /**
     * Clear diagnostics for the text documents
     *
     * @param document
     */
    clear(document) {
        if (!this.settings.clearOnClose) {
            this.getLogger().info("Clearing of diagnostics disabled in settings");
            return;
        }
        this.getLogger().info("Clearing diagnostics for " + document.uri);
        this.connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
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
     * PhpmdService setter
     *
     * Allows injection of phpmdService for better testability.
     *
     * @param {PhpmdService} service
     * @returns {void}
     */
    setService(service) {
        this.service = service;
    }
    /**
     * Pipeline setter
     *
     * Allows injection of the validation pipeline for better testability.
     *
     * @param {Pipeline<PipelinePayloadModel} pipeline
     * @returns {void}
     */
    setPipeline(pipeline) {
        this.pipeline = pipeline;
    }
    /**
     * PipelinePayload factory setter
     *
     * Allows injection of pipeline payload factory for better testability.
     *
     * @param {PipelinePayloadFactory} pipelinePayloadFactory
     * @returns {void}
     */
    setPipelinePayloadFactory(pipelinePayloadFactory) {
        this.pipelinePayloadFactory = pipelinePayloadFactory;
    }
    /**
     * Logger setter
     *
     * Allows injection of the logger for better testability.
     *
     * @param {ILogger} logger
     * @returns {void}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * Notifier setter
     *
     * Allows injection of the notifier for better testability.
     *
     * @param {INotifier} notifier
     * @returns {void}
     */
    setNotifier(notifier) {
        this.notifier = notifier;
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
            this.commandBuilder.setLogger(this.getLogger());
        }
        return this.commandBuilder;
    }
    /**
     * Get the PHP mess detector service
     *
     * Create a service based on this server's settings if no service was set before
     *
     * @returns {PhpmdService}
     */
    getService() {
        if (!this.service) {
            this.service = new PhpmdService_1.default(this.getCommandBuilder());
            this.service.setLogger(this.getLogger());
        }
        return this.service;
    }
    /**
     * Get the validation pipeline
     *
     * Create a pipline based on this server's settings if no pipeline was set before
     *
     * @returns {Pipeline<PipelinePayloadModel>}
     */
    getPipeline() {
        if (!this.pipeline) {
            this.pipeline = new PipelineFactory_1.default(this.settings, this.environment, this.getLogger()).create();
        }
        return this.pipeline;
    }
    /**
     * Get the pipeline payload factory
     *
     * Create a pipline payload factory if no factory was set before
     *
     * @returns {PipelinePayloadFactory}
     */
    getPipelinePayloadFactory() {
        if (!this.pipelinePayloadFactory) {
            this.pipelinePayloadFactory = new PipelinePayloadFactory_1.default("");
        }
        return this.pipelinePayloadFactory;
    }
    /**
     * Get the logger
     *
     * Create a null object implementing the ILogger interface if no logger was set before
     *
     * @returns {ILogger}
     */
    getLogger() {
        if (!this.logger) {
            this.logger = new NullLogger_1.default();
        }
        return this.logger;
    }
    /**
     * Get the notifier
     *
     * Create a null object implementing the INotifier interface if no notifier was set before
     *
     * @returns {INotifier}
     */
    getNotifier() {
        if (!this.notifier) {
            this.notifier = new NullNotifier_1.default();
        }
        return this.notifier;
    }
}
exports.default = PhpmdController;
//# sourceMappingURL=PhpmdController.js.map
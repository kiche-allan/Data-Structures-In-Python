"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const vscode_languageserver_1 = require("vscode-languageserver");
const ClientConnectionNotifierFactory_1 = require("./factory/ClientConnectionNotifierFactory");
const PhpmdControllerFactory_1 = require("./factory/PhpmdControllerFactory");
const RemoteConsoleLoggerFactory_1 = require("./factory/RemoteConsoleLoggerFactory");
const NullLogger_1 = require("./service/logger/NullLogger");
const NullNotifier_1 = require("./service/notifier/NullNotifier");
const os_1 = require("os");
/**
 * PHP mess detector language server
 *
 * @module vscode-phpmd/server
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class Server {
    /**
     * Connection setter
     *
     * Allows injection of connection for better testability.
     *
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        this.connection = connection;
    }
    /**
     * WorkspaceFolders setter
     *
     * Allows injection of workspaceFolders for better testability.
     *
     * @param {WorkspaceFolder[]} workspaceFolders
     * @returns {void}
     */
    setWorkspaceFolders(workspaceFolders) {
        this.workspaceFolders = workspaceFolders;
    }
    /**
     * HomeDir setter
     *
     * Allows injection of homedir for better testability.
     *
     * @param {string} HomeDir
     * @returns {void}
     */
    setHomeDir(homeDir) {
        this.homeDir = homeDir;
    }
    /**
     * ControllerFactory setter
     *
     * Allows injection of controllerFactory for better testability.
     *
     * @param {PhpmdControllerFactory} controllerFactory
     * @returns {void}
     */
    setControllerFactory(controllerFactory) {
        this.controllerFactory = controllerFactory;
    }
    /**
     * LoggerFactory setter
     *
     * Allows injection of loggerFactory for better testability.
     *
     * @param {ILoggerFactory} loggerFactory
     * @returns {void}
     */
    setLoggerFactory(loggerFactory) {
        this.loggerFactory = loggerFactory;
    }
    /**
     * NotifierFactory setter
     *
     * Allows injection of notifierFactory for better testability.
     *
     * @param {INotifierFactory} notifierFactory
     * @returns {void}
     */
    setNotifierFactory(notifierFactory) {
        this.notifierFactory = notifierFactory;
    }
    /**
     * DocumentsManager setter
     *
     * Allows injection of documentsManager for better testability.
     *
     * @param {TextDocuments} documentsManager
     * @returns {void}
     */
    setDocumentsManager(documentsManager) {
        this.documentsManager = documentsManager;
    }
    /**
     * Controller setter
     *
     * Allows injection of controller for better testability.
     *
     * @param {PhpmdController} controller
     * @returns {void}
     */
    setController(controller) {
        this.controller = controller;
    }
    /**
     * Logger setter
     *
     * Allows injection of logger for better testability.
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
     * Allows injection of notifier for better testability.
     *
     * @param {INotifier} notifier
     * @returns {void}
     */
    setNotifier(notifier) {
        this.notifier = notifier;
    }
    /**
     * Server's main point of entry
     *
     * The main method sets up the connection starts the listening and registers relevant event listeners and
     * their handlers on the connection.
     *
     * @returns {void}
     */
    main() {
        // Get VSCode documentManager and connection
        let documentsManager = this.getDocumentsManager();
        let connection = this.getConnection();
        // Create logger
        this.createLogger(connection);
        // Create notifier
        this.createNotifier(connection);
        // Manage documents for connection
        documentsManager.listen(connection);
        // The settings have changed. Is send on server activation as well.
        connection.onDidChangeConfiguration((change) => {
            this.getLogger().info("Configuration change triggerd, validating all open documents.");
            let settings = this.createSettings(change.settings.phpmd);
            let environment = this.createEnvironment();
            this.logger.setVerbose(settings.verbose);
            this.getLogger().info("Creating controller", true);
            this.createController(connection, settings, environment);
            // (Re)Validate any open text documents
            documentsManager.all().forEach((document) => {
                this.getLogger().info("Validating document " + document.uri, true);
                this.getController().validate(document).then((result) => {
                    this.getLogger().info("Document validation after config change completed successfully");
                }, (err) => {
                    this.getLogger().error("An error occured during document validation after config change with the following message: "
                        + err.message);
                });
            });
        });
        // A php document was opened
        connection.onDidOpenTextDocument((parameters) => {
            this.getLogger().info("New document opened, starting validation.");
            let document = parameters.textDocument;
            this.getController().validate(document).then((result) => {
                this.getLogger().info("Document validation after open completed successfully");
            }, (err) => {
                this.getLogger().error("An error occured during document validation after open with the following message: " + err.message);
            });
        });
        // A php document was saved
        connection.onDidSaveTextDocument((parameters) => {
            this.getLogger().info("Document saved, starting validation.");
            let document = parameters.textDocument;
            this.getController().validate(document).then((result) => {
                this.getLogger().info("Document validation after save completed successfully");
            }, (err) => {
                this.getLogger().error("An error occured during document validation after save with the following message: " + err.message);
            });
        });
        // A php document was closed
        connection.onDidCloseTextDocument((parameters) => {
            this.getLogger().info("Document closed, clearing messages.");
            let document = parameters.textDocument;
            this.getController().clear(document);
        });
        // Set connection capabilities
        connection.onInitialize((params) => {
            this.getLogger().info("Language server connection initialized.");
            if (params && params.workspaceFolders) {
                this.getLogger().info(`Setting workspaceFolders ${JSON.stringify(params.workspaceFolders)}.`);
                this.setWorkspaceFolders(params.workspaceFolders);
            }
            return this.getInitializeResult();
        });
        // Listen on the connection
        connection.listen();
    }
    /**
     * Return the initializeResult object for the server's documentManager
     *
     * @returns {InitializeResult}
     */
    getInitializeResult() {
        return {
            capabilities: {
                textDocumentSync: this.getDocumentsManager().syncKind,
            }
        };
    }
    /**
     * Get the VSCode connection or create one if no connection was set before
     *
     * @returns {IConnection}
     */
    getConnection() {
        if (!this.connection) {
            this.connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
        }
        return this.connection;
    }
    /**
     * Get the VSCode connection workspaceFolders
     *
     * @returns {WorkspaceFolder[]}
     */
    getWorkspaceFolders() {
        return this.workspaceFolders;
    }
    /**
     * Get the OS HomeDir
     *
     * @returns {string}
     */
    getHomeDir() {
        if (!this.homeDir) {
            this.homeDir = os_1.homedir();
        }
        return this.homeDir;
    }
    /**
     * Get the VSCode documentsManager or create on if no documentsManager was set before
     *
     * @returns {TextDocuments}
     */
    getDocumentsManager() {
        if (!this.documentsManager) {
            this.documentsManager = new vscode_languageserver_1.TextDocuments();
        }
        return this.documentsManager;
    }
    /**
     * Get the controller factory or create a PhpmdControllerFactory if no controller factory was set before
     *
     * @returns {PhpmdControllerFactory}
     */
    getControllerFactory() {
        if (!this.controllerFactory) {
            this.controllerFactory = new PhpmdControllerFactory_1.default();
        }
        return this.controllerFactory;
    }
    /**
     * Get the logger factory or create a RemoteConsoleLoggerFactory if no logger factory was set before
     *
     * @returns {ILoggerFactory}
     */
    getLoggerFactory() {
        if (!this.loggerFactory) {
            this.loggerFactory = new RemoteConsoleLoggerFactory_1.default();
        }
        return this.loggerFactory;
    }
    /**
     * Get the notifier factory or create a ClientConnectionNotifierFactory if no notifier factory was set before
     *
     * @returns {INotifierFactory}
     */
    getNotifierFactory() {
        if (!this.notifierFactory) {
            this.notifierFactory = new ClientConnectionNotifierFactory_1.default();
        }
        return this.notifierFactory;
    }
    /**
     * Create a settings model
     *
     * Create a PHPMD settings model from the values send through the VSCode connection with some sane default values.
     *
     * @param {IPhpmdSettingsModel}
     */
    createSettings(values) {
        let defaults = {
            enabled: true,
            command: "",
            unsafeCommandEnabled: false,
            unsafeCommand: "",
            rules: "",
            verbose: false,
            clearOnClose: true
        };
        let settings = Object.assign(defaults, values);
        if (!settings.command) {
            settings.command = this.getDefaultCommand();
        }
        return settings;
    }
    /**
     * Create a environment model
     *
     * Create a PHPMD environment model from the server environment
     *
     * @param {IPhpmdEnvironmentModel}
     */
    createEnvironment() {
        const environment = {
            workspaceFolders: this.getWorkspaceFolders(),
            homeDir: this.getHomeDir()
        };
        return environment;
    }
    /**
     * Get the default command
     *
     * Get the default PHPMD command string to execute the shipped PHPMD phar file with php
     *
     * @returns {string}
     */
    getDefaultCommand() {
        let serverPath = Path.dirname(process.argv[1]);
        let phpmdPath = Path.normalize(serverPath + "/../../phpmd/phpmd.phar");
        let executable = "php " + phpmdPath;
        return executable;
    }
    /**
     * Create the server's PHPMD controller
     *
     * Instantiates the controller by using this server's controller factory. Arranges the controller
     * to use the correct connection, settings, logger and notifier. Assigns the controller to the
     * controller property of this server instance.
     *
     * @param {IConnection} connection
     * @param {IPhpmdSettingsModel} settings
     * @returns {void}
     */
    createController(connection, settings, environment) {
        let controllerFactory = this.getControllerFactory();
        controllerFactory.setConnection(connection);
        controllerFactory.setSettings(settings);
        controllerFactory.setEnvironment(environment);
        this.controller = controllerFactory.create();
        this.controller.setLogger(this.getLogger());
        this.controller.setNotifier(this.getNotifier());
        this.getLogger().info(`Created controller with settings '${JSON.stringify(settings)}' and environment '${JSON.stringify(environment)}'`);
    }
    /**
     * Create the server's logger
     *
     * Instantiates the logger by using this server's logger factory. Arranges the logger to use the
     * correct connection. Assigns the logger to the logger property of this server instance.
     *
     * @param {IConnection} connection
     * @returns {void}
     */
    createLogger(connection) {
        let loggerFactory = this.getLoggerFactory();
        loggerFactory.setConnection(connection);
        this.logger = loggerFactory.create();
    }
    /**
     * Create the server's notifier
     *
     * Instantiates the notifier by using this server's notifier factory. Arranges the notifier to use the
     * correct connection. Assigns the notifier to the notifier property of this server instance.
     *
     * @param {IConnection} connection
     * @returns {void}
     */
    createNotifier(connection) {
        let notifierFactory = this.getNotifierFactory();
        notifierFactory.setConnection(connection);
        this.notifier = notifierFactory.create();
    }
    /**
     * Get the server's PHPMD controller
     *
     * Logs and throws an error if the controller was not created before calling this method.
     *
     * @throws {Error}
     * @returns {PhpmdController}
     */
    getController() {
        if (!this.controller) {
            this.getLogger().error("Controller not initialized. Aborting");
            throw Error("Controller not initialized. Aborting.");
        }
        return this.controller;
    }
    /**
     * Get the server's logger
     *
     * Returns a null object implementing the ILogger interface if no logger was created before calling this method.
     *
     * @returns {ILogger}
     */
    getLogger() {
        if (!this.logger) {
            return new NullLogger_1.default();
        }
        return this.logger;
    }
    /**
     * Get the server's notifier
     *
     * Returns a null object implementing the INotifier interface if no notifier was created before calling this method.
     *
     * @returns {INotifier}
     */
    getNotifier() {
        if (!this.notifier) {
            return new NullNotifier_1.default();
        }
        return this.notifier;
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map
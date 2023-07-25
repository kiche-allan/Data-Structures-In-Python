"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhpmdController_1 = require("../controller/PhpmdController");
/**
 * PHP mess detector controller factory
 *
 * @module vscode-phpmd/server/factory
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PhpmdControllerFactory {
    /**
     * Create PHP mess detector controller instance
     *
     * @see IFaction::create
     * @returns {PhpmdController}
     */
    create() {
        if (!this.connection) {
            throw Error("Unable to create PhpmdController, no connection set");
        }
        if (!this.settings) {
            throw Error("Unable to create PhpmdController, no settings set");
        }
        return new PhpmdController_1.default(this.connection, this.settings, this.environment);
    }
    /**
     * Set VSCode client connection
     *
     * @param {IConnection} connection
     * @returns {void}
     */
    setConnection(connection) {
        this.connection = connection;
    }
    /**
     * Set vscode-phpmd settings
     *
     * @param {IPhpmdSettingsModel} settings
     */
    setSettings(settings) {
        this.settings = settings;
    }
    /**
     * Set vscode-phpmd environment
     *
     * @param {IPhpmdEnvironmentModel} environment
     */
    setEnvironment(environment) {
        this.environment = environment;
    }
}
exports.default = PhpmdControllerFactory;
//# sourceMappingURL=PhpmdControllerFactory.js.map
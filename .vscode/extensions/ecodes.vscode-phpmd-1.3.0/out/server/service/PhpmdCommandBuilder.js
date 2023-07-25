"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullLogger_1 = require("./logger/NullLogger");
const vscode_uri_1 = require("vscode-uri");
/**
 * PHP mess detector command builder
 *
 * Builder for the php mess detector command
 *
 * @module vscode-phpmd/service
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PhpmdCommandBuilder {
    /**
     * Service constructor
     *
     * Takes the command string and variable for substitution
     *
     * @param {string} command
     * @param {WorkspaceFolder[]} workspaceFolders
     * @param {string} homeDir
     */
    constructor(command, unsafeCommandEnabled, unsafeCommand, workspaceFolders, homeDir) {
        this.workspaceFolders = workspaceFolders;
        this.homeDir = homeDir;
        let cmd = command;
        if (unsafeCommandEnabled && unsafeCommand)
            cmd = unsafeCommand;
        this.command = cmd;
    }
    usingGlobalPhp() {
        return this.command.toLowerCase().substr(0, 4) === "php ";
    }
    /**
     * Build the PHP mess detector version command.
     *
     * @returns {string}
     */
    buildPhpmdVersionCommand() {
        const command = `${this.command} --version`;
        this.getLogger().info(`Building phpmd version command: ${command}`, true);
        return command;
    }
    /**
     * Build the PHP mess detector command.
     *
     * @param  {string} options A string with PHP mess detector command line options
     * @returns {string}
     */
    buildPhpmdCommand(options) {
        // Replace homedir in options
        if (options.indexOf("\"~/") > -1)
            options = options.replace(`"~/`, `"${this.homeDir}/`);
        if (options.indexOf("\"~\\") > -1)
            options = options.replace(`"~\\`, `"${this.homeDir}\\`);
        // Replace workspaceFolder in options
        if (options.indexOf("${workspaceFolder}") > -1) {
            const file = this.getFileFromOptions(options);
            const folder = this.getWorkspaceFolderForFile(file);
            if (file && folder) {
                options = options.replace("${workspaceFolder}", folder);
            }
        }
        const command = `${this.command} ${options}`;
        this.getLogger().info(`Building phpmd command: ${command}`, true);
        return command;
    }
    /**
     * Logger setter
     *
     * @param {ILogger} logger
     * @returns {void}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * Logger getter
     *
     * Returns null object logger if the setter was not called before
     *
     * @returns {ILogger}
     */
    getLogger() {
        if (!this.logger) {
            this.logger = new NullLogger_1.default();
        }
        return this.logger;
    }
    getFileFromOptions(options) {
        if (!options)
            return undefined;
        const optionsSegments = options.split(" ");
        const fileSegment = optionsSegments[0];
        if (!fileSegment || fileSegment.length <= 2)
            return undefined;
        return fileSegment.substring(1, fileSegment.length - 1);
    }
    getWorkspaceFolderForFile(file) {
        if (!file)
            return undefined;
        if (!this.workspaceFolders || !this.workspaceFolders.length)
            return undefined;
        let workspaceFolder = this.workspaceFolders.find(folder => {
            const folderPath = vscode_uri_1.URI.parse(folder.uri).fsPath;
            const result = file.startsWith(folderPath);
            if (result)
                this.getLogger().info(`Found match between file and workspace folder (file: "${file}", workspaceFolder: "${folderPath}")`, true);
            return result;
        });
        if (!workspaceFolder) {
            this.getLogger().info(`No matching workspace folder found for file "${file}"`, true);
            this.getLogger().info(`Using first folder in workspace folder array: "${vscode_uri_1.URI.parse(this.workspaceFolders[0].uri).fsPath}"`, true);
            workspaceFolder = this.workspaceFolders[0];
        }
        return vscode_uri_1.URI.parse(workspaceFolder.uri).fsPath;
    }
}
exports.default = PhpmdCommandBuilder;
//# sourceMappingURL=PhpmdCommandBuilder.js.map
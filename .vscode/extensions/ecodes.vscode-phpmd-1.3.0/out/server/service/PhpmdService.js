"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process = require("child_process");
const NullLogger_1 = require("./logger/NullLogger");
/**
 * PHP mess detector service
 *
 * Interaction layer with the PHP mess detector command.
 *
 * @module vscode-phpmd/service
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class PhpmdService {
    /**
     * Service constructor
     *
     * Takes the PHP mess detector command to be worked with
     *
     * @param {PhpmdCommandBuilder} commandBuilder
     */
    constructor(commandBuilder) {
        this.commandBuilder = commandBuilder;
    }
    /**
     * PHP availability test
     *
     * Tests wether the PHP command is globally available on the system. Resolves with a boolean true
     * if available or if the PHP mess detector command does not use the PHP command. Rejects with an
     * error if neither of these conditions apply.
     *
     * @returns {Promise<booean>}
     */
    testPhp() {
        if (!this.commandBuilder.usingGlobalPhp()) {
            this.getLogger().info("PHP Mess Detector command not using global PHP, skipping PHP test", true);
            return Promise.resolve(true);
        }
        return new Promise((resolve, reject) => {
            this.execute("php -v").then((data) => {
                this.getLogger().info("PHP command test successful (" + data.substr(0, 16).trim() + " ...)", true);
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * PHP mess detector availability test
     *
     * Tests wether the PHP mess detector command can be executed. Resolves with a boolean true if
     * the command was successfully exectuted. Rejects with an error if not.
     *
     * @returns {Promise<boolean>}
     */
    testPhpmd() {
        return new Promise((resolve, reject) => {
            this.testPhp().then(() => {
                return this.execute(this.commandBuilder.buildPhpmdVersionCommand());
            }).then((data) => {
                this.getLogger().info("PHP Mess Detector test successful (" + data.trim() + ")", true);
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * Run the PHP mess detector command.
     *
     * Note: checking for availability of the command is the consumers responsibility and done through
     * the testPhpmd method.
     *
     * @param  {string} options A string with PHP mess detector command line options
     * @returns {Promise<string>}
     */
    run(options) {
        this.getLogger().info(`Running phpmd command with options "${options}"`, true);
        return this.execute(this.commandBuilder.buildPhpmdCommand(options));
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
     * Executor setter
     *
     * Allows overriding the executor for testing purposes
     *
     * @param {(command: string) => Process.ChildProcess} exec
     * @returns {void}
     */
    setExecutor(exec) {
        this.exec = exec;
    }
    /**
     * Executor getter
     *
     * Returns NodeJS process executor if the setter was not called before.
     *
     * @returns {(command: string) => Process.ChildProcess}
     */
    getExecutor() {
        if (!this.exec) {
            this.exec = Process.exec;
        }
        return this.exec;
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
    /**
     * Execute the passed command with this instance's executor
     *
     * @param {string} cmd
     * @returns {Promise<string>}
     */
    execute(cmd) {
        return new Promise((resolve, reject) => {
            let result;
            let exec = this.getExecutor();
            let process = exec(cmd);
            process.stdout.setEncoding("utf8");
            process.stdout.on("data", (data) => {
                if (result) {
                    data = result + data.toString();
                }
                result = data.toString();
            });
            process.stdout.on("close", () => {
                if (!result) {
                    reject(Error("An error occured, no output was received after executing the phpmd command"));
                    return;
                }
                resolve(result);
            });
            process.stdout.on("error", (err) => {
                reject(err);
            });
        });
    }
}
exports.default = PhpmdService;
//# sourceMappingURL=PhpmdService.js.map
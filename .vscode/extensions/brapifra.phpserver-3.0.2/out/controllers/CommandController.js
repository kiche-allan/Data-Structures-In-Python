"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHPServer_1 = require("../server/PHPServer");
const os_1 = require("os");
const path_1 = require("path");
const Browser_1 = require("../browser/Browser");
const Messages_1 = require("../Messages");
const VSCodeLogger_1 = require("../VSCodeLogger");
class CommandController {
    constructor(context) {
        this.context = context;
        this.logger = new VSCodeLogger_1.default('PHP Server');
        this.serveProject = () => {
            if (this.server.isRunning()) {
                throw Error(Messages_1.default.SERVER_IS_ALREADY_RUNNING);
            }
            this.logger.clear();
            this.logger.show();
            this.startServer();
            this.openBrowserIfPossible();
        };
        this.reloadServer = () => {
            if (this.server.isRunning()) {
                this.server.stop();
            }
            this.startServer();
            if (this.context.extension.getConfiguration().autoOpenOnReload) {
                this.openBrowserIfPossible();
            }
        };
        this.openFileInBrowser = () => {
            if (!this.server.isRunning()) {
                throw Error(Messages_1.default.SERVER_IS_NOT_RUNNING);
            }
            this.openBrowserIfPossible();
        };
        this.stopServer = () => {
            if (this.server.isRunning()) {
                this.server.stop();
            }
        };
        this.server = new PHPServer_1.default();
        this.server.on('data', this.logger.appendLine);
        this.server.on('close', () => {
            this.context.notify(Messages_1.default.SERVER_STOPPED);
        });
        this.server.on('error', (errorMessage) => {
            this.logger.show();
            this.logger.appendLine(errorMessage);
            this.server.stop();
        });
    }
    startServer() {
        this.server.start(this.getServerConfiguration());
        this.context.notify(Messages_1.default.SERVING_PROJECT);
    }
    getServerConfiguration() {
        const extensionConfig = this.context.extension.getConfiguration();
        const relativePath = extensionConfig.relativePath || '.';
        return {
            host: extensionConfig.ip || 'localhost',
            port: extensionConfig.port || 3000,
            rootPath: this.context.getRootPath(),
            relativePath,
            phpExecutablePath: extensionConfig.phpPath || 'php',
            phpRouterPath: this.getPhpServerRouterPath(relativePath, extensionConfig.router),
            phpConfigPath: extensionConfig.phpConfigPath,
        };
    }
    getPhpServerRouterPath(relativePath, routerPathFromConfig) {
        if (!routerPathFromConfig && os_1.platform() === 'win32') {
            process.env.PHP_SERVER_RELATIVE_PATH = relativePath;
            return `${this.context.extension.path}\\src\\server\\logger.php`;
        }
        return routerPathFromConfig;
    }
    openBrowserIfPossible() {
        const { host, port } = this.server.getCurrentConfig() || {};
        const rootPath = this.context.getRootPath();
        if (!rootPath || !host || !port) {
            return;
        }
        const { browser } = this.context.extension.getConfiguration();
        const absolutePathToActiveFile = this.context.getAbsolutePathToActiveFile();
        const relativePathToActiveFile = path_1.relative(rootPath, absolutePathToActiveFile || rootPath).replace(/\\/g, '/');
        const url = `http://${host}:${port}/${relativePathToActiveFile}`;
        new Browser_1.AnyBrowser(browser).open(url);
    }
}
exports.default = CommandController;
//# sourceMappingURL=CommandController.js.map
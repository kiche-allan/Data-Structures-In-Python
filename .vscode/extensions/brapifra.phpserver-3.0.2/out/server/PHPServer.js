"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Messages_1 = require("../Messages");
class PHPServer {
    constructor() {
        this.listeners = [];
    }
    on(event, handler) {
        this.listeners.push([event, handler]);
    }
    start(config) {
        this.throwIfPHPIsNotAvailable(config.phpExecutablePath, config.rootPath);
        this.config = config;
        this.process = child_process_1.spawn(config.phpExecutablePath, this.getProcessArgs(config), {
            cwd: config.rootPath,
        });
        this.setupProcessListeners();
    }
    stop() {
        var _a;
        (_a = this.process) === null || _a === void 0 ? void 0 : _a.kill();
        this.process = undefined;
    }
    isRunning() {
        return !!this.process;
    }
    getCurrentConfig() {
        return this.config;
    }
    throwIfPHPIsNotAvailable(phpExecutablePath, rootPath) {
        const { status } = child_process_1.spawnSync(phpExecutablePath, ['--version'], {
            cwd: rootPath,
        });
        if (status !== 0) {
            throw new Error(Messages_1.default.PHP_NOT_FOUND);
        }
    }
    getProcessArgs(config) {
        const args = [
            '-S',
            `${config.host}:${config.port}`,
            '-t',
            config.relativePath,
        ];
        if (config.phpConfigPath) {
            args.push('-c');
            args.push(config.phpConfigPath);
        }
        if (config.phpRouterPath) {
            args.push(config.phpRouterPath);
        }
        return args;
    }
    setupProcessListeners() {
        this.listeners.forEach(([event, eventHandler]) => {
            this.setupSingleProcessListener(event, eventHandler);
        });
    }
    setupSingleProcessListener(event, eventHandler) {
        var _a, _b, _c, _d, _e, _f;
        if (event === 'data') {
            (_b = (_a = this.process) === null || _a === void 0 ? void 0 : _a.stdout) === null || _b === void 0 ? void 0 : _b.on(event, (data) => {
                eventHandler(data.toString());
            });
            (_d = (_c = this.process) === null || _c === void 0 ? void 0 : _c.stderr) === null || _d === void 0 ? void 0 : _d.on(event, (data) => {
                eventHandler(data.toString());
            });
        }
        else if (event === 'error') {
            (_e = this.process) === null || _e === void 0 ? void 0 : _e.on(event, (error) => {
                eventHandler(error.stack || error.message);
            });
        }
        else {
            (_f = this.process) === null || _f === void 0 ? void 0 : _f.on(event, eventHandler);
        }
    }
}
exports.default = PHPServer;
//# sourceMappingURL=PHPServer.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const CommandController_1 = require("./controllers/CommandController");
const BreakingChangesNotifier_1 = require("./BreakingChangesNotifier");
const utils_1 = require("./utils");
const EXTENSION_NAME = 'phpserver';
const ErrorHandler = utils_1.withErrorHandler((error) => {
    vscode.window.showErrorMessage(error.message);
});
function activate({ subscriptions, extensionPath, globalState, }) {
    return __awaiter(this, void 0, void 0, function* () {
        new BreakingChangesNotifier_1.default(globalState).notifyIfRequired();
        const controller = new CommandController_1.default(getCommandControllerContext(extensionPath));
        subscriptions.push(vscode.commands.registerCommand('extension.phpServer.serveProject', ErrorHandler(controller.serveProject)));
        subscriptions.push(vscode.commands.registerCommand('extension.phpServer.reloadServer', ErrorHandler(controller.reloadServer)));
        subscriptions.push(vscode.commands.registerCommand('extension.phpServer.openFileInBrowser', ErrorHandler(controller.openFileInBrowser)));
        subscriptions.push(vscode.commands.registerCommand('extension.phpServer.stopServer', ErrorHandler(controller.stopServer)));
    });
}
exports.activate = activate;
function getCommandControllerContext(extensionPath) {
    return {
        extension: {
            path: extensionPath,
            getConfiguration: getExtensionConfiguration,
        },
        notify: vscode.window.showInformationMessage,
        getRootPath: utils_1.getRootPath,
        getAbsolutePathToActiveFile: () => { var _a; return (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName; },
    };
}
function getExtensionConfiguration() {
    const config = vscode.workspace.getConfiguration(EXTENSION_NAME);
    return {
        ip: config.get('ip'),
        port: config.get('port'),
        relativePath: config.get('relativePath'),
        browser: config.get('browser'),
        router: config.get('router'),
        phpPath: config.get('phpPath'),
        phpConfigPath: config.get('phpConfigPath'),
        autoOpenOnReload: config.get('autoOpenOnReload'),
    };
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
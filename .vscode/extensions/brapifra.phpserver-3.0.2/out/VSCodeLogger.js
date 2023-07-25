"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class VSCodeLogger {
    constructor(name) {
        this.name = name;
        this.outputChannel = vscode.window.createOutputChannel(this.name);
        this.clear = () => {
            this.outputChannel.clear();
        };
        this.show = () => {
            this.outputChannel.show();
        };
        this.appendLine = (message) => {
            this.outputChannel.appendLine(message);
        };
    }
}
exports.default = VSCodeLogger;
//# sourceMappingURL=VSCodeLogger.js.map
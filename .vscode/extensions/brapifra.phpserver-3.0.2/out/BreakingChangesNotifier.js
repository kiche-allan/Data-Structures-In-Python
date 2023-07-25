"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Messages_1 = require("./Messages");
const EXTENSION_ID = 'brapifra.phpserver';
var GlobalStateField;
(function (GlobalStateField) {
    GlobalStateField["BREAKING_CHANGES_DISMISSED"] = "BREAKING_CHANGES_DISMISSED";
})(GlobalStateField || (GlobalStateField = {}));
class BreakingChangesNotifier {
    constructor(globalState) {
        this.globalState = globalState;
    }
    notifyIfRequired() {
        if (this.doesCurrentVersionContainBreakingChanges() &&
            !this.wasBreakingChangesWarningDismissed()) {
            vscode.window
                .showInformationMessage(Messages_1.default.BROWSER_BREAKING_CHANGES, Messages_1.default.OK)
                .then((result) => {
                if (result === Messages_1.default.OK)
                    this.globalState.update(GlobalStateField.BREAKING_CHANGES_DISMISSED, true);
            });
        }
    }
    doesCurrentVersionContainBreakingChanges() {
        const extension = vscode.extensions.getExtension(EXTENSION_ID);
        return (extension === null || extension === void 0 ? void 0 : extension.packageJSON.version) >= '3.0.0';
    }
    wasBreakingChangesWarningDismissed() {
        return this.globalState.get(GlobalStateField.BREAKING_CHANGES_DISMISSED, false);
    }
}
exports.default = BreakingChangesNotifier;
//# sourceMappingURL=BreakingChangesNotifier.js.map
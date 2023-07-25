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
exports.endOfFile = exports.openFileInEditor = void 0;
const vscode = require("vscode");
function openFileInEditor(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let document;
        try {
            document = yield vscode.workspace.openTextDocument(path);
        }
        catch (_a) {
            const untitledDocument = yield vscode.workspace.openTextDocument(vscode.Uri.file(path).with({ scheme: 'untitled' }));
            // Wacky workaround, see https://github.com/microsoft/vscode/issues/25729
            yield untitledDocument.save();
            document = yield vscode.workspace.openTextDocument(path);
        }
        yield vscode.window.showTextDocument(document);
        // We know there is an active editor, we just opened one
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return vscode.window.activeTextEditor;
    });
}
exports.openFileInEditor = openFileInEditor;
function endOfFile(editor) {
    const line = editor.document.lineAt(editor.document.lineCount - 1);
    return line.range.end;
}
exports.endOfFile = endOfFile;
//# sourceMappingURL=vscode-utils.js.map
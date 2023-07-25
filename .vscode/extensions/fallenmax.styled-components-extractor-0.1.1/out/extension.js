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
exports.activate = void 0;
const vscode = require("vscode");
const corresponding_file_1 = require("./lib/corresponding-file");
const extractor_1 = require("./lib/extractor");
const imports_1 = require("./lib/imports");
const vscode_utils_1 = require("./lib/vscode-utils");
const modify_vscode_editor_1 = require("./lib/modify-vscode-editor");
const supportedLangs = ['javascript', 'javascriptreact', 'typescriptreact'];
const extract = (type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        if (supportedLangs.indexOf(editor.document.languageId) === -1 &&
            !/\.(js|ts)x?$/.test(editor.document.fileName)) {
            vscode.window.showWarningMessage('[SCE] Only `.js`, `.ts`, `.jsx` and `.tsx` are supported');
            return;
        }
        const document = editor.document;
        const config = vscode.workspace.getConfiguration('styledComponentsExtractor');
        const text = document.getText();
        const unbound = (0, extractor_1.collectUnbound)(text);
        if (!unbound.length) {
            vscode.window.showWarningMessage('[SCE] Nothing to extract: There are no unbound components');
            return;
        }
        const exportIdentifier = type == 'extractExportedToClipboard' || type == 'extractToSeparateFile';
        const declarations = (0, extractor_1.generateDeclarations)({
            unbound,
            exportIdentifier,
        });
        if (type == 'extractToClipboard' || type == 'extractExportedToClipboard') {
            let clipboardText = declarations;
            if (config.get('addImportStatement', true)) {
                const styledImportInsertion = (0, imports_1.getStyledImportInsertion)(editor.document.getText());
                if (styledImportInsertion) {
                    clipboardText = styledImportInsertion.insertionText + declarations;
                }
            }
            yield vscode.env.clipboard.writeText(clipboardText);
            vscode.window.showInformationMessage(`[SCE] Copied to clipboard! (Found: ${unbound.length}) `);
        }
        else if (type == 'extractToSeparateFile') {
            const styleFile = (0, corresponding_file_1.getCorrespondingStyleFile)(editor.document.uri.path, config.get('separateFile.outputFile', '$name.styles'), config.get('styledComponentsExtractor.separateFile.advanced.inputFileRegex', ''));
            if (!styleFile) {
                vscode.window.showWarningMessage('[SCE] This file does not match the pattern in your configuration.');
                return;
            }
            yield (0, modify_vscode_editor_1.modifyImports)(editor, styleFile, unbound);
            const styleFileEditor = yield (0, vscode_utils_1.openFileInEditor)(styleFile);
            yield (0, modify_vscode_editor_1.insertStyles)(styleFileEditor, declarations);
            yield (0, modify_vscode_editor_1.insertStyledImport)(styleFileEditor);
            yield editor.document.save();
            yield styleFileEditor.document.save();
        }
        else if (type == 'extractToSameFile') {
            yield (0, modify_vscode_editor_1.insertStyles)(editor, declarations);
            yield (0, modify_vscode_editor_1.insertStyledImport)(editor);
            yield editor.document.save();
        }
    }
    catch (e) {
        if (e instanceof Error && Object.getPrototypeOf(e).name === 'SyntaxError') {
            vscode.window.showErrorMessage('[SCE] Failed to extract due to syntax error: ' + e.message);
        }
        else {
            console.error('[SCE]', e);
            vscode.window.showErrorMessage('[SCE] Unexpected error while extracting');
        }
    }
});
const activate = (context) => {
    context.subscriptions.push(vscode.commands.registerCommand('styledComponentsExtractor.extractToClipboard', () => extract('extractToClipboard')), vscode.commands.registerCommand('styledComponentsExtractor.extractExportedToClipboard', () => extract('extractExportedToClipboard')), vscode.commands.registerCommand('styledComponentsExtractor.extractToSameFile', () => extract('extractToSameFile')), vscode.commands.registerCommand('styledComponentsExtractor.extractToSeparateFile', () => extract('extractToSeparateFile')));
};
exports.activate = activate;
//# sourceMappingURL=extension.js.map
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
exports.insertStyles = exports.insertStyledImport = exports.modifyImports = void 0;
const vscode = require("vscode");
const imports_1 = require("./imports");
const path_utils_1 = require("./path-utils");
const vscode_utils_1 = require("./vscode-utils");
function modifyImports(editor, fileToImport, modulesToImport) {
    return __awaiter(this, void 0, void 0, function* () {
        const importPath = (0, path_utils_1.relativeImportPathFromFile)(editor.document.uri.path, fileToImport);
        const { insertionText, insertionOffset } = (0, imports_1.getImportInsertion)(editor.document.getText(), importPath, modulesToImport);
        const insertionPosition = editor.document.positionAt(insertionOffset);
        yield editor.edit((editBuilder) => {
            editBuilder.insert(insertionPosition, insertionText);
        });
    });
}
exports.modifyImports = modifyImports;
function insertStyledImport(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        const styledImportInsertion = (0, imports_1.getStyledImportInsertion)(editor.document.getText());
        if (styledImportInsertion) {
            const { insertionText, insertionOffset } = styledImportInsertion;
            const insertionPosition = editor.document.positionAt(insertionOffset);
            yield editor.edit((editBuilder) => {
                editBuilder.insert(insertionPosition, insertionText);
            });
        }
    });
}
exports.insertStyledImport = insertStyledImport;
function insertStyles(editor, declarations) {
    return __awaiter(this, void 0, void 0, function* () {
        const end = (0, vscode_utils_1.endOfFile)(editor);
        const declarationsToInsert = '\n\n' + declarations;
        yield editor.edit((editBuilder) => {
            editBuilder.insert(end, declarationsToInsert);
        });
        const newEnd = editor.document.positionAt(editor.document.offsetAt(end) + declarationsToInsert.length);
        yield editor.revealRange(new vscode.Range(end, newEnd));
    });
}
exports.insertStyles = insertStyles;
//# sourceMappingURL=modify-vscode-editor.js.map
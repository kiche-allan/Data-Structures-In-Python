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
const corresponding_file_1 = require("./corresponding-file");
test('getCorrespondingStyleFile styles.js', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.jsx', 'styles', '');
    expect(importPath).toEqual('/one/two/styles.js');
}));
test('getCorrespondingStyleFile styles.ts', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.tsx', 'styles', '');
    expect(importPath).toEqual('/one/two/styles.ts');
}));
test('getCorrespondingStyleFile filename.styles.js', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.jsx', '$name.styles', '');
    expect(importPath).toEqual('/one/two/three.styles.js');
}));
test('getCorrespondingStyleFile filename.styles.ts', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.tsx', '$name.styles', '');
    expect(importPath).toEqual('/one/two/three.styles.ts');
}));
test('getCorrespondingStyleFile filenameView.jsx -> filenameStyles.js', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/threeView.jsx', '$1Styles', '^(.+)View$');
    expect(importPath).toEqual('/one/two/threeStyles.js');
}));
test('getCorrespondingStyleFile filenameView.tsx -> filenameStyles.ts', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/threeView.tsx', '$1Styles', '^(.+)View$');
    expect(importPath).toEqual('/one/two/threeStyles.ts');
}));
test('getCorrespondingStyleFile filename.view.jsx -> filename.styles.js', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.view.jsx', '$1.styles', '^(.+)\\.view$');
    expect(importPath).toEqual('/one/two/three.styles.js');
}));
test('getCorrespondingStyleFile filename.view.tsx -> filename.styles.ts', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.view.tsx', '$1.styles', '^(.+)\\.view$');
    expect(importPath).toEqual('/one/two/three.styles.ts');
}));
test('getCorrespondingStyleFile no match', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, corresponding_file_1.getCorrespondingStyleFile)('/one/two/three.tsx', '$1Styles', '^(.+)View$');
    expect(importPath).toEqual(null);
}));
//# sourceMappingURL=corresponding-file.test.js.map
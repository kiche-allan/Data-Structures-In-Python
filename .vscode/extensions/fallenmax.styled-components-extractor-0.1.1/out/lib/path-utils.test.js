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
const path_utils_1 = require("./path-utils");
test('relativeImportPathFromFile, same directory', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, path_utils_1.relativeImportPathFromFile)('/one/mycomponent.js', '/one/mycomponent.styles.js');
    expect(importPath).toEqual('./mycomponent.styles');
}));
test('relativeImportPathFromFile, different directories', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, path_utils_1.relativeImportPathFromFile)('/one/two/three.js', '/one/four/five.js');
    expect(importPath).toEqual('../four/five');
}));
test('stripExtension', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, path_utils_1.stripExtension)('/one/two/three.test.js');
    expect(importPath).toEqual('/one/two/three.test');
}));
test('stripExtension', () => __awaiter(void 0, void 0, void 0, function* () {
    const importPath = (0, path_utils_1.getExtension)('/one/two/three.test.js');
    expect(importPath).toEqual('.js');
}));
//# sourceMappingURL=path-utils.test.js.map
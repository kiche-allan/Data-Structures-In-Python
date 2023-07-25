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
const imports_1 = require("./imports");
test('getImportInsertion no existing import', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getImportInsertion)(code, './styles', ['Abc', 'Xyz']);
    expect(insertion).toEqual({
        insertionText: 'import { Abc, Xyz } from "./styles"\n',
        insertionOffset: 0,
    });
}));
test('getImportInsertion with existing import', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import { Def } from "./styles"
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getImportInsertion)(code, './styles', ['Abc', 'Xyz']);
    expect(insertion).toEqual({
        insertionText: ', Abc, Xyz',
        insertionOffset: 41,
    });
}));
test('getStyledImportInsertion no existing import', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getStyledImportInsertion)(code);
    expect(insertion).toEqual({
        insertionText: "import styled from 'styled-components'\n",
        insertionOffset: 0,
    });
}));
test('getStyledImportInsertion no existing import, but with other named imports ', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import { css }  from 'styled-components'
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getStyledImportInsertion)(code);
    expect(insertion).toEqual({
        insertionText: "import styled from 'styled-components'\n",
        insertionOffset: 0,
    });
}));
test('getStyledImportInsertion with existing import', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import  styled from 'styled-components'
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getStyledImportInsertion)(code);
    expect(insertion).toEqual(null);
}));
test('getStyledImportInsertion with existing import, with other named imports ', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
import { foo } from "./bar"
import styled, { css } from 'styled-components'
import { baz } from "./qux"
  `;
    const insertion = (0, imports_1.getStyledImportInsertion)(code);
    expect(insertion).toEqual(null);
}));
//# sourceMappingURL=imports.test.js.map
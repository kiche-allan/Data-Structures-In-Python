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
const extractor_1 = require("./extractor");
test('collectUnbound', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
const Def = 1 as any

const TestComponent: React.SFC = () => {
  const c = a?.b ?? c
  return (
    <Abc someAttrs>
      <Def>
        <Ghi />
        <section />
      </Def>
      <ul>
        <li>123</li>
        <li>456</li>
        <li>789</li>
      </ul>
    </Abc>
  )
}
  `;
    expect((0, extractor_1.collectUnbound)(code)).toEqual(['Abc', 'Ghi']);
}));
test('collectUnbound syntax error', () => __awaiter(void 0, void 0, void 0, function* () {
    const code = `
const Def = 1 as any

const TestComponent: React.SFC = () => {
  const c = a?.b ?? c
  return (
    <Abc someAttrs>
      <Def>
        <Ghi />
        <section />
      </Def>
      <ul>
        <li>123</li>
        <li>456</li>
        <li>789</li>
      </ul>
    </Xyz>
  )
}
  `;
    try {
        (0, extractor_1.collectUnbound)(code);
        fail('Should have thrown an error');
    }
    catch (e) {
        expect(e instanceof Error && Object.getPrototypeOf(e).name === 'SyntaxError').toBe(true);
    }
}));
test('generateDeclarations no export', () => __awaiter(void 0, void 0, void 0, function* () {
    const declarations = yield (0, extractor_1.generateDeclarations)({
        unbound: ['Abc', 'Xyz'],
        exportIdentifier: false,
    });
    expect(declarations).toEqual('const Abc = styled.div``\n' + 'const Xyz = styled.div``');
}));
test('generateDeclarations yes export', () => __awaiter(void 0, void 0, void 0, function* () {
    const declarations = yield (0, extractor_1.generateDeclarations)({
        unbound: ['Abc', 'Xyz'],
        exportIdentifier: true,
    });
    expect(declarations).toEqual('export const Abc = styled.div``\n' + 'export const Xyz = styled.div``');
}));
//# sourceMappingURL=extractor.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeclarations = exports.collectUnbound = void 0;
const parser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const parseOptions = {
    sourceType: 'module',
    plugins: [
        'jsx',
        'typescript',
        'objectRestSpread',
        'asyncGenerators',
        'classProperties',
        'dynamicImport',
        'decorators-legacy',
        'optionalCatchBinding',
        'optionalChaining',
        'nullishCoalescingOperator',
    ],
};
const collectUnbound = (code) => {
    const ast = parser.parse(code, parseOptions);
    const unboundJSXIdentifiers = new Set();
    (0, traverse_1.default)(ast, {
        enter(path) {
            var _a;
            const node = path.node;
            switch (node.type) {
                case 'JSXIdentifier': {
                    if (((_a = path.parentPath) === null || _a === void 0 ? void 0 : _a.node.type) !== 'JSXOpeningElement') {
                        return;
                    }
                    const isComponent = /[A-Z]/.test(node.name);
                    if (!isComponent) {
                        return;
                    }
                    if (!path.scope.hasBinding(node.name)) {
                        unboundJSXIdentifiers.add(node.name);
                    }
                    break;
                }
                default:
                    break;
            }
        },
    });
    return [...unboundJSXIdentifiers];
};
exports.collectUnbound = collectUnbound;
const generateDeclarations = ({ unbound, exportIdentifier, }) => {
    return unbound
        .map((varName) => {
        return `${exportIdentifier ? 'export ' : ''}const ${varName} = styled.div\`\``;
    })
        .join('\n');
};
exports.generateDeclarations = generateDeclarations;
//# sourceMappingURL=extractor.js.map
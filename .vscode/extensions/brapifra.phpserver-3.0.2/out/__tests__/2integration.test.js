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
const vscode = require("vscode");
describe('vscode-phpserver', () => {
    it('should register all the necessary commands on activation', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedCommands = [
            'extension.phpServer.serveProject',
            'extension.phpServer.reloadServer',
            'extension.phpServer.openFileInBrowser',
            'extension.phpServer.stopServer',
        ];
        // Given that the commands have not been registered yet
        const initialCommands = yield vscode.commands.getCommands();
        expect(initialCommands).not.toEqual(expect.arrayContaining(expectedCommands));
        // When I execute an activation event
        yield vscode.commands.executeCommand('extension.phpServer.openFileInBrowser');
        // Then it should register all the necessary commands
        const commands = yield vscode.commands.getCommands();
        expect(commands).toEqual(expect.arrayContaining(expectedCommands));
    }));
    it('should activate itself when a command is executed', () => __awaiter(void 0, void 0, void 0, function* () {
        const extension = yield vscode.extensions.getExtension('brapifra.phpserver');
        expect(extension === null || extension === void 0 ? void 0 : extension.packageJSON).toEqual(expect.objectContaining({
            activationEvents: [
                'onCommand:extension.phpServer.serveProject',
                'onCommand:extension.phpServer.openFileInBrowser',
                'onCommand:extension.phpServer.reloadServer',
            ],
        }));
    }));
});
//# sourceMappingURL=2integration.test.js.map
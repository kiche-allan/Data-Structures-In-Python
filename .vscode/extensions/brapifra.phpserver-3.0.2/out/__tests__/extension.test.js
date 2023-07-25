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
const extension = require("../extension");
const Messages_1 = require("../Messages");
const VSCodeMementoMock_1 = require("../__mocks__/VSCodeMementoMock");
const CommandController_1 = require("../controllers/CommandController");
const utils_1 = require("../utils");
jest.mock('../controllers/CommandController', () => ({
    default: jest.fn(),
}));
function activateExtension(props = {}) {
    extension.activate(Object.assign({ subscriptions: [], extensionPath: '', globalState: new VSCodeMementoMock_1.default() }, props));
}
describe('vscode-phpserver', () => {
    beforeEach(() => {
        CommandController_1.default.mockClear();
    });
    describe('config.browser is truthy', () => {
        it("should show a message warning the user about breaking changes in the extension until it's dismissed", () => __awaiter(void 0, void 0, void 0, function* () {
            const globalState = new VSCodeMementoMock_1.default();
            // Given that the extension gets activated
            // And that the user dismisses the warning message
            const showInfoMessageSpy = jest
                .spyOn(vscode.window, 'showInformationMessage')
                .mockImplementationOnce(() => ({
                then: (onfullfilled) => onfullfilled(),
            }));
            expect(showInfoMessageSpy).not.toBeCalled();
            activateExtension({ globalState });
            expect(showInfoMessageSpy).toBeCalledTimes(1);
            // When the extension gets activated again
            // And the user clicks accepts the warning message
            showInfoMessageSpy.mockImplementationOnce(() => ({
                then: (onfullfilled) => onfullfilled('Ok'),
            }));
            activateExtension({ globalState });
            expect(showInfoMessageSpy).toBeCalledTimes(2);
            // Then the warning message should no longer appear
            activateExtension({ globalState });
            expect(showInfoMessageSpy).toBeCalledTimes(2);
            expect(showInfoMessageSpy).toBeCalledWith(Messages_1.default.BROWSER_BREAKING_CHANGES, 'Ok');
        }));
    });
    it('should pass the correct context object to CommandController', () => {
        expect(CommandController_1.default).not.toBeCalled();
        activateExtension();
        expect(CommandController_1.default).toBeCalledWith(expect.objectContaining({ getRootPath: utils_1.getRootPath }));
        expect(CommandController_1.default).toBeCalledTimes(1);
    });
});
//# sourceMappingURL=extension.test.js.map
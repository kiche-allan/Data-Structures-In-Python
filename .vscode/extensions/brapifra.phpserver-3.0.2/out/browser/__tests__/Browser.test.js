"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Browser_1 = require("../Browser");
const open = require("open");
jest.mock('open', () => jest.fn());
const testUrl = 'http://localhost:3000/index.php';
describe('Browser', () => {
    beforeEach(() => open.mockClear());
    it('should open the passed url in the default browser', () => {
        expect(open).toBeCalledTimes(0);
        new Browser_1.AnyBrowser().open(testUrl);
        expect(open).toBeCalledTimes(1);
        expect(open).toBeCalledWith(testUrl, { url: true });
    });
    it('should open the passed url in the passed browser', () => {
        const browser = 'firefox';
        expect(open).toBeCalledTimes(0);
        new Browser_1.AnyBrowser(browser).open(testUrl);
        expect(open).toBeCalledTimes(1);
        expect(open).toBeCalledWith(testUrl, { url: true, app: browser });
    });
});
//# sourceMappingURL=Browser.test.js.map
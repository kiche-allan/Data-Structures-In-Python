"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyBrowser = void 0;
const open = require("open");
class AnyBrowser {
    constructor(browser) {
        this.browser = browser;
    }
    open(url) {
        open(url, { url: true, app: this.browser });
    }
}
exports.AnyBrowser = AnyBrowser;
//# sourceMappingURL=Browser.js.map
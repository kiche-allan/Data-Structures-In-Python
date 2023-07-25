"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VSCodeMementoMock {
    constructor() {
        this.data = {};
    }
    get(key, defaultValue) {
        var _a;
        return (_a = this.data[key]) !== null && _a !== void 0 ? _a : defaultValue;
    }
    update(key, value) {
        this.data[key] = value;
        return { then: (fn) => fn() };
    }
}
exports.default = VSCodeMementoMock;
//# sourceMappingURL=VSCodeMementoMock.js.map
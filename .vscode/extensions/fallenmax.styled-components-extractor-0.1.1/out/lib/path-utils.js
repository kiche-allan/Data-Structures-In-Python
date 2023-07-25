"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.stripExtension = exports.relativeImportPathFromFile = void 0;
const path = require("path");
function relativeImportPathFromFile(from, to) {
    // TODO is this OK on Windows?
    let relative = path.relative(path.dirname(from), to);
    if (relative === path.basename(to)) {
        relative = './' + relative;
    }
    return stripExtension(relative);
}
exports.relativeImportPathFromFile = relativeImportPathFromFile;
function stripExtension(inputPath) {
    const parsed = path.parse(inputPath);
    return parsed.dir + '/' + parsed.name; // removes extension
}
exports.stripExtension = stripExtension;
function getExtension(inputPath) {
    const parsed = path.parse(inputPath);
    return parsed.ext;
}
exports.getExtension = getExtension;
//# sourceMappingURL=path-utils.js.map
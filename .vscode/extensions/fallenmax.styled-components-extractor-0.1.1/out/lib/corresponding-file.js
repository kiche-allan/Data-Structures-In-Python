"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrespondingStyleFile = void 0;
const path = require("path");
const path_utils_1 = require("./path-utils");
function getCorrespondingStyleFile(inputPath, outputFile, inputFileRegex) {
    const basePath = path.dirname(inputPath);
    const filename = (0, path_utils_1.stripExtension)(path.basename(inputPath));
    const extension = (0, path_utils_1.getExtension)(path.basename(inputPath));
    let outputFilename = outputFile.replace('$name', filename);
    if (inputFileRegex.length) {
        let effectiveRegex = inputFileRegex;
        // HACK - ensure the regex matches the entire string, so
        // that we replace the whole string
        if (!effectiveRegex.startsWith('^')) {
            effectiveRegex = '^.*' + effectiveRegex;
        }
        if (!effectiveRegex.endsWith('$')) {
            effectiveRegex += '.*$';
        }
        if (!filename.match(effectiveRegex)) {
            return null;
        }
        outputFilename = filename.replace(new RegExp(effectiveRegex), outputFilename);
    }
    const outputExtension = extension.match(/tsx?/) ? 'ts' : 'js';
    return path.join(basePath, `${outputFilename}.${outputExtension}`);
}
exports.getCorrespondingStyleFile = getCorrespondingStyleFile;
//# sourceMappingURL=corresponding-file.js.map
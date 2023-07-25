"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse pipeline task strategy
 *
 * Strategy used to create the pipeline task responsible for parsing
 * the PHP mess detector result.
 *
 * @module vscode-phpmd/service/pipeline
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class ParseStrategy {
    /**
     * Parse task strategy constructor
     *
     * @param {Parser} parser
     * @param {ILogger} logger
     */
    constructor(parser, logger) {
        this.parser = parser;
        this.logger = logger;
    }
    /**
     * Strategy executor
     *
     * Resolve with the parse PHP mess detector result.
     *
     * @see IExecuteStrategy::execute
     */
    execute(input, resolve, reject) {
        this.parser.parseString(this.escapeInput(input), (error, result) => {
            if (error) {
                this.logger.log(`Unable to parse result xml. ${error}`);
            }
            if (!result) {
                result = { pmd: null };
            }
            input.pmd = result.pmd;
            resolve(input);
        });
    }
    ;
    escapeInput(input) {
        const escapedPath = input.path.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
        if (escapedPath !== input.path) {
            this.logger.info(`Escaping path in phpmd output xml to prevent parsing errors. Replacing ${input.path} with ${escapedPath}`, true);
            const trimmedPath = /^[a-zA-Z]:/.test(input.path) ? input.path.substr(2) : input.path;
            const trimmedEscapedPath = /^[a-zA-Z]:/.test(escapedPath) ? escapedPath.substr(2) : escapedPath;
            return input.raw.replace(trimmedPath, trimmedEscapedPath);
        }
        return input.raw;
    }
}
exports.default = ParseStrategy;
//# sourceMappingURL=ParseStrategy.js.map
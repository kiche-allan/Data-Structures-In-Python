"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const NullLogger_1 = require("../logger/NullLogger");
/**
 * Build diagnostic pipeline task strategy
 *
 * Strategy used to create the pipeline task responsible for building
 * the diagnostic object from the parsed PHP mess detector result.
 *
 * @module vscode-phpmd/service/pipeline
 * @author Sandhjé Bouw (sandhje@ecodes.io)
 */
class BuildDiagnosticsStrategy {
    /**
     * Build diagnostics task strategy constructor
     *
     * @param {ILogger} logger Logger, defaults to Null object implementation
     */
    constructor(logger = new NullLogger_1.default()) {
        this.logger = logger;
        /**
         * List of reported PHP mess detector violations
         *
         * Used to prevent reporting the same violation multiple times.
         *
         * @property {string[]} reported
         */
        this.reported = [];
        /**
         * Map of diagnostic severity levels to PHP mess detector severity levels
         *
         * List indexes are used as the identifiers of the PHP mess detector sevetity level
         *
         * @property {DiagnosticSeverity[]} severityMap
         */
        this.severityMap = [
            vscode_languageserver_1.DiagnosticSeverity.Error,
            vscode_languageserver_1.DiagnosticSeverity.Warning,
            vscode_languageserver_1.DiagnosticSeverity.Information,
            vscode_languageserver_1.DiagnosticSeverity.Hint,
            vscode_languageserver_1.DiagnosticSeverity.Hint
        ];
    }
    /**
     * Strategy executor
     *
     * Resolve with a list of diagnostics from parsed PHP mess detector violations.
     *
     * @see IExecuteStrategy::execute
     */
    execute(input, resolve, reject) {
        let pmd = input.pmd;
        if (pmd === null || typeof pmd.file === "undefined") {
            // If no pmd results found, resolve without diagnostics
            resolve(input);
            return;
        }
        // For all files in Pmd result
        // Get diagnostics and append to payload
        pmd.file.every((file) => {
            input.diagnostics = input.diagnostics.concat(this.getDiagnostics(file.$.name, this.getProblems(pmd)));
            return true;
        });
        resolve(input);
    }
    ;
    /**
     * Get a list of violations from the parsed PHP mess detector result
     *
     * @param {IPmd} pmd
     * @returns {IPmdViolation[]}
     */
    getProblems(pmd) {
        return pmd.file[0].violation || [];
    }
    /**
     * Create a list of diagnostics from a list of PHP mess detector violations
     *
     * @param {string} filename
     * @param {IPmdViolation[]} problems
     * @returns {Diagnostic[]}
     */
    getDiagnostics(filename, problems) {
        let diagnostics = [];
        this.clearReported(); // Clear the already reported diagnostics to prevent false positives upon de-duplication
        problems.forEach((problem) => {
            try {
                let diagnostic = this.getDiagnostic(problem);
                if (diagnostic !== null) {
                    diagnostics.push(diagnostic);
                }
            }
            catch (e) {
                this.logger.error("Error while parsing diagnostic info from PHP mess detector violation.");
            }
        });
        return diagnostics;
    }
    /**
     * Create a diagnostic object from a PHP mess detector violation
     *
     * @throws {Error} If vscode diagnostic object could not be created from PHP mess detector violation
     *
     * @param {IPmdViolation} problem
     * @returns {Diagnostic}
     */
    getDiagnostic(problem) {
        try {
            let line = this.getLine(problem);
            let index = this.getIndex(problem);
            let length = this.getLength(problem);
            let hash = this.createProblemHash(problem);
            if (hash !== null && this.alreadyReported(hash)) {
                return null;
            }
            this.report(hash);
            return {
                message: this.getMessage(problem),
                range: {
                    end: {
                        character: index + length,
                        line
                    },
                    start: {
                        character: index,
                        line
                    },
                },
                severity: this.getSeverity(problem),
                source: this.getSource(problem)
            };
        }
        catch (e) {
            throw new Error("Unable to create diagnostic (" + e.message + ")");
        }
    }
    /**
     * Add a PHP mess detector violation hash to the reported list to prevent duplicate diagnostics
     *
     * @param {string} hash
     * @returns {void}
     */
    report(hash) {
        this.reported.push(hash);
    }
    /**
     * Check wether the passed violation hash was already reported
     *
     * @param {string} hash
     * @returns {boolean}
     */
    alreadyReported(hash) {
        return this.reported.indexOf(hash) >= 0;
    }
    /**
     * Clear the already reported problems
     *
     * @returns {void}
     */
    clearReported() {
        this.reported = [];
    }
    /**
     * Create a problem hash from a PHP mess detector violation
     *
     * @param {IPmdViolation} problem
     * @returns {string}
     */
    createProblemHash(problem) {
        let ruleset = problem.$.ruleset || null;
        let rule = problem.$.rule || null;
        let line = problem.$.beginline || null;
        let str = ruleset + "-" + rule + "-" + line;
        let hash = 0;
        if (str.length === 0) {
            return null;
        }
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }
    /**
     * Get the violation line number from a PHP mess detector violation
     *
     * @throws {Error} If line number could not be extracted from violation
     *
     * @param {IPmdViolation} problem
     * @return {number}
     */
    getLine(problem) {
        let beginline = problem.$.beginline || null;
        if (beginline === null) {
            throw new Error("Unable to find problem begin line");
        }
        return parseInt(beginline, 10) - 1;
    }
    /**
     * Get the violation start index from a PHP mess detector violation
     *
     * Returns a fixed value of 0 since PHP mess detector violations do not contain a start index.
     *
     * @param {IPmdViolation} problem
     * @return {number}
     */
    getIndex(problem) {
        return 0;
    }
    /**
     * Get the violation length from a PHP mess detector violation
     *
     * Returns a fixed value of Number.MAX_VALUE since PHP mess detector violations do not contain a length.
     *
     * @param {IPmdViolation} problem
     * @return {number}
     */
    getLength(problem) {
        return Number.MAX_VALUE;
    }
    /**
     * Get the violation message from a PHP mess detector violation
     *
     * @throws {Error} If message could not be extracted from violation
     *
     * @param {IPmdViolation} problem
     * @return {string}
     */
    getMessage(problem) {
        let message = problem._ || null;
        message = message.replace(/^\s+|\s+$/g, '');
        if (message === null) {
            throw new Error("Unable to find problem message");
        }
        return message;
    }
    /**
     * Get the source from a PHP mess detector violation
     *
     * Returns a fixed value of "PHP Mess Detector" since PHP mess detector violations do not contain a source.
     *
     * @param {IPmdViolation} problem
     * @return {number}
     */
    getSource(problem) {
        return "PHP Mess Detector";
    }
    /**
     * Get the violation severity from a PHP mess detector violation
     *
     * Maps PHP mess detector severities to vscode diagnostic severities using the severityMap property. If no
     * mapping was possible defaults to a severity of "Hint".
     *
     * @param {IPmdViolation} problem
     * @return {DiagnosticSeverity}
     */
    getSeverity(problem) {
        let priority = parseInt(problem.$.priority, 10) || 100;
        let severity = this.severityMap[priority - 1] || vscode_languageserver_1.DiagnosticSeverity.Hint;
        return severity;
    }
}
exports.default = BuildDiagnosticsStrategy;
//# sourceMappingURL=BuildDiagnosticsStrategy.js.map
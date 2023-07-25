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
const path = require("path");
const vscode_test_1 = require("vscode-test");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // The folder containing the Extension Manifest package.json
            // Passed to `--extensionDevelopmentPath`
            const extensionDevelopmentPath = path.resolve(__dirname, '../../');
            // The path to the extension test script
            // Passed to --extensionTestsPath
            const extensionTestsPath = path.resolve(__dirname, '../../node_modules/jest-runner-vscode');
            const extensionTestsEnv = {
                JEST_RUNNER_VSCODE_TEST_REGEX: '^extension.test.js$'
            };
            // The path to a module that runs some code to configure or set up the
            // testing framework before each test.
            // See https://github.com/microsoft/vscode-test/blob/master/jest-runner#jest_runner_setup
            // extensionTestsEnv.JEST_RUNNER_SETUP = path.resolve(
            // 	__dirname,
            // 	'./custom-jest-runner-setup.js'
            // );
            // Download VS Code, unzip it and run the integration test
            yield vscode_test_1.runTests({
                extensionDevelopmentPath,
                extensionTestsPath,
                launchArgs: ['--disable-extensions'],
                extensionTestsEnv,
            });
        }
        catch (err) {
            console.error('Failed to run tests');
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=index.js.map
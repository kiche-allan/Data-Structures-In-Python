"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("../utils");
const path = require("path");
describe('Extension utils', () => {
    describe('getRootPath', () => {
        const originalVscodeWorkspaceFolders = vscode.workspace.workspaceFolders;
        beforeEach(() => {
            // @ts-ignore
            vscode.workspace.workspaceFolders = originalVscodeWorkspaceFolders;
        });
        it('should return undefined if there are no folders in the workspace', () => {
            expect(utils_1.getRootPath()).toBeUndefined();
        });
        it('should return the path of the first folder if there is only one folder in the workspace', () => {
            const basePath = path.normalize('/root/path');
            mockVscodeWorkspaceFolders([basePath]);
            expect(utils_1.getRootPath()).toEqual(basePath);
        });
        it('should return the shortest common path amongst all the workspace folders', () => {
            const basePath = path.normalize('/root/path');
            mockVscodeWorkspaceFolders([
                path.normalize(`${basePath}/1`),
                path.normalize(`${basePath}/2`),
                path.normalize(`${basePath}/1/2`),
                path.normalize(`${basePath}/2/2`),
            ]);
            expect(utils_1.getRootPath()).toEqual(basePath);
            mockVscodeWorkspaceFolders([
                path.normalize(`${basePath}/1/3/2`),
                path.normalize(`${basePath}/1/3/1`),
            ]);
            expect(utils_1.getRootPath()).toEqual(path.normalize(`${basePath}/1/3`));
            mockVscodeWorkspaceFolders([
                path.normalize(`${basePath}/1`),
                path.normalize(`${basePath}/11`),
            ]);
            expect(utils_1.getRootPath()).toEqual(basePath);
            const windowsBasePath = 'C:\\root\\path';
            const normalizeSpy = jest
                .spyOn(path, 'normalize')
                .mockImplementationOnce((str) => str.replace(/\//g, '\\'));
            mockVscodeWorkspaceFolders([
                `${windowsBasePath}\\1`,
                `${windowsBasePath}\\11`,
            ]);
            expect(utils_1.getRootPath()).toEqual(windowsBasePath);
            expect(normalizeSpy).toBeCalledTimes(1);
            expect(normalizeSpy).toBeCalledWith(windowsBasePath.replace(/\\/g, '/'));
        });
    });
});
function mockVscodeWorkspaceFolders(workspaceFolders) {
    // @ts-ignore
    vscode.workspace.workspaceFolders = workspaceFolders === null || workspaceFolders === void 0 ? void 0 : workspaceFolders.map((folderPath) => ({
        uri: {
            fsPath: folderPath,
        },
    }));
}
//# sourceMappingURL=utils.test.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_languageclient_1 = require("vscode-languageclient");
function activate(context) {
    let serverModule = context.asAbsolutePath(path.join('out', 'server', 'init.js'));
    // Server debug options
    let debugOptions = { execArgv: ["--nolazy", "--inspect"] };
    // Server options
    let serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc, options: debugOptions }
    };
    // Client options
    let clientOptions = {
        documentSelector: ['php'],
        synchronize: {
            configurationSection: 'phpmd'
        }
    };
    // Client launched in debug mode?
    let forceDebug = process.execArgv.some(value => value.indexOf("--inspect") >= 0);
    // Create and start the client
    let client = new vscode_languageclient_1.LanguageClient('vscode-phpmd', 'PHP Mess Detector', serverOptions, clientOptions, forceDebug);
    let disposable = client.start();
    console.log("PHP Mess Detector server started");
    // Push the disposable to the context's subscriptions so that the 
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=client.js.map
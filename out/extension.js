"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    // The server is implemented in node
    const serverModule = require.resolve('@blackbyte/sugarcss-lsp-server/out/server.js');
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: { execArgv: ['--nolazy', '--inspect=6009'] },
        },
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for CSS documents
        documentSelector: [{ scheme: 'file', language: 'css' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc'),
        },
        // Pass the extension context to the server
        initializationOptions: {
            extensionPath: context.extensionPath,
        },
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient('sugarcssLspServer', 'SugarCSS LSP Server', serverOptions, clientOptions);
    // Register commands
    context.subscriptions.push(
    // Restart server command
    vscode_1.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('sugarcssLspServer')) {
            vscode_1.window.showInformationMessage('SugarCSS LSP Server configuration changed. Restart may be required.');
        }
    }));
    // Start the client. This will also launch the server
    client
        .start()
        .then(() => {
        console.log('SugarCSS LSP Server started successfully');
    })
        .catch((error) => {
        console.error('Failed to start SugarCSS LSP Server:', error);
        vscode_1.window.showErrorMessage(`Failed to start SugarCSS LSP Server: ${error.message}`);
    });
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
//# sourceMappingURL=extension.js.map
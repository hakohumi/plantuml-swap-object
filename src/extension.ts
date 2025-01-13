import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "plantuml-swap-object" is now active!');

	const disposable = vscode.commands.registerCommand('plantuml-swap-object.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from plantuml-swap-object!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import WordCounter from './util/WordCount';
import WordCounterController from './util/WordCountController';
import ReplaceSemiColon from './util/ReplaceSemiColon';
import ReplaceSemiColonController from './util/ReplaceSemiColonController';
import {
    window, commands, Disposable,
    ExtensionContext, StatusBarAlignment,
    StatusBarItem, TextDocument
} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const replaceSemiColon = new ReplaceSemiColon()
    const replaceSemiColonController = new ReplaceSemiColonController(replaceSemiColon)
    // let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        
    // }); 
    context.subscriptions.push(replaceSemiColonController);
    context.subscriptions.push(replaceSemiColon);
    // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

import { Disposable, window } from 'vscode';
import ReplaceSemiColon from './ReplaceSemiColon';
export default class ReplaceSemiColonController {
    private _replaceSemiColon: ReplaceSemiColon
    private _disposable: Disposable

    constructor(replaceSemiColon: ReplaceSemiColon) {
        this._replaceSemiColon = replaceSemiColon
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        this._replaceSemiColon.replace();
        this._disposable = Disposable.from(...subscriptions);

    }

    private _onEvent() {
        this._replaceSemiColon.replace();
    }

    public dispose() {
        this._disposable.dispose();
    }
}
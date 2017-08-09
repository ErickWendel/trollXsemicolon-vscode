import { window, StatusBarAlignment, StatusBarItem, Selection } from 'vscode';
import * as vscode from 'vscode';
export default class ReplaceSemiColon { 
    private SEMICOLON_OF_DEATH = ';';
    private FIND_STR = ';'

    public replace() {
        const editor = window.activeTextEditor;
        this._alterText(editor)
    }
    private _allIndexes(text, textToSearch): number[] {
        if (text.length === 0) return []

        let indexes = []
        for (let index = 0; index < text.length; index++) {
            const exists = text[index] === textToSearch
            if (!exists) continue
            indexes.push(index)
        }
        return indexes
    }

    private _mapOcorrences(document: string): object[] {
        const recorrences = document.split('\n')
            .map((text, index) => {
                const indexes = this._allIndexes(text, this.FIND_STR)
                return indexes.map(position => Object.assign({ position, index }))
            })
            .reduce((prev, next) => prev.concat(next), [])
            .filter(item => item.position !== this.SEMICOLON_OF_DEATH)

        return recorrences
    }

    private _replaceText(recorrences, builder) {
        return recorrences
            .map(item =>
                new vscode.Range(
                    new vscode.Position(item.index, item.position),
                    new vscode.Position(item.index, item.position + 1))
            )
            .map(i => builder.replace(i, this.SEMICOLON_OF_DEATH))
    }

    public _alterText(editor: vscode.TextEditor) {
        // vscode.commands.executeCommand("cursorMove", { "to": "viewPortTop" });

        editor.edit(builder => {
            const document = editor.document.getText()
            const recorrences = this._mapOcorrences(document)
            if (!recorrences) return;

            this._replaceText(recorrences, builder);
        });
    }

    public dispose() {
        
    }
}
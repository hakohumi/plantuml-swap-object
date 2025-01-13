import * as vscode from 'vscode'
import {
  ObjectRelationSentence_to_string,
  parse_object_relation,
  swap_arrow,
  swap_object,
} from './ObjectRelationSentence'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "plantuml-swap-object" is now active!'
  )

  const swap_object_disposable = vscode.commands.registerCommand(
    'plantuml-swap-object.swapObject',
    () => {
      console.log('swap object')

      const editor = vscode.window.activeTextEditor
      if (!editor) {
        vscode.window.showInformationMessage('No editor is active')
        return
      }

      // カーソルがある行
      const current_pos = editor.selection.active
      // 行のすべてを取得
      const line = editor.document.lineAt(current_pos.line).text

      const object_relation = parse_object_relation(line)

      if (object_relation == null) {
        vscode.window.showInformationMessage("can't parse object")
        return
      }

      // オブジェクトを入れ替える
      const swapped_object = swap_object(object_relation)

      const new_line = ObjectRelationSentence_to_string(swapped_object)

      // 行を置き換える
      editor
        .edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(
              new vscode.Position(current_pos.line, 0),
              new vscode.Position(current_pos.line, line.length)
            ),
            new_line
          )
        })
        .then((success) => {
          if (!success) {
            vscode.window.showInformationMessage('failed to replace line')
          }
        })
    }
  )

  const swap_arrow_disposable = vscode.commands.registerCommand(
    'plantuml-swap-object.swapArrow',
    () => {
      console.log('swap arrow')

      const editor = vscode.window.activeTextEditor
      if (!editor) {
        vscode.window.showInformationMessage('No editor is active')
        return
      }

      // カーソルがある行
      const current_pos = editor.selection.active
      // 行のすべてを取得
      const line = editor.document.lineAt(current_pos.line).text

      const object_relation = parse_object_relation(line)

      if (object_relation == null) {
        vscode.window.showInformationMessage("can't parse object")
        return
      }

      // オブジェクトを入れ替える
      const swapped_arrow = swap_arrow(object_relation)

      const new_line = ObjectRelationSentence_to_string(swapped_arrow)

      // 行を置き換える
      editor
        .edit((editBuilder) => {
          editBuilder.replace(
            new vscode.Range(
              new vscode.Position(current_pos.line, 0),
              new vscode.Position(current_pos.line, line.length)
            ),
            new_line
          )
        })
        .then((success) => {
          if (!success) {
            vscode.window.showInformationMessage('failed to replace line')
          }
        })
    }
  )

  const swap_object_and_arrow_disposable = vscode.commands.registerCommand(
    'plantuml-swap-object.swapObjectAndArrow',
    () => {
      console.log('swap object and arrow')
    }
  )

  context.subscriptions.push(swap_object_disposable)
  context.subscriptions.push(swap_arrow_disposable)
  context.subscriptions.push(swap_object_and_arrow_disposable)
}

export function deactivate() {}

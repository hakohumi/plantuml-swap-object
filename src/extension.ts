import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "plantuml-swap-object" is now active!'
  )

  const swap_object_disposable = vscode.commands.registerCommand(
    'plantuml-swap-object.swapObject',
    () => {
      console.log('swap object')
    }
  )
  const swap_arrow_disposable = vscode.commands.registerCommand(
    'plantuml-swap-object.swapArrow',
    () => {
      console.log('swap arrow')
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

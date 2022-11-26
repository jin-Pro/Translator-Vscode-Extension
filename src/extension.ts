import * as vscode from "vscode";
import WebviewLoader from "./WebviewLoader";
import * as path from "path";
/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
  const { subscriptions, extensionPath } = context;

  const disposable = vscode.commands.registerCommand("translator", () => {
    subscriptions.push(new WebviewLoader(extensionPath));
    vscode.window.showInformationMessage("Hello Translator");
  });
  subscriptions.push(disposable);

  const myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -10
  );

  myStatusBarItem.text = "translator";
  myStatusBarItem.command = "translator";
  subscriptions.push(myStatusBarItem);

  // update status bar item once at start
  myStatusBarItem.show();
}

import * as vscode from "vscode";
import * as path from "path";

const getFileUrl =
  (base: string, panel: vscode.WebviewPanel) => (url: string) => {
    const file = vscode.Uri.file(path.join(base, "src", url));
    const fileUrl = panel.webview.asWebviewUri(file);
    return fileUrl;
  };

export default class WebviewLoader implements vscode.Disposable {
  private readonly _panel: vscode.WebviewPanel | undefined;

  constructor(private readonly extensionPath: string) {
    const viewColumn = vscode.ViewColumn.One;
    this._panel = vscode.window.createWebviewPanel(
      "WebviewLoader",
      "Translator",
      viewColumn,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath))],
      }
    );
    this._panel.webview.html = this.getWebviewContent();
  }

  dispose() {
    this._panel?.dispose();
  }

  getWebviewContent() {
    const getPathOnExtensionPath = getFileUrl(
      this.extensionPath,
      this._panel as vscode.WebviewPanel
    );

    const jsAppUri = getPathOnExtensionPath("index.js");
    const fetchAppUri = getPathOnExtensionPath("fetch.js");
    const debounceAppUri = getPathOnExtensionPath("debounce.js");
    const cssAppUri = getPathOnExtensionPath("index.css");

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0"><title>Translate</title>
        <link rel="stylesheet" href="${cssAppUri}" />
      </head>
      <body>
        <h1>번역기</h1>
        <div>
          <div class="Trans__Container">
            <select id="to">
              <option value="ko">한국어</option>
              <option value="en">영어</option>
              <option value="ja">일본어</option>
              <option value="zh-CN">중국어 간체</option>
              <option value="zh-TW">중국어 번체</option>
              <option value="vi">베트남어</option>
              <option value="id">인도네시아어</option>
              <option value="th">태국어</option>
              <option value="de">독일어</option>
              <option value="ru">러시아어</option>
              <option value="es">스페인어</option>
              <option value="it">이탈리아어</option>
              <option value="fr">프랑스어</option>
            </select>
            <div class="Trans__Input">
              <span id="delete">X</span>
              <textarea class="textArea"></textarea>
              <div class="Pronunciation"></div>
            </div>
          </div>
          <span id="change">⇌</span>
          <div class="Trans__Container">
            <select id="from">
              <option value="en">영어</option>
              <option value="ko">한국어</option>
              <option value="ja">일본어</option>
              <option value="zh-CN">중국어 간체</option>
              <option value="zh-TW">중국어 번체</option>
              <option value="vi">베트남어</option>
              <option value="id">인도네시아어</option>
              <option value="th">태국어</option>
              <option value="de">독일어</option>
              <option value="ru">러시아어</option>
              <option value="es">스페인어</option>
              <option value="it">이탈리아어</option>
              <option value="fr">프랑스어</option>
            </select>
            <div class="Trans__Input trans">
              <div class="textArea" id="transArea"></div>
            </div>
          </div>
        </div>
        <script src="${jsAppUri}" type="module"></script>
        <script src="${debounceAppUri}" type="module"></script>
        <script src="${fetchAppUri}" type="module"></script>
      </body>
    </html>
    `;
  }
}

exports.WebviewLoader = WebviewLoader;

const vscode = require("vscode");

function activate(context) {
  console.log(
    'Congratulations, your extension "JSX-Attribute-Ninja" is now active!'
  );

  vscode.languages.registerDocumentFormattingEditProvider(
    ["javascriptreact", "jsx", "typescriptreact", "javascript"],
    {
      provideDocumentFormattingEdits(document) {
        const edits = [];

        const classRegex = /class=/g;
        let classMatch;
        while ((classMatch = classRegex.exec(document.getText()))) {
          const startPos = document.positionAt(classMatch.index);
          const endPos = document.positionAt(
            classMatch.index + classMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const newText = "className=";
          edits.push(new vscode.TextEdit(range, newText));
        }

        const hrefRegex = /href="#"/g;
        let hrefMatch;
        while ((hrefMatch = hrefRegex.exec(document.getText()))) {
          const startPos = document.positionAt(hrefMatch.index);
          const endPos = document.positionAt(
            hrefMatch.index + hrefMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const newText = 'href="/"';
          edits.push(new vscode.TextEdit(range, newText));
        }

        const inputRegex = /<input(\s+[^>]+)?(?<!\/)>\s*(?!\/)/g;
        let inputMatch;
        while ((inputMatch = inputRegex.exec(document.getText()))) {
          const startPos = document.positionAt(inputMatch.index);
          const endPos = document.positionAt(
            inputMatch.index + inputMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const newText = `<input${inputMatch[1] || ""} />`;
          edits.push(new vscode.TextEdit(range, newText));
        }

        const hrRegex = /<hr\s*(?<!\/)>\s*(?!\/)/g;
        let hrMatch;
        while ((hrMatch = hrRegex.exec(document.getText()))) {
          const startPos = document.positionAt(hrMatch.index);
          const endPos = document.positionAt(hrMatch.index + hrMatch[0].length);
          const range = new vscode.Range(startPos, endPos);
          const newText = "<hr />";
          edits.push(new vscode.TextEdit(range, newText));
        }

        const brRegex = /<br\s*(?<!\/)>\s*(?!\/)/g;
        let brMatch;
        while ((brMatch = brRegex.exec(document.getText()))) {
          const startPos = document.positionAt(brMatch.index);
          const endPos = document.positionAt(brMatch.index + brMatch[0].length);
          const range = new vscode.Range(startPos, endPos);
          const newText = "<br />";
          edits.push(new vscode.TextEdit(range, newText));
        }

        const forRegex = /for=/g;
        let forMatch;
        while ((forMatch = forRegex.exec(document.getText()))) {
          const startPos = document.positionAt(forMatch.index);
          const endPos = document.positionAt(
            forMatch.index + forMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const newText = "htmlFor=";
          edits.push(new vscode.TextEdit(range, newText));
        }

        return edits;
      },
    }
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

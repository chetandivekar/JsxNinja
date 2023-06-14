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

        // replacing class= to className=
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

        //replacig href="#" to href="/"
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

        // self closing the input tag
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

        // self closing the img tag
        const imgRegex = /<img(\s+[^>]+)?(?<!\/)>\s*(?!\/)/g;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(document.getText()))) {
          const startPos = document.positionAt(imgMatch.index);
          const endPos = document.positionAt(
            imgMatch.index + imgMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const newText = `<img${imgMatch[1] || ""} />`;
          edits.push(new vscode.TextEdit(range, newText));
        }

        // changing inline styling to compaitable with react
        const styleRegex = /style="([^"]+)"/g;
        let styleMatch;
        while ((styleMatch = styleRegex.exec(document.getText()))) {
          const startPos = document.positionAt(styleMatch.index);
          const endPos = document.positionAt(
            styleMatch.index + styleMatch[0].length
          );
          const range = new vscode.Range(startPos, endPos);
          const oldStyle = styleMatch[1];
          const newStyle = oldStyle
            .split(";")
            .filter(Boolean)
            .map((style) => {
              const [property, value] = style.trim().split(":");
              const formattedProperty = property
                .trim()
                .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
              return `${formattedProperty}: "${value.trim()}"`;
            })
            .join(", ");
          const newText = `style={{${newStyle}}}`;
          edits.push(new vscode.TextEdit(range, newText));
        }

        // self closing the <hr/> tag
        const hrRegex = /<hr\s*(?<!\/)>\s*(?!\/)/g;
        let hrMatch;
        while ((hrMatch = hrRegex.exec(document.getText()))) {
          const startPos = document.positionAt(hrMatch.index);
          const endPos = document.positionAt(hrMatch.index + hrMatch[0].length);
          const range = new vscode.Range(startPos, endPos);
          const newText = "<hr />";
          edits.push(new vscode.TextEdit(range, newText));
        }

        //Replacing <hr> whith the attritubes to <hr/>
        const hrRegex1 = /<hr\s+class(\s*=\s*("|')([^"']*?)("|'))?\s*>/g;
        let hrMatch1;
        while ((hrMatch1 = hrRegex1.exec(document.getText()))) {
          const startPos1 = document.positionAt(hrMatch1.index);
          const endPos1 = document.positionAt(
            hrMatch1.index + hrMatch1[0].length
          );
          const range1 = new vscode.Range(startPos1, endPos1);
          const newText1 = `<hr class=${
            hrMatch1[3] ? `"${hrMatch1[3]}"` : ""
          } />`;
          edits.push(new vscode.TextEdit(range1, newText1));
        }

        // self closing the <br/> tag
        const brRegex = /<br\s*(?<!\/)>\s*(?!\/)/g;
        let brMatch;
        while ((brMatch = brRegex.exec(document.getText()))) {
          const startPos = document.positionAt(brMatch.index);
          const endPos = document.positionAt(brMatch.index + brMatch[0].length);
          const range = new vscode.Range(startPos, endPos);
          const newText = "<br />";
          edits.push(new vscode.TextEdit(range, newText));
        }

        //Replacing <br> whith the attritubes to <br/>
        const brRegex1 = /<br(\s+[^>]+)?(?<!\/)>\s*(?!\/)/g;
        let brMatch1;
        while ((brMatch1 = brRegex1.exec(document.getText()))) {
          const startPos1 = document.positionAt(brMatch1.index);
          const endPos1 = document.positionAt(
            brMatch1.index + brMatch1[0].length
          );
          const range1 = new vscode.Range(startPos1, endPos1);
          const newText1 = `<br${brMatch1[1] || ""} />`;
          edits.push(new vscode.TextEdit(range1, newText1));
        }

        // replacing for with htmlFor
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

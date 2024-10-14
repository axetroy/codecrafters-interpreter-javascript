import fs from "fs";

const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)

if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}

const command = args[0];

if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}

const filename = args[1];

const fileContent = fs.readFileSync(filename, "utf8");

if (fileContent.length !== 0) {
  const lines = fileContent.split(/\n/);

  let gotError = false;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const lineNumber = lineIndex + 1;
    const line = lines[lineIndex];
    lineLoop: for (
      let columnIndex = 0;
      columnIndex < line.length;
      columnIndex++
    ) {
      const char = line[columnIndex];
      const nextChar = line[columnIndex + 1];

      switch (char) {
        case "(":
          console.log("LEFT_PAREN ( null");
          break;
        case ")":
          console.log("RIGHT_PAREN ) null");
          break;
        case "{":
          console.log("LEFT_BRACE { null");
          break;
        case "}":
          console.log("RIGHT_BRACE } null");
          break;
        case ",":
          console.log("COMMA , null");
          break;
        case ".":
          console.log("DOT . null");
          break;
        case "-":
          console.log("MINUS - null");
          break;
        case "+":
          console.log("PLUS + null");
          break;
        case ";":
          console.log("SEMICOLON ; null");
          break;
        case "*":
          console.log("STAR * null");
          break;
        case "=":
          if (nextChar === "=") {
            console.log("EQUAL_EQUAL == null");
            columnIndex++;
          } else {
            console.log("EQUAL = null");
          }
          break;
        case "!":
          if (nextChar === "=") {
            console.log("BANG_EQUAL != null");
            columnIndex++;
          } else {
            console.log("BANG ! null");
          }
          break;
        case "<":
          if (nextChar === "=") {
            console.log("LESS_EQUAL <= null");
            columnIndex++;
          } else {
            console.log("LESS < null");
          }
          break;
        case ">":
          if (nextChar === "=") {
            console.log("GREATER_EQUAL >= null");
            columnIndex++;
          } else {
            console.log("GREATER > null");
          }
          break;
        case "/":
          if (nextChar === "/") {
            // Go to the next line
            break lineLoop;
          } else {
            console.log("SLASH / null");
          }
          break;
        case '"': {
          let str = undefined;
          for (let i = columnIndex + 1; i < line.length; i++) {
            if (line[i] === '"') {
              str = line.substring(columnIndex + 1, i);
              columnIndex = i;
              break;
            }
          }

          if (typeof str === "string") {
            console.log(`STRING "${str}" ${str}`);
          } else {
            console.error(`[line ${lineNumber}] Error: Unterminated string.`);
            gotError = true;
            break lineLoop;
          }

          break;
        }
        default:
          // SKip whitespaces
          if (/\s/.test(char)) {
            break;
          }

          // Handle Number
          if (/[0-9]/.test(char)) {
            let numberStr = char;
            for (let i = columnIndex + 1; i < line.length; i++) {
              if (/[0-9]/.test(line[i])) {
                numberStr += line[i];
                columnIndex = i;
              } else if (line[i] === ".") {
                if (numberStr.includes(".")) {
                  console.error(
                    `[line ${lineNumber}] Error: Unexpected character: ${line[i]}`
                  );
                  gotError = true;
                  break lineLoop;
                } else {
                  numberStr += line[i];
                  columnIndex = i;
                }
              } else {
                break;
              }
            }

            const number = Number(numberStr);

            console.log(
              `NUMBER ${numberStr} ${
                Number.isInteger(number) ? number + ".0" : number
              }`
            );
            break;
          }

          // Handle Identifier
          if (/[a-zA-Z_]/.test(char)) {
            let identifier = char;
            for (let i = columnIndex + 1; i < line.length; i++) {
              if (/[a-zA-Z0-9_]/.test(line[i])) {
                identifier += line[i];
                columnIndex = i;
              } else {
                break;
              }
            }

            console.log(`IDENTIFIER ${identifier} null`);
            break;
          }

          console.error(
            `[line ${lineNumber}] Error: Unexpected character: ${char}`
          );

          gotError = true;
      }
    }
  }

  console.log("EOF  null");

  if (gotError) {
    process.exit(65);
  }
} else {
  console.log("EOF  null");
}

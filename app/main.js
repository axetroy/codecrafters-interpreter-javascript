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

  let gotError = false

  for (let lineIndex in lines) {
    const line = lines[lineIndex];
    const lineNumber = parseInt(lineIndex) + 1;

    for (let columnIndex in line) {
      const columnNumber = parseInt(columnIndex) + 1;

      const char = line[columnIndex];

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
        case "/":
          console.log("SLASH / null");
          break;
        default:
          console.error(`[line ${lineNumber}] Error: Unexpected character: ${char}`)

          gotError = true
      }
    }
  }
  console.log("EOF  null");

  if (gotError) {
    process.exit(65)
  }
} else {
  console.log("EOF  null");
}

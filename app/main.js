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
    for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
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
        case "/":
          console.log("SLASH / null");
          break;
        case "=":
          if (nextChar === "=") {
            console.log("EQUAL_EQUAL == null");
            columnIndex++;
          } else {
            console.log("EQUAL = null");
          }
          break;
        default:
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

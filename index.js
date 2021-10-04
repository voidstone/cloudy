const { readFileSync, writeFileSync } = require('fs')

const [INPUT_FILE, OUTPUT_FILE] = process.argv.slice(2);

try {
    const file = readFileSync(INPUT_FILE, 'utf8')

    writeFileSync(OUTPUT_FILE, file);

} catch (e) {
    console.error(e.message);

    process.exit(1);
}


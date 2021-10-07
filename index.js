const { copyFileSync, statSync } = require('fs')

const [INPUT_FILE, OUTPUT_FILE] = process.argv.slice(2);


try {
    copyFileSync(INPUT_FILE, OUTPUT_FILE);

    if (process.argv.includes('-v')) {
        console.log(` ${INPUT_FILE} -> ${OUTPUT_FILE}`);
    }

} catch (e) {
    console.error(e.message);

    process.exit(1);
}


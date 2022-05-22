const fs = require('fs');
const path = require('path');
const {stdin} = process;

const text = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log("Пожалуйста, введите текст." + "\n Для выхода напишите 'exit' или нажмите Ctrl+C");

stdin.on('data', chunk => {
    if (chunk.toString().trim() === 'exit') {
        process.exit();
    }
    else {
        text.write(chunk);
    }
})

process.on('exit', () => console.log("Готово."));
process.on('SIGINT', process.exit);
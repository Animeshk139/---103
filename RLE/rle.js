let arg = process.argv;  // аргументы
let operationType = arg[2];
let input = arg[3];
let output = arg[4];

let txtFile = (input.slice(-4) == '.txt' && output.slice(-4) == '.txt');
let operation = (operationType == 'code' || operationType == 'decode');

if (txtFile && operation) {
    const fs = require('fs');
    let inputData = fs.readFileSync(input, 'utf8'); // читаем файл

    let code = '';

    if (operationType === 'code') { // кодирование
        let count = 1;

        for (let i = 0; i < inputData.length; i++) {
            if (inputData[i] == inputData[i + 1]) {
                count++;
            } else {
                while (count > 255) {
                    code += '#' + String.fromCharCode(255) + inputData[i];
                    count -= 255; 
                }
                if (count > 3 || inputData[i] == '#') {
                    code += '#' + String.fromCharCode(count) + inputData[i];
                } else {
                    code += inputData[i].repeat(count);
                }
                count = 1; // сбрасываем счетчик
            }
        }

        fs.writeFileSync(output, code, 'utf8');
        let compression = (inputData.length) / code.length;
        console.log(compression);
    } else { // декодирование
        let i = 0;

        while (i < inputData.length) {
            if (inputData[i] == '#') {
                let charCount = inputData.charCodeAt(i + 1);
                if (charCount > 0) {
                    code += inputData[i + 2].repeat(charCount);
                }
                i += 3; 
            } else {
                code += inputData[i];
                i++;
            }
        }

        fs.writeFileSync(output, code, 'utf8');
    }
}

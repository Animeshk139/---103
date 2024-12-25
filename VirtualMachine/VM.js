let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];



let mem = new Array();
let ip = 0;
const fs = require('fs');
const readlineSync = require('readline-sync');
const prog = fs.readFileSync(inputFile, {encoding: 'utf8', flag: 'r'});
mem = prog.split(/\s+/);

while (mem[ip] != 'exit')
{
    switch (mem[ip])
    {
        case 'jin':
            input_number = readlineSync.question('input a number: ')
            mem[parseInt(mem[ip + 1])] = parseInt(input_number);
            ip += 2;
            break


        case 'set':
            mem[parseInt(mem[ip+1])] = parseInt(mem[ip+2])
            ip += 3; 
            break; 
    
        case 'add':
            mem[parseInt(mem[ip+1])] = parseInt(mem[mem[ip+2]]) + parseInt(mem[mem[ip+3]]);
            ip += 4;
            break;
        
        case 'mul':
            mem[parseInt(mem[ip+1])] = parseInt(mem[mem[ip+2]]) * parseInt(mem[mem[ip+3]]);
            ip += 4;
            break;
        
        case 'mov':     //mov arg1 arg2 значение по адресу arg1 скопировать в ячейку с адресом arg2
            mem[parseInt(mem[ip+1])] = mem[parseInt(mem[ip + 2])];
            ip += 3;
            break;

        case 'cmpj':     //cmpj arg1 arg2 arg3 arg4
            if (mem[parseInt(mem[ip + 1])] < mem[parseInt(mem[ip + 2])])
            {
                ip = parseInt(mem[ip + 3]);
            }
            else
            {
                ip = parseInt(mem[ip + 4]);
            }
            break;
        
        case 'mod': //mod arg1 - куда писать, arg2 - первое число, arg3 - по какому модулю
            mem[parseInt(mem[ip + 1])] = mem[parseInt(mem[ip + 2])] % mem[parseInt(mem[ip + 3])];
            ip += 4;
            break;
        case 'jout':
            console.log(mem[mem[ip+1]]);
            ip += 2;
            break;

        
    }
    
}
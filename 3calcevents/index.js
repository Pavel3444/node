const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');
const exponentiation = require('./exponentiation');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();
function getArgs(){
    return{
        operator1: process.argv[2],
        operator2: process.argv[3],
        operationType: process.argv[4],
    }
}
const operations = ['add', 'subtract', 'multiply', 'divide', 'exponentiation'];
function validateParams(operator1, operator2, operationType){
    if (!operationType) {
        console.log('Не передан тип операции');
        return false;
    }
    if (!operations.includes(operationType)){
        console.log('Передан неверный тип операции');
        return false;
    }
    if (isNaN(operator1) || isNaN(operator2)) {
        console.log('Какой-то оператор не является числом');
        return false;
    }
    return true;
}
operations.forEach( (operationType)=>{
    myEmitter.on(operationType, (operator1,operator2)=>bindOperation(operator1,operator2,operationType));
})
function bindOperation(operator1,operator2,operationType){
    let res;
    switch (operationType){
        case 'subtract':
            res = subtract(operator1,operator2);
            break;
        case 'multiply':
            res = multiply(operator1,operator2);
            break;
        case 'divide':
            res = divide(operator1,operator2);
            break;
        case 'exponentiation':
            res = exponentiation(operator1,operator2);
            break;
        default:
            res = add(operator1,operator2);
    }
    console.log(`Результат операции ${operationType} с числами ${operator1} и ${operator2} равен: ${res}`)
}
function createOperation(){
    const {operator1, operator2, operationType} = getArgs();
    const operator1n = Number(operator1);
    const operator2n = Number(operator2);
    const isValid = validateParams(operator1n, operator2n, operationType);
    if (!isValid) return;
    myEmitter.emit(operationType, operator1n, operator2n);
}
function clearEmitter(){
    operations.forEach( (o)=>{
        myEmitter.removeAllListeners(o);
    })
}

createOperation();
clearEmitter();






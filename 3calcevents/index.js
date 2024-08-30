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
operations.forEach( (o)=>{
    myEmitter.addListener(o, (a,b)=>bindOperation(a,b,o));
})
function bindOperation(a,b,c){
    const i = require(`./${c}`);
    const res = i(a,b);
    console.log(`Результат операции ${c} с числами ${a} и ${b} равен: ${res}`)
}
function createOperation(){
    const {operator1, operator2, operationType} = getArgs();
    const operator1n = Number(operator1);
    const operator2n = Number(operator2);
    const isValid = validateParams(operator1n, operator2n, operationType);
    if (!isValid) return;
    myEmitter.emit(operationType, operator1n, operator2n);
}

createOperation();
operations.forEach( (o)=>{
    myEmitter.removeAllListeners(o);
})




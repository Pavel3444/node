function getArgs(){
    return{
        operator1: process.argv[2],
        operator2: process.argv[3],
        operationType: process.argv[4],
    }
}
const operations = {
    add: require("./add"),
    subtract: require("./subtract"),
    multiply: require("./multiply"),
    divide: require("./divide"),
    exponentiation: require("./exponentiation")
};
function validateParams(operator1, operator2, operationType){
    if (!operationType) {
        console.log('Не передан тип операции');
        return false;
    }
    if (!operations[operationType]){
        console.log('Передан неверный тип операции');
        return false;
    }
    if (isNaN(operator1) || isNaN(operator2)) {
        console.log('Какой-то оператор не является числом');
        return false;
    }
    return true;
}
function createOperation(){
    const {operator1, operator2, operationType} = getArgs();
    const operator1n = Number(operator1);
    const operator2n = Number(operator2);
    const isValid = validateParams(operator1n, operator2n, operationType);
    if (!isValid) return;

    try {
        const result = operations[operationType](operator1n, operator2n);
        console.log(`Результат операции ${operationType} с числами ${operator1n} и ${operator2n} равен: ${result}`);
    } catch (error) {
        console.log(`Произошла ошибка: ${error.message}`);
    }
}

createOperation();
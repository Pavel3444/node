const {arr} = require('./arrays');
const compute = (array)=>{
    performance.mark('start');
    let result = 0;
    array.forEach(e=>{
        if (e%3===0) result+=1;
    })
    console.log('Total numbers divisible by 3: ', result)
    performance.mark('end');
    performance.measure('compute', 'start', 'end');
    console.log(performance.getEntriesByName('compute').pop());
}


compute(arr);




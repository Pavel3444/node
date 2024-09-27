const {chunk4, chunk3,chunk2,chunk1} = require('./arrays');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function runWorker(array) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {workerData: array});
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
if (isMainThread) {
    performance.mark('start');
    Promise.all([
        runWorker(chunk1),
        runWorker(chunk2),
        runWorker(chunk3),
        runWorker(chunk4),
    ]).then((results) => {
        const totalDivisibleBy3 = results.reduce((sum, count) => sum + count, 0);
        console.log('Total numbers divisible by 3:', totalDivisibleBy3);
        performance.mark('end');
        performance.measure('compute', 'start', 'end');
        console.log(performance.getEntriesByName('compute').pop());
    }).catch((err) => {
        console.error('Error:', err);
    });
}else{
    const countDivisibleBy3 = workerData.filter(num => num % 3 === 0).length;
    parentPort.postMessage(countDivisibleBy3);

}
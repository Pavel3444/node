const arr = Array.from({ length: 300000 }, (_, i) => i + 1);
const chunkSize = Math.ceil(arr.length / 4);
const chunk1 = arr.slice(0, chunkSize);
const chunk2 = arr.slice(chunkSize, chunkSize * 2);
const chunk3 = arr.slice(chunkSize * 2, chunkSize * 3);
const chunk4 = arr.slice(chunkSize * 3);

module.exports = {
    arr,
    chunk1,
    chunk2,
    chunk3,
    chunk4
}
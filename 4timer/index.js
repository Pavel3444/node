function getArgs(){
    const args = process.argv.slice(2)
    const res = {h: 0, m: 0, s: 0};
    args.forEach(el=>{
       if (el.endsWith('h')) {
           const hours = Number(el.split('h')[0]);
           res.h = isNaN(hours) ? 0 : hours;
       }
       if (el.endsWith('m')) {
           const minutes = Number(el.split('m')[0]);
           res.m = isNaN(minutes) ? 0 : minutes;
       }
       if (el.endsWith('s')) {
           const seconds = Number(el.split('s')[0]);
           res.s = isNaN(seconds) ? 0 : seconds;
       }

    })
    return res;
}
function convertToMs(h = 0,m = 0,s = 0){
    let totalMS  = 0;
    totalMS += s*1000;
    totalMS += m*60*1000;
    totalMS += h*60*60*1000;
    return totalMS;
}


function startTimer(){
    const {h,m,s} = getArgs();
    const time = convertToMs(h,m,s);
    console.log(`Таймер установлен на ${h} ч, ${m} м, ${s} с`);
    setTimeout(()=>{
        console.log('Сообщение, говорящее пользователю что время таймера вышло');
    },time)
}

startTimer();
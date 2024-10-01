const notifier = require('node-notifier');
const  defaultMessage = 'Сообщение, говорящее пользователю что время таймера вышло';
const path = require('path');
const customIconPath = path.join(__dirname, 'assets', 'icon.png');
function getArgs(){
    const args = process.argv.slice(2)
    const res = {h: 0, m: 0, s: 0, message: ''};
    const messageIndex = args.indexOf('--message');
    const timeArgs = messageIndex !== -1 ? args.slice(0, messageIndex) : args;
    const messageArgs = messageIndex !== -1 ? args.slice(messageIndex + 1) : [];
    if (messageArgs.length > 0) {
        res.message = messageArgs.join(' ');
    }

    timeArgs.forEach((el,i)=>{
       if (el.endsWith('h')) {
           const hours = Number(el.split('h')[0]);
           res.h = isNaN(hours) ? 0 : hours;
       }
       else if (el.endsWith('m')) {
           const minutes = Number(el.split('m')[0]);
           res.m = isNaN(minutes) ? 0 : minutes;
       }
       else if (el.endsWith('s')) {
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
    const {h,m,s,message} = getArgs();
    if (h > 0 || m > 0 || s > 0){
        const time = convertToMs(h,m,s);
        const timerTitle = ["Таймер установлен на "]
        if (!!h && h > 0)timerTitle.push(`${h} ч `)
        if (!!m && m > 0)timerTitle.push(`${m} м `)
        if (!!s && s > 0)timerTitle.push(`${s} с `)

        notifier.notify(timerTitle.join(''));
        setTimeout(()=>{
            notifier.notify({
                title: 'Таймер:',
                message: message || defaultMessage,
                sound: 'Glass',
                contentImage: customIconPath
            });
        },time)
    }
    else {
        notifier.notify("Сударь, вы ввели редкостную херню или невалидные параметры. Настоятельно рекомендую обратиться к документации");
        console.error('not started');
    }

}

startTimer();
import chalk from 'chalk';
import dedent from "dedent-js";
import {getIcon} from "./api.service.js";
import {translate} from "../utils/langs.js";
export const printError = (error)=>{
    console.log(chalk.bgRed(' ERROR ') , error)
}
export const printSuccess = (message)=>{
    console.log(chalk.bgGreen(' SUCCESS ') , message)
}
export const printHelp = ()=>{
    console.log(dedent`
    ${chalk.bgCyan(' HELP ')}
    ${translate('h1')}
    ${translate('h2')}
    ${translate('h3')}
    ${translate('h4')}
    ${translate('h5')}
    ${translate('h6')}  
    `)
}

// export const printWeather = (data)=>{
//     const weatherArray = [];
//     if (data.name) weatherArray.push(`${translate('w2')} ${data.name}`)
//     if (data.weather && data.weather[0]) {
//         let desc = '';
//         if ( data.weather[0].icon ) desc = `${getIcon(data.weather[0].icon)}`;
//         if ( data.weather[0].description) desc = desc + " " + data.weather[0].description;
//         if (desc) weatherArray.push(desc);
//     }
//     if (data.main){
//         let temp = '';
//         if (data.main.temp) temp = `${translate('w3')} ${data.main.temp}`;
//         if (data.main.feels_like) temp = temp + `(${translate('w4')} ${data.main.feels_like})`;
//         if (temp) weatherArray.push(temp);
//
//         if (data.main.humidity) weatherArray.push(`${translate('w5')} ${data.main.humidity}%`);
//     }
//     if (data.wind && data.wind.speed) weatherArray.push(`${translate('w6')} ${data.wind.speed}`);
//
//     console.log(dedent`
//     ${chalk.bgBlue(translate('w1'))}
//     ${weatherArray.filter(Boolean).join('\n')}
//     `)
// }

export const printWeather = (data) => {
    const weatherArray = [];
    if (data.name) {
        weatherArray.push(`${translate('w2')} ${data.name}`);
    }
    if (data.weather?.[0]) {
        const icon = data.weather[0].icon ? getIcon(data.weather[0].icon) : '';
        const description = data.weather[0].description || '';
        const weatherDescription = `${icon} ${description}`.trim();
        if (weatherDescription) weatherArray.push(weatherDescription);

    }
    if (data.main) {
        const temperature = data.main.temp
            ? `${translate('w3')} ${data.main.temp} (${translate('w4')} ${data.main.feels_like || ''})`
            : '';
        if (temperature.trim()) weatherArray.push(temperature);

        if (data.main.humidity) {
            weatherArray.push(`${translate('w5')} ${data.main.humidity}%`);
        }
    }
    if (data.wind?.speed) {
        weatherArray.push(`${translate('w6')} ${data.wind.speed}`);
    }

    console.log(dedent`
    ${chalk.bgBlue(translate('w1'))}
    ${weatherArray.join('\n')}
    `);
}

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

export const printWeather = (data)=>{
    console.log(dedent`
    ${chalk.bgBlue(translate('w1'))}
        ${translate('w2')} ${data.name}
        ${getIcon(data.weather[0].icon)} ${data.weather[0].description}
        ${translate('w3')} ${data.main.temp} (${translate('w4')} ${data.main.feels_like} )
        ${translate('w5')} ${data.main.humidity}% 
        ${translate('w6')} ${data.wind.speed}
    `)
}
#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {printHelp, printError, printSuccess, printWeather} from "./services/log.service.js";
import {
    addCityValue,
    deleteCityValue, getKeyValue, saveLangValue,
    saveTokenValue,
    TOKEN_DICTIONARY
} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";
import {initLang, translate} from "./utils/langs.js";

const saveToken = async (token)=>{
    if (!token.length){
        printError('no token (');
        return;
    }
    try {
         await saveTokenValue(token);
         printSuccess('token has been saved')
    }catch (e){
        printError(e.message);
    }
}
const saveCity = async (city)=>{
    if (!city.length){
        printError(translate('noCity'));
        return;
    }
    try {
         await addCityValue(city);
    }catch (e){
        printError(e.message);
    }
}
const getForecast = async ()=>{
        try {
            const cities = await getKeyValue(TOKEN_DICTIONARY.city);
            for (const city of cities) {
                const weather =  await getWeather(city);
                printWeather(weather,'')
            }
        }catch (e){
            printError(translate('globalError'), e.message)
        }
}


async function initCli(){
     await initLang();
    const args = getArgs(process.argv);
    if (args.h){
      return printHelp();
    }
    if (args.s){
        return saveCity(args.s);
    }
    if (args.t){
      return  saveToken(args.t);
    }
    if (args.d){
        return deleteCityValue(args.d);
    }
    if (args.l){
        return saveLangValue(args.l)
    }
    return  getForecast();
}


initCli();
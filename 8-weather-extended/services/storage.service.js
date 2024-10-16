import {homedir} from 'os';
import {join} from 'path';
import { promises } from 'fs';
import {getCityCord} from "./api.service.js";
import {printError, printSuccess, printWeather} from "./log.service.js";
import {initLang, translate} from "../utils/langs.js";

const filePath = join(homedir(), 'weather-data.json');

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    lang: 'lang'
}
export const getData = async () =>{
    let data = {}
    if (await isExist(filePath)){
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    return data;
}
export const addCityValue = async (value)=>{
    const token =  await getKeyValue(TOKEN_DICTIONARY.token);
    const cord = await getCityCord(value, token);
    if (!cord || !cord.lat || !cord.lon) return;
    let data = await getData();
    if (!data.city) data.city = [];
    if(data.city.some(city=>city===value)) return;
    data.city.push(value);
    await promises.writeFile(filePath, JSON.stringify(data))
    printSuccess(translate("savedCity"))
}
export const deleteCityValue = async (value)=>{
    let data = await getData();
    data.city = data.city.filter(city => city !== value);
    await promises.writeFile(filePath, JSON.stringify(data)).then(()=>{
        printSuccess(translate('delCity'))
    });
}
export const saveTokenValue = async (value)=>{
    let data = await getData();
    data[TOKEN_DICTIONARY.token] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
}
export const saveLangValue = async (value)=>{
    if (value.toLowerCase() !== 'ru' && value.toLowerCase() !== 'en' ) {
        printError(translate('errLang'));
        return;
    }
    let data = await getData();
    data[TOKEN_DICTIONARY.lang] = value;
    await promises.writeFile(filePath, JSON.stringify(data)).then(()=>{
         initLang().then(()=>{
             printSuccess(translate('setLang'))
         });
    })
}
export const getKeyValue = async (key)=>{
    const data = await getData();
    return data[key] || false;

}
const isExist = async (path)=>{
   try{
       await promises.stat(path);
       return true
   }catch {
       return false;
   }
}
import * as https from "https";
import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";
import {printError} from "./log.service.js";
import {translate} from "../utils/langs.js";

export const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};
export const getCityCord = async (city, token) => {
    try {
        const {data} = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: city,
                appid: token
            }
        });
        if (data && data[0]) {
            const {lat, lon} = data[0];
            return {
                lat,
                lon
            }
        } else return null;
    } catch (e) {
        printError(translate('errTokenOrCity'));
    }
};
export const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const lang =  await getKeyValue(TOKEN_DICTIONARY.lang);
    if (!token) {
        printError(translate('noToken'));
        throw new Error(translate('noToken'))
    }
    if (!city) {
        printError(translate('noCity'));
        throw new Error(translate('noCity'))
    }
    const cord = await getCityCord(city, token);
    if (!cord) {
        printError(translate('errCords'));
        return;
    }
        const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather',
            {
                params:
                    {
                        lat: cord.lat,
                        lon: cord.lon,
                        appid: token,
                        lang: lang || 'ru'
                    }});
        return data;
}
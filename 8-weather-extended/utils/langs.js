import {getKeyValue, TOKEN_DICTIONARY} from "../services/storage.service.js";

const langs = {
    ru: {
        globalError: "что-то радикально пошло не так",
        noCity: "нет города :(",
        noToken: "нет токена :(",
        savedCity: "город сохранен",
        savedToken: "токен сохранен",
        errTokenOrCity: "неверный токен или название города",
        errCords: "ошибка получения координатов города",
        delCity: "этого города больше нет в списке городов, погода в которых нас интересует",
        setLang: "язык задан",
        errLang: "херня, задай англ или рус язык, написано-же",
        w1: "ПОГОДА",
        w2: "погода в городе",
        w3: "темпереатура (похоже что в кельвинах, судя по неадекватным цифрам)",
        w4: "ощущается как",
        w5: "влажность",
        w6: "скорость ветра",
        h1: "Без парметров - вывод погоды по заданным ранее параметрам;",
        h2: "-s [CITY] - добавление города",
        h3: "-d [CITY] - удаление города",
        h4: "-l [LANG] - выбор языка вывода погоды в alpha-2 code (т.к. разработчику никто не донатил, только RU и EN, остальным собалезную) ",
        h5: "-h - вывод этого сообщения",
        h6: "-t [APY_KEY] - для сохранения токена, без которого у тебя не будет ничего работать",
    },
    en: {
        globalError: "something went drastically wrong",
        noCity: "no city :(",
        noToken: "no token :(",
        savedCity: "city saved",
        savedToken: "token saved",
        errTokenOrCity: "invalid token or city name",
        errCords: "error getting city coordinates",
        delCity: "this city is no longer in the list of cities we are interested in weather in",
        setLang: "language set",
        errLang: "crap, set English or Russian language, it's already written",
        w1: "WEATHER",
        w2: "weather in the city",
        w3: "temperature (apparently in kelvins, judging by the inadequate numbers)",
        w4: "feels like",
        w5: "humidity",
        w6: "wind speed",
        h1: "No parameters - output weather according to previously set parameters;",
        h2: "-s [CITY] - adding a city",
        h3: "-d [CITY] - deleting a city",
        h4: "-l [LANG] - selecting the language for outputting weather in alpha-2 code (since no one donated to the developer, only RU and EN, my condolences to the rest)",
        h5: "-h - output this message",
        h6: "-t [APY_KEY] - to save the token, without which nothing will work for you",
    },
}

export let currentLang = {};
export const initLang = async () => {
    const lang = await getKeyValue(TOKEN_DICTIONARY.lang) || 'ru';
    currentLang = langs[lang];
}

export const translate = (key) =>{
    return currentLang[key] || key;
}
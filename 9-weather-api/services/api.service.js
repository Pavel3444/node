import axios from "axios";


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
        })
        if (data && data[0]){
            const {lat, lon} = data[0];
            return { lat, lon}
        }
        else return {error: "invalid city or network error"};
    }catch (e){
        return { error: "Invalid token or network error" }
    }
};
export const getWeather = async (city, token) => {
    if (!token) return {error: 'no token in request'};
    if (!city) return {error: 'no city in request'};

    const cord = await getCityCord(city, token);
    if (!cord.lon || !cord.lat) return cord;
        const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather',
            {
                params:
                    {
                        lat: cord.lat,
                        lon: cord.lon,
                        appid: token,
                        lang:  'ru'
                    }});
        return data;
}
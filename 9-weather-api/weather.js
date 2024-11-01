#!/usr/bin/env node
import {getIcon, getWeather} from "./services/api.service.js";
import express from 'express';

const port = 8000;
const app = express();
app.use(express.json());

app.route('/weather').get(async (req,res)=>{
    const {token,city} = req.query;
    if (!token && !city) res.status(400).send({ error: "Token и город обязательны." })
    try{
    res.setHeader('Content-Type', 'application/json');
    const r = await getWeather(city, token);
    if (r.error){
        res.status(400).send(r);
    }else{
        const weather = {
            title: "ПОГОДА",
            name: {
                label: "погода в городе",
                value: r.name ?? undefined,
            },
            description: {
                icon: r.weather[0].icon ?? undefined,
                value: r.weather[0].description
            },
            temp: {
                label: "темпереатура",
                value: r.main.temp ?? undefined,
            },
            feelsLike: {
                label: "ощущается как",
                value: r.main.feels_like ?? undefined
            },
            humidity: {
                label: "влажность",
                value: r.main.humidity ?? undefined
            },
            wingSpeed: {
                label: "скорость ветра",
                value: r.wind.speed ?? undefined
            }
        };



        res.status(200).send(weather);
    }
        }catch (e){
        console.error("Ошибка при получении данных о погоде:", error);
        res.status(500).send({ error: 'Ошибка сервера при получении данных о погоде' });

    }
})


app.listen(port, async ()=>{
       console.log(`server started http://localhost:${port}`);
})

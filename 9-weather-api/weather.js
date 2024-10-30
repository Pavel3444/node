#!/usr/bin/env node
import {getIcon, getWeather} from "./services/api.service.js";
import express from 'express';

const port = 8000;
const app = express();
app.use(express.json());

app.route('/weather').get(async (req,res)=>{
    const {token,city} = req.body;
    const r = await getWeather(city, token);
    if (r.error){
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(r);
    }else{
        const weather = `
          ПОГОДА <br/>
          погода в городе ${r.name}<br/>
          ${getIcon(r.weather[0].icon)} ${r.weather[0].description}<br/>
          темпереатура ${r.main.temp} (ощущается как ${r.main.feels_like} )<br/>
          влажность ${r.main.humidity}%<br/>
          скорость ветра ${r.wind.speed} (вероятно м/с)
        `
        res.status(200).send(weather);
    }

})


app.listen(port, async ()=>{
       console.log(`server started http://localhost:${port}`);
})

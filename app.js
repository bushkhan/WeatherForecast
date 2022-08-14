const { json } = require("body-parser");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/',(req,res)=>{
    const query =req.body.cityName;
    const apiKey = "";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"";

    https.get(url,(response)=>{
        response.on("data",(data)=>{
        const weatherData = JSON.parse(data);
        console.log(weatherData);

        const desc = weatherData.weather[0].description;
        const temp = weatherData.main.temp;

        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

        res.write("<p>The current weater is: " + desc + "</p>");
        res.write("<h2>Temperature is " + temp +" degree calcius in "+ query +" .</h2>");

        res.write("<img src="+imgURL+">");

        res.send();
    });
});

});

app.listen(2500,(req,res)=>{
    console.log("Server running on port 2500...");
});

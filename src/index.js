import initModel from './Model';
import update from './Update';
import view from './View';
import app from './App';

/*
const makeAPICall = async () => {
    const URL = '';
    const response = fetch(await URL); // await
    const data = await response.json();
};
*/
const APIKEY = '70f10f710b0a578ecf5e21df0692f275';
const makeOpenWeatherAPICall = async (location) => {
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric'; // String inteputation ${APIKEY}´ parameter &units
    const response = await fetch(URL);
    const data = await response.json();
    const { temp, temp_min, temp_max } = data.main;
}

makeOpenWeatherAPICall();


const node = document.getElementById('app');

app(initModel, update, view, node);
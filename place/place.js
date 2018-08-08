const c = console.log;
const axios = require('axios');

async function getClima(lat,lng){

    let rs = await axios.get(`https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=842382e788af8e23b6f0094684470e9e`)

    if(lat == null || lat == "" && lng == null || lng == ""){

        // if(!Number(lat))
        throw new Error(`Faltan datos para realizar la consulta`);
    }
    
    let clima =  rs.data.weather[0].description;
    return  clima;
    // temperatura : rs.data.main.temp

}


async function getLatLng(place){
    
    let encoded = encodeURI(place)

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`)

    // https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=842382e788af8e23b6f0094684470e9e
    
    if(resp.data.status == "ZERO_RESULTS"){
        throw new Error(`there are no results for ${encoded}`)
    }
    let loc = resp.data.results[0];
    let coord = loc.geometry.location;

    return {
        direccion : loc.formatted_address,
        lat : coord.lat,
        lng : coord.lng
    }

    // .then( rs =>{
    //     // c(JSON.stringify(rs.data,undefined,2))
    //     let loc = rs.data.results[0];
    //     let coord = loc.geometry.location;

    //     c('Direccion :' , loc.formatted_address)
    //     c('lat :' , coord.lat)
    //     c('lng :' , coord.lng)

    // } )
    // .catch(e => c('Error'+e))

}
module.exports = {
    getLatLng,
    getClima
}


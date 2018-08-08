const c = console.log;

const {getLatLng,getClima} = require('./place/place');
const axios = require('axios');

const argv = require('yargs').option({
    direccion:{
        alias:'d',
        desc : 'Dirección de la cuidad',
        demand : true
    }
}).argv;

let getClimaXLatLng = async (direccion)=>{

    let rs = await getLatLng(direccion);
    let clima = await getClima(rs.lat,rs.lng);
    // c(rs)
    
    return `El clima en ${direccion} es ${clima}`;

}
getClimaXLatLng(argv.direccion)
    .then(res => c(res))
    .catch(e => c(e));

// getLatLng(argv.direccion)
//     .then(rs =>c(rs))
//     .catch(err => c(err));

// getClima(rs.lat,rs.lng)
//     .then(rs => c(rs))
//     .catch(err => c(err))

// place.getClima(35.6894875,139.6917064)
//     .then(rs => c(rs))
//     .catch(err => c(err))






const { parse }  = require('csv-parse');
const fs = require('fs')

const habitablePlanets = []

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36  //Stellar flux how much light
        && planet['koi_insol'] < 1.11  //Stellar flux how much light
        && planet['koi_prad'] < 1.6    //Planet radius comparable to earth
        

}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,

    }))
    .on('data',(data) => {
        if(isHabitablePlanet(data)){
            habitablePlanets.push(data)
        }
        
    })
    .on('error',(err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        console.log(habitablePlanets.map( (planet) => {
            return planet['kepler_name']
        } ));
        console.log('done');
    })

  

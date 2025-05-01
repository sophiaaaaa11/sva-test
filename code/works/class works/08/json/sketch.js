let data;

function preload(){
    data = loadJSON('./data.json');
}

function setup() {
    createCanvas(600, 600);
    textSize(20);
}

function draw() {
    background(190);
    let y = 100;
    //const brooklynStation = data.stations.filter((station) =>{
       //s.borough === "Brooklyn";
    //});
    let station = data.stations;
    stations = station.sort( (a,b) => a.rank - b.rank);
    stations. forEach((station, i) => {
        const name = station.name;
        text(name, 100, y+1*25);
    });
    }
  

/*for (let i = 0; i < data.stations.length; i++){
    const station = data.stations[i];
    const name = station.name;
    text(name, 100, y+i*25);*/


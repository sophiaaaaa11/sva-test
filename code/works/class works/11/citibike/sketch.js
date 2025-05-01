let data;
let maxLat = -10000;
let minLat = 10000;
let maxLng = -10000;
let minLng = 10000;
const stations = [];
const trips = [];

function preload() {
    data = loadJSON('data/2023-11-06.json');
}

function setup() {
    createCanvas(700, 700);
    data.stations.forEach(s => {
        if (maxLat < s.lat) {
            maxLat = s.lat;
        }
        if (maxLng < s.lng) {
            maxLng = s.lng;
        }
        if (minLat > s.lat) {
            minLat = s.lat;
        }
        if (minLng > s.lng) {
            minLng = s.lng;
        }
    });

    data.stations.forEach(s => {
        const station = new Station(s);
        stations.push(station);
    });

    data.trips.forEach( t => {
        const trip = new Trip(t);
        trips.push(trip);
    });

    currentTime = trips[0].startTime;
    maxTime = trips [trips.length - 1].endTime;
}

function draw() {
    if (currentTime < maxTime) {
        currentTime += 50000;
    }
    background(190);
    stations.forEach(s => s.display());
    trips.forEach(t => t.display(currentTime));

    fill(0);
    textSize(18);
    const time = new Data(currentTime);
    text(formatTime(data), 50, 50);
}

function formatTime(data) {
    let hours = data.getHours();
    let minutes = data.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}
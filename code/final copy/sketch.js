
// Data of raindays in nyc
const nycRainData = [
  { month: "Jan", rainfall: 92.7, days: 10.3 },
  { month: "Feb", rainfall: 78.5, days: 9.1 },
  { month: "Mar", rainfall: 110.5, days: 11.1 },
  { month: "Apr", rainfall: 114.3, days: 11.5 },
  { month: "May", rainfall: 106.4, days: 11.1 },
  { month: "Jun", rainfall: 112.0, days: 10.5 },
  { month: "Jul", rainfall: 116.8, days: 10.3 },
  { month: "Aug", rainfall: 112.8, days: 9.6 },
  { month: "Sep", rainfall: 109.2, days: 8.7 },
  { month: "Oct", rainfall: 111.8, days: 8.9 },
  { month: "Nov", rainfall: 102.1, days: 9.3 },
  { month: "Dec", rainfall: 101.6, days: 10.5 }
];

let currentMonth = new Date().getMonth();
let raindrops = [], ripples = [], flowers = [];
let groundLevel;

function setup() {
  createCanvas(1000, 1000);
  groundLevel = height - 100;
  colorMode(HSB, 360, 100, 100, 1);
  textFont('Arial');
  
  // BUTTONS OF MONTH
  createMonthButtons();
}

function draw() {
  background(210, 30, 15); 
  
  updateWeatherSystem();
  drawEnvironment();
  drawDataDashboard();
}

//DATA SYSTEM UPDATE
function updateWeatherSystem() {
  let monthlyData = nycRainData[currentMonth]; //GET THE DATA FROM CHOSEN MONTH
  
  //ACCORDING TO RAINY DAYS TO GENERATE RAIN DROPS
  if (frameCount % int(map(monthlyData.days, 8, 12, 30, 10)) === 0) {
    generateRaindrops(monthlyData);
  }
  
  // UPDATE ALL ELEMENTS
  updateRaindrops();
  updateRipples();
  updateFlowers();
}

// RAIN DROPS GENERATE BY DATA
function generateRaindrops(data) {
  //8-12DAYS, WILL BE 1-5 DROPS
  let dropCount = int(map(data.days, 8, 12, 1, 5));
  for (let i = 0; i < dropCount; i++) {
    //RAINDROPS' SIZE EFFECT BY RAINFALL
    let size = map(data.rainfall, 70, 120, 5, 15);
    //SPEED ALSO
    let speed = map(data.rainfall, 70, 120, 5, 12);
    raindrops.push(new RainDrop(
      random(width), 
      random(-50, -10), // START FROM RANDOM
      size, 
      speed
    ));
  }
}

//UPDATE RAIN DROPS STATUES
function updateRaindrops() {
  for (let i = raindrops.length - 1; i >= 0; i--) {
    raindrops[i].update();
    raindrops[i].show();
    
    if (raindrops[i].hitsGround()) {
      //RIPPLE AFTER HITS GROUND
      ripples.push(new Ripple(raindrops[i].x, groundLevel));
      raindrops.splice(i, 1);//REMOVE RAINDROPS
    } else if (raindrops[i].offScreen()) {
      raindrops.splice(i, 1);
    }
  }
}

// RIPPLES
function updateRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].show();//RIPPLE APPEAR
    if (ripples[i].isFinished()) {
      flowers.push(new Flower(ripples[i].x, groundLevel, random(100, 300)));//RIPPLE BECOMING FLOWER, RANDOM STEM HEIGHT
      ripples.splice(i, 1);
    }
  }
}

// FLOWERS PART
function updateFlowers() {
  for (let i = flowers.length - 1; i >= 0; i--) {
    flowers[i].grow();
    flowers[i].display();
    if (flowers[i].shouldRemove()) {//REMOVE THE FLOWER THAT DEAD
      flowers.splice(i, 1);
    }
  }
}


function drawEnvironment() {
  // CREATE GROUND
  fill(120, 50, 30);
  noStroke();
  rect(0, groundLevel, width, height - groundLevel);
}

// DATA BOARD
function drawDataDashboard() {
  let data = nycRainData[currentMonth];
  
  fill(0, 0, 100, 0.8);
  rect(20, 20, 250, 120, 10);

  //MONTH
  fill(0);
  textSize(24);
  text(`${data.month} MONTH`, 40, 50);
  
  //DATA OF RAINFALL
  textSize(16);
  text(`Rainfall: ${data.rainfall} mm`, 40, 80);
  text(`RainDays: ${data.days} DAYS`, 40, 110);
  
  // AMOUNT OF RAINS(LINE)
  let rainWidth = map(data.rainfall, 70, 120, 0, 200);
  fill(200, 80, 90);
  rect(40, 90, rainWidth, 8);
  
  // TIME LINE OF MONTHS
  drawTimeline();
}

function drawTimeline() {
  for (let i = 0; i < nycRainData.length; i++) {
    let x = map(i, 0, 11, 50, width - 50);
    let h = map(nycRainData[i].rainfall, 70, 120, 5, 40);//COLOMN OF RAINFALL OF EACH MONTH
   
    // SHOW THE COLUMN
    fill(i === currentMonth ? 200 : 100);
    rect(x - 10, height - 50, 20, -h);
    
    //SHOW CHOSEN MONTH
    if (i === currentMonth) {
      fill(200);
      text(nycRainData[i].month, x - 15, height - 55 - h);
    }
  }
}

// MONTHS CHOICE BUTTON
function createMonthButtons() {
  // REMOVE FIRST AND THEN APPEAR
  selectAll('button').forEach(btn => btn.remove());
  
  //CREATE MONTH BUTTON FOR EACH ONE
  for (let i = 0; i < 12; i++) {
    let btn = createButton(nycRainData[i].month);
    btn.position(300 + i * 40, 30);//SAME POSITION

    //PRESSED MONTH AND CHANGE
    btn.mousePressed(() => {
      currentMonth = i;
      raindrops = []; // CLEAR ALL STUFF
      ripples = [];
      flowers = [];
    });
    btn.style('padding', '5px');
  }
}

// RAINDROP SETTINUG
class RainDrop {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = map(size, 5, 15, 0.6, 1);//OPCAITY THE BIGGER RAINFALL THE LESS
  }
  
  //UPDATE POSITION
  update() {
    this.y += this.speed;
  }
  //DRAW RAIN DROPS
  show() {
    fill(200, 80, 100, this.opacity);
    noStroke();
    ellipse(this.x, this.y, this.size * 0.8, this.size * 1.5);
  }
  
  hitsGround() {
    return this.y >= groundLevel;
  }
  
  offScreen() {
    return this.y > height;
  }
}

// RIPPLE SETTING
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 20;
    this.alpha = 200;
  }

  update() {
    this.radius += 2;//RADIUS GET BIGGER
    this.alpha -= 4;//FADE AWAY
  }
//DRAW RIPPLE
  show() {
    noFill();
    stroke(200, 200, 255, this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius * 2, this.radius / 2);
  }
//CHECK RIPPLE DISAPPEARED OR NOT
  isFinished() {
    return this.alpha <= 0;
  }
}

// FLOWER SETTING
class Flower {
  constructor(x, y, stemHeight) {
    this.position = createVector(x, y);
    this.stemHeight = stemHeight;
    this.stemGrowth = 0;
    this.stemGrowthRate = random(2, 5);
    this.bloomed = false;
    this.numPetals = int(random(20, 30));
    this.petalGrowth = 0;
    this.maxPetalGrowth = random(15, 25);//SIZE OF PETAL
    this.petalColor = random(1) < 0.1? // PETAL COLORS
      color(0, 0, 255, 200) : color(random(360), 200, 255, 200);
    this.centerColor = color(60, 200, 255, 255);
    this.lifespan = 500;//LIVE TIME
  }
//PROCESS OF GROWTH
  grow() {
    if (!this.bloomed) {
      //STEM GROWTH
      this.stemGrowth += this.stemGrowthRate;
      if (this.stemGrowth >= this.stemHeight) {
        this.bloomed = true;//BLOOM WHEN ACHIEVE THE HEIGHT
      }
    } else {
      //BLOOM
      if (this.petalGrowth < this.maxPetalGrowth) {
        this.petalGrowth += 1;
      }
    }
    this.lifespan--;//LIFE DECREASE
  }

  //FLOWER DRAWING
  display() {
    push();
    translate(this.position.x, this.position.y);
    stroke('#0F6135');
    strokeWeight(2);
    line(0, 0, 0, -this.stemGrowth);

    if (this.bloomed) {
      translate(0, -this.stemGrowth);
      noStroke();
      fill(this.petalColor);
      rotate(frameCount * 0.01);//FLOWER ROTATE

      //DRAW ALL FLOWERS
      for (let i = 0; i < this.numPetals; i++) {
        let angle = map(i, 0, this.numPetals, 0, TWO_PI);
        push();
        rotate(angle);
        ellipse(0, this.petalGrowth / 2, this.petalGrowth / 4, this.petalGrowth * 1.5);
        pop();
      }
      fill(this.centerColor);
      ellipse(0, 0, this.maxPetalGrowth / 3);
    }
    pop();
  }
//PENDING MOVE OR NOT
  shouldRemove() {
    return this.lifespan <= 0;
  }
}
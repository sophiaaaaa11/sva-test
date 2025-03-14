let particleSystem;
let img;

function preload(){
    img = loadImage("asset/img.png")
}

function setup(){
    createCanvas(340, 500);
    particleSystem = new ParticleSystem(img);
}

function draw(){
    background(0);
    particleSystem.loop();
    if (mousePressed){
        particleSystem.addParticles(mouseX, mouseY, 2);
    }


}

function mousePressed(){
    particleSystem.addParticles(mouseX, mouseY, 10);
}
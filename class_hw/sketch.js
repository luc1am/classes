/*

At least two functions for drawing shapes,
    images, and/or video (file or webcam feed)

An additional interactive component
    (via mouse, keyboard, and/or microphone)
    that changes a visible and/or audible quality*/

class Star {
  constructor(x,y,radius1 = 100,radius2 = 40){
    this.x = x;
    this.y = y;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.r = random(255)
    this.g = random(255)
    this.b = random(255)
  }
  //code modified from:
  //CHANGED SO THAT IT IS ALWAYS A 5 POINTED STAR
  //https://p5js.org/examples/form-star.html
  display(){
    noStroke();
    fill(this.r,this.g,this.b,random(255))
    let angle = TWO_PI / 5;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.x + cos(a) * this.radius2;
      let sy = this.y + sin(a) * this.radius2;
      vertex(sx, sy);
      sx = this.x + cos(a + halfAngle) * this.radius1;
      sy = this.y + sin(a + halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  move(){
    this.x += random(-10,10);
    this.y += random(-10,10);
  }
  changeColor(ind){
    if (ind == 0){
      this.r = 0;
      this.g = 0;
      this.b = random(200);
    } else if (ind == 1){
      this.g = 0;
      this.r = random(200);
      this.b = 0;
    } else {
      this.b = 0;
      this.g = random(200);
      this.r = 0;
    }
  }
}

stars = [];
var sound;

function preload(){
  //rights to the Garden and Andy Morin of course
  //taken off youtube
  sound = loadSound("frenchKissTheAbyss.mp3");
}

function setup() {
  createCanvas(500,500);
  let rad1 = random(100,300);
  let rad2 = rad1/2;
  for (let i = 0; i<20; i++){
    stars.push(new Star(random(500),random(500),
              rad1,rad2));
  }
}

function draw() {
  //ADD, DARKEST,LIGHTEST,DIFFERENCE,EXCLUSION
  //MULTIPLY,SCREEN,REPLACE,REMOVE,OVERLAY
  //HARD_LIGHT, SOFT_LIGHT, DODGE, BURN
  blendMode(DIFFERENCE);
  frameRate(10);
  background(255);
  for (let i = 0; i<stars.length; i++){
    stars[i].move();
    stars[i].display();
  }
  playB();

}

function keyPressed(){
  if (isLooping()){
    noLoop();
  } else{
    loop();
  }
}

function playB(){

  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(250,250,100,50,10);
  blendMode(BLEND)
  textSize(20);
  fill(0)
  textAlign(CENTER)
  text("play song", 250,255)

  if ((mouseX>200 && mouseX<300)&&(mouseY<225&&mouseY<275)){
    print(0);//test
    sound.play();
  }
}

function mousePressed(){
  let ind = round(random(2))
  for (let i = 0; i<stars.length; i++){
    stars[i].changeColor(ind)
  }
}

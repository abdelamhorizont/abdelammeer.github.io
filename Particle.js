let particlesM = new Array(4);
let worms = new Array(10);
let softBrushTails = new Array(1);
let softBrushEyes = new Array(2);

let texBG;

const totalFrames = 520;
let count = 0;

class Particle {
  constructor(brush, size, widthStart, heightStart, widthEnd, heightEnd) {
    this.size = size;
    this.xNoise = new NoiseLoop(0.2, widthStart + this.size, widthEnd );
    this.yNoise = new NoiseLoop(0.2, heightStart + this.size, heightEnd );
    this.rNoise = new NoiseLoop(0.2, 300, innerWidth * 2);
    this.brush = brush;
    this.xPos = [];
    this.yPos = [];
    this.xRPos = [];
    this.yRPos = [];
    this.radius = [];
  }

  render(brush, a, tail) {
    noStroke();
    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let r = this.rNoise.value(a) ;
    // let r = 500;

    this.xPos.push(x);
    this.yPos.push(y);
    this.radius.push(r);

    push();
    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        imageMode(CENTER);
        tex.tint(100, 1);
        tex.image(brush, this.xPos[i], this.yPos[i],  this.radius[i],  this.radius[i]);
      }
    }
    pop();

    if (this.xPos.length > tail) {
      this.xPos.shift();
      this.yPos.shift();
      this.radius.shift();
    }
  }

  worm(a, tail) {

    noStroke();
    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let r = this.rNoise.value(a)/10;

    this.xPos.push(x);
    this.yPos.push(y);
    this.radius.push(r);

    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        tint(100, 1);
        image(this.brush, this.xPos[i], this.yPos[i],  this.radius[i],  this.radius[i]);
      }
    }

    if (this.xPos.length > tail) {
      this.xPos.shift();
      this.yPos.shift();
      this.radius.shift();
    }
  }

  softBrushTail(a, tail) {
    noStroke();
    let x = mouseX - innerWidth/2;
    let y = mouseY - innerHeight/2;
    let r = this.rNoise.value(a)/14;

    this.xPos.push(x);
    this.yPos.push(y);
    this.radius.push(r);

    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        tint(100, 0.1);
        image(this.brush, this.xPos[i], this.yPos[i],  this.radius[i],  this.radius[i]);
      }
    }

    if (this.xPos.length > tail) {
      this.xPos.shift();
      this.yPos.shift();
      this.radius.shift();
    }
  }

  softBrushEye(a, tail, d) {
    noStroke();
    let xL = pose.leftEye.x;
    let yL = pose.leftEye.y;
    let xR = pose.rightEye.x;
    let yR = pose.rightEye.y;
    let r = this.rNoise.value(a)/25;

    this.xPos.push(xL);
    this.yPos.push(yL);
    
    this.xRPos.push(xR);
    this.yRPos.push(yR);

    this.radius.push(r);

    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        tint(100, 0.8);
        image(this.brush, this.xPos[i], this.yPos[i],  d,  d);
        image(this.brush, this.xRPos[i], this.yRPos[i], d,  d);

      }
    }

    if (this.xPos.length > tail) {
      this.xPos.shift();
      this.yPos.shift();
      this.xRPos.shift();
      this.yRPos.shift();
      this.radius.shift();
    }
  }
}

function render(brush) {
  let a = frameCount/100 * TWO_PI;

  // for (let p of particlesL) {
  //   p.render(a, 3);
  // }
  for (let p of particlesM) {
    p.render(brush, a, 1);
  }
  // for (let p of particlesS) {
  //   p.render(a, 3);
  // }

}

function textur(loadedBGColor, shape) {
  tex.background(loadedBGColor);

  render(eval(anim.layer[0].colors[4])); 
}

function worm(){
  let a = frameCount/100 * TWO_PI;

  for (let p of worms) {
		p.worm(a, 15);
	  }
}

function softBrushTail(){
  let a = frameCount/100 * TWO_PI;

  for (let p of softBrushTails) {
		p.softBrushTail(a, 5 );
	  }
}

function softBrushEye(d){
  let a = frameCount/100 * TWO_PI;

  for (let p of softBrushTails) {
		p.softBrushEye(a, 10, d);
	  }
}




function createParticles(shape) {
  //Particles for the texture

  let middle = eval(shape.layer[0].colors[4]);
 
  for (let i = 0; i < particlesM.length; i++) {
    particlesM[i] = new Particle(middle, innerWidth/4, -innerWidth/2- 400, -innerHeight/2 - 400, innerWidth/2, innerHeight/2);
  }

  for (let i = 0; i < worms.length; i++) {
    worms[i] = new Particle(blauGrünBrush, innerWidth/8, -innerWidth, -innerHeight, innerWidth, innerHeight);
  }  

  for (let i = 0; i < softBrushTails.length; i++) {
    softBrushTails[i] = new Particle(rosaBrush, innerWidth/8, -innerWidth, -innerHeight, innerWidth, innerHeight);
  }  

  
  for (let i = 0; i < softBrushEyes.length; i++) {
    softBrushEyes[i] = new Particle(rosaBrush, innerWidth/8, -innerWidth, -innerHeight, innerWidth, innerHeight);
  }  

}
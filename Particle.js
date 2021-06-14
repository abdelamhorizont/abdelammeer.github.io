// let particlesS = new Array(0);
let particlesM = new Array(3);
// let particlesL = new Array(0);
let worms = new Array(1);

let texBG;

const totalFrames = 520;
let count = 0;

class Particle {
  constructor(brush, size, widthStart, heightStart, widthEnd, heightEnd) {
    this.size = size;
    this.xNoise = new NoiseLoop(0.2, widthStart + this.size, widthEnd - this.size);
    this.yNoise = new NoiseLoop(0.2, heightStart + this.size, heightEnd - this.size);
    this.rNoise = new NoiseLoop(0.2, 0, innerWidth * 1.5);
    this.brush = brush;
    this.xPos = [];
    this.yPos = [];
    this.radius = [];
  }

  render(a, tail) {
    noStroke();
    let x = this.xNoise.value(a);
    let y = this.yNoise.value(a);
    let r = this.rNoise.value(a);

    this.xPos.push(x);
    this.yPos.push(y);
    this.radius.push(r);

    push();
    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        tex.tint(100, 0.5);
        tex.image(this.brush, this.xPos[i], this.yPos[i],  this.radius[i],  this.radius[i]);
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
    let r = this.rNoise.value(a);

    this.xPos.push(x);
    this.yPos.push(y);
    this.radius.push(r);

    let opa = map(noise(frameCount/30), 0, 1, 10, 400);

    for (var i = 0; i < tail; i++) {
      if(this.xPos[i] != null){
        tint(100, 1);
        image(this.brush, this.xPos[i], this.yPos[i],  this.radius[i]/4,  this.radius[i]/4);
      }
    }

    if (this.xPos.length > tail) {
      this.xPos.shift();
      this.yPos.shift();
      this.radius.shift();
    }
  }
}

function render() {
  let a = frameCount/80 * TWO_PI;

  // for (let p of particlesL) {
  //   p.render(a, 3);
  // }
  for (let p of particlesM) {
    p.render(a, 3);
  }
  // for (let p of particlesS) {
  //   p.render(a, 3);
  // }

}

function textur(loadedColor) {
  tex.background(loadedColor);

  render(); 
  // softBrushContour(Anglerfisch);
}

function worm(){
  let a = frameCount/100 * TWO_PI;

  for (let p of worms) {
		p.worm(a, 20);
	  }
}

function createParticles(shape) {
  //Particles for the texture

  // let small = eval(shape.layer[0].colors[3]);
  let middle = eval(shape.layer[0].colors[4]);
  // let big = eval(shape.layer[0].colors[5]);

  // let worm = eval(shape.layer[0].colors[3]);
  
  // for (let i = 0; i < particlesS.length; i++) {
  //   particlesS[i] = new Particle(small, innerWidth/10, -innerWidth/2, -innerHeight/2, innerWidth, innerHeight);
  // }
  for (let i = 0; i < particlesM.length; i++) {
    particlesM[i] = new Particle(middle, innerWidth/4, -innerWidth/2, -innerHeight/2, innerWidth, innerHeight);
  }
  // for (let i = 0; i < particlesL.length; i++) {
  //   particlesL[i] = new Particle(big, innerWidth, -innerWidth*2, -innerHeight*2, innerWidth*2, innerHeight*2);
  // }  

  for (let i = 0; i < worms.length; i++) {
    worms[i] = new Particle(middle, innerWidth/8, -innerWidth, -innerHeight, innerWidth, innerHeight);
  }  
}
let add = 0;

var button;
let softbrushImg;
let newPos, oldPos, pos;

//loaded brushes
let pinkBrush, gelbBrush, rosaBrush, blackBrush, whiteBrush;

class brushes {
  constructor(pos, addOnadd, img, softRadius, opacity, shapeCol) {
    this.pos = pos;
    this.add = 0;
    this.addOnadd = addOnadd;
    this.xNoise = new NoiseLoop(255, -30, 30);
    this.yNoise = new NoiseLoop(255, -30, 30);
    this.move = false;
    this.softRadius = softRadius;
    this.img = img;
    this.opacity = opacity;
    this.shapeCol = shapeCol;
  }

  shouldMove() {
    this.move = !this.move;
    this.moveit();
  }

  moveit() {
    //add oscillation vector to pos vector   
    if (this.move === true) {

      let x = map(noise(this.add/10), 0, 1, 0, 4);
      this.osc = createVector(sin(this.add) * x , cos(this.add) * x);

      // Noiseloops
      // let x = this.xNoise.value(this.alpha2);
      // let y = this.xNoise.value(this.alpha2);
      // // console.log(x);
      // this.osc = createVector(sin(this.alpha1) * x, cos(this.alpha1) * y);

      // Schachbrett Verzerrung mit NoiseLoop
      // this.osc = createVector(sin(x), cos(x));

      // Verfließen 45 Grad mit NoiseLoop
      // this.osc = createVector(x, x);

      this.pos.add(this.osc);
    }
  }

  curvePoint() {
    fill(this.shapeCol);

    curveVertex(this.pos.x, this.pos.y);

    this.add += this.addOnadd;

    if (this.move) {
      this.moveit();
    }
  }

  linePoint(){
    curveVertex(this.pos.x, this.pos.y);
    stroke(this.shapeCol);

    this.add += this.addOnadd;

    if (this.move) {
      this.moveit();
    }
  }

  softPoint() {
    noStroke()

    tint(255,this.opacity);
    image(this.img, this.pos.x, this.pos.y, this.softRadius, this.softRadius);
    
    // growing variable for sin and noise      
    this.add += this.addOnadd;

    if (this.move) {
      this.moveit();
    }
  }

  vertexPoint(u, v) {
    noStroke();
    vertex(this.pos.x, this.pos.y, 0, u, v);

    this.add += this.addOnadd;

    if (this.move) {
      this.moveit();
    }
  }


}

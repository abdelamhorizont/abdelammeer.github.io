//graphics layer for texture
let tex;
var textureShapes = [];

let xNoise, yNoise;
let testPos = [];
let testPosAdd = 0;
let osc;

//loaded Shapes
let allMyShapes = {};
let shapeLength = 0;
let shapeOscAdd = 0;

var counter = 0;
var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

let col0, col1, col2;
let loadedCol0, loadedCol1, loadedCol2, loadedShapeCol;
let loadedShapeColBlack = 0;
let loadedShapeColB;
let loadedShapeColCount = 0;
let loadedShapeBool = false;

let loadBool = true;

let mouthBool = false;
let mouthOpen;
let amplitude;

let x = 0;

let phase = 0;
let zoff = 0;

function loadShapes() {
    anim = Wüste;
    amplitude = new p5.Amplitude();

    textureShapes[0] = new Array();
    lines[0] = new Array();
    softShapes[0] = new Array();
    shapes[0] = new Array();

    createParticles(anim);
    tex = createGraphics(innerWidth, innerHeight);
    tex.colorMode(HSB);

    col0 = [180,20,100];   // gelb
    col1 = [200, 87, 94];   // gelb
    col2 = [329, 8, 9];    // light rosa

    if (anim.layer[1] != undefined) {
        mouthOpen = anim.layer[1].mouthOpen;
    }
}

function saveShapes() {
    allMyShapes.layer = [];
    allMyShapes.layer[0] = {};

    allMyShapes.layer[0].colors = [col0, col1, col2, 'rosaBrush', 'rosaBrush', 'rosaBrush'];
    allMyShapes.layer[0].shapes = [];
    allMyShapes.layer[0].lines = [];
    allMyShapes.layer[0].softShapes = [];
    allMyShapes.layer[0].texShapes = [];

    allMyShapes.layer[0].shapes[0] = {};
    allMyShapes.layer[0].shapes[0].color;
    allMyShapes.layer[0].shapes[0].osc = 0;
    allMyShapes.layer[0].shapes[0].addPos = 0;
    allMyShapes.layer[0].shapes[0].pos = [];

    allMyShapes.layer[0].lines[0] = {};
    allMyShapes.layer[0].lines[0].color = 0;
    allMyShapes.layer[0].lines[0].osc = 0;
    allMyShapes.layer[0].lines[0].addPos = 0;
    allMyShapes.layer[0].lines[0].pos = [];

    allMyShapes.layer[0].softShapes[0] = {};
    allMyShapes.layer[0].softShapes[0].osc = 0;
    allMyShapes.layer[0].softShapes[0].addPos = 0;
    allMyShapes.layer[0].softShapes[0].size;
    allMyShapes.layer[0].softShapes[0].opacity;
    allMyShapes.layer[0].softShapes[0].color = 'rosaBrush';
    allMyShapes.layer[0].softShapes[0].pos = [];

    allMyShapes.layer[0].texShapes[0] = {};
    allMyShapes.layer[0].texShapes[0].osc = 0;
    allMyShapes.layer[0].texShapes[0].addPos = 0;
    allMyShapes.layer[0].texShapes[0].pos = [];
}

function drawLoadedShapes(shape) {
    //draw on tex canvas  

    loadedCol0 = shape.layer[0].colors[0][0];
    loadedCol1 = shape.layer[0].colors[0][1];
    loadedCol2 = shape.layer[0].colors[0][2];

    if (loadedShapeColBlack <= loadedCol2) {
        loadedShapeColBlack += 0.4;
        loadedShapeCol = color(loadedCol0, loadedCol1, loadedShapeColBlack)
    }  else {
        loadedShapeColCount += 0.1;
        loadedShapeColB = map(cos(loadedShapeColCount), 1, -1, loadedCol2, 20);
        loadedShapeCol = color(loadedCol0, loadedCol1, loadedShapeColB)
    }

    tex.fill(0);
    tex.noStroke();
    textur(loadedShapeCol, shape);
    // tex.image(capture, 0, 0, innerWidth, innerHeight);

    tex.push();
    tex.translate(innerWidth / 2, innerHeight / 2);

    tex.beginShape();

    tex.vertex(-innerWidth / 2, -innerHeight / 2);
    tex.vertex(-innerWidth / 2, -innerHeight / 2);

    tex.vertex(-innerWidth / 2, innerHeight / 2);
    tex.vertex(-innerWidth / 2, innerHeight / 2);

    tex.vertex(innerWidth / 2, innerHeight / 2);
    tex.vertex(innerWidth / 2, innerHeight / 2);

    tex.vertex(innerWidth / 2, -innerHeight / 2);
    tex.vertex(innerWidth / 2, -innerHeight / 2);

    tex.vertex(-innerWidth / 2, -innerHeight / 2);
    // tex.vertex(-innerWidth / 2, -innerHeight / 2);

    tex.beginContour();
    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);

    // animation rising oscillation 
    // if (shapeOscAdd < shape.layer[0].shapes[0].osc) {
    //     shapeOscAdd += 0.01;
    // }

    // display animation drawing shape
    // if (shapeLength < shape.layer[0].shapes[0].pos.length) {
    //     shapeLength += 1;
    // }

    shapeLength = shape.layer[0].shapes[0].pos.length;

    for (var i = 0; i < shapeLength; i++) {
        if (shape.layer[0].shapes[0].pos[i] != undefined) {

            if (shape.layer[0].shapes[0].osc != 0) {
                shape.layer[0].shapes[0].addPos += shape.layer[0].shapes[0].osc;
                // shape.layer[0].shapes[0].addPos += shapeOscAdd;
            } else {
                shape.layer[0].shapes[0].addPos += float(OscSlider.value);
            }

            // let x = map(noise(shape.shapes[0].addPos / 10), 0, 1, 0, 5);
            x = map(sin(frameCount / 50), -1, 1, 2, 5);

            osc = createVector(sin(shape.layer[0].shapes[0].addPos) * 4, cos(shape.layer[0].shapes[0].addPos) * 4);

            tex.curveVertex(shape.layer[0].shapes[0].pos[i][0], shape.layer[0].shapes[0].pos[i][1]);

            // loadedShapes[i].curvePoint();
            shape.layer[0].shapes[0].pos[i][0] += osc.x;
            shape.layer[0].shapes[0].pos[i][1] += osc.y;

        }
    }

    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    tex.endContour();
    tex.endShape(CLOSE);

    tex.pop();

    texture(tex);
    plane(innerWidth, innerHeight);

    //plain shapes in color
    for (var j = 1; j < shape.layer[0].shapes.length; j++) {
        push();
        if (shape.layer[0].shapes[j] != undefined) {

            if (shape.layer[0].shapes[j].color != undefined) {

                // if (loadedShapeColBlack <= shape.layer[0].shapes[j].color[2]) {
                //     loadedShapeColBlack += 1;
                // }

                if (shape.layer[0].shapes[j].color != undefined) {
                    shape.layer[0].shapes[j].color[2] = map(sin(frameCount/10), 0, 1, 80, 100);
                    fill(shape.layer[0].shapes[j].color);
                }
                // fill(shape.layer[0].shapes[j].color[0],shape.layer[0].shapes[j].color[1], loadedShapeColBlack);
            }

            beginShape();
            for (var i = 0; i < shape.layer[0].shapes[j].pos.length; i++) {
                if (shape.layer[0].shapes[j].osc != 0) {
                    shape.layer[0].shapes[j].addPos += shape.layer[0].shapes[j].osc;
                } else {
                    shape.layer[0].shapes[j].addPos += float(OscSlider.value);
                }

                // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[0].shapes[j].addPos) * 3, cos(shape.layer[0].shapes[j].addPos) * 3);

                curveVertex(shape.layer[0].shapes[j].pos[i][0], shape.layer[0].shapes[j].pos[i][1]);

                shape.layer[0].shapes[j].pos[i][0] += osc.x;
                shape.layer[0].shapes[j].pos[i][1] += osc.y;
            }
            endShape(CLOSE);
        }
        pop();
    }

    //lines
    for (var j = 0; j < shape.layer[0].lines.length; j++) {
        push();


        if (shape.layer[0].lines[j].color != undefined) {
            fill(shape.layer[0].lines[j].color);

            noFill();
            strokeWeight(15);
            stroke(loadedShapeCol);
        }

        beginShape();
        for (var i = 0; i < shape.layer[0].lines[j].pos.length - 1; i++) {

            if (shape.layer[0].lines[j].osc != 0) {
                shape.layer[0].lines[j].addPos += shape.layer[0].lines[j].osc;
            } else {
                shape.layer[0].lines[j].addPos += float(OscSlider.value);
            }

            x = map(sin(frameCount / 50), -1, 1, 2, 5);
            osc = createVector(sin(shape.layer[0].lines[j].addPos) * x, cos(shape.layer[0].lines[j].addPos) * x);
            curveVertex(shape.layer[0].lines[j].pos[i][0], shape.layer[0].lines[j].pos[i][1]);

            // push();
            // translate(shape.layer[0].lines[j].pos[i][0], shape.layer[0].lines[j].pos[i][1]);
            // plane(8);
            // pop();

            // push();
            // translate(lerp(shape.layer[0].lines[j].pos[i][0], shape.layer[0].lines[j].pos[i + 1][0], 0.5), lerp(shape.layer[0].lines[j].pos[i][1], shape.layer[0].lines[j].pos[i + 1][1], 0.5));
            // plane(8);
            // pop();


            shape.layer[0].lines[j].pos[i][0] += osc.x;
            shape.layer[0].lines[j].pos[i][1] += osc.y;
        }
        endShape();
        pop();
    }

    //soft shapes
    push();
    for (var j = 0; j < shape.layer[0].softShapes.length; j++) {
        for (var i = 0; i < shape.layer[0].softShapes[j].pos.length; i++) {
            // shape.softShapes[j].addPos += float(OscSlider.value);
            // shape.softShapes[j].addPos += 0.1;
            if (shape.layer[0].softShapes[j].osc != 0) {
                shape.layer[0].softShapes[j].addPos += shape.layer[0].softShapes[j].osc;
            } else {
                shape.layer[0].softShapes[j].addPos += float(OscSlider.value);
            }

            // let x = map(noise(shape.softShapes[j].addPos / 10), 0, 1, 0, 5);
            let minOp = map(sin(frameCount/10), 0, 1, 0, 0.04)

            osc = createVector(sin(shape.layer[0].softShapes[j].addPos) * 3, cos(shape.layer[0].softShapes[j].addPos) * 3);
            tint(255, shape.layer[0].softShapes[j].opacity - minOp);
            image(eval(shape.layer[0].softShapes[j].color), shape.layer[0].softShapes[j].pos[i][0], shape.layer[0].softShapes[j].pos[i][1], shape.layer[0].softShapes[j].size, shape.layer[0].softShapes[j].size);

            shape.layer[0].softShapes[j].pos[i][0] += osc.x;
            shape.layer[0].softShapes[j].pos[i][1] += osc.y;
        }
    }
    pop();

    //tex shapes
    for (var j = 0; j < shape.layer[0].texShapes.length; j++) {
        textur(loadedShapeCol);
        textureMode(NORMAL);
        texture(tex);
        beginShape();
        for (var i = 0; i < shape.layer[0].texShapes[j].pos.length; i++) {
            // shape.texShapes[j].addPos += float(OscSlider.value);
            if (shape.layer[0].texShapes[j].osc != 0) {
                shape.layer[0].texShapes[j].addPos += shape.layer[0].texShapes[j].osc;
            } else {
                shape.layer[0].texShapes[j].addPos += float(OscSlider.value);
            }

            let u = map(i, 0, shape.layer[0].texShapes[j].pos.length, 0, TWO_PI);

            // let x = map(noise(shape.layer[0].texShapes[j].addPos / 10), 0, 1, 0, 5);
            osc = createVector(sin(shape.layer[0].texShapes[j].addPos) * 4, cos(shape.layer[0].texShapes[j].addPos) * 4);

            vertex(shape.layer[0].texShapes[j].pos[i][0], shape.layer[0].texShapes[j].pos[i][1], 0, (1 - cos(u)) / 2, (1 + sin(u)) / 2);
            // image(rosaBrush, shape.softShapes[j].pos[i][0], shape.softShapes[j].pos[i][1], shape.softShapes[j].size, shape.softShapes[j].size);

            shape.layer[0].texShapes[j].pos[i][0] += osc.x;
            shape.layer[0].texShapes[j].pos[i][1] += osc.y;
        }
        endShape(CLOSE);
    }
}

function drawMouth(shape) {

    // let level = amplitude.getLevel();
    // let size = map(level, 0, 1, 100, 800);
    // plane(size);

    if (shape.layer[1] != undefined) {

        push();
        if (mouthBool) {
            mouthOpen = map(sin(frameCount * 5), -1, 1, 0.2, 0.6);
        }
        scale(1, mouthOpen);

        //draw on tex canvas  
        if (loadBool) {
            // softBrushContour(shape);

            //tex shapes
            for (var j = 0; j < shape.layer[1].texShapes.length; j++) {
                textur(loadedShapeCol);
                textureMode(NORMAL);
                // tex.image(capture, 0, 0, innerWidth, innerHeight);
                texture(tex);
                beginShape();
                for (var i = 0; i < shape.layer[1].texShapes[j].pos.length; i++) {
                    // shape.texShapes[j].addPos += float(OscSlider.value);
                    if (shape.layer[1].texShapes[j].osc != 0) {
                        shape.layer[1].texShapes[j].addPos += shape.layer[1].texShapes[j].osc;
                    } else {
                        shape.layer[1].texShapes[j].addPos += float(OscSlider.value);
                    }

                    let u = map(i, 0, shape.layer[1].texShapes[j].pos.length, 0, TWO_PI);

                    // let x = map(noise(shape.texShapes[j].addPos / 10), 0, 1, 0, 5);
                    osc = createVector(sin(shape.layer[1].texShapes[j].addPos) * 4, cos(shape.layer[1].texShapes[j].addPos) * 4);

                    vertex(shape.layer[1].texShapes[j].pos[i][0], shape.layer[1].texShapes[j].pos[i][1], 0, (1 - cos(u)) / 2, (1 + sin(u)) / 2);
                    // image(rosaBrush, shape.softShapes[j].pos[i][0], shape.softShapes[j].pos[i][1], shape.softShapes[j].size, shape.softShapes[j].size);

                    shape.layer[1].texShapes[j].pos[i][0] += osc.x;
                    shape.layer[1].texShapes[j].pos[i][1] += osc.y;
                }
                endShape(CLOSE);
            }

            //lines
            for (var j = 0; j < shape.layer[1].lines.length; j++) {
                push();
                noFill();
                strokeWeight(15);
                stroke(shape.layer[1].lines[j].color);

                beginShape();
                for (var i = 0; i < shape.layer[1].lines[j].pos.length; i++) {
                    if (shape.layer[1].lines[j].pos[i] != undefined) {

                        if (shape.layer[1].lines[j].osc != 0) {
                            shape.layer[1].lines[j].addPos += shape.layer[1].lines[j].osc;
                        } else {
                            shape.layer[1].lines[j].addPos += float(OscSlider.value);
                        }

                        // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                        osc = createVector(sin(shape.layer[1].lines[j].addPos) * 3, cos(shape.layer[1].lines[j].addPos) * 3);

                        curveVertex(shape.layer[1].lines[j].pos[i][0], shape.layer[1].lines[j].pos[i][1]);

                        // plane(10);

                        shape.layer[1].lines[j].pos[i][0] += osc.x;
                        shape.layer[1].lines[j].pos[i][1] += osc.y;
                    }
                }
                endShape();
                fill(255);
                pop();
            }

            //soft shapes
            push();
            for (var j = 0; j < shape.layer[1].softShapes.length; j++) {
                for (var i = 0; i < shape.layer[1].softShapes[j].pos.length; i++) {
                    // shape.softShapes[j].addPos += float(OscSlider.value);
                    // shape.softShapes[j].addPos += 0.1;
                    if (shape.layer[1].softShapes[j].osc != 0) {
                        shape.layer[1].softShapes[j].addPos += shape.layer[1].softShapes[j].osc;
                    } else {
                        shape.layer[1].softShapes[j].addPos += float(OscSlider.value);
                    }

                    // let x = map(noise(shape.softShapes[j].addPos / 10), 0, 1, 0, 5);
                    osc = createVector(sin(shape.layer[1].softShapes[j].addPos) * 3, cos(shape.layer[1].softShapes[j].addPos) * 3);
                    tint(255, shape.layer[1].softShapes[j].opacity);
                    image(eval(shape.layer[1].softShapes[j].color), shape.layer[1].softShapes[j].pos[i][0], shape.layer[1].softShapes[j].pos[i][1], shape.layer[1].softShapes[j].size, shape.layer[1].softShapes[j].size);

                    shape.layer[1].softShapes[j].pos[i][0] += osc.x;
                    shape.layer[1].softShapes[j].pos[i][1] += osc.y;
                }
            }
            pop();

            //plain shapes in color
            for (var j = 1; j < shape.layer[1].shapes.length; j++) {

                if (shape.layer[1].shapes[j].color != undefined) {
                    fill(shape.layer[1].shapes[j].color);
                }

                beginShape();
                for (var i = 0; i < shape.layer[1].shapes[j].pos.length; i++) {

                    if (shape.layer[1].shapes[j].osc != 0) {
                        shape.layer[1].shapes[j].addPos += shape.layer[1].shapes[j].osc;
                    } else {
                        shape.layer[1].shapes[j].addPos += float(OscSlider.value);
                    }

                    osc = createVector(sin(shape.layer[1].shapes[j].addPos) * 3, cos(shape.layer[1].shapes[j].addPos) * 3);

                    curveVertex(shape.layer[1].shapes[j].pos[i][0], shape.layer[1].shapes[j].pos[i][1]);

                    shape.layer[1].shapes[j].pos[i][0] += osc.x;
                    shape.layer[1].shapes[j].pos[i][1] += osc.y;
                }
                endShape(CLOSE);
            }
        }
        pop();
    }
}

function drawRest(shape, layerNum) {

    // softBrushContour(shape);

    //plain shapes in color
    for (var j = 0; j < shape.layer[layerNum].shapes.length; j++) {

        if (shape.layer[layerNum].shapes[j].color != undefined) {
            shape.layer[layerNum].shapes[j].color[3] = map(sin(frameCount/10), 0, 1, 0.8, 1);
            fill(shape.layer[layerNum].shapes[j].color);

            beginShape();
            for (var i = 0; i < shape.layer[layerNum].shapes[j].pos.length; i+= 3) {
                if (shape.layer[layerNum].shapes[j].osc != 0) {
                    shape.layer[layerNum].shapes[j].addPos += shape.layer[layerNum].shapes[j].osc;
                } else {
                    shape.layer[layerNum].shapes[j].addPos += float(OscSlider.value);
                }

                // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[layerNum].shapes[j].addPos) * 3, cos(shape.layer[layerNum].shapes[j].addPos) * 3);

                curveVertex(shape.layer[layerNum].shapes[j].pos[i][0], shape.layer[layerNum].shapes[j].pos[i][1]);

                shape.layer[layerNum].shapes[j].pos[i][0] += osc.x;
                shape.layer[layerNum].shapes[j].pos[i][1] += osc.y;
            }
            endShape(CLOSE);
        }
    }

    //tex shapes
    for (var j = 0; j < shape.layer[layerNum].texShapes.length; j++) {
        textur(loadedShapeCol);
        textureMode(NORMAL);
        texture(tex);
        beginShape();
        for (var i = 0; i < shape.layer[layerNum].texShapes[j].pos.length; i++) {
            // shape.texShapes[j].addPos += float(OscSlider.value);
            if (shape.layer[layerNum].texShapes[j].osc != 0) {
                shape.layer[layerNum].texShapes[j].addPos += shape.layer[layerNum].texShapes[j].osc;
            } else {
                shape.layer[layerNum].texShapes[j].addPos += float(OscSlider.value);
            }

            let u = map(i, 0, shape.layer[layerNum].texShapes[j].pos.length, 0, TWO_PI);

            // let x = map(noise(shape.texShapes[j].addPos / 10), 0, 1, 0, 5);
            osc = createVector(sin(shape.layer[layerNum].texShapes[j].addPos) * 4, cos(shape.layer[layerNum].texShapes[j].addPos) * 4);

            vertex(shape.layer[layerNum].texShapes[j].pos[i][0], shape.layer[layerNum].texShapes[j].pos[i][1], 0, (1 - cos(u)) / 2, (1 + sin(u)) / 2);
            // image(rosaBrush, shape.softShapes[j].pos[i][0], shape.softShapes[j].pos[i][1], shape.softShapes[j].size, shape.softShapes[j].size);

            shape.layer[layerNum].texShapes[j].pos[i][0] += osc.x;
            shape.layer[layerNum].texShapes[j].pos[i][1] += osc.y;
        }
        endShape(CLOSE);
    }

    //lines
    for (var j = 0; j < shape.layer[layerNum].lines.length; j++) {
        push();

        fill(255);
        noFill();
        strokeWeight(15);
        stroke(shape.layer[layerNum].lines[j].color);

        beginShape();
        for (var i = 0; i < shape.layer[layerNum].lines[j].pos.length; i++) {

            if (shape.layer[layerNum].lines[j].pos[i] != undefined) {

                if (shape.layer[layerNum].lines[j].osc != 0) {
                    shape.layer[layerNum].lines[j].addPos += shape.layer[layerNum].lines[j].osc;
                } else {
                    shape.layer[layerNum].lines[j].addPos += float(OscSlider.value);
                }

                // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[layerNum].lines[j].addPos) * 3, cos(shape.layer[layerNum].lines[j].addPos) * 3);

                curveVertex(shape.layer[layerNum].lines[j].pos[i][0], shape.layer[layerNum].lines[j].pos[i][1]);

                shape.layer[layerNum].lines[j].pos[i][0] += osc.x;
                shape.layer[layerNum].lines[j].pos[i][1] += osc.y;
            }
        }
        endShape();
        pop();
    }

    //soft shapes
    for (var j = 0; j < shape.layer[layerNum].softShapes.length; j++) {
        for (var i = 0; i < shape.layer[layerNum].softShapes[j].pos.length; i++) {
            // shape.softShapes[j].addPos += float(OscSlider.value);
            // shape.softShapes[j].addPos += 0.1;
            if (shape.layer[layerNum].softShapes[j].osc != 0) {
                shape.layer[layerNum].softShapes[j].addPos += shape.layer[layerNum].softShapes[j].osc;
            } else {
                shape.layer[layerNum].softShapes[j].addPos += float(OscSlider.value);
            }

            // let x = map(noise(shape.softShapes[j].addPos / 10), 0, 1, 0, 5);
            osc = createVector(sin(shape.layer[layerNum].softShapes[j].addPos) * 3, cos(shape.layer[layerNum].softShapes[j].addPos) * 3);
            tint(255, shape.layer[layerNum].softShapes[j].opacity);
            image(eval(shape.layer[layerNum].softShapes[j].color), shape.layer[layerNum].softShapes[j].pos[i][0], shape.layer[layerNum].softShapes[j].pos[i][1], shape.layer[layerNum].softShapes[j].size, shape.layer[layerNum].softShapes[j].size);

            shape.layer[layerNum].softShapes[j].pos[i][0] += osc.x;
            shape.layer[layerNum].softShapes[j].pos[i][1] += osc.y;
        }
    }

}

function softBrushContour(shape) {

    let blackBrushOffset = 17;

    tex.translate((innerWidth / 8) - blackBrushOffset + 12, (innerHeight / 8) - blackBrushOffset);
    tex.scale(0.265);

    for (var j = 0; j < shape.shapes.length; j++) {
        // for (var i = 0; i < shape.shapes[j].pos.length; i++) {
        for (var i = 0; i < 300; i++) {

            shape.shapes[j].addPos += float(OscSlider.value);

            let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
            osc = createVector(sin(shape.shapes[j].addPos) * 3, cos(shape.shapes[j].addPos) * 3);

            tex.image(blackBrush, shape.shapes[j].pos[i][0], shape.shapes[j].pos[i][1], 120, 120);

            shape.shapes[j].pos[i][0] += osc.x;
            shape.shapes[j].pos[i][1] += osc.y;
        }
    }

    //Kontur bewegt sich entlang pfad    
    //   for (var j = 0; j < shape.shapes.length; j++) {
    //     for (var i = 0; i < 2000; i++) {
    //         shape.shapes[j].pos.shift();
    //     }
    //   }

    tex.scale(1 / 0.265);
    tex.translate((-innerWidth / 8) + blackBrushOffset - 12, (-innerHeight / 8) + blackBrushOffset);
}

function drawTextureShapes() {

    for (var i = 0; i < textureShapes.length; i++) {
        textur(col0);
        textureMode(NORMAL);
        // tex,tint(329,100,100);
        texture(tex);
        beginShape();
        for (var j = 0; j < textureShapes[i].length; j++) {
            let u = map(j, 0, textureShapes[i].length, 0, TWO_PI);
            // let distx = abs(textureShapes[i][j].pos.x - textureShapes[i][0].pos.x);
            // let disty = abs(textureShapes[i][j].pos.y - textureShapes[i][0].pos.y);
            // let rx = map(distx, -innerWidth/2, innerWidth/2, 700 / 2, 0);
            // let ry = map(disty, -innerWidth/2, innerWidth/2, 400 / 2, 0);
            textureShapes[i][j].vertexPoint((1 - cos(u)) / 2, (1 + sin(u)) / 2);
        }
        endShape(CLOSE);
    }
}

function drawShapes() {

    for (var i = 0; i < shapes.length; i++) {
        beginShape();
        for (var j = 0; j < shapes[i].length; j++) {
            shapes[i][j].curvePoint();
        }
        endShape(CLOSE);
    }
}

function drawlines() {
    push();
    fill(255);
    for (var i = 0; i < lines.length; i++) {
        noFill();
        strokeWeight(15);

        beginShape();
        for (var j = 0; j < lines[i].length; j++) {
            lines[i][j].linePoint();
        }
        endShape();
    }
    pop();
}

function drawSoftShapes() {
    imageMode(CENTER);

    for (var i = 0; i < softShapes.length; i++) {
        for (var j = 0; j < softShapes[i].length; j++) {
            softShapes[i][j].softPoint();
        }
    }
}

function randomShape() {
    push();
    stroke(255);
    strokeWeight(2);

    textureMode(NORMAL);
    texture(tex);

    beginShape();
    let noiseMax = 2;
    for (let a = 0; a < TWO_PI; a += radians(5)) {
        let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
        let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, 400, height / 2);
        let x = r * cos(a);
        let y = r * sin(a);

        vertex(x, y, 0, (1 - cos(a)) / 2, (1 + sin(a)) / 2);
    }
    endShape(CLOSE);
    phase += 0.003;
    zoff += 0.01;
    pop();
}

function shapesDragged() {
    softShapeBrush = eval(brush_input.value());
    shapeCol = eval(shapeColInput.value());

    pos = createVector(mouseX - innerWidth / 2, mouseY - innerHeight / 2);
    oldPos = createVector(pmouseX - innerWidth / 2, pmouseY - innerHeight / 2);
    newPos = createVector(lerp(oldPos.x, pos.x, 0.5), lerp(oldPos.y, pos.y, 0.5), 0);

    let line = new brushes(newPos, newOsc, undefined, undefined, undefined, shapeCol);
    var softShape = new brushes(newPos, newOsc, softShapeBrush, softShapeRadius, softShapeOpacity);
    var textureShape = new brushes(newPos, newOsc);
    let shape = new brushes(newPos, newOsc, undefined, undefined, undefined, shapeCol);

    if (menuBool) {

        if (shapesCheckbox.checked) {
            shapes[counter1].push(shape);
            allMyShapes.layer[0].shapes[counter1].color = eval(shapeColInput.value());
            allMyShapes.layer[0].shapes[counter1].pos.push([newPos.x, newPos.y]);
        }

        if (lineCheckbox.checked) {
            lines[counter3].push(line);
            allMyShapes.layer[0].lines[counter3].pos.push([newPos.x, newPos.y]);
            allMyShapes.layer[0].lines[counter3].color = eval(shapeColInput.value());

        }

        if (softShapesCheckbox.checked) {
            softShapes[counter2].push(softShape);
            allMyShapes.layer[0].softShapes[counter2].size = softShapeRadius;
            allMyShapes.layer[0].softShapes[counter2].opacity = softShapeOpacity;
            allMyShapes.layer[0].softShapes[counter2].color = brush_input.value();
            allMyShapes.layer[0].softShapes[counter2].pos.push([newPos.x, newPos.y]);
        }

        if (textureShapesCheckbox.checked) {
            textureShapes[counter].push(textureShape);
            allMyShapes.layer[0].texShapes[counter].pos.push([newPos.x, newPos.y]);
        }
    }
}

function shapesReleased() {

    if (shapesCheckbox.checked) {
        shapes.push([]);
        counter1++;

        allMyShapes.layer[0].shapes[counter1] = {};
        allMyShapes.layer[0].shapes[counter1].color;
        allMyShapes.layer[0].shapes[counter1].osc = 0;
        allMyShapes.layer[0].shapes[counter1].addPos = 0;
        allMyShapes.layer[0].shapes[counter1].pos = [];
    }

    if (lineCheckbox.checked) {
        lines.push([]);
        counter3++;

        allMyShapes.layer[0].lines[counter3] = {};
        allMyShapes.layer[0].lines[counter3].osc = 0;
        allMyShapes.layer[0].lines[counter3].addPos = 0;
        allMyShapes.layer[0].lines[counter3].pos = [];
    }

    if (softShapesCheckbox.checked) {
        softShapes.push([]);
        counter2++;

        allMyShapes.layer[0].softShapes[counter2] = {};
        allMyShapes.layer[0].softShapes[counter2].osc = 0;
        allMyShapes.layer[0].softShapes[counter2].addPos = 0;
        allMyShapes.layer[0].softShapes[counter2].size;
        allMyShapes.layer[0].softShapes[counter2].opacity;
        allMyShapes.layer[0].softShapes[counter2].color;
        allMyShapes.layer[0].softShapes[counter2].pos = [];
    }

    if (textureShapesCheckbox.checked) {
        textureShapes.push([]);
        counter++;

        allMyShapes.layer[0].texShapes[counter] = {};
        allMyShapes.layer[0].texShapes[counter].osc = 0;
        allMyShapes.layer[0].texShapes[counter].addPos = 0;
        allMyShapes.layer[0].texShapes[counter].pos = [];
    }
}

function moveShapes() {
    textureShapes.forEach(shapeContainer => shapeContainer.forEach(textureShape => textureShape.shouldMove()));
    softShapes.forEach(shapeContainer => shapeContainer.forEach(softShape => softShape.shouldMove()));
    shapes.forEach(shapeContainer => shapeContainer.forEach(shape => shape.shouldMove()));
    lines.forEach(shapeContainer => shapeContainer.forEach(line => line.shouldMove()));

    loadedShapes.forEach(shape => shape.shouldMove());
}
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
let loadedShapeCol;
let loadedShapeColBlack = [];
let loadedShapeColB;
let loadedShapeColCount = [];
let loadedMouthShapeColCount = 0;

let loadedShapeBool = false;

let loadBool = true;

let mouthBool = false;
let mouthOpen;
let mouthTranslate = 0;

let amplitude;

let dissolve = false;
let preDissolve = false;

let phase = 0;
let zoff = 0;

let BGWhite = 0;
let Brightness = 0;
let blackCount = 0;
let softBrushBrightness = [];
let loadedSoftColCount = 0;

let animalCount = 0;
let dissolveCount = 0;

function loadShapes() {
    anim = nichts;
    amplitude = new p5.Amplitude();

    textureShapes[0] = new Array();
    lines[0] = new Array();
    softShapes[0] = new Array();
    shapes[0] = new Array();

    createParticles(anim);
    tex = createGraphics(innerWidth, innerHeight);
    tex.colorMode(HSB);

    col0 = [50, 100, 90];
    col1 = [240, 10, 90];
    col2 = [290, 80, 97];

    if (anim.layer[1] != undefined) {
        mouthOpen = anim.layer[1].mouthOpen;
    }

    for (var j = 0; j < animals.length; j++) {
        loadedShapeColBlack[j] = 0;
        loadedShapeColCount[j] = 0;
        softBrushBrightness[j] = 0;
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
    push();
    if (shape.layer[0].scale != undefined) {
        scale(shape.layer[0].scale[0],shape.layer[0].scale[1]);
    }
    if (shape.layer[0].translate != undefined) {
        translate(shape.layer[0].translate[0], shape.layer[0].translate[1]);
    }

    //draw on tex canvas  
    loadedCol = shape.layer[0].colors[0];

    loadedShapeColBlack[blackCount] += loadedCol[2][0]/1000;
    loadedShapeCol = color(loadedCol[0], loadedCol[1], loadedShapeColBlack[blackCount]);

    if (loadedShapeColBlack[blackCount] > loadedCol[2][0]) {
        loadedShapeColCount[blackCount] += 0.05;
        loadedShapeColB = map(cos(loadedShapeColCount[blackCount]), 1, -1, loadedCol[2][0], loadedCol[2][1]);

        loadedShapeCol = color(loadedCol[0], loadedCol[1], loadedShapeColB);
    }

    if (dissolve) {
        let colCh = map(sin(frameCount / 100), -1, 1, 0, 360);
        Brightness++;
        loadedShapeCol = color(colCh, 15, Brightness);
    }

    tex.fill(255,0,0);
    if (dissolve) {
        BGWhite++;
        tex.fill(BGWhite);
    }

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

    tex.beginContour();
    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    tex.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);

    shapeLength = shape.layer[0].shapes[0].pos.length;

    for (var i = 0; i < shapeLength; i++) {
        if (shape.layer[0].shapes[0].pos[i] != undefined) {

            if (shape.layer[0].shapes[0].osc != 0) {
                shape.layer[0].shapes[0].addPos += shape.layer[0].shapes[0].osc;
                // shape.layer[0].shapes[0].addPos += noise(i) ;

            } else {
                shape.layer[0].shapes[0].addPos += float(OscSlider.value);
            }

            osc = createVector(sin(shape.layer[0].shapes[0].addPos) * 4, cos(shape.layer[0].shapes[0].addPos) * 4);

            if (dissolve) {
                let x = map(sin(i / 20), 0, 1, -2, 2);
                let y = map(cos(i / 20), 0, 1, -2, 2);
                osc = createVector(noise(shape.layer[0].shapes[0].addPos) * x, noise(shape.layer[0].shapes[0].addPos) * y);
            }

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

                shapeShapesCol = shape.layer[0].shapes[j].color;
                loadedShapeColBlack[blackCount] += 0.1;
                fill(shapeShapesCol[0], shapeShapesCol[1], loadedShapeColBlack[blackCount]);


                if (loadedShapeColBlack[blackCount] > shapeShapesCol[2]) {
                    fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesCol[2]);
                }

                if (shapeShapesCol[2][1] != undefined) {
                    if (loadedShapeColBlack[blackCount] > shapeShapesCol[2][0]) {

                        shapeShapesColB = map(cos(loadedShapeColCount[blackCount]), 1, -1, shapeShapesCol[2][0], shapeShapesCol[2][1]);
                        fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesColB);
                    }
                }

                if (dissolve) {
                    let colCh = map(sin(frameCount / 100), -1, 1, 0, 360);
                    fill(colCh, 15, Brightness);
                }

            }

            beginShape();
            for (var i = 0; i < shape.layer[0].shapes[j].pos.length; i++) {
                if (shape.layer[0].shapes[j].osc != 0) {
                    shape.layer[0].shapes[j].addPos += shape.layer[0].shapes[j].osc;
                } else {
                    shape.layer[0].shapes[j].addPos += float(OscSlider.value);
                }

                osc = createVector(sin(shape.layer[0].shapes[j].addPos) * 4, cos(shape.layer[0].shapes[j].addPos) * 4);

                if (dissolve) {
                    let x = map(sin(i / 10), 0, 1, -2, 2);
                    let y = map(cos(i / 10), 0, 1, -2, 2);
                    osc = createVector(noise(shape.layer[0].shapes[j].addPos) * x, noise(shape.layer[0].shapes[j].addPos) * y);
                }

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
            if (shape.layer[0].lines[j].strokeWeight != undefined) {
                strokeWeight(shape.layer[0].lines[j].strokeWeight);
            }

            stroke(loadedShapeCol);

            if (dissolve) {
                let colCh = map(sin(frameCount / 100), -1, 1, 0, 360);
                stroke(colCh, 15, Brightness);
            }

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


            if (dissolve) {
                let x = map(sin(i / 10), 0, 1, -2, 2);
                let y = map(cos(i / 10), 0, 1, -2, 2);
                osc = createVector(noise(shape.layer[0].shapes[j].addPos) * x + noise(frameCount) * 5, noise(shape.layer[0].shapes[j].addPos) * y + noise(frameCount) * 5);
            }

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

            let minOp = map(sin(frameCount / 10), 0, 1, 0, 0.04)
            osc = createVector(sin(shape.layer[0].softShapes[j].addPos) * 3, cos(shape.layer[0].softShapes[j].addPos) * 3);

            if (dissolve) {
                let x = map(sin(i / 10), 0, 1, -2, 2);
                let y = map(cos(i / 10), 0, 1, -2, 2);
                osc = createVector(noise(shape.layer[0].softShapes[j].addPos) * x, noise(shape.layer[0].softShapes[j].addPos) * y);
            }

            // softBrushBrightness[blackCount] += 0.0000001;
            softBrushBrightness[blackCount] += 0.001;

            tint(255, softBrushBrightness[blackCount]);

            if (softBrushBrightness[blackCount] > shape.layer[0].softShapes[j].opacity) {
                tint(255, shape.layer[0].softShapes[j].opacity - minOp);
            }

            if (shape.layer[0].softShapes[j].opacity[1] != undefined) {
                if (softBrushBrightness[blackCount] > shape.layer[0].softShapes[j].opacity[0]) {
                    loadedSoftColCount += shape.layer[0].softShapes[j].opacity[0]/1500;
                    loadedShapeColB = map(cos(loadedSoftColCount), 1, -1, shape.layer[0].softShapes[j].opacity[0], shape.layer[0].softShapes[j].opacity[1]);
                    tint(255, loadedShapeColB);
                }
            }

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
            osc = createVector(sin(shape.layer[0].texShapes[j].addPos) * 4, cos(shape.layer[0].texShapes[j].addPos) * 4);

            if (dissolve) {
                let x = map(sin(i / 10), 0, 1, -2, 2);
                let y = map(cos(i / 10), 0, 1, -2, 2);
                osc = createVector(noise(shape.layer[0].texShapes[j].addPos) * x, noise(shape.layer[0].texShapes[j].addPos) * y);
            }

            vertex(shape.layer[0].texShapes[j].pos[i][0], shape.layer[0].texShapes[j].pos[i][1], 0, (1 - cos(u)) / 2, (1 + sin(u)) / 2);
            // image(rosaBrush, shape.softShapes[j].pos[i][0], shape.softShapes[j].pos[i][1], shape.softShapes[j].size, shape.softShapes[j].size);

            shape.layer[0].texShapes[j].pos[i][0] += osc.x;
            shape.layer[0].texShapes[j].pos[i][1] += osc.y;
        }
        endShape(CLOSE);
    }
    pop();
    
}

function drawMouth(shape) {
    push();
    if (shape.layer[0].scale != undefined) {
        scale(shape.layer[0].scale[0],shape.layer[0].scale[1]);
    }
    if (shape.layer[0].translate != undefined) {
        translate(shape.layer[0].translate[0], shape.layer[0].translate[1]);
    }


    if (shape.layer[1] != undefined) {
        push();
        mouthOpen = shape.layer[1].mouthOpen;
        mouthTranslate = 1;

        if (mouthBool) {
            mouthOpen = map(sin(frameCount * 5), -1, 1, 0.2, 0.6);
            mouthTranslate = map(sin(frameCount * 5), -1, 1, 1, 4);

            if (shape.layer[1].mouthKamel != undefined ) {
                mouthTranslate = map(sin(frameCount * 5), -1, 1, 1, 2);
            }
        }
       
        if (shape.layer[1].mouthMove != undefined) {
            scale(1, mouthOpen);
        }
        // translate(0, mouthTranslate);

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
                osc = createVector(sin(shape.layer[1].texShapes[j].addPos) * 4, cos(shape.layer[1].texShapes[j].addPos) * 4);

                if (dissolve) {
                    let x = map(sin(i / 10), 0, 1, -2, 2);
                    let y = map(cos(i / 10), 0, 1, -2, 2);
                    osc = createVector(noise(shape.layer[1].texShapes[j].addPos) * x, noise(shape.layer[1].texShapes[j].addPos) * y);
                }

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

        //plain shapes in color
        for (var j = 1; j < shape.layer[1].shapes.length; j++) {

            if (shape.layer[1].shapes[j].color != undefined) {
                shapeShapesCol = shape.layer[1].shapes[j].color;
                // if (shapeShapesCol[2][1] != undefined) {
                //     shapeShapesColB = map(cos(loadedShapeColCount), -1, 1, shapeShapesCol[2][0], shapeShapesCol[2][1]);
                //     // fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesColB);

                    loadedShapeColBlack[blackCount] += 0.1;
                    fill(shapeShapesCol[0], shapeShapesCol[1], loadedShapeColBlack[blackCount]);


                    if (loadedShapeColBlack[blackCount] > shapeShapesCol[2]) {
                        fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesCol[2]);
                    }

                    if (shapeShapesCol[2][1] != undefined) {
                        if (loadedShapeColBlack[blackCount] > shapeShapesCol[2][0]) {
                            loadedMouthShapeColCount += 0.005;

                            shapeShapesColB = map(cos( loadedMouthShapeColCount ), 1, -1, shapeShapesCol[2][0], shapeShapesCol[2][1]);
                            fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesColB);
                        }
                    }

                    if (dissolve) {
                        let colCh = map(sin(frameCount / 80), -1, 1, 0, 360);
                        fill(colCh, 15, 90);
                    }
                // }
            }

            beginShape();
            for (var i = 0; i < shape.layer[1].shapes[j].pos.length; i++) {

                if (shape.layer[1].shapes[j].osc != 0) {
                    shape.layer[1].shapes[j].addPos += shape.layer[1].shapes[j].osc;
                } else {
                    shape.layer[1].shapes[j].addPos += float(OscSlider.value);
                }

                osc = createVector(sin(shape.layer[1].shapes[j].addPos) * 3 * mouthTranslate, cos(shape.layer[1].shapes[j].addPos) * 3 * mouthTranslate);

                if (shape.layer[1].mouthMove != undefined) {
                    osc = createVector(sin(shape.layer[1].shapes[j].addPos) * 3, cos(shape.layer[1].shapes[j].addPos) * 3 );
                }  
                
                // if (shape.layer[1].mouthKamel != undefined ) {
                //     osc = createVector(sin(shape.layer[1].shapes[j].addPos) * 3, cos(shape.layer[1].shapes[j].addPos) * 3 );
                // }

                if (dissolve) {
                    let x = map(sin(i / 10), 0, 1, -1, 1);
                    let y = map(cos(i / 10), 0, 1, -1, 1);
                    osc = createVector(noise(shape.layer[1].shapes[j].addPos) * x + noise(frameCount) * 5, noise(shape.layer[1].shapes[j].addPos) * y + noise(frameCount) * 5);
                }

                curveVertex(shape.layer[1].shapes[j].pos[i][0], shape.layer[1].shapes[j].pos[i][1]);

                shape.layer[1].shapes[j].pos[i][0] += osc.x;
                shape.layer[1].shapes[j].pos[i][1] += osc.y;
            }
            endShape(CLOSE);
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

                let minOp = map(sin(frameCount / 10), 0, 1, 0, 0.04)

                // let x = map(noise(shape.softShapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[1].softShapes[j].addPos) * 3, cos(shape.layer[1].softShapes[j].addPos) * 3);
                tint(255, shape.layer[1].softShapes[j].opacity - minOp);
                image(eval(shape.layer[1].softShapes[j].color), shape.layer[1].softShapes[j].pos[i][0], shape.layer[1].softShapes[j].pos[i][1], shape.layer[1].softShapes[j].size, shape.layer[1].softShapes[j].size);

                shape.layer[1].softShapes[j].pos[i][0] += osc.x;
                shape.layer[1].softShapes[j].pos[i][1] += osc.y;
            }
        }
        pop();

        pop();
        pop();
    }
}

function drawRest(shape, layerNum) {

    push();
    if (shape.layer[layerNum].scale != undefined) {
        scale(shape.layer[layerNum].scale[0],shape.layer[layerNum].scale[1]);
    }
   
    if (shape.layer[layerNum].translate != undefined) {
        translate(shape.layer[layerNum].translate[0], shape.layer[layerNum].translate[1]);
    }

    //plain shapes in color
    for (var j = 0; j < shape.layer[layerNum].shapes.length; j++) {

        if (shape.layer[layerNum].shapes[j].color != undefined) {
            // shape.layer[layerNum].shapes[j].color[3] = map(sin(frameCount/10), 0, 1, 0.8, 1);
            // fill(shape.layer[layerNum].shapes[j].color);

            if (shape.layer[layerNum].shapes[j].color != undefined) {
                shapeShapesCol = shape.layer[layerNum].shapes[j].color;
                if (shapeShapesCol[2][1] != undefined) {
                    shapeShapesColB = map(sin(frameCount / 10), 0, 1, shapeShapesCol[2][0], shapeShapesCol[2][1]);
                    fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesColB);

                    if (personShowBool) {
                        fill(shapeShapesCol[0], shapeShapesCol[1], map(sin(frameCount / 10), -1, 1, 30, shapeShapesColB));
                    }

                } else {
                    fill(shapeShapesCol[0], shapeShapesCol[1], shapeShapesCol[2]);
                   
                    if (personShowBool) {
                        fill(shapeShapesCol[0], shapeShapesCol[1], map(sin(frameCount / 10), -1, 1, 30, shapeShapesCol[2]));
                    }
                }
            }

            beginShape();
            for (var i = 0; i < shape.layer[layerNum].shapes[j].pos.length; i += 3) {
                if (shape.layer[layerNum].shapes[j].osc != 0) {
                    shape.layer[layerNum].shapes[j].addPos += shape.layer[layerNum].shapes[j].osc;
                } else {
                    shape.layer[layerNum].shapes[j].addPos += float(OscSlider.value);
                }

                // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[layerNum].shapes[j].addPos) * 3, cos(shape.layer[layerNum].shapes[j].addPos) * 3);

                if (personShowBool) {
                    let x = map(sin(i / 20), 0, 1, -2, 2);
                    let y = map(cos(i / 20), 0, 1, -2, 2);
                    osc = createVector(noise(shape.layer[layerNum].shapes[j].addPos) * x, noise(shape.layer[layerNum].shapes[j].addPos) * y);
                }

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

            // if (personShowBool) {
            //     let x = map(sin(i / 10), 0, 1, -2, 2);
            //     let y = map(cos(i / 10), 0, 1, -2, 2);
            //     osc = createVector(noise(shape.layer[layerNum].texShapes[j].addPos) * x, noise(shape.layer[layerNum].texShapes[j].addPos) * y);
            // }
            
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

                if (personShowBool) {
                    let x = map(sin(i / 10), 0, 1, -2, 2);
                    let y = map(cos(i / 10), 0, 1, -2, 2);
                    osc = createVector(noise(shape.layer[layerNum].shapes[j].addPos) * x + noise(frameCount) * 5, noise(shape.layer[layerNum].shapes[j].addPos) * y + noise(frameCount) * 5);
                }

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

            if (personShowBool) {
                let x = map(sin(i / 10), 0, 1, -2, 2);
                let y = map(cos(i / 10), 0, 1, -2, 2);
                osc = createVector(noise(shape.layer[layerNum].softShapes[j].addPos) * x, noise(shape.layer[layerNum].softShapes[j].addPos) * y);
            }

            tint(255, shape.layer[layerNum].softShapes[j].opacity);

            if (shape.layer[layerNum].softShapes[j].opacity[1] != undefined) {
                    loadedSoftColCount += shape.layer[layerNum].softShapes[j].opacity[0]/1500;
                    loadedShapeColB = map(cos(loadedSoftColCount), 1, -1, shape.layer[layerNum].softShapes[j].opacity[0], shape.layer[layerNum].softShapes[j].opacity[1]);
                    tint(255, loadedShapeColB);
                
            }

            image(eval(shape.layer[layerNum].softShapes[j].color), shape.layer[layerNum].softShapes[j].pos[i][0], shape.layer[layerNum].softShapes[j].pos[i][1], shape.layer[layerNum].softShapes[j].size, shape.layer[layerNum].softShapes[j].size);

            shape.layer[layerNum].softShapes[j].pos[i][0] += osc.x;
            shape.layer[layerNum].softShapes[j].pos[i][1] += osc.y;
        }
    }
    pop();
}

function drawAllLines(shape) {

    for (var k = 0; k < 3; k++) {

        layerNum = k;

        //plain shapes in color
        for (var j = 0; j < shape.layer[layerNum].shapes.length; j++) {
            if (shape.layer[layerNum].shapes[j].color != undefined) {

                push();

                fill(255);
                noFill();
                strokeWeight(1);
                stroke(255);

                beginShape();
                for (var i = 0; i < shape.layer[layerNum].shapes[j].pos.length; i += 3) {
                    if (shape.layer[layerNum].shapes[j].osc != 0) {
                        shape.layer[layerNum].shapes[j].addPos += shape.layer[layerNum].shapes[j].osc;
                    } else {
                        shape.layer[layerNum].shapes[j].addPos += float(OscSlider.value);
                    }

                    let x = map(sin(i / 10), 0, 1, -2, 2);
                    let y = map(cos(i / 10), 0, 1, -2, 2);

                    osc = createVector(noise(shape.layer[layerNum].shapes[j].addPos) * x, noise(shape.layer[layerNum].shapes[j].addPos) * y);

                    curveVertex(shape.layer[layerNum].shapes[j].pos[i][0], shape.layer[layerNum].shapes[j].pos[i][1]);

                    // shape.layer[layerNum].shapes[j].pos[i][0] += osc.x;
                    // shape.layer[layerNum].shapes[j].pos[i][1] += osc.y;
                }
                endShape(CLOSE);
            }
        }

        //tex shapes
        for (var j = 0; j < shape.layer[layerNum].texShapes.length; j++) {
            push();

            fill(255);
            noFill();
            strokeWeight(1);
            stroke(255);

            beginShape();
            for (var i = 0; i < shape.layer[layerNum].texShapes[j].pos.length; i++) {
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

                // shape.layer[layerNum].texShapes[j].pos[i][0] += osc.x;
                // shape.layer[layerNum].texShapes[j].pos[i][1] += osc.y;
            }
            endShape(CLOSE);
        }

        //lines
        for (var j = 0; j < shape.layer[layerNum].lines.length; j++) {
            push();

            fill(255);
            noFill();
            strokeWeight(1);
            stroke(255);

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

                    // shape.layer[layerNum].lines[j].pos[i][0] += osc.x;
                    // shape.layer[layerNum].lines[j].pos[i][1] += osc.y;
                }
            }
            endShape();
            pop();
        }

    }
}

function drawAllSoft(shape) {

    for (var k = 0; k < 3; k++) {

        layerNum = k;

        //plain shapes in color
        for (var j = 0; j < shape.layer[layerNum].shapes.length; j++) {
            if (shape.layer[layerNum].shapes[j].color != undefined) {

                // beginShape();
                for (var i = 0; i < shape.layer[layerNum].shapes[j].pos.length; i += 3) {
                    if (shape.layer[layerNum].shapes[j].osc != 0) {
                        shape.layer[layerNum].shapes[j].addPos += shape.layer[layerNum].shapes[j].osc;
                    } else {
                        shape.layer[layerNum].shapes[j].addPos += float(OscSlider.value);
                    }


                    let x = map(sin(i / 10), 0, 1, -2, 2);
                    let y = map(cos(i / 10), 0, 1, -2, 2);

                    osc = createVector(noise(shape.layer[layerNum].shapes[j].addPos) * x, noise(shape.layer[layerNum].shapes[j].addPos) * y);

                    tint(255, 0.1);
                    image(rosaBrush, shape.layer[layerNum].shapes[j].pos[i][0], shape.layer[layerNum].shapes[j].pos[i][1], 300, 300);

                    // shape.layer[layerNum].shapes[j].pos[i][0] += osc.x;
                    // shape.layer[layerNum].shapes[j].pos[i][1] += osc.y;
                }
                // endShape(CLOSE);
            }
        }

        //tex shapes
        for (var j = 0; j < shape.layer[layerNum].texShapes.length; j++) {
            for (var i = 0; i < shape.layer[layerNum].texShapes[j].pos.length; i++) {

                if (shape.layer[layerNum].texShapes[j].osc != 0) {
                    shape.layer[layerNum].texShapes[j].addPos += shape.layer[layerNum].texShapes[j].osc;
                } else {
                    shape.layer[layerNum].texShapes[j].addPos += float(OscSlider.value);
                }

                // let x = map(noise(shape.texShapes[j].addPos / 10), 0, 1, 0, 5);
                osc = createVector(sin(shape.layer[layerNum].texShapes[j].addPos) * 4, cos(shape.layer[layerNum].texShapes[j].addPos) * 4);

                tint(255, 0.1);
                image(rosaBrush, shape.layer[layerNum].texShapes[j].pos[i][0], shape.layer[layerNum].texShapes[j].pos[i][1], 300, 300);

                // shape.layer[layerNum].texShapes[j].pos[i][0] += osc.x;
                // shape.layer[layerNum].texShapes[j].pos[i][1] += osc.y;
            }
        }

        //lines
        for (var j = 0; j < shape.layer[layerNum].lines.length; j++) {
            for (var i = 0; i < shape.layer[layerNum].lines[j].pos.length; i++) {

                if (shape.layer[layerNum].lines[j].pos[i] != undefined) {

                    if (shape.layer[layerNum].lines[j].osc != 0) {
                        shape.layer[layerNum].lines[j].addPos += shape.layer[layerNum].lines[j].osc;
                    } else {
                        shape.layer[layerNum].lines[j].addPos += float(OscSlider.value);
                    }

                    // let x = map(noise(shape.shapes[j].addPos / 10), 0, 1, 0, 5);
                    osc = createVector(sin(shape.layer[layerNum].lines[j].addPos) * 3, cos(shape.layer[layerNum].lines[j].addPos) * 3);

                    tint(255, 0.1);
                    image(rosaBrush, shape.layer[layerNum].lines[j].pos[i][0], shape.layer[layerNum].lines[j].pos[i][1], 300, 300);

                    // shape.layer[layerNum].lines[j].pos[i][0] += osc.x;
                    // shape.layer[layerNum].lines[j].pos[i][1] += osc.y;
                }
            }
            pop();
        }

        //soft shapes
        for (var j = 0; j < shape.layer[layerNum].softShapes.length; j++) {
            for (var i = 0; i < shape.layer[layerNum].softShapes[j].pos.length; i++) {

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

    let colCh;

    for (var i = 0; i < shapes.length; i++) {
        push();

        if (personShowBool) {
            colCh = map(sin(frameCount / ((i * 100) + 100)), -1, 1, 0, 360);
            loadedShapeCol = color(colCh, 25, 100);
            fill(loadedShapeCol);
        }

        beginShape();
        for (var j = 0; j < shapes[i].length; j++) {
            shapes[i][j].curvePoint();
        }

        // if (shapes[i].length == 100){
        //     endShape(CLOSE);
        // }

        pop();

    }
}

// function drawSoftShapes() {

//     let colCh;

//     for (var i = 0; i < shapes.length; i++) {
//         push();

//         if (personShowBool) {
//             colCh = map(sin(frameCount / ((i * 100) + 100)), -1, 1, 0, 360);
//             loadedShapeCol = color(colCh, 25, 100);
//             fill(loadedShapeCol);
//         }

//         beginShape();
//         for (var j = 0; j < shapes[i].length; j++) {
//             shapes[i][j].curvePoint();
//         }

//         // if (shapes[i].length == 100){
//         //     endShape(CLOSE);
//         // }
        
//         pop();

//     }
// }

function drawlines() {
    push();
    fill(255);
    for (var i = 0; i < lines.length; i++) {
        noFill();
        strokeWeight(5);

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

function handDrawShape() {


    // pos = createVector(mouseX - innerWidth / 2, mouseY - innerHeight / 2);
    // oldPos = createVector(pmouseX - innerWidth / 2, pmouseY - innerHeight / 2);
    // newPos = createVector(lerp(oldPos.x, pos.x, 0.5), lerp(oldPos.y, pos.y, 0.5), 0);

    // let shape = new brushes(newPos, newOsc, undefined, undefined, undefined, shapeCol);
    // shapes[counter1].push(shape);
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
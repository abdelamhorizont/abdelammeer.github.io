let video;
let poseNet;
let pose;
let skeleton;
let personImage;

let eyeLX = 0;
let eyeLY = 0;
let eyeRX = 0;
let eyeRY = 0;
let noseX = 0;
let noseY = 0;
let scaleMouth = 0;

let bodypix;
let segmentation;

let personNegBool = false;
let personShowBool = false;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.5, // 0 - 1, defaults to 0.5
    // leftFace,
};

function personSetup() {
    mensch = createGraphics(innerWidth, innerHeight);

    video.size(innerWidth, innerHeight);
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);

    mouthOpen = Anglerfisch.layer[1].mouthOpen;

}

function personDraw() {
    for (var j = 0; j < myWords.length; j++) {
        if (myWords[j] == 'Person') {
            personShowBool = true;
        }
    }

    personShow();
}

function videoReady() {
    bodypix = ml5.bodyPix(options);
    bodypix.segment(video, gotResults);

    // if(personBool){
    //     bodypix.segmentWithParts(video, gotResults, options);
    // }

}

function gotResults(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    segmentation = result;
    bodypix.segment(video, gotResults);

    // if(personBool){
    //     bodypix.segmentWithParts(video, gotResults, options);
    // }
}

function personShow() {
    if (personShowBool) {
        if (!personNegBool) {
            push();
            tint(255, 0);
            personImage = mensch.image(video, 0, 0, video.width, video.height);
            pop();
        }

        mensch.background(0);
        mensch.image(tex, 0, 0, width, height);

        push();
        if (segmentation) {
            if (personNegBool) {
                mensch.image(segmentation.personMask, 0, 0, width, height);
            } else {
                mensch.image(segmentation.backgroundMask, 0, 0, width, height);
            }
        }
        pop();

        // body();

        texture(mensch);
        plane(innerWidth, innerHeight);

        face();
        // frame(Anglerfisch);
    }
}

function body() {

    push();
    translate(-innerWidth / 4, -innerHeight / 4);

    if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        // fill(255, 0, 0);
        // ellipse(pose.nose.x, pose.nose.y, d);
        fill(0, 0, 255);
        ellipse(eyeR.x, eyeR.y, 32);
        ellipse(eyeL.x, eyeL.y, 32);

        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill(0, 255, 0);
            ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(0);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
    pop();
}

function face() {
    push();
    scale(1.2);

    if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y) * 1.5;

        eyeLX = lerp(eyeLX, eyeL.x, 0.5);
        eyeLY = lerp(eyeLY, eyeL.y, 0.5);
        eyeRX = lerp(eyeRX, eyeR.x, 0.5);
        eyeRY = lerp(eyeRY, eyeR.y, 0.5);

        noseX = lerp(noseX, pose.nose.x, 0.5);
        noseY = lerp(noseY, pose.nose.y, 0.5);

        push();
        translate(-video.width / 2, -video.height / 2);

        for (var i = 0; i < 5; i++) {
            image(rosaBrush, eyeRX, eyeRY, d, d);
            image(rosaBrush, eyeLX, eyeLY, d, d);
        }
        pop();

        let d2 = map(d, 200, 500, 0.3, 0.8);
        scaleMouth = lerp(scaleMouth, d2, 0.5)
        push();
        translate(-video.width / 2, -video.height / 2);
        push();
        translate(noseX + (d2 * 150), noseY + (d2 * 120));

        scale(scaleMouth);
        drawMouth(Anglerfisch);
        pop();

    }
    pop();

}

function gotPoses(poses) {

    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelReady() {
    console.log('model is ready');
}

function frame(shape) {
    mensch.fill(0);

    mensch.push();
    mensch.translate(innerWidth / 2, innerHeight / 2);

    mensch.beginShape();

    mensch.vertex(-innerWidth / 2, -innerHeight / 2);
    mensch.vertex(-innerWidth / 2, -innerHeight / 2);

    mensch.vertex(-innerWidth / 2, innerHeight / 2);
    mensch.vertex(-innerWidth / 2, innerHeight / 2);

    mensch.vertex(innerWidth / 2, innerHeight / 2);
    mensch.vertex(innerWidth / 2, innerHeight / 2);

    mensch.vertex(innerWidth / 2, -innerHeight / 2);
    mensch.vertex(innerWidth / 2, -innerHeight / 2);

    mensch.vertex(-innerWidth / 2, -innerHeight / 2);

    tex.beginContour();
    mensch.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    mensch.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);

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

            mensch.curveVertex(shape.layer[0].shapes[0].pos[i][0], shape.layer[0].shapes[0].pos[i][1]);

            // loadedShapes[i].curvePoint();
            shape.layer[0].shapes[0].pos[i][0] += osc.x;
            shape.layer[0].shapes[0].pos[i][1] += osc.y;

        }
    }

    mensch.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    mensch.vertex(shape.layer[0].shapes[0].pos[0][0], shape.layer[0].shapes[0].pos[0][1]);
    mensch.endContour();
    mensch.endShape(CLOSE);

    mensch.pop();
}
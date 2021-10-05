//arrays of objects containing the shapes
var softShapes = [];
var softShapes2 = [];
var shapes = [];
var lines = [];

//test for loading JSON
let shapeFromJson;
let loadedShapes = [];

//buttons and stuff
let shapesCheckbox, softShapesCheckboc, textureShapesCheckbox, lineCheckbox;
let moveButton, saveButton, loadButton, brush_input, shapeColInput, shapeCol;
let newOsc, newOscVal, softShapeRadius, softShapeRadiusVal, softShapeOpacity, softShapeOpacityVal, softShapeBrush;
var counter = 0;
let t = 0;
let softRadiusSlider;
let OscSlider;

let capture;

//for moving the illutex() function
let fishAdd1 = 0, fishAdd2 = 0;
let fisch, testShape, ghost;
let anim;

let animals;
let endBool = false;

function preload() {
	mySound1 = loadSound('sounds/Amazonian_Boto_30_06_21.m4a');
	mySound2 = loadSound('sounds/antarctic_seals_30_06_21.m4a');
	mySound3 = loadSound('sounds/humpback_whale_song_30_06_21.m4a');
	mySound4 = loadSound('sounds/mamiraua_in-air_25_08_17.m4a');
	mySound5 = loadSound('sounds/mobutu_monument-dr_congo_13_05_19.m4a');
	mySound6 = loadSound('sounds/underwater_cave_recordings_03_12_20.m4a');

	airbells = loadSound('sounds/airbells.wav');
	drums = loadSound('sounds/drums.wav');
	drums_slow = loadSound('sounds/drums_slow.wav');
	drums_both = loadSound('sounds/drums_both.wav');
	drums_fast = loadSound('sounds/drums_fast.wav');
	airbells_end = loadSound('sounds/airbells_end.wav');

	loadedText = loadStrings('assets/text.txt');

	gelbBrush = loadImage('assets/gelb2.png');
	rosaBrush = loadImage('assets/rosa2.png');
	rotBrush = loadImage('assets/rot.png');
	orangeBrush = loadImage('assets/orange.png');
	blackBrush = loadImage('assets/black2.png');
	blueBrush = loadImage('assets/blau.png');
	grünBrush = loadImage('assets/grün.png');
	braunBrush = loadImage('assets/braun.png');
	blauGrünBrush = loadImage('assets/blaugrün.png');
	braunGrünBrush = loadImage('assets/braungrün.png');

	testShape = loadJSON('shapes/test.json');
	nichts = loadJSON('shapes/nichts.json');

	Anglerfisch = loadJSON('shapes/Anglerfisch.json');
	Königskrabbe = loadJSON('shapes/Krabbe.json');
	Schirmqualle = loadJSON('shapes/Qualle.json');
	Dromedar = loadJSON('shapes/Kamel.json');
	Schneeeule = loadJSON('shapes/Owl.json');
	Legehenne = loadJSON('shapes/Henne.json');
	Honigbiene = loadJSON('shapes/Honigbiene.json');
	Hauskatze = loadJSON('shapes/Hauskatze.json');
	Waldelefant = loadJSON('shapes/Waldelefant.json');

	Geist = loadJSON('shapes/ghost.json');

	Korallenriff = loadJSON('shapes/Koralle.json');
	Wüste = loadJSON('shapes/Wüste.json');
	Regenwald = loadJSON('shapes/Regenwald.json');

	Fliegenpilz = loadJSON('shapes/Fliegenpilz.json');
	Regenwolke = loadJSON('shapes/Regenwolke.json');

	// animals = ['Anglerfisch', 'Fliegenpilz', 'Regenwolke', 'Königskrabbe', 'Waldelefant', 'Regenwald', 'Hauskatze', 'Honigbiene', 'Schirmqualle', 'Legehenne', 'Dromedar', 'Schneeeule', 'Geist', 'Korallenriff', 'Sandwüste', 'nichts', 'testShape'];
	animals = ['Geist', 'Wüste', 'Korallenriff', 'Regenwald', 'Regenwolke', 'Hauskatze', 'Schirmqualle', 'Königskrabbe', 'Legehenne', 'Waldelefant', 'Honigbiene', 'Fliegenpilz', 'Schneeeule', 'Dromedar', 'Anglerfisch', 'nichts'];

	bodypix = ml5.bodyPix(options);
	video = createCapture(VIDEO, videoReady);
	video.hide();
	// filter(INVERT);
}

function setup() {

	createCanvas(innerWidth + 1, innerHeight + 1, WEBGL);
	colorMode(HSB);
	// capture = createCapture(VIDEO);
	// capture.position(0,0);
	// capture.hide();

	frameRate(20);
	bot();

	buttons();

	loadShapes();
	saveShapes();

	textSize(20);
	noStroke();

	soundSetup();

	personSetup();

	// chat();

	typeSetup();
  
	// document.getElementById('talk').dispatchEvent(new MouseEvent('click', {shiftKey: true}))
	// document.getElementById('user_input').dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));

}

function draw() {
	background(0);
	inputValues();
	noCursor();

	speechToImage();

	if (!personShowBool) {
		drawShapes();
	}

	drawTextureShapes();
	drawlines();
	drawSoftShapes();

	// textur(col0);
	// texture(tex);
	// plane(innerWidth, innerHeight);

	typeDraw();

	// worm();
	// softBrushTail();

	// randomShape();

	soundDraw(mySound6);

	// for (var j = 0; j < myWords.length; j++) {
	// for (var i = 0; i < animals.length; i++) {
	// 	if (myWords[j] == animals[i]){
	// 		loadBool = true;
	// 	}
	// }
	// }

	document.getElementById('talk').dispatchEvent(new MouseEvent('click', {shiftKey: true}))

}

function speechToImage() {
	// push();
	// scale(1, 0.5);
	// tex.scale(1, 1);

	if (loadBool) {

		drawLoadedShapes(anim);
		drawMouth(anim);


		for (var i = 0; i < animals.length; i++) {
			for (var j = 0; j < myWords.length; j++) {
				if (myWords[j] == animals[i]) {
					anim = eval(myWords[j]);

					blackCount = animals.indexOf(animals[i]);
					// user_input.value('');				
				}
			}
			for (var j = 0; j < myWordsOutput.length; j++) {
				if (myWordsOutput[j] == animals[i]) {
					anim = eval(myWordsOutput[j]);

					blackCount = animals.indexOf(animals[i]);
				}
			}
		}

		personDraw();

		for (var i = 0; i < animals.length; i++) {
			for (var k = 2; k < eval(animals[i]).layer.length; k++) {

				if (eval(animals[i]).layer[k].name[0] != undefined) {
					for (var j = 0; j < myWords.length; j++) {
						for (var l = 0; l < eval(animals[i]).layer[k].name.length; l++) {

							if (myWords[j] == eval(animals[i]).layer[k].name[l]) {
								drawRest(eval(animals[i]), k);
							}
						}
					}
				}

				for (var j = 0; j < myWords.length; j++) {
					if (myWords[j] == eval(animals[i]).layer[k].name) {
						drawRest(eval(animals[i]), k);
					}
				}

				if (eval(animals[i]).layer[k].name[0] != undefined) {
					for (var j = 0; j < myWordsOutput.length; j++) {
						for (var l = 0; l < eval(animals[i]).layer[k].name.length; l++) {

							if (myWordsOutput[j] == eval(animals[i]).layer[k].name[l]) {
								drawRest(eval(animals[i]), k);

							}
						}

					}
				}

			}
		}
	}

	for (var j = 0; j < myWords.length; j++) {
		if (myWords[j] == 'Programm') {
			preDissolve = true;
			typeShowBool = true;

		}
	}

	for (var j = 0; j < myWordsOutput.length; j++) {
        if (myWordsOutput[j] == 'Programm') {

			typeShowBool = true;
			preDissolve = true;

		}
	}

	if (preDissolve) {
		// dissolve = true;
	}

	if (dissolve) {
		personShowBool = false;
		dissolveCount++;

		anim = eval(animals[animalCount]);
		if (animalCount < animals.length) {
			if (dissolveCount % 60 == 0) {
				animalCount++;
			}
		}

		if (animalCount == animals.length) {
	
			endBool = true;

		}
	}

	if (endBool){
		// drums_fast.setVolume(0);
		anim = nichts;
		dissolve = false;
		preDissolve = false;
		typeShowBool = false;
	}


	if (animalCount > animals.length - 3) {
		volume3 -= 0.01
	}

	if(typeShowBool){
		personShowBool = false;
		
		user_input.value('');

		for(var i = 0; i < outputSpan.length; i++){
			outputSpan[i].html('');
		}
	}

	if(endBool){
		location.reload();
	}

}

function mouseDragged() {
	shapesDragged();

}

function mouseReleased() {
	shapesReleased();
	// oscSound.amp(0.1, 0.5);
}

function checked() {
	if (this.checked()) {
		moveShapes();
	}
}

function createFile() {
	saveJSON(allMyShapes, '.json');
}

function buttons() {


	shapesCheckbox = document.getElementById('shapesCheckbox');
	softShapesCheckbox = document.getElementById('softShapesCheckbox');
	textureShapesCheckbox = document.getElementById('textureShapesCheckbox');
	lineCheckbox = document.getElementById('lineCheckbox');

	shapesCheckbox.checked = true;
	softShapesCheckbox.checked = true;

	moveButton = document.getElementById('moveButton');

	softRadiusSlider = document.getElementById('RadiusSlider');
	OscSlider = document.getElementById('OscSlider');

	loadButton = select('#load');

	brush_input = select('#brush_input');
	shapeColInput = select('#shapeCol');

}

function kamera() {
	// createEasyCam();
	// cam = createCamera();
	// setCamera(cam);

	// let xCam = map(mouseX, 0, width, -1800, 1800);
	// camera(xCam, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	// cam.lookAt(0, 0, 0);
	// camera.setPosition(sin(frameCount / 60) * 200, 0, 100);

	// ambientLight(0, 0, 255);
}

function clicked() {
	loadBool = !loadBool;
}

function inputValues() {
	loadButton.mousePressed(clicked);

	newOsc = float(OscSlider.value);
	newOscVal = select('#OscSliderValue');
	newOscVal.html(newOsc);

	softShapeRadius = float(softRadiusSlider.value);
	softShapeRadiusVal = select('#RadiusSliderValue');
	softShapeRadiusVal.html(softShapeRadius);

	softShapeOpacity = float(opacitySlider.value);
	softShapeOpacityVal = select('#opacitySliderValue');
	softShapeOpacityVal.html(softShapeOpacity);

}

function windowResized() {
	resizeCanvas(innerWidth, innerHeight);
	tex.resizeCanvas(innerWidth, innerHeight);

}

function ritaSetup() {
	ritaTest = createGraphics(200, 200);
	ritaTest.background(50);

	let s = "Der Elefant verschwand ploetzlich!";

	let words = RiTa.tokenize(s);
	for (let i = 0; i < words.length; i++) {
		ritaTest.text(words[i], 50, 50 + i * 20);
	}
}

function ritaDraw() {
	image(ritaTest, 0, 0, 400, 400);
}

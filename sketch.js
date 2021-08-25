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

function preload() {
	mySound1 = loadSound('sounds/Amazonian_Boto_30_06_21.m4a');
	mySound2 = loadSound('sounds/antarctic_seals_30_06_21.m4a');
	mySound3 = loadSound('sounds/humpback_whale_song_30_06_21.m4a');
	mySound4 = loadSound('sounds/mamiraua_in-air_25_08_17.m4a');
	mySound5 = loadSound('sounds/mobutu_monument-dr_congo_13_05_19.m4a');
	mySound6 = loadSound('sounds/underwater_cave_recordings_03_12_20.m4a');

	loadedText = loadStrings('assets/text.txt');

	gelbBrush = loadImage('assets/gelb2.png');
	rosaBrush = loadImage('assets/rosa2.png');
	rotBrush = loadImage('assets/rot.png');
	orangeBrush = loadImage('assets/orange.png');
	blackBrush = loadImage('assets/black2.png');
	blueBrush = loadImage('assets/blau.png');

	testShape = loadJSON('shapes/test.json');
	nichts = loadJSON('shapes/nichts.json');

	Anglerfisch = loadJSON('shapes/Anglerfisch.json');
	Königskrabbe = loadJSON('shapes/Krabbe.json');
	Schirmqualle = loadJSON('shapes/Qualle.json');
	Kamel = loadJSON('shapes/Kamel.json');
	Schleiereule = loadJSON('shapes/Owl.json');
	Legehenne = loadJSON('shapes/Henne.json');
	Honigbiene = loadJSON('shapes/Honigbiene.json');

	Mensch = loadJSON('shapes/Mensch.json');
	Geist = loadJSON('shapes/ghost.json');

	Koralle = loadJSON('shapes/Koralle.json');
	Wüste = loadJSON('shapes/Wüste.json');

	animals = ['Anglerfisch', 'Königskrabbe', 'Honigbiene', 'Schirmqualle', 'Legehenne', 'testShape', 'Kamel', 'Schleiereule', 'Mensch', 'Geist', 'Koralle', 'Wüste', 'nichts'];
	video = createCapture(VIDEO, videoReady);
	video.hide();

}

function setup() {
	createCanvas(innerWidth, innerHeight, WEBGL);
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

	// soundSetup(mySound6);

	personSetup();

	// chat();

	typeSetup();

}

function draw() {
	background(0);
	inputValues();

	speechToImage();

	drawShapes();
	drawTextureShapes();
	drawlines();
	drawSoftShapes();

	// textur(col0);
	// texture(tex);
	// plane(innerWidth, innerHeight);

	typeDraw();

	worm();
	
	// randomShape();

	// soundDraw(mySound6);

}

function speechToImage(){
	if (loadBool) {

		drawLoadedShapes(anim);
		drawMouth(anim);


		for (var i = 0; i < animals.length; i++) {
			for (var j = 0; j < myWords.length; j++) {
				if (myWords[j] == animals[i]) {
					anim = eval(myWords[j]);

					blackCount = animals.indexOf(animals[i]);
				}  
			}	
			for (var j = 0; j < myWordsOutput.length; j++) {
				if(myWordsOutput[j] == animals[i]){
					anim = eval(myWordsOutput[j]);

					blackCount = animals.indexOf(animals[i]);
				}
			}
		}

		personDraw();

		for (var i = 0; i < animals.length; i++) {
			for (var k = 2; k < eval(animals[i]).layer.length; k++) {

				for (var j = 0; j < myWords.length; j++) {
					if (myWords[j] == eval(animals[i]).layer[k].name) {
						drawRest(eval(animals[i]), k);

					}
				}

				for (var j = 0; j < myWordsOutput.length; j++) {
					if (myWordsOutput[j] == eval(animals[i]).layer[k].name) {
						drawRest(eval(animals[i]), k);

					}
				}

			}
		}

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

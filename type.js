let centerText = [];

let words = [];
let letters = [];

let loadedText;
let centerDiv;
let sentenceDiv;
let wordDiv = [];
let lettersDiv = [];

let allWords = [];
let allLetters = [];

let spacing = [];
let outputSpacing = [];
let outputCount = [];
let textCount = [];
let wordCount = 0;
let sentCount = 0;
let textAnimCount = 0;

let typeShowBool = false;

function typeSetup() {
    outputLoad();
    centerTextload();
}

function typeDraw() {
    centerTextdraw();
    outputDraw();

    for (var j = 0; j < myWords.length; j++) {
        if (myWords[j] == 'hallo') {
            typeShowBool = true;
            user_input.value('');
            speech.speak('haustür');

        }
    }
}

function outputLoad() {
    for (var i = 0; i < outputSpan.length; i++) {
        outputCount[i] = 0;
        outputSpacing[i] = 0;
        outputSpan[i].style('opacity', '0');
    }

}

function outputDraw() {
    for (var i = 0; i < outputSpan.length; i++) {
        outputCount[i] = frameCount / (noise(i) * 30);
        outputSpacing[i] = map(sin(outputCount[i]), -1, 1, 0, 0.3);

        outputSpan[i].style('letter-spacing', outputSpacing[i] + 'em');

        outputSpan[i].style('animation', 'fade 1s linear 0s 1 normal');
        outputSpan[i].style('animation-fill-mode', 'forwards');
        outputSpan[i].style('opacity', '0');
    }
}

function centerTextload() {
    centerDiv = select('#centerText');
    sentenceDiv = [];

    for (var i = 0; i < loadedText.length; i++) {
        sentenceDiv[i] = createDiv('');
        sentenceDiv[i].parent(centerDiv);

        allWords[i] = loadedText[i].split(" ");
        allLetters[i] = loadedText[i].split("");

        // wordDiv.push(allWords[i]);
        lettersDiv.push(allLetters[i]);

        // words[i] = [];
        letters[i] = [];

        textCount[i] = [];
        spacing[i] = [];

        for (var j = 0; j < allWords[i].length; j++) {
            letters[i][j] = [];
            textCount[i][j] = [];
            spacing[i][j] = [];

            // letters[i][j] = createSpan(' ');

            for (var k = 0; k < allWords[i][j].length + 1; k++) {
                textCount[i][j][k] = 0;

                if (k == allWords[i][j].length) {
                    letters[i][j][k] = createSpan(' ');
                    letters[i][j][k].parent(sentenceDiv[i]);
                    letters[i][j][k].style('opacity', '0');

                } else {
                    letters[i][j][k] = createSpan(allWords[i][j][k]);
                    letters[i][j][k].parent(sentenceDiv[i]);
                    letters[i][j][k].style('opacity', '0');

                }

            }
        }

    }
}

function centerTextdraw() {
    if (typeShowBool) {
        for (var i = 0; i < letters.length; i++) {
            for (var j = 0; j < letters[i].length; j++) {
                for (var k = 0; k < letters[i][j].length; k++) {

                    textCount[i][j][k] += 1 / (noise(k) * 30);
                    spacing[i][j][k] = map(sin(textCount[i][j][k]), -1, 1, 0, 0.2);

                    letters[i][j][k].style('letter-spacing', spacing[i][j][k] + 'em');
                    letters[i][j][k].style('opacity', '0');
                }
            }
        }

        if (frameCount % 5 == 0) {
            wordCount++;
        }

        if (wordCount == letters[sentCount].length) {
            wordCount = 0;
            sentCount++;
        }

        if (sentCount == letters.length) {
            sentCount = 0;
            textAnimCount = 1;
        }

        for (var k = 0; k < letters[sentCount][wordCount].length; k++) {
            letters[sentCount][wordCount][k].style('opacity', '0');
            letters[sentCount][wordCount][k].style('animation', 'fade 3s linear 0s 1 normal');
            letters[sentCount][wordCount][k].style('animation-fill-mode', 'forwards');
        }

        // if (sentCount == letters.length && wordCount == letters[sentCount].length) {
        if (textAnimCount == 1) {
            for (var k = 0; k < letters[sentCount][wordCount].length; k++) {

                // letters[sentCount][wordCount][k].style('opacity', '0');
                letters[sentCount][wordCount][k].style('animation', 'fadeBack 3s linear 0s 1 normal');
                // letters[sentCount][wordCount][k].style('animation-fill-mode', 'forwards');

                // letters[sentCount][wordCount][k].style('color', 'blue');
            }
        }
        // }
    }
}
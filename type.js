let centerText = [];
let loadedText, introText;
let textEmpty = " ";
let letterX = 0;
let centerDiv;
let sentenceDiv = [];
let spacing = [];
let textCount = [];

function typeSetup() {
    centerDiv = select('#centerText');
    introText = loadedText.join(' ');

    for (var j = 0; j < loadedText.length; j++) {
        sentenceDiv[j] = createDiv();
        sentenceDiv[j].parent(centerDiv);
        centerText[j] = [];
        textCount[j] = [];
        spacing[j] = [];

        for (var i = 0; i < loadedText[j].length; i++) {

            centerText[j][i] = createSpan(loadedText[j][i]);
            centerText[j][i].parent(sentenceDiv[j]);
            textCount[j][i] = 0;
        }
    }
}

function typeDraw() {
    for (var i = 0; i < centerText.length; i++) {
        for (var j = 0; j < centerText[i].length; j++) {

            textCount[i][j] += 1 / (noise(j) * 20);
            spacing[i][j] = map(sin(textCount[i][j]), -1, 1, 0, 0.3);

            centerText[i][j].style('letter-spacing', spacing[i][j] + 'em');
            // centerText[i][j].style(' animation-nam', 'fade');

        }
    }
}
let centerText = [];
let loadedText;
let centerDiv;
let sentenceDiv;
let wordDiv = [];
let spacing = [];
let textCount = [];
let letterCount = 0;

function typeSetup() {
    // centerDiv = select('#centerText');
    // sentenceDiv = [];

    // for (var j = 0; j < loadedText.length; j++) {
    //     sentenceDiv[j] = createDiv('');
    //     sentenceDiv[j].parent(centerDiv);
    //     centerText[j] = [];
    //     textCount[j] = [];
    //     spacing[j] = [];

    //     for (var i = 0; i < loadedText[j].length; i++) {
    //         centerText[j][i] = createSpan(loadedText[j][i]);
    //         centerText[j][i].parent(sentenceDiv[j]);

    //         textCount[j][i] = 0;
    //     } 
    // }

    centerDiv = select('#centerText');
    sentenceDiv = [];

    for (var j = 0; j < loadedText.length; j++) {
        sentenceDiv[j] = createDiv('');
        sentenceDiv[j].parent(centerDiv);

        wordDiv[j] = loadedText[j].split(" ");
        // wordDiv[j].parent(centerDiv);

        centerText[j] = [];
        textCount[j] = [];
        spacing[j] = [];

        // for (var i = 0; i < loadedText[j].length; i++) {
        //     centerText[j][i] = createSpan(loadedText[j][i]);
        //     centerText[j][i].parent(sentenceDiv[j]);

        //     textCount[j][i] = 0;
        // } 

        for (var i = 0; i < wordDiv[j].length; i++) {
            centerText[j][i] = createSpan(wordDiv[j][i] + '');
            centerText[j][i].parent(sentenceDiv[j]);
        }

    }
}

function typeDraw() {
    for (var i = 0; i < centerText.length; i++) {
        for (var j = 0; j < centerText[i].length; j++) {

            textCount[i][j] += 1 / (noise(j) * 20);
            spacing[i][j] = map(sin(textCount[i][j]), -1, 1, 0, 0.3);

            centerText[i][j].style('letter-spacing', spacing[i][j] + 'em');

            centerText[i][letterCount].style('animation', 'fade 3s linear 0s 1 normal');
            centerText[i][letterCount].style('animation-fill-mode', 'forwards');
            centerText[i][letterCount].style('opacity', '0');

        }
    }

    if (frameCount % 10 == 0) {
        letterCount++;
    }
}
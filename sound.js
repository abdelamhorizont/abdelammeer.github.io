let polySynth;
let sine = 0;
let oscSound;
let soundBool1 = false;
let soundBool2 = false;

let drumBool1 = false;
let drumBool2 = false;

let volume = 0;
let volume2 = 0;
let volume3 = 0;
let volume4 = 0;

function soundSetup() {

    airbells.loop();
    airbells.setVolume(0.0);

    drums.loop();
    drums.setVolume(0.0);

    drums_slow.loop();
    drums_slow.setVolume(0.0);

    // airbells_end.loop();
    drums_fast.loop();

    // airbells_end.setVolume(0);
    drums_fast.setVolume(0);
}

function soundDraw() {
    for (var j = 0; j < myWords.length; j++) {
        for (var i = 0; i < animals.length; i++) {
            if (myWords[j] == animals[i]) {
                soundBool1 = true;
            }
        }
    }

    for (var j = 0; j < myWordsOutput.length; j++) {
        for (var i = 0; i < animals.length; i++) {
            if (myWordsOutput[j] == animals[i]) {
                soundBool1 = true;
            }

        }
    }

    if (personShowBool) {
        drumBool1 = true;
    }

    for (var j = 0; j < myWords.length; j++) {
        if (myWords[j] == 'ciao') {
            soundBool2 = true;
        }
    }

    soundPlay();
}

function soundPlay() {
    if (soundBool1) {
        if (volume < 0.3) {
            volume += 0.001;
            airbells.setVolume(volume);

        }
    }

    if (drumBool1) {
        if (volume2 < 0.3) {
            volume2 += 0.001;
            drums_slow.setVolume(volume2);
        }
    }

    if (preDissolve) {

        if (volume3 < 0.5) {
            volume3 += 0.001;
            airbells_end.setVolume(volume3);
        }

         if (volume4 < 0.3){
        volume4 += 0.001;
        drums_fast.setVolume(volume4);
         }

        airbells.setVolume(0);
        drums_slow.setVolume(0);
    }

}

function keyPressed() {

    airbells_end.setVolume(0);
    drums_fast.setVolume(0);

    if (preDissolve) {
        airbells_end.play();

        // drums_fast.loop();
        // drums_fast.setVolume(volume3 - 0.01);

    }

}

  
 
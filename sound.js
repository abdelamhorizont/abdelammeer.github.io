let polySynth;
let sine = 0;
let oscSound;

function soundSetup(mySound){
    userStartAudio();

    reverb = new p5.Reverb();
    mySound.disconnect();

    reverb.process(mySound, 5, 2);
	mySound.loop();

    polySynth = new p5.PolySynth();
    monoSynth = new p5.MonoSynth();
    
    oscSound = new p5.Oscillator('sine');
    oscSound.start();
    oscSound.amp(0.2, 0.1);
    oscSound.freq(200, 0.1);

    mySound.setVolume(0.6);

}

function soundDraw(mySound){
    sine = map(sin(frameCount/3), -1, 1, 100, 200);

   oscSound.amp(0.1, 0.1);
   oscSound.freq(sine, 0.1);

}

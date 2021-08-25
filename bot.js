var bot;

let voice;
let speechRec;
let susresBtn;
let speech;

let continuous;
let interim
let user_input;
let input;
let myWords = [""];
let myWordsOutput = [""];
let output;
let outputSpan = [];

let botAnswers = [];

//alles in setup()
function bot() {
    bot = new RiveScript({ utf8: true });
    bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

    bot.loadFile("begin.rive").then(loading_done).catch(loading_error);
    // bot.loadFile("brain.rive").then(loading_done).catch(loading_error);
    bot.loadFile("dialog.rive").then(loading_done).catch(loading_error);

    speech = new p5.Speech();

    // talk = new p5.Speech();
    // talk.speak('haustür');

    speechRec = new p5.SpeechRec('de-DE');

    user_input = select('#user_input');
    output = select('#output');

    susresBtn = select('talk');

    speech.onLoad = voiceReady;
    speech.onStart = moveMouth;
    speech.onEnd = moveMouth;
    speech.setLang('de-DE');
    speech.setRate(1.1);
    
    $('#user_input').keypress(chat);

    function chat() {
        input = user_input.value();
        myWords = input.split(" ");
        
        bot.sortReplies();

        if (keyCode === ENTER) {

            for(var i = 0; i < outputSpan.length; i++){
                outputSpan[i].html('');
            }

            bot.reply('local-user', input).then(function (reply) {
                // console.log("The bot says: " + reply);
                speech.speak('' + reply);
                // polySynth.play('&4', 0.1, 0, 0.2);

                for (var i = 0; i < reply.length; i++) {
                    // output.html(reply);

                    outputSpan[i] = createSpan();
                    outputSpan[i].html(reply[i]);
                    outputSpan[i].parent('output');

                    myWordsOutput = reply.split(" "); 
                }
            });

        }
    }

    speechRec.onResult = gotSpeech;
    function gotSpeech() {
        if (speechRec.resultValue) {
            // input = user_input.value();
            input = speechRec.resultString;
            user_input.value(input);
            myWords = input.split(" ");

            for(var i = 0; i < outputSpan.length; i++){
                outputSpan[i].html('');
            }

            bot.reply('local-user', input).then(function (reply) {
                // console.log("The bot says: " + reply);
                // output.html(reply);
                speech.speak(reply);

                for (var i = 0; i < reply.length; i++) {
                    // output.html(reply);

                    outputSpan[i] = createSpan();
                    outputSpan[i].html(reply[i]);
                    outputSpan[i].parent('output');

                    myWordsOutput = reply.split(" "); 
                }
            });

            bot.sortReplies();
         
        }
    }
}


function voiceReady() {
    console.log('voice is Ready!');
    // speech.listVoices();
    speech.setVoice('Google Deutsch');
    speech.setPitch(0.2);

}

function stopSpeaking() {
}

function recordAudio() {
    continuous = true;
    interim = false;

    speechRec.start(continuous, interim);
}

//loading riveScript
function loading_done() {
    console.log("Bot has finished loading!");

    // Now the replies must be sorted!

    // And now we're free to get a reply from the brain!

    // RiveScript remembers user data by their username and can tell
    // multiple users apart.
    let username = "local-user";

    // NOTE: the API has changed in v2.0.0 and returns a Promise now.
}

//error riveScript
function loading_error(error, filename, lineno) {
    console.log("Error when loading files: " + error);
}

function moveMouth() {
    mouthBool = !mouthBool;
    console.log(mouthBool);
}
let user_input;
let input;

function bot() {
    let bot;
    let output;

    bot = new RiveScript({ utf8: true });
    bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

    bot.loadFile("begin.rive").then(loading_done).catch(loading_error);
    bot.loadFile("random.rive").then(loading_done).catch(loading_error);

    user_input = select('#user_input');
    output = select('#output');

    $('#user_input').keypress(chat);

    function chat() {
        input = user_input.value();
        
        bot.sortReplies();

        if (keyCode === ENTER) {

            bot.reply('local-user', input).then(function (reply) {

                    output.html(reply);
                    // getLetters("output", letterJumps);
                    
            });
        }
    }
}

//loading riveScript
function loading_done() {
    console.log("Bot has finished loading!");
    let username = "local-user";
}

//error riveScript
function loading_error(error, filename, lineno) {
    console.log("Error when loading files: " + error);
}

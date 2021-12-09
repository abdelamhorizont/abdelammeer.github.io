window.onload = function () {
    bot();

    document.getElementById("header").style.top = "0rem";
    let logo = document.getElementById("logo");

    let logoString = logo.innerHTML;
    logo.innerHTML = ""

    for (let i = 0; i < logoString.length; i++) {
        let x = document.createElement("SPAN");
        let t = document.createTextNode(logoString[i]);
        x.appendChild(t);
        logo.appendChild(x);
    }

    let answers;

    answers = document.getElementById("output");
    answerList = [
        "hi there! :)",
    ]

    answers.innerHTML = answerList[0];

    getLetters("output");

    document.getElementById('user_input').onkeypress = function (e) {
        if (e.keyCode == 13) {
            getLetters("output");
            letterAnim("output", 20);
        }
    }

    logoAnim();

    if (headBools[1]){
        letterAnim("output", 20);
    } 

    let slide = document.getElementsByClassName("slide");
    let cards = document.getElementsByClassName("card");
    let cardDropdown = document.getElementsByClassName("card-dropdown");
    let worksText = document.getElementsByClassName("works-text");
    let year = document.getElementsByClassName("year");
    let collabs = document.getElementsByClassName("collabs");
    let designElements = document.getElementsByClassName("design-elements");

    for (let i = 0; i < cards.length; i++) {

        for (let child of worksText) {
            child.style.height = "0%";
        }

        cards[i].onmouseover = function () {
            cardDropdown[i].style.maxHeight = "30vh";
            worksText[i].style.height = "60%";


            if (!headBools[2]) {

                for (child of designElements) {
                    child.style.opacity = "1";
                }

                for (child of year) {
                    child.style.opacity = "1";
                }
            }

        };
        cards[i].onmouseout = function () {
            cardDropdown[i].style.maxHeight = "0vh";
            worksText[i].style.height = "0%";

            if (!headBools[2]) {

                for (child of designElements) {
                    child.style.opacity = "0";
                }

                for (child of year) {
                    child.style.opacity = "0";
                }

            }
        };

    }

    // scroll every second element to the end
    for (let i = 1; i < worksLength; i++) {
        if (i % 2 == 0) {
            document.getElementsByClassName("slide")[i - 1].scrollLeft = 5000;
        } else {
            document.getElementsByClassName("slide")[i - 1].scrollLeft = 0;
        }
    }

    //scroll to left/right with mosue wheel
    // let item = document.getElementsByClassName("slide")[0];

    // window.addEventListener("wheel", function (e) {
    //     if (e.deltaY > 0) item.scrollLeft += 10;
    //     else item.scrollLeft -= 10;
    // });

    if (headBools[1]) {

        for (child of slide) {
            child.style.filter = "blur(200px)";
            child.style.WebkitFilter = "blur(200px)";
        }
    }

    // document.getElementsByClassName("chat-container")[0].style.width = '40vw';
}


function getLetters(id) {
    let elt = document.getElementById(id);

    let eltString = elt.innerHTML;
    const eltWords = eltString.split(" ");

    elt.innerHTML = "";

    for (let i = 0; i < eltWords.length; i++) {

        let word = document.createElement("SPAN");

        for (let j = 0; j < eltWords[i].length; j++) {
            let x = document.createElement("SPAN");
            let t = document.createTextNode(eltWords[i][j]);

            // if(eltWords[i] == "Ö"){
            //     let br = document.createElement("br");
            //     word.appendChild(br);

            //     console.log(word);
            // }

            x.appendChild(t);
            x.classList.add("letters");

            word.appendChild(x);
            word.classList.add("words");

        }

        elt.appendChild(word);
    }

}

function letterAnim(id, frameRate) {

    let letters = document.querySelectorAll("SPAN.letters");
    let words = document.querySelectorAll("SPAN.words");

    let spacing = [];
    let sinCount = [];
    let wordSpacing = [];
    let wordCount = [];
    let s = 0;

    // let wordCount = 0;
    let letterCount = 0;
    let fontSize;
    let col;

    col = "white";

    for (let i = 0; i < letters.length; i++) {
        sinCount[i] = 0;
        spacing[i] = 0;
    }

    for (let i = 0; i < words.length; i++) {
        wordSpacing[i] = 0;
        wordCount[i] = 0;
    }

    let chatCon = document.getElementsByClassName("chat-container")[0];
    let output = document.getElementById("output");

    let chatConWidth = map(letters.length, 1, 50, 20, 60);
    let chatConHeight;

    let spacingMax;


    function typeResponsive(win) {

        if (win.matches) { // If media query matches
            chatConHeight = map(letters.length, 10, 50, 30, 0);
            output.style.marginTop = 0 + 'vh';

            chatCon.style.width = chatConWidth + 'vw';
            chatCon.style.left = ((100 - chatConWidth) * 0.5) + 'vw';

            fontSize = map(letters.length, 1, 50, 83.5, 2);
            spacingMax = 1;
        } else {
            chatConHeight = map(letters.length, 0, 40, 33, -5);
            output.style.marginTop = chatConHeight + 'vh';

            fontSize = map(words.length, 1, 10, 3, 1.8);
            spacingMax = 0.5;

        }
    }

    var win = window.matchMedia("(min-width: 620)");
    typeResponsive(win); // Call listener function at run time
    win.addEventListener("keypress", typeResponsive); // Attach listener function on state 

    setInterval(function spacingAnim() {
        // let outputHeight = output.offsetHeight;

        if (letterCount < letters.length) {
            if (frameCount % 7 == 0) {
                letters[letterCount].style.display = 'inline-block';
                letters[letterCount].style.opacity = '1';
                letters[letterCount].style.color = col;
                // letters[letterCount].style.fontSize = fontSize + 'rem';

                letterCount++;
            }
        }

        for (let i = 0; i < words.length; i++) {
            // words[i].style.fontSize = fontSize + 'rem';
            words[i].style.padding = (fontSize / 5) + 'rem';

            wordCount[i] += noise(i) / 5;
            wordSpacing[i] = map(sin(wordCount[i]), -1, 1, 0, 0.3);

            // words[i].style.margin = wordSpacing[i] + 'rem';
        }

        for (let i = 0; i < letters.length; i++) {

            //disperse letters
            // sinCount[i] += noise(i) / 50;
            // spacing[i] = map(sin(sinCount[i]), -1, 1, 0.1,s);
            // letters[i].style.margin = '0rem ' + (spacing[i]) + 'rem';  
            // letters[i].style.display = 'unset';  

            //jumping letters
            sinCount[i] += noise(i) / 5;
            spacing[i] = map(sin(sinCount[i]), -1, 1, -spacingMax, spacingMax);

            // letters[i].style.margin = (spacing[i]) + 'rem 0rem';       
            letters[i].style.transform = 'translateY(' + (spacing[i]) + 'rem)';
            // words[i].style.transform = 'translateX(' + (spacing[i]) + 'rem)'; 
        }

        s += 0.03;

    }, frameRate);

}

function logoAnim() {

    let logo = document.getElementById("logo");

    let spacing = [];
    let sinCount = [];

    for (let i = 0; i < 100; i++) {
        spacing[i] = 0;
        sinCount[i] = 0;
    }


    setInterval(function spacingAnim() {

        for (let i = 0; i < logo.children.length; i++) {

            sinCount[i] += noise(i) / 5;
            spacing[i] = map(sin(sinCount[i]), -1, 1, 0.01, 0.3);

            logo.children[i].style.letterSpacing = spacing[i] + 'em';
        }

    }, 30);

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function ready() {

    let answers;

    answers = document.getElementById("output");
    answerList = [
        "hi there! :)",
    ]

    answers.innerHTML = answerList[0];

    getLetters("output");
    letterAnim("output", 20);

}


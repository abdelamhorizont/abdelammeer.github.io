let headBools = [];
let bools = [];

let buttons;
let body;

let worksLength;

body = document.documentElement;

// worksLength = document.getElementsByClassName('plus').length;
worksLength = 3;

for (let i = 0; i < worksLength; i++) {
    bools[i] = false;
}

headBools[0] = false;
headBools[1] = true;

function toggleDropdown(id, i) {
    let worksText = document.getElementsByClassName("works-text")[i];
    let user_input = document.getElementById("user_input");

    if (id == 'card') {
        let elt = document.getElementsByClassName(id)[i];
        let cardDropdown = document.getElementsByClassName("card-dropdown")[i];
        let plus = document.getElementsByClassName("plus")[i];

        bools[i] = !bools[i];

        if (bools[i]) {

            cardDropdown.style.maxHeight = "100vh";
            // worksText.style.height = "60vh";

            elt.onmouseover = function () { cardDropdown.style.maxHeight = "80vh" };
            elt.onmouseout = function () { cardDropdown.style.maxHeight = "80vh" };

            plus.style.transform = "rotate(180deg)";

        } else if (!bools[i]) {

            cardDropdown.style.maxHeight = "0vh";

            elt.onmouseover = function () {
                cardDropdown.style.maxHeight = "20vh";
                worksText.style.height = "100%";

            };
            elt.onmouseout = function () {
                cardDropdown.style.maxHeight = "0vh";
                worksText.style.height = "0vh";
            };

            plus.style.transform = "rotate(0deg)";
        }

        function worksTextAnim(x) {

            if (x.matches) { // If media query matches
                if (bools[i]) {
                    worksText.style.height = "100%";
                }
            } else {
                if (bools[i]) {
                    worksText.style.height = "60vh";
                }
            }
        }

        var x = window.matchMedia("(min-width: 960px)")
        worksTextAnim(x) // Call listener function at run time
        x.addEventListener(worksTextAnim) // Attach listener function on state changes
    }

    if (id == 'dropdown') {
        let elt = document.getElementsByClassName(id)[i];
        let close = document.getElementById("dropdown-close");

        headBools[i] = !headBools[i];

        if (headBools[i]) {
            elt.style.top = "13vh";
            close.style.top = "0vh";

            document.getElementById("header").style.top = "0rem";
            document.getElementsByClassName("chat-container")[0].style.top = "105vh";
            document.getElementById("chat-close").style.top = "100rem";

            document.getElementById("talk").innerHTML = "talk";
            headBools[1] = false;

        } else if (!headBools[i]) {
            elt.style.top = "-80rem";
            close.style.top = "-80rem";

        }
    }

    if (id == 'chat-container') {
        let elt = document.getElementsByClassName('chat-container')[0];
        // let close = document.getElementById("chat-close");

        headBools[i] = !headBools[i];

        if (headBools[i]) {
            elt.style.top = "5vh";
            // close.style.top = "12.5vh";
            // user_input.style.bottom = "13vh";

            document.getElementsByClassName("dropdown")[0].style.top = "-80rem";
            document.getElementById("dropdown-close").style.top = "-80rem";

            document.getElementById("talk").innerHTML = "close";
            headBools[0] = false;

        } else if (!headBools[i]) {
            elt.style.top = "115vh";
            // close.style.top = "105vh";
            // user_input.style.bottom = "-15vh";

            document.getElementById("talk").innerHTML = "talk";
            document.getElementById("header").style.top = "0rem";

        }
    }


}

// When the user scrolls down, hide the logo. When the user scrolls up, show the logo 
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {

    let currentScrollPos = window.pageYOffset;

    // scroll up
    if (prevScrollpos > currentScrollPos) {

        //scroll Slides when scrolling down
        for (let i = 0; i < worksLength; i++) {
            if (i % 2 == 0) {
                document.getElementsByClassName("slide")[i].scrollLeft += -4;
            } else {
                document.getElementsByClassName("slide")[i].scrollLeft += 4;
            }
        }

        // scroll down
    } else {

        for (let i = 0; i < worksLength; i++) {
            if (i % 2 == 0) {
                document.getElementsByClassName("slide")[i].scrollLeft += 4;
            } else {
                document.getElementsByClassName("slide")[i].scrollLeft += -4;
            }
        }
    }

    prevScrollpos = currentScrollPos;
}

function clickAnim(className, id) {

    let elt = document.getElementsByClassName(className)[id];
    elt.style.fontSize = "1.3rem";

    setTimeout(function () { elt.style.fontSize = "1rem"; }, 300);

}

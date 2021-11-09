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

    let opa = document.getElementsByClassName("opa")[i];
    let plus = document.getElementsByClassName("plus")[i];

    if (id == 'card') {
        let elt = document.getElementsByClassName(id)[i];    
        let cardDropdown = document.getElementsByClassName("card-dropdown")[i];

        bools[i] = !bools[i];

        if (bools[i]) {

            cardDropdown.style.maxHeight = "80vh";

            elt.onmouseover = function () { cardDropdown.style.maxHeight = "80vh" };
            elt.onmouseout = function () { cardDropdown.style.maxHeight = "80vh" };

            plus.style.transform = "rotate(405deg)";
            
            opa.style.opacity = "1";

        } else if (!bools[i]) {

            cardDropdown.style.maxHeight = "0vh";

            elt.onmouseover = function () { 
                cardDropdown.style.maxHeight = "10vh";
                cardDropdown.style.padding = "2rem 0rem";
             };
            elt.onmouseout = function () { 
                cardDropdown.style.maxHeight = "0vh";
                cardDropdown.style.padding = "0rem 0rem";
            };

            plus.style.transform = "rotate(0deg)";
        }
    }

    if (id == 'dropdown') {
        let elt = document.getElementsByClassName(id)[i];

        headBools[i] = !headBools[i];

        if (headBools[i]) {
            elt.style.top = "13vh";

            document.getElementById("header").style.top = "0rem";
            document.getElementsByClassName("chat-container")[0].style.top = "105vh";

            for (elt of elt.children) {
                elt.style.opacity = "1";
                elt.style.transition = "opacity 0.5s ease";
            }

        } else if (!headBools[i]) {
            elt.style.top = "-80rem";

            for (elt of elt.children) {
                elt.style.opacity = "0";
            }
        }
    }

    if (id == 'chat-container') {
        let elt = document.getElementsByClassName('chat-container')[0];

        headBools[i] = !headBools[i];

        if (headBools[i]) {
            elt.style.top = "12.5vh";

            document.getElementsByClassName("dropdown")[0].style.top = "-80rem";
            document.getElementById("talk").innerHTML = "close";

        } else if (!headBools[i]) {
            elt.style.top = "105vh";

            document.getElementById("talk").innerHTML = "talk";
            document.getElementById("header").style.top = "0rem";

            for (elt of elt.children) {
                elt.style.transition = "opacity 0.5s ease";
            }
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
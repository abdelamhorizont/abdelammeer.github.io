let dropdown = false;
let plusBool = false;
let bools = [];

let headerHeight;
let buttons;
let body;

let worksLength;

body = document.documentElement;
headerHeight = "-3rem";

worksLength = document.getElementsByClassName('plus').length;
worksLength = 2;

for (let i = 0; i < worksLength; i++) {
    bools[i] = false;
}

function toggleDropdown(id, i) {
    bools[i] = !bools[i];

    let elt = document.getElementsByClassName(id)[i];
    let card = document.getElementsByClassName("card")[i];

    if (bools[i]) {

        card.style.background = "var(--grey)";

        if (id == 'dropdown') {
            dropdown = true;
            elt.style.height = "110vh";
        } else {
            elt.style.maxHeight = "20rem";
            elt.style.opacity = "1";
        }

        headerHeight = "-3rem";

        for (let child of elt.children) {
            child.style.opacity = "1";
            child.style.transition = "opacity 0.8s ease";
        }

        if (id == 'dropdown') {
            document.getElementsByClassName("info")[0].innerHTML = "close";
            document.getElementById("header").style.top = "0rem";
            body.style.overflow = "hidden";
        }

    };

    if (!bools[i]) {
        card.onmouseover = function () { card.style.background = "var(--grey)" };
        card.onmouseout = function () { card.style.background = "var(--textCol)" };
        card.style.background = "var(--blackCol)";

        if (id == 'dropdown') {
            elt.style.height = "0vh";
            dropdown = false;
        } else {
            elt.style.maxHeight = "2rem";
            elt.style.opacity = "0";

        }

        headerHeight = "0rem";

        for (let child of elt.children) {
            child.style.opacity = "0";
            child.style.transition = "opacity 0.2s ease";
        }

        if (id == 'dropdown') {
            document.getElementsByClassName("info")[0].innerHTML = "info";
            document.getElementById("works").style.marginTop = "3rem";
            body.style.overflow = "auto";
        }
    }

    headerHeight = document.getElementById("header").style.height;
    headerHeight = - parseInt(headerHeight);

}

// When the user scrolls down, hide the logo. When the user scrolls up, show the logo 
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {

    let currentScrollPos = window.pageYOffset;

// scroll up
    if (prevScrollpos > currentScrollPos) {
        for (let i = 0; i < worksLength; i++) {
            if (i % 2 == 0) {
                document.getElementsByClassName("slide")[i].scrollLeft += -4;
            } else {
                document.getElementsByClassName("slide")[i].scrollLeft += 4;
            }
        }

        document.getElementById("header").style.top = "0rem";
        document.getElementById("info").innerHTML = "info";
        document.getElementById("works").style.marginTop = "3rem";

// scroll down
    } else {
        for (let i = 0; i < worksLength; i++) {
            if (i % 2 == 0) {
                document.getElementsByClassName("slide")[i].scrollLeft += 4;
            } else {
                document.getElementsByClassName("slide")[i].scrollLeft += -4;
            }
        }

//close info dropdown through scroll
        // document.getElementById("dropdown").style.height = "0vh";
        // dropdown = false;
        
        // if (dropdown) {
        //     document.getElementById("info").innerHTML = "close";
        // }
    
        // for (let child of document.getElementsByClassName("dropdown")[0].children) {
        //     child.style.opacity = "0";
        //     child.style.transition = "opacity 0.2s ease";
        // }

        if (dropdown) {
            document.getElementById("header").style.top = "0rem";
        } else {
            document.getElementById("header").style.top = "-3rem";
        }
    }
    prevScrollpos = currentScrollPos;
}

// rotate plus sign
function plusRotate(id) {
    let plus;

    plusBool = !plusBool;

    plus = document.getElementsByClassName("plus")[id];

    if (plusBool) {
        plus.style.transform = "rotate(405deg)";
    }
    if (!plusBool) {
        plus.style.transform = "rotate(0deg)";
    }
}

function clickAnim(className, id){ 
    
    let elt = document.getElementsByClassName(className)[id];
    elt.style.fontSize = "1.3rem";

    setTimeout(function(){elt.style.fontSize = "1rem";}, 300);

}
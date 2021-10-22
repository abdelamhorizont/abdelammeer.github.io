let dropdown = false;
let plusBool = false;
let headerHeight;
let buttons;

headerHeight = "-3rem";
buttons = document.getElementsByClassName("clickable");

// for (let elt of buttons){
//     elt = bool;
//     elt.bool = false;
// }

// buttons[0] = false;
// buttons[0] = false;

function toggleDropdown(id, i) {
    dropdown = !dropdown;

    let elt = document.getElementsByClassName(id)[i];
    // headerHeight = getElementsByClassName(id)[i].style.height;

    if (dropdown) {

        if (id == 'dropdown') {
            elt.style.height = "100vh";
        } else {
            elt.style.maxHeight = "20rem";
        }

        headerHeight = "-3rem";

        for (let child of elt.children) {
            child.style.opacity = "1";
            child.style.transition = "opacity 0.8s ease";
        }

        if (id == 'dropdown') {
            document.getElementById("info").innerHTML = "close";
            document.getElementById("works").style.marginTop = "13rem";
        }
    }

    if (!dropdown) {

        if (id == 'dropdown') {
            elt.style.height = "0vh";
        } else {
            elt.style.maxHeight = "0rem";
        }

        headerHeight = "0rem";

        for (let child of elt.children) {
            child.style.opacity = "0";
            child.style.transition = "opacity 0.2s ease";
        }

        if (id == 'dropdown') {
            document.getElementById("info").innerHTML = "info";
            document.getElementById("works").style.marginTop = "3rem";
        }
    }

    headerHeight = document.getElementById("header").style.height;
    headerHeight = - parseInt(headerHeight);

}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    // document.getElementById("demo").innerHTML = headerHeight;
    let currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {

        document.getElementById("header").style.top = "0rem";
        document.getElementById("info").innerHTML = "info";
        document.getElementById("works").style.marginTop = "3rem";

    } else {
        dropdown = false;

        document.getElementById("dropdown").style.height = "0vh";

        for (let child of document.getElementsByClassName("dropdown")[0].children) {
            child.style.opacity = "0";
            child.style.transition = "opacity 0.2s ease";
        }
        if (dropdown) {
            document.getElementById("info").innerHTML = "close";
        }
        document.getElementById("header").style.top = "-3rem";
    }
    prevScrollpos = currentScrollPos;
}

// rotate plus sign
let plus;
let counter;

function plusRotate(id) {
    plusBool = !plusBool;

    plus = document.getElementsByClassName("plus")[id];

    if (plusBool) {
        plus.style.transform = "rotate(405deg)";
    }
    if (!plusBool) {
        plus.style.transform = "rotate(0deg)";
    }
}
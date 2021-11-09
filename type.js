window.onload = function () {
    bot();

    document.getElementById("header").style.top = "0rem";

    let logoString = logo.innerHTML;
    logo.innerHTML = ""

    for (let i = 0; i < logoString.length; i++) {
        let x = document.createElement("SPAN");
        let t = document.createTextNode(logoString[i]);
        x.appendChild(t);
        logo.appendChild(x);
    }

    getLetters("output");

    document.getElementById('user_input').onkeypress = function (e) {
        if (e.keyCode == 13) {
            getLetters("output");
        }
    }

    letterAnim("logo", 40);
    letterAnim("output", 20);

    // cards dropdown hover effect
    let cards = document.getElementsByClassName("card");
    let cardDropdown = document.getElementsByClassName("card-dropdown");
    let opa = document.getElementsByClassName("opa");

    for (let i = 0; i < cards.length; i++) {
        cards[i].onmouseover = function () {
            cardDropdown[i].style.maxHeight = "10vh";
            cardDropdown[i].style.padding = "2rem 0rem";
            opa[i].style.opacity = 1;
        };
        cards[i].onmouseout = function () {
            cardDropdown[i].style.maxHeight = "0vh";
            cardDropdown[i].style.padding = "0rem 0rem";
            opa[i].style.opacity = 0;
        };
    }

    // scroll every second element to the end
    for (let i = 1; i < worksLength; i++) {
        if (i % 2 == 0) {
            document.getElementsByClassName("slide")[i-1].scrollLeft = 5000;
        } else {
            document.getElementsByClassName("slide")[i-1].scrollLeft = 0;
        }
    }
}


function getLetters(id) {
    let elt = document.getElementById(id);
    let eltString = elt.innerHTML;

    elt.innerHTML = "";

    for (let i = 0; i < eltString.length; i++) {
        let x = document.createElement("SPAN");
        let t = document.createTextNode(eltString[i]);
        x.appendChild(t);
        elt.appendChild(x);
    }
}

function letterAnim(id, frameRate) {

    let elt = document.getElementById(id);

    let spacing = [];
    let sinCount = [];

    for (var i = 0; i < 100; i++) {
        sinCount[i] = 0;
        spacing[i] = 0;
    }

    setInterval(function spacingAnim() {

        if (elt == logo) {
            for (let i = 0; i < elt.children.length; i++) {

                sinCount[i] += noise(i) / 5;
                spacing[i] = map(sin(sinCount[i]), -1, 1, 0.1, 0.5);

                elt.children[i].style.letterSpacing = spacing[i] + 'em';
            }
        } else if (elt == output) {
            for (let i = 0; i < elt.children.length; i++) {

                sinCount[i] += noise(i) / 5;
                spacing[i] = map(sin(sinCount[i]), -1, 1, 0.1, 1.5);

                elt.children[i].style.marginTop = spacing[i] + 'rem';
                // elt.children[i].style.fontSize = 2.5 + 'rem';
            }
        }

    }, frameRate);

}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
window.onload = function () {
    let spacing = [];
    let sinCount = [];

    let logo = document.getElementById("logo");
    let logoSpans;

    logo.style.letterSpacing = spacing + 'em';

    let logoString = logo.innerHTML;
    logo.innerHTML = ""

    for (let i = 0; i < logoString.length; i++) {
        let x = document.createElement("SPAN");
        let t = document.createTextNode(logoString[i]);
        x.appendChild(t);
        logo.appendChild(x);
        logoSpans = logo.children;
    }

    for (var i = 0; i < logoSpans.length; i++) {
        sinCount[i] = 0;
        spacing[i] = 0;
    }

    setInterval(function spacingAnim() {
        for (var i = 0; i < logoSpans.length; i++) {

            sinCount[i] += noise(i) / 10;
            spacing[i] = map(sin(sinCount[i]), -1, 1, 0.1, 0.5);

            logoSpans[i].style.letterSpacing = spacing[i] + 'em';
            // logoSpans[i].style.letterSpacing = i + 'em';
        }
    }, 60);
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


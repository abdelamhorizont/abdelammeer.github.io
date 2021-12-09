var w = window.innerWidth;
var h = window.innerHeight;

let headBools = [];
let bools = [];

let buttons;
let body;

let worksLength;

body = document.documentElement;

// worksLength = document.getElementsByClassName('plus').length;
worksLength = 7;

for (let i = 0; i < worksLength; i++) {
    bools[i] = false;
}

headBools[0] = false;
headBools[1] = true;
headBools[2] = false;

function toggleDropdown(id, i) {
    let cards = document.getElementsByClassName("card");

    if (id == 'card') {
        let elt = document.getElementsByClassName(id)[i];
        let cardDropdown = document.getElementsByClassName("card-dropdown")[i];
        let plus = document.getElementsByClassName("plus")[i];
        let worksText = document.getElementsByClassName("works-text")[i];
        let slide = document.getElementsByClassName("slide")[i];
        let designElements = document.getElementsByClassName("design-elements")[i];
        let year = document.getElementsByClassName("year")[i];
        let collabs = document.getElementsByClassName("collabs")[i];

        var viewportOffset = elt.getBoundingClientRect().top;

        bools[i] = !bools[i];

        if (bools[i]) {
            slide.style.height = "90vh";
            slide.style.filter = "blur(0px)";

            designElements.style.opacity = "1";

            cardDropdown.style.maxHeight = "200vh";
            worksText.style.height = "100%";
            worksText.style.paddingBottom = "0vh";

            document.body.scrollTop += 0.8 * viewportOffset;
            document.documentElement.scrollTop += 0.8 * viewportOffset;
            // window.scrollBy({top: 0.1 * viewportOffset, behavior: 'smooth' });

            elt.onmouseover = function () { cardDropdown.style.maxHeight = "100%" };
            elt.onmouseout = function () { cardDropdown.style.maxHeight = "100%" };

            plus.style.transform = "rotate(180deg)";

        } else if (!bools[i]) {

            designElements.style.opacity = "0";

            cardDropdown.style.maxHeight = "0vh";
            worksText.style.height = "0%";

            worksText.style.paddingBottom = "0vh";

            plus.style.transform = "rotate(0deg)";
        }

        elt.onmouseover = function () {
            if (!bools[i] && !headBools[2]) {
                cardDropdown.style.maxHeight = "20vh";
                worksText.style.height = "60%";
                designElements.style.opacity = "1";
                year.style.opacity = "1";
            }

            if (!bools[i] && headBools[2]) {
                designElements.style.opacity = "0";
                cardDropdown.style.maxHeight = "20vh";
                worksText.style.height = "60%";
            }
        };

        elt.onmouseout = function () {
            if (!bools[i] && !headBools[2]) {
                cardDropdown.style.maxHeight = "0vh";
                worksText.style.height = "0%";
                designElements.style.opacity = "0";
                year.style.opacity = "0";
            }

            if (!bools[i] && headBools[2]) {
                cardDropdown.style.maxHeight = "0vh";
                designElements.style.opacity = "0";
                worksText.style.height = "0%";
                designElements.style.opacity = "0";
            }
        };

        if (!bools[i] && headBools[2]) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            slide.style.height = "15vh";
            slide.style.filter = "blur(1000px)";
            year.style.opacity = "1";
            worksText.style.height = "0%";

            designElements.style.opacity = "0";
        }

        function cardResponsive(x) {

            if (x.matches) { // If media query matches
                if (bools[i]) {
                    cardDropdown.style.marginTop = "0rem";
                    year.style.opacity = "1";
                    collabs.style.opacity = "1";

                } else {
                    year.style.opacity = "1";
                    collabs.style.opacity = "1";
                }

                if (!bools[i] && headBools[2]) {
                    cardDropdown.style.marginTop = "-9.3rem";
                    year.style.opacity = "1";
                }

                if (!bools[i] && !headBools[2]) {
                    year.style.opacity = "0";
                    collabs.style.opacity = "0";

                }

            } else {
                if (bools[i]) {
                    worksText.style.height = "70vh";
                    cardDropdown.style.marginTop = "5.5rem";
                    year.style.opacity = "1";
                    collabs.style.opacity = "1";
                    designElements.style.opacity = "1";

                } else {
                    worksText.style.height = "0vh";
                    year.style.opacity = "0";
                    collabs.style.opacity = "0";
                    designElements.style.opacity = "0";
                }

                if (bools[i] && headBools[2]) {
                    year.style.opacity = "1";
                    collabs.style.opacity = "1";
                }

            }
        }

        var x = window.matchMedia("(min-width: 960px)")
        cardResponsive(x) // Call listener function at run time
        x.addEventListener("keypress", cardResponsive) // Attach listener function on state changes

    }

    if (id == 'dropdown') {
        let elt = document.getElementsByClassName(id)[i];
        let close = document.getElementById("dropdown-close");
        let slide = document.getElementsByClassName("slide");
        let user_input = document.getElementById("user_input");
        let year = document.getElementsByClassName("year");
        let collabs = document.getElementsByClassName("collabs");
        let worksText = document.getElementsByClassName("works-text");

        headBools[i] = !headBools[i];

        if (headBools[0]) {
            headBools[1] = false;

            elt.style.top = "13vh";
            close.style.top = "-4vh";
            user_input.style.bottom = "-20vh";

            // document.getElementById("header").style.top = "0rem";
            document.getElementsByClassName("chat-container")[0].style.top = "105vh";
            document.getElementById("chat-close").style.top = "100rem";

            document.getElementById("talk").innerHTML = "talk";

        } else {

            elt.style.top = "-80rem";
            close.style.top = "-80rem";

            if (!headBools[2]) {
                for (child of slide) {
                    child.style.filter = "blur(0px)";
                }
            }

            for (child of cards) {
                child.style.filter = "blur(0px)";
            }

            for (child of worksText) {
                child.style.filter = "blur(0px)";
            }

            for (child of year) {
                child.style.filter = "blur(0px)";
            }

            for (child of collabs) {
                child.style.filter = "blur(0px)";
            }

            document.getElementById("talk").innerHTML = "talk";

        }
    }

    if (id == 'chat-container') {
        let elt = document.getElementsByClassName('chat-container')[0];
        let slide = document.getElementsByClassName("slide");
        let year = document.getElementsByClassName("year");
        let collabs = document.getElementsByClassName("collabs");
        let worksText = document.getElementsByClassName("works-text");
        let user_input = document.getElementById("user_input");

        headBools[i] = !headBools[i];

        if (headBools[1]) {
            // elt.style.top = "35vh";
            user_input.style.bottom = "8vh";

            document.getElementsByClassName("dropdown")[0].style.top = "-80rem";
            document.getElementById("dropdown-close").style.top = "-80rem";

            document.getElementById("talk").innerHTML = "close";
            headBools[0] = false;

            for (child of slide) {
                child.style.filter = "blur(2000px)";
                child.style.WebkitFilter = "blur(2000px)";
            }

            for (child of cards) {
                child.style.filter = "blur(10px)";
            }

            for (child of worksText) {
                child.style.filter = "blur(20px)";
            }

            for (child of year) {
                child.style.filter = "blur(10px)";
            }

            for (child of collabs) {
                child.style.filter = "blur(10px)";
            }


        } else if (!headBools[1]) {

            // elt.style.top = "115vh";
            user_input.style.bottom = "-20vh";

            if (!headBools[2]) {
                for (child of slide) {
                    child.style.filter = "blur(0px)";
                }
            }

            for (child of cards) {
                child.style.filter = "blur(0px)";
            }

            for (child of worksText) {
                child.style.filter = "blur(0px)";
            }

            for (child of year) {
                child.style.filter = "blur(0px)";
            }

            for (child of collabs) {
                child.style.filter = "blur(0px)";
            }

            document.getElementById("talk").innerHTML = "talk";
            document.getElementById("header").style.top = "0rem";

        }

        function chatResponsive(x) {

            if (x.matches) { // If media query matches
              
                if (headBools[1]) {
                    elt.style.top = "15vh";
                } else if (!headBools[1]) {
                    elt.style.top = "115vh";
                }

            } else {
           
                if (headBools[1]) {
                    elt.style.top = "5vh";
                } else if (!headBools[1]) {
                    elt.style.top = "115vh";
                }
            }
        }

        var x3 = window.matchMedia("(min-width: 960px)")
        chatResponsive(x3) // Call listener function at run time
        x3.addEventListener("keypress", chatResponsive) // Attach listener function on state changes

    }

    if (id == 'list') {
        let worksText = document.getElementsByClassName("works-text");
        let designElements = document.getElementsByClassName("design-elements");
        let slide = document.getElementsByClassName("slide");
        let main = document.querySelector("main");
        let cardDropdown = document.getElementsByClassName("card-dropdown");
        let year = document.getElementsByClassName("year");
        let list = document.getElementById("list");
        let listImg = document.getElementById("list-img");
        let rectImg = document.getElementById("rect-img");

        headBools[i] = !headBools[i];

        if (headBools[2]) {
            main.style.marginTop = "20vh";

            // listImg.style.display = "none";
            // rectImg.style.display = "block";

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            for (child of slide) {
                child.style.height = "15vh";
                child.style.filter = "blur(100px)";
                child.style.WebkitFilter = "blur(100px)";
            }

            for (child of worksText) {
                child.style.paddingBottom = "0vh";
            }

            for (child of designElements) {
                child.style.opacity = "0";
            }

            for (child of year) {
                child.style.opacity = "1";
            }

        } else if (!headBools[2]) {
            // listImg.style.display = "block";
            // rectImg.style.display = "none";

            main.style.marginTop = "0rem";

            // list.onmouseover = function () { list.style.filter = "invert" };
            // list.onmouseout = function () { list.style.filter = "none" };

            if (!headBools[1]) {
                for (child of slide) {
                    child.style.filter = "blur(0px)";
                    
                }
            }

            for (child of slide) {
                child.style.height = "100vh";
            }

            for (child of worksText) {
                child.style.paddingBottom = "0vh";
            }

            for (child of designElements) {
                child.style.opacity = "0";
            }

            for (child of year) {
                child.style.opacity = "0";
            }
        }


        function listRes(x) {

            if (x.matches) { // If media query matches
                if (headBools[i]) {

                    for (child of cardDropdown) {
                        child.style.marginTop = "-9.3rem";
                    }

                } else {

                    for (child of cardDropdown) {
                        child.style.marginTop = "0rem";
                    }
                }

            } else {

                if (headBools[i]) {

                    for (child of cardDropdown) {
                        child.style.marginTop = "5rem";
                    }

                    for (child of year) {
                        child.style.opacity = "0";
                    }

                } else {

                    for (child of cardDropdown) {
                        child.style.marginTop = "5rem";
                    }
                }
            }
        }

        var x = window.matchMedia("(min-width: 960px)")
        listRes(x) // Call listener function at run time
        x.addEventListener("keypress", listRes)
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

//clicked class index
// function clickedClassHandler(name,callback) {

//     // apply click handler to all elements with matching className
//     var allElements = document.body.getElementsByTagName("*");

//     for(var x = 0, len = allElements.length; x < len; x++) {
//         if(allElements[x].className == name) {
//             allElements[x].onclick = handleClick;
//         }
//     }

//     function handleClick() {
//         var elmParent = this.parentNode;
//         var parentChilds = elmParent.childNodes;
//         var index = 0;

//         for(var x = 0; x < parentChilds.length; x++) {
//             if(parentChilds[x] == this) {
//                 break;
//             }

//             if(parentChilds[x].className == name) {
//                 index++;
//             }
//         }

//         callback.call(this,index);
//     }
// }

// clickedClassHandler("works-text",function(index){
//     // do something with the index
//     alert(index);

//     // 'this' refers to the element 
//     // so you could do something with the element itself
//     this.style.backgroundColor = 'orange';
// });
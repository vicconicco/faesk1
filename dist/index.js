console.log(innerWidth);
var snd = document.getElementById("snd");
var snd2 = document.getElementById("snd2");
var splash = document.getElementById("splash");
var pop = document.getElementById("pop");
var skade = document.getElementById("skade");
var vegg = document.getElementById("vegg");
var gameOver = document.getElementById("gameOver");
var fish = document.getElementById("fish");
var hdr = document.getElementById("hdr");
var hdrPoints = document.getElementById("hdrPoints");
var hdrhighscore = document.getElementById("hdrhighscore");
var hdrLiv = document.getElementById("hdrLiv");
var pauseKnapp = document.getElementById("pauseKnapp");
var reloadKnapp = document.getElementById("reloadKnapp");
var opacityControl = document.getElementById("opacityControl");
var mine = document.getElementById("mine");
var boble = document.getElementById("boble");
var chest = document.getElementById("chest");
var info = document.getElementById("info");
var menu = document.getElementById("menu");
var start = document.getElementById("start");
var body = document.getElementsByTagName("body");
var theGameIsOn = false;
var xPos = 100;
var yPos = 500;
var xDirection = 1;
var yDirection = 0;
var fart = 5;
var liv = 10;
var points = 0;
var mineinfo = {
    xpos: 800,
    ypos: 400
}
var chestinfo = {
    xpos: 800,
    ypos: 100
}
if (localStorage.highscore === undefined) {
    localStorage.highscore = 0;
}
info.style.visibility = opacityControl.style.visibility = "hidden";
hdrhighscore.innerHTML = "Highscore: " + localStorage.highscore;
opacityControl.style.opacity = 0.4;
boble.style.top = innerWidth + 30 + "px";
mine.style.left = mineinfo.xpos + "px";
mine.style.top = mineinfo.ypos + "px";
chest.style.left = mineinfo.xpos + "px";
chest.style.top = mineinfo.ypos + "px";
start.onclick = function () {
    menu.style.visibility = "hidden";
    info.style.visibility = opacityControl.style.visibility = "visible";
    snd2.pause();
    snd.play();
    theGameIsOn = true;
    opacityControl.style.opacity = 1;
    gameLoop();
}




function move() {
    xPos = xPos + fart * xDirection;
    yPos = yPos + fart * yDirection;
    fish.style.left = xPos + "px";
    fish.style.top = yPos + "px";
}

function highscore() {
    if (points > localStorage.highscore) {
        localStorage.highscore = points;
        hdrhighscore.innerHTML = "New highscore: " + localStorage.highscore;
        hdrhighscore.style.color = "red";
    }
}

function movemine() {
    mineinfo.xpos = Math.floor(Math.random() * (innerWidth - 50) + 1);
    mineinfo.ypos = Math.floor(Math.random() * (innerHeight - 50) + 1);
    /*while (mineinfo.xpos < ) {
        
    }*/
}

function swim(direction) {
    var random = Math.floor(Math.random() * 4) + 1;
    splash.src = "snd/splash_" + random + ".wav";
    splash.play();
    fish.style.backgroundImage = "url(img/SWIM_TO_RIGHT.gif)";
    if (direction === "down") {
        if (xDirection === -1) {
            fish.style.backgroundImage = "url(img/SWIM_DOWN_LEFT.gif)";
        } else {
            fish.style.backgroundImage = "url(img/SWIM_DOWN_RIGHT.gif)";
        }
    } else if (direction === "up") {
        if (xDirection === -1) {
            fish.style.backgroundImage = "url(img/SWIM_UP_LEFT.gif)";
        } else {
            fish.style.backgroundImage = "url(img/SWIM_UP_RIGHT.gif)";
        }
    } else if (direction === "right") {
        fish.style.backgroundImage = "url(img/SWIM_TO_RIGHT.gif)";
    } else if (direction === "left") {
        fish.style.backgroundImage = "url(img/SWIM_TO_LEFT.gif)";
    }
}

function checkCollisionVegg() {
    if (xPos <= 0) {
        vegg.play();
        xDirection = 1;
        swim("right");
        points -= 100;
        liv -= 1;
    }
    if (xPos >= window.innerWidth - 100) {
        vegg.play();
        xDirection = -1;
        swim("left");
        points -= 100;
        liv -= 1;
    }
    if (yPos <= 0) {
        vegg.play();
        swim("down");
        yDirection = 1;
        points -= 100;
        liv -= 1;
    }
    if (yPos >= window.innerHeight - 100) {
        vegg.play();
        swim("up");
        yDirection = -1;
        points -= 100;
        liv -= 1;
    }
}

function checkCollisionmine() {
    var left = xPos + 100 < mineinfo.xpos;
    var right = xPos > mineinfo.xpos + 50;
    var over = yPos + 100 < mineinfo.ypos;
    var under = yPos > mineinfo.ypos + 50;
    if (!left && !right && !over && !under) {
        skade.play();
        xDirection = -xDirection;
        yDirection = -yDirection;
        liv -= 1;
        points -= 100;
        movemine();
    }
    mine.style.left = mineinfo.xpos + "px";
    mine.style.top = mineinfo.ypos + "px";
}

function checkCollisionchest() {
    var left = xPos + 100 < chestinfo.xpos;
    var right = xPos > chestinfo.xpos + 50;
    var over = yPos + 100 < chestinfo.ypos;
    var under = yPos > chestinfo.ypos + 38;
    if (!left && !right && !over && !under) {
        pop.play();
        points += 500;
        chestinfo.xpos = Math.floor(Math.random() * (innerWidth - 50) + 1);
        chestinfo.ypos = Math.floor(Math.random() * (innerHeight - 38) + 1);
        movemine();

    }
    chest.style.left = chestinfo.xpos + "px";
    chest.style.top = chestinfo.ypos + "px";
}


function gameLoop() {
    checkCollisionmine();
    checkCollisionchest();
    hdrPoints.innerHTML = "Points: " + points;
    hdrLiv.innerHTML = liv + '&nbsp;&nbsp;<img width="30px" src="img/hjerte.png">';
    if (liv === 0) {
        gameOver.play();
        theGameIsOn = false;
        hdr.innerHTML = "Game over!";
        opacityControl.style.opacity = 0.4;
        pauseplay();
        return
    }
    move();
    checkCollisionVegg();
    points += 1;
    if (theGameIsOn === true) {
        requestAnimationFrame(gameLoop);
    }
    highscore();
}
gameLoop();
document.onkeydown = function (evt) {
    var tastekode = evt.keyCode;
    if (tastekode === 39) { //Høyre
        xDirection = 1;
        yDirection = 0;
        swim("right");
    }
    if (tastekode === 37) { //left
        xDirection = -1;
        yDirection = 0;
        swim("left");
    }
    if (tastekode === 38) { //Opp
        swim("up");
        yDirection = -1;
        xDirection = 0;

    }
    if (tastekode === 40) { //Ned
        swim("down");
        yDirection = 1;
        xDirection = 0;
    }
}
// BUTTONS //
pauseKnapp.onclick = function () {
    if (theGameIsOn) {
        theGameIsOn = false;
        opacityControl.style.opacity = 0.4;
        pauseKnapp.innerHTML = "<b>▶</b>";
        snd.pause();
        snd2.play();
    } else {
        snd2.pause();
        snd.play();
        theGameIsOn = true;
        opacityControl.style.opacity = 1;
        gameLoop();
        pauseKnapp.innerHTML = "<b>||</b>";
    }

}
reloadKnapp.onclick = function () {
    xPos = 100;
    yPos = 500;
    xDirection = 1;
    yDirection = 0;
    fart = 5;
    liv = 10;
    hdrLiv.innerHTML = liv + '&nbsp;&nbsp;<img width="30px" src="img/hjerte.png">';
    points = 0;
    hdrPoints.innerHTML = "Points: " + points;
    move();
    swim("right");
    mine.style.left = mineinfo.xpos + "px";
    mine.style.top = mineinfo.ypos + "px";
    chest.style.left = mineinfo.xpos + "px";
    chest.style.top = mineinfo.ypos + "px";
    reloadKnapp.style.transition = "";
    snd.pause();
    snd.currentTime = 0
    snd2.currentTime = 0;
    snd2.play();
    menu.style.visibility = "visible";
    info.style.visibility = opacityControl.style.visibility = "hidden";
    pop.play();
    theGameIsOn = false;
    opacityControl.style.opacity = 0.4;
}
// WINDOW //
window.setInterval(function () {
    if (theGameIsOn) {
        fart++;
    }
}, 10000);
window.onload = function () {
    snd2.play();
}
window.setInterval(function () {
    var boblenr = Math.floor(Math.random() * (3)) + 1;
    boble.style.backgroundImage = "url(img/boble_" + boblenr + ".png)";
    var boblex = Math.floor(Math.random() * (innerWidth + 1));
    boble.style.left = boblex + "px";
    var fall = boble.animate([{
        top: innerHeight - boble.style.height + "px",
    }, {
        top: "0px"
    }], {
        iterations: 1,
        duration: 5000
    });
}, 5000);
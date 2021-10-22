var P = [];
var a = 1;
var sound = [];
var bg;

function preload() {
  for (var i = 1; i < 4; i++) {
    P[i] = [];
  }

  for (var i = 1; i < 14; i++) {
    for (var j = 1; j < 4; j++) {

      if (j == 1) {
        P[j][i] = createVideo('assets/P' + j + '/' + i + '.webm', P1Play);
      } else {
        P[j][i] = createVideo('assets/P' + j + '/' + i + '.webm');
      }

    }
  }
}

function setup() {

  createCanvas(displayWidth, displayHeight);
  bg = createVideo('assets/bg2.webm', bgplay);

  for (var i = 0; i < 14; i++) {
    if (i == 0) {
      sound[i] = loadSound('assets/sounds/' + i + '.mp3', sound1);
    } else {
      sound[i] = loadSound('assets/sounds/' + i + '.mp3');
    }
  }  

    //size and position der Illus  
    bg.size(bg.width * 5.5, AUTO);
    bg.position(width * 0.001, height * 0.01);

    bg.style('z-index', '1');

    for (var j = 1; j < 4; j++) {

      P[j][1].size(P[j][1].width * 2.7, AUTO);
      P[j][2].size(P[j][2].width * 1.2, AUTO);
      P[j][3].size(P[j][3].width * 3, AUTO);
      P[j][4].size(P[j][4].width * 0.8, AUTO);
      P[j][5].size(P[j][5].width * 1, AUTO);
      P[j][6].size(P[j][6].width * 1, AUTO);
      P[j][7].size(P[j][7].width * 2.3, AUTO);
      P[j][8].size(P[j][8].width * 0.8, AUTO);
      P[j][9].size(P[j][9].width * 1.6, AUTO);
      P[j][10].size(P[j][10].width * 2.2, AUTO);
      P[j][11].size(P[j][11].width * 1.5, AUTO);
      P[j][12].size(P[j][12].width * 5.5, AUTO);
      P[j][13].size(P[j][13].width * 1.3, AUTO);

      P[j][1].position(width * -0.06, height * 0.06);
      P[j][2].position(width * 0.05, height * 0.47);
      P[j][3].position(width * 0.1, height * 0.2);
      P[j][4].position(width * 0.275, height * 0.04);
      P[j][5].position(width * 0.4, height * 0.47);
      P[j][6].position(width * 0.34, height * 0.25);
      P[j][7].position(width * 0.32, height * 0.1);
      P[j][8].position(width * 0.52, height * 0.1);
      P[j][9].position(width * 0.5, height * 0.2);
      P[j][10].position(width * 0.6, height * 0.08);
      P[j][11].position(width * 0.66, height * 0.44);
      P[j][12].position(width * 0, height * 0.01);
      P[j][13].position(width * 0, height * 0.05);
    }

    P[3][1].size(P[3][1].width * 0.65, AUTO);
    P[3][1].position(width * 0.038, height * 0.12);

    P[2][2].size(P[3][1].width * 1.1, AUTO);
    P[2][2].position(width * 0.006, height * 0.365);
    P[3][2].size(P[3][1].width * 1.2, AUTO);
    P[3][2].position(width * -0.01, height * 0.35);

    P[3][4].size(P[3][4].width * 0.8, AUTO);
    P[3][4].position(width * 0.28, height * 0.04);

    P[3][7].size(P[3][7].width * 0.6, AUTO);
    P[2][7].position(width * 0.315, height * 0.07);
    P[3][7].position(width * 0.39, height * 0.06);

    P[2][5].size(P[2][5].width * 1.7, AUTO);
    P[3][5].size(P[2][5].width * 1, AUTO);
    P[2][5].position(width * 0.34, height * 0.4);
    P[3][5].position(width * 0.34, height * 0.4);

    P[2][8].size(P[2][8].width * 1.3, AUTO);
    P[3][8].size(P[3][8].width * 1.3, AUTO);
    P[2][8].position(width * 0.5, height * 0.08);
    P[3][8].position(width * 0.5, height * 0.08);

    P[3][9].size(P[3][9].width * 0.89, AUTO);
    P[3][9].position(width * 0.51, height * 0.22);

    P[3][11].size(P[3][11].width * 0.9, AUTO);
    P[3][11].position(width * 0.62, height * 0.46);
    P[2][11].position(width * 0.62, height * 0.44);

    //layering
    for (var i = 1; i < 14; i++) {
      for (var j = 1; j < 4; j++) {
        P[j][i].style('z-index', '2');
      }
      if (i == 7) {
        P[1][7].style('z-index', '3');
      }
      if (i == 13) {
        P[1][13].style('z-index', '1');
      }
    }

  }

  function draw() {

    background(255);

    for (var i = 1; i < 14; i++) {

      P[1][i].mouseClicked(P2Play);
      P[2][i].onended(P3Play);
      P[3][i].mouseClicked(P1Play);

      if (i == 7) {
        P[1][7].mouseClicked(P27Play);
        P[2][7].onended(P37Play);
        P[3][7].mouseClicked(P1Play);
      }
    }

    P[1][1].mouseOver(function() {
      a = 1;
    });
    P[1][2].mouseOver(function() {
      a = 2;
    });
    P[1][3].mouseOver(function() {
      a = 3;
    });
    P[1][4].mouseOver(function() {
      a = 4;
    });
    P[1][5].mouseOver(function() {
      a = 5;
    });
    P[1][6].mouseOver(function() {
      a = 6;
    });
    P[1][7].mouseOver(function() {
      a = 7;
    });
    P[1][8].mouseOver(function() {
      a = 8;
    });
    P[1][9].mouseOver(function() {
      a = 9;
    });
    P[1][10].mouseOver(function() {
      a = 10;
    });
    P[1][11].mouseOver(function() {
      a = 11;
    });
    P[1][12].mouseOver(function() {
      a = 12;
    });
    P[1][13].mouseOver(function() {
      a = 13;
    });

  }

  function P1Play() {

    for (var i = 1; i < 14; i++) {
      P[2][i].hide();
      P[3][i].hide();
    }

    for (var i = 1; i < 14; i++) {
      P[1][i].show();
      P[1][i].loop();
    }
      sound[a].stop();
    
  }

  function P2Play() {

    P[1][a].hide();
    P[3][a].hide();

    P[2][a].show();
    P[2][a].play();

//    sound[0].stop();
    sound[a].loop();
  }

  function P3Play() {

    P[1][a].hide();
    P[2][a].hide();

    P[3][a].show();
    P[3][a].loop();


  }

  function bgplay() {

    bg.show();
    bg.loop();

  }

  function P27Play() {

    P[1][7].hide();
    P[3][7].hide();

    P[2][7].show();
    P[2][7].play();

    P[2][12].style('z-index', '0');
    P[2][12].show();
    P[2][12].play();
    sound[9].loop();

  }

  function P37Play() {

    P[1][7].hide();
    P[2][7].hide();

    P[3][7].show();
    P[3][7].loop();

    P[3][12].show();
    P[3][12].loop();
    P[3][12].style('z-index', '0');

  }

  function sound1() {
    sound[0].loop();
    sound[10].loop();
  }
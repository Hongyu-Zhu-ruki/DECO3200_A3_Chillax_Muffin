// define the vars
let carryBomb;
let widthOfCarryBomb = 352;
let heightOfCarryBomb = 349;
let boomButton;
let widthOfBombButton = 346;
let heightOfBombButton = 221;
let gameStatus = 5;
let widthOfRect = 1400;
let heightOfRect = 600
let xOfRect;
let yOfRect;
let bottle;
let widhtOfBottle = 259;
let heightOfBottle = 345;
let shadowOfBottle;
let widthOfShadowOfBottle = 407;
let heightOfShadowOfBottle = 57;
let indentOfShadow = 50;
let throwBomb;
let widhtOfThrowBomb = 386;
let heightOfThrowBomb = 360;
let bomb;
let widthOfBomb  = 242;
let heightOfBomb = 243;
let xOfBomb;
let yOfBomb;
let indentOfBombThrow = 150
let meetX = 869;
let meetY = 325;
let flask;
let widhtOfFlask = 200;
let heightOfFlask = 197;
let flaskCount ;
let collideCount ;
let bottleText;
let target = 10;
let ele;
let lc2;
let lc3;
let ps;
let tt = 10;
let wz;
let psCount = 0;
let bgm;

function preload() {
  carryBomb = loadImage('carryBomb.png');
  bombButton = loadImage('bombButton.png');
  bottle = loadImage('bottle.png');
  shadowOfBottle= loadImage('shadowOfBottle.png');
  throwBomb = loadImage('throwBomb.png');
  bomb = loadImage('bomb.png');
  flask = loadImage('flask.png');
  bottleText = loadImage('bottleText.png');
  lc2 = loadImage('lc2.png')
  lc3 = loadImage('lc3.png')
  ps = loadImage('ps.jpg');
  wz = loadImage('wz.png');
  
  soundFormats('mp3');
  bgm = loadSound('bgm.mp3')
}

//Preparation
function setup() {
    createCanvas(1820, 720);//set up the size of canvas
    xOfRect = (width - widthOfRect) / 2;//rect width
    yOfRect = (height - heightOfRect) / 2;//rect width
    xOfBomb = xOfRect + widhtOfThrowBomb -indentOfBombThrow;
    yOfBomb = height - heightOfThrowBomb - yOfRect;
    flaskCount  = 0;
    collideCount = 0;
    ele =   new Audio('1.mp3');
    //bgm.play();
      
}
  
function draw() {
    background('#FCF3DD'); // set up the bg color
    stroke(255);

    
    rect(xOfRect, yOfRect, widthOfRect, heightOfRect);
    stroke(0);
    textSize(width / 20);
    
    if (gameStatus == 1) { // Scene1
      text(collideCount, width -(width-widthOfRect) /2-100, (height - heightOfRect) / 2 +100); // 显示数量 show the amount
      ready();// Draw the bottle figure on it
    } else if (gameStatus == 2) { //  Scene2 : throw the booms
      text(collideCount, width -(width-widthOfRect) /2-100, (height - heightOfRect) / 2 +100);
      throwBombFunction();    
    } else if (gameStatus == 3) {//  Scene3: Bomb and bottle collision scene
      text(collideCount, width -(width-widthOfRect) /2-100, (height - heightOfRect) / 2 +100);
      collide();
    } else if (gameStatus == 4) {//  Scene 4: Game over scene
      if(psCount == 0) {
        ele.play();
      }
      if (psCount < 120) {
        psCount++;
      textSize(width / 50);
      end();
      collideCount = 0;
    } else {
      gameStatus = 7;
      psCount = 0;
    }
      
    } else if (gameStatus == 5) {// Scene 5: Tutorial scene
      text(collideCount, width -(width-widthOfRect) /2-100, (height - heightOfRect) / 2 +100);
      ready();
      stroke(255, 0, 0);
      strokeWeight(4);
      noFill();
      circle(448, 559, 150);
      line(506,511,869, 310);
      line(869, 310,858, 328);
      line(869, 310,848, 308);
      image(lc2, 358, 172);
    } else if (gameStatus == 6) { //  Scene 6: Second Tutorial scene
      text(collideCount, width -(width-widthOfRect) /2-100, (height - heightOfRect) / 2 +100);  
      ready();
      stroke(255, 0, 0);
      strokeWeight(4);
      noFill();
      circle(width - widthOfBombButton - xOfRect + 100, height - heightOfBombButton - yOfRect + 100, 250);
      image(lc3, 1432, 310);
    } else if (gameStatus == 7) {
      image(wz, 758, 77);
      textSize(30)
      text('WOW! You successfully unlocked the new style bottle!', 552, 600);
      stroke(255, 0, 0);
      strokeWeight(4);
      noFill();
      rect(825, 611, 170, 46);
      strokeWeight(2);
      text('Play Again!', 830, 645);
     
    }

    
}


function end() {
  image(carryBomb, xOfRect, height - heightOfCarryBomb - yOfRect);
  image(bombButton, width - widthOfBombButton - xOfRect, height - heightOfBombButton - yOfRect);
  image(shadowOfBottle, (width - widthOfShadowOfBottle) / 2, yOfRect + heightOfBottle - indentOfShadow);
  //image(bottle, (width - widhtOfBottle) / 2, yOfRect);
  image(ps, 200, 60);
  xOfBomb = xOfRect + widhtOfThrowBomb -indentOfBombThrow;// draw the boom
  yOfBomb = height - heightOfThrowBomb - yOfRect;
  
}

function collide() {
  image(throwBomb, xOfRect, height - heightOfThrowBomb - yOfRect);
  image(bombButton, width - widthOfBombButton - xOfRect, height - heightOfBombButton - yOfRect);
  image(shadowOfBottle, (width - widthOfShadowOfBottle) / 2, yOfRect + heightOfBottle - indentOfShadow);
  image(bottle, (width - widhtOfBottle) / 2, yOfRect);
  image(bottleText, (width + widhtOfBottle) / 2- 50, yOfRect + heightOfBottle  / 2 - 100 );   
  image(flask, meetX - widhtOfFlask / 2, meetY - heightOfFlask / 2);
 
  //ele.autoplay(true);
  ele.play();
  // When the collision ends, return to scene 1
  if (flaskCount > tt) {
    flaskCount = 0;
    gameStatus = 1;
    collideCount++;
  }
  flaskCount++;
  // The collision occurred more than 10 times, return to scene 4
  if (collideCount >= target) {
    gameStatus = 4
  }
}

function throwBombFunction() {

  image(throwBomb, xOfRect, height - heightOfThrowBomb - yOfRect);
  image(bombButton, width - widthOfBombButton - xOfRect, height - heightOfBombButton - yOfRect);
  image(shadowOfBottle, (width - widthOfShadowOfBottle) / 2, yOfRect + heightOfBottle - indentOfShadow);
  image(bottle, (width - widhtOfBottle) / 2, yOfRect);
  image(bomb, xOfBomb, yOfBomb);
  image(bottleText, (width + widhtOfBottle) / 2- 50, yOfRect + heightOfBottle  / 2 - 100 );   
  xOfBomb += 4; //  The x-axis movement rate of the bomb
  yOfBomb -= 2; //  The y-axis movement rate of the bomb
  //console.log(xOfBomb + ":" + meetX);
  //  If there is a collision, return to scene 3
  if (xOfBomb > meetX-widthOfBomb+50) {
    gameStatus = 3;
  }
}

function ready() {
  image(carryBomb, xOfRect, height - heightOfCarryBomb - yOfRect);
  image(bombButton, width - widthOfBombButton - xOfRect, height - heightOfBombButton - yOfRect);
  image(shadowOfBottle, (width - widthOfShadowOfBottle) / 2, yOfRect + heightOfBottle - indentOfShadow);
  image(bottle, (width - widhtOfBottle) / 2, yOfRect);
  xOfBomb = xOfRect + widhtOfThrowBomb -indentOfBombThrow;
  yOfBomb = height - heightOfThrowBomb - yOfRect;
  image(bottleText, (width + widhtOfBottle) / 2- 50, yOfRect + heightOfBottle  / 2 - 100 );   
  
}
//  Mouse click trigger event
function mouseClicked() {
  console.log(mouseX);
  console.log(mouseY)
 
  if (mouseX > width - widthOfBombButton - xOfRect && mouseX < width  - xOfRect 
    && mouseY > height - heightOfBombButton - yOfRect && mouseY < height  - yOfRect && gameStatus == 1){
    
    gameStatus = 2
  return false;
} else if (gameStatus == 5 && mouseX >= 305 && mouseX <= 680 && mouseY >= 291 && mouseY <= 336) {//如果处于场景5，回到场景6 If you are in scene 5, go back to scene 6
  gameStatus = 6;
} else if(gameStatus == 6 && mouseX >= 1300 && mouseX <= 1820 && mouseY >= 250  && mouseY <= 720) {// 如果处于场景6 回到场景1 If you are in scene 6 back to scene 1
  gameStatus = 1;
} else if (gameStatus == 4) { // play again
  gameStatus = 5;
} else if (gameStatus == 7 &&mouseX >= 856 && mouseX <= 955 && mouseY >= 617  && mouseY <= 646) {
 gameStatus = 5; 
}

}
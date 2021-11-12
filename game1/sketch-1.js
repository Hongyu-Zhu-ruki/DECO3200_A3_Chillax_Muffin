let carryBomb;
let widthOfCarryBomb = 352;
let heightOfCarryBomb = 349;
let boomButton;
let widthOfBombButton = 346;
let heightOfBombButton = 221;
let gameStatus = 6;
let widthOfRect = 1400;
let heightOfRect = 600
let xOfRect;
let yOfRect;
let bottle;
let widthOfBottle = 259;
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
let xOfBottle;
let yOfBottle;
let flag = 0;
let p1;
let p2;
let p3;
let cccount;
let topText;
let rightText;
let ele;
let target = 20;
let sm;
let end1;
let end2;
let end3;
let end4;
let end5;
let end6;
let endArr;
let endCount;
let endIndex;

function preload() {
  bottle = loadImage('bottle.png');
  bomb = loadImage('bomb.png');
  flask = loadImage('flask.png');
  p1 = loadImage('1.png');
  p2 = loadImage('2.png');
  p3 = loadImage('3.png');
  topText = loadImage('topText.png');
  rightText = loadImage('rightText.png');
  sm = loadImage('sm.png');
  end1 = loadImage('end1.jpg')
  end2 = loadImage('end2.jpg')
  end3 = loadImage('end3.jpg')
  end4 = loadImage('end4.jpg')
  end5 = loadImage('end5.jpg')
  end6 = loadImage('end6.jpg')
  endArr = [];
  endArr.push(end1);
  endArr.push(end2);
  endArr.push(end3);
  endArr.push(end4);
  endArr.push(end5);
  endArr.push(end6);
  endCount = 0;
  endIndex = 0;
}

function setup() {
    createCanvas(1000, 1000);
    xOfBomb = xOfRect + widhtOfThrowBomb -indentOfBombThrow;
    yOfBomb = height - heightOfThrowBomb - yOfRect;
    flaskCount  = 0;
    collideCount = 0;
    cccount = 0;
    xOfBottle = (width - widthOfBottle ) / 2;
    yOfBottle = (height - heightOfBottle)
    ele =   new Audio('1.mp3');
}
  
function draw() {
    background('#FFFFFF');
    stroke(255);

    if (gameStatus == 1) { 

      ready();
    } else if (gameStatus == 2) {
      if (endCount < 180) {
        image(endArr[endIndex], 0, 0)
        endCount++;
      } else {
        endCount = 0;
        endIndex++;
        if (endIndex == 6) {
          endIndex =0;
          endCount = 0;
          gameStatus = 6;
        }
      }
      
      /*image(bottle, xOfBottle, yOfBottle);    
      textSize(height/40);
      stroke(0);
      text('Congratulations!You have broken the bottle!', 200, 100);
      */
    } else if(gameStatus == 3) {
//console.log('Hello');
      if (cccount < 100) {
        cccount++;
        image(bottle, xOfBottle, yOfBottle); 
        image(p3, 450, 100);
        
      } else {
        cccount = 0;
        gameStatus = 4;
      }
      
    } else if(gameStatus == 4) { 
      if (cccount < 100) {
        cccount++;
        image(bottle, xOfBottle, yOfBottle); 
        image(p2, 450, 100);
        
      } else {
        cccount = 0;
        gameStatus = 5;
      }
    }else if(gameStatus == 5) { 
      if (cccount < 100) {
        cccount++;
        image(bottle, xOfBottle, yOfBottle); 
        image(p1, 450, 100);
        console.log(xOfBottle);
      } else {
        cccount = 0;
        gameStatus = 1;
      }
    } else if (gameStatus == 6) {
      
        
        image(bottle, 370.5, yOfBottle); 
        image(topText, 0, 100); 
        image(rightText, 550, 750);
          
        image(sm, 70, 552);
        stroke(255, 0, 0);
        strokeWeight(4);
        noFill();
        circle(504, 846, 300);
        }
}


let count = 0 
let ccount = 0; 
class MyBomb {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
}
let bombSet = new Set();
let bombTmp = new Set();
function ready() {
  
  image(bottle, xOfBottle, yOfBottle);

  
  if (flag ==1 &&count <10) {
    image(flask, xOfBottle + widthOfBottle/2-100, yOfBottle + 73-100);
    count++;
  }
  
  if (count >= 10) {
    ele.play();
    flag = 0;
    count = 0;
    ccount++;
    if (ccount >= target) {
      gameStatus = 2;
    }
    }  

  bombTmp = new Set();
  for (let p of bombSet) {
    if (p.y <= height) {
      
      let centerX = p.x + widthOfBottle / 2;
      let centerY = p.y + 150;
      if(! (centerX - 25 <= xOfBottle + widthOfBottle/2 &&xOfBottle + widthOfBottle/2 <= centerX+25
        &&centerY - 25 <= yOfBottle + 73 &&yOfBottle  + 73<= centerY+25)) {

      bombTmp.add(p);}
      else {
        flag = 1;
      }
    }
  } 
  bombSet = new Set();
  for (let p of bombTmp) {
    bombSet.add(p);
  }
//  bombSet = bombTmp;
  if(bombSet.size < 2) {
    let myBomb =new MyBomb(Math.floor(Math.random() * 500) + 50, -100, Math.floor(Math.random() * 5) + 1);
    bombSet.add(myBomb);

  }
  for (let p of bombSet) {
    image(bomb, p.x, p.y);
    p.y += p.speed;
  }
  textSize(height/20);
  stroke(0);
  text(ccount, 50, 100)
}


function mouseDragged() {
  if (mouseY > yOfBottle && mouseY < yOfBottle + heightOfBottle &&
    mouseX > xOfBottle && mouseX < xOfBottle +widthOfBottle) {
      xOfBottle = mouseX - widthOfBottle/ 2;
     // yOfBottle = mouseY - heightOfBottle / 2;   
    }
  
  ellipse(mouseX, mouseY, 5, 5);
  // prevent default
  return false;
}

function mouseClicked() {
  console.log(mouseX)
  console.log(mouseY)
  if (gameStatus == 6 && mouseX >= 76 && mouseX <=395 && mouseY >= 671 && mouseY <= 741)
  gameStatus = 3;
  else if (gameStatus == 2) {
    cccount = 0;
    ccount = 0;
    gameStatus = 6;
  }
}

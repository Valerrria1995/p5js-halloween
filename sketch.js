let countdown = 10 * 24 * 60 * 60; // 10 days in seconds
let spiderY = 200; // Initial y-coordinate of the spider
let spiderSpeed = 3; // Speed at which the spider rises
let spiderImage;
let img;
let img1;
let orange;
let witch;
let button;
let treatButton;
let candies = [];
let candyImage;
let candyDuration = 5 * 1000; // 5 seconds in milliseconds
let candyStartTime = 0;

let message = 'HALLOWEEN PARTY!';
let messageX;
const xSpeed = 2;
const ySpeed = 0.05;
const amplitude = 100;
const verticalLetterSpacing = 10;
let font;
let slider;
let resetButton;

let ghosts = [];
let trickButton;
let trickStartTime = 0;
const trickDuration = 5 * 1000; // 10 seconds in milliseconds

// Music variables
let music;
let musicPlaying = false;

function preload() {
  spiderImage = loadImage('spider-1.png');
  witch = loadImage('witch.png');
  face = loadImage('face.png');
  img = loadImage('beak.png');
  candyImage = loadImage('candy.png');
  font = loadFont('Halloween.ttf');
  img1 = loadImage('yellow.png');
  orange = loadImage('orange.png');
  music = loadSound('Nightmare1.mp3');
}

//creating empty arrays for the
let brushX = [];
let brushY = [];

//creating global colors
let r;
let g;
let b;

function setup() {
  createCanvas(600, 800);
  music.play();
  musicPlaying = true;
  slider = createSlider(0, 50, 0); //סליידר ששולט בצבע רקע
  slider.position(250, 460);
  slider.style('width', '150px');
  //capture = createCapture(img);
  //capture.hide();
  textFont(font);
  //להתחיל את העכביש מהתחלה
  resetButton = createButton('Reset Spider');
  resetButton.position(10, 10);
  resetButton.mousePressed(resetSpider);
  
  function resetSpider() {
    // Reset the spider's position
    spiderY = 200;
  }
 

  // כפתור TRICK
  trickButton = createButton('TRICK');
  trickButton.position(240, 500);
  trickButton.mousePressed(runTrick);

  // כפתור TREAT
  treatButton = createButton('TREAT');
  treatButton.position(340, 500);
  treatButton.mousePressed(runTreat);

  // רוחות רפאים.
  // Try changing this to 100!
  for (let i = 0; i < 10; i++) {
    ghosts.push(new Ghost());
  }

  noStroke();
}

  

function draw() {
  background(random (0,15));
   imageMode(CENTER);
  image(witch, mouseX, mouseY, 100, 100);
   noStroke();
  rectMode(CENTER);
  for (let j = 0; j < brushY.length; j++) {
    rectMode( CENTER);
    fill(r, g, b, 127);
    rect(brushX[j], brushY[j], 20, 300);
    brushY[j] += 1;
    
    
  }
  
  let val = slider.value();
  background(val);
   image(face, 300, 700); //הפרצוף ברקע
  
  //טיימר שסופר 10 ימים אחורה
  let days = Math.floor(countdown / (24 * 60 * 60));
  let hours = Math.floor((countdown % (24 * 60 * 60)) / (60 * 60));
  let minutes = Math.floor((countdown % (60 * 60)) / 60);
 let seconds = countdown % 60;

  // Display the countdown clock
  textAlign(CENTER, CENTER);
  textSize(45);
  fill(0);
  text(
    //"Countdown: " +
      nf(days, 2) +
      ":" +
      nf(hours, 2) +
      ":" +
      nf(minutes, 2) +
      ":" +
      nf(seconds, 2),
    width / 2,
    height /2
  );

  // Update the countdown
  if (countdown > 0) {
    countdown--;
  }

  // עכביש שמטפס לפי השעון
  if (countdown % 15 === 0 && countdown > 0) {
    spiderY -= spiderSpeed;
  }

  // Draw the spider image
  imageMode(CENTER);
  image(spiderImage, width / 150, spiderY, 200, 800);
  fill(255, 155, 0);
  textSize(120);
  text("HALLOWEEN\n PARTY", 300, 180);
  textSize (30)
  text( "Duplex Club TLV 2.7.2023", 320,350)
  textAlign(LEFT, BASELINE);

  for (let i = 0; i < message.length; i++) {
    const letterX = messageX + textWidth(message.substring(0, i));

    const letterOffset = i * verticalLetterSpacing;
    const letterY =
      height / 2 + sin((frameCount - letterOffset) * ySpeed) * amplitude;
    imageMode(CENTER);
    image(img, 520, height / 10, 200, 200);
    image(img1, 313, 730, 490,350);
    
  }

  // 
  if (millis() - trickStartTime < trickDuration) {
    for (const ghost of ghosts) {
      ghost.moveAndDraw();
    }
  }

  // Check if the treat duration has passed
  if (millis() - candyStartTime < candyDuration) {
    for (const candy of candies) {
      candy.fallAndDraw();
    }
  }
}

// TRICK פעולה
function runTrick() {
  trickStartTime = millis();

  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].trick();
  }
}

//TREAT פעולה
function runTreat() {
  candyStartTime = millis();

  for (let i = 0; i < 10; i++) {
    candies.push(new Candy());
  }
}

// איך בנויים הרוחות רפאים
class Ghost {
  constructor() {
    this.tail = [];
    this.tailLength = 40;

    this.ghostSize = random(10, 100);
    this.ghostX = random(width);
    this.ghostY = random(height);

    this.cosOffset = random(100);
    this.wiggliness = random(2, 10);
    this.floatiness = random(2, 10);

    this.r = random(193);
    this.g = random(81);
    this.b = random(0);
  }

  moveAndDraw() {
    this.ghostX += cos((this.cosOffset + frameCount) / 5) * this.wiggliness;
    this.ghostY -= this.floatiness;

    if (this.ghostY < -this.ghostSize) {
      this.ghostY = height + this.ghostSize;
    }

    this.tail.unshift({ x: this.ghostX, y: this.ghostY });
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }

    for (let index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];
      const pointSize =
        (this.ghostSize * (this.tail.length - index)) / this.tail.length;
      const pointAlpha =
        (255 * (this.tail.length - index)) / this.tail.length;

      fill(this.r, this.g, this.b, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize);
    }

    fill(32);
    ellipse(
      this.ghostX - this.ghostSize * 0.2,
      this.ghostY - this.ghostSize * 0.1,
      this.ghostSize * 0.2
    );
    ellipse(
      this.ghostX + this.ghostSize * 0.2,
      this.ghostY - this.ghostSize * 0.1,
      this.ghostSize * 0.2
    );
    ellipse(
      this.ghostX,
      this.ghostY + this.ghostSize * 0.2,
      this.ghostSize * 0.2
    );
  }

  trick() {
    this.r = random(193);
    this.g = random(81);
    this.b = random(0);
  }
}

// סוכריות
class Candy {
  constructor() {
    this.candySize = random(10, 100);
    this.candyX = random(width);
    this.candyY = -this.candySize;
    this.candySpeed = random(1, 10);
  }

  fallAndDraw() {
    this.candyY += this.candySpeed;

    if (this.candyY > height) {
      this.candyY = -this.candySize;
    }

    imageMode(CENTER);
    image(candyImage, this.candyX, this.candyY, this.candySize, this.candySize);
  }
}
// הוספת פונקציה לבחירת צבע רקע
function changeBackgroundColor() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  background(r, g, b);
}

// פונקציה לאיפוס מיקום העכביש
function resetSpider() {
  spiderY = 200;
}

// פונקציה לאיפוס הרקע
function resetBackground() {
  slider.value(0);
  background(0);
}

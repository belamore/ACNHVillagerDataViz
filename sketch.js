let villagers;
let villagerList = [];
let bgImage;
let houseImage;
let myFont;
let myCursor;

function preload() {
  villagers = loadJSON('villagers.json');
  bgImage = loadImage('background.jpg');
  houseImage = loadImage('house1.png');
  myFont = loadFont('SourGummy-VariableFont_wdth,wght.ttf');
  myCursor = loadImage('cursor.png');
}

function setup() {
  createCanvas(1410, 700);
  noCursor();
  textAlign(CENTER);
  textSize(14);
  textFont(myFont);

  //list of villagers
  let keys = Object.keys(villagers);
  shuffle(keys, true);

  for (let i = 0; i < 4; i++) {
    let v = villagers[keys[i]];
    villagerList.push({
      name: v.name["name-USen"],
      species: v.species,
      personality: v.personality,
      hobby: v.hobby,
      saying: v.saying,
      textcolor: v["text-color"],
      bubblecolor: v["bubble-color"],
      icon: loadImage(`icons/villagers/${keys[i]}.png`)
    });
  }
}

function draw() {
  background(240);
  image(bgImage, 705, 350, width, height);

  let x = 235;
  let y = height / 1.8;
  let gap = 320;

  for (let i = 0; i < villagerList.length; i++) {
    let v = villagerList[i];

    imageMode(CENTER);
    let houseWidth = 250;
    let houseHeight = 220;

    image(houseImage, x, y + 20, houseWidth, houseHeight);
    textSize(30);
    stroke(255);
    strokeWeight(5);
    text("Hover over the houses to see your villagers!", 700, 90);
    noStroke();
    textSize(20);
    text("Refresh the page to get a new set of villagers.", 700, 125);

    //mouse hover over house
    if (
      mouseX > x - houseWidth / 2 &&
      mouseX < x + houseWidth / 2 &&
      mouseY > y + 20 - houseHeight / 2 &&
      mouseY < y + 20 + houseHeight / 2
    ) {
      //textbox
      rectMode(CENTER);
      fill(255, 200);
      rect(x, y, 200, 200, 10);

      //villager name
      stroke(v.bubblecolor);
      fill(v.textcolor);
      textSize(25);
      text(v.name, x, y - 20);
      noStroke();

      //villager data
      fill(0);
      textSize(15);
      text("Species:  " + v.species, x, y + 10);
      text("Personality:  " + v.personality, x, y + 30);
      text("Hobby: " + v.hobby, x, y + 50);
      textSize(13);
      text(v.saying, x, y + 80);

      //villager icon
      image(v.icon, x, y - 100, 100, 100);
    }

    x = x + gap;
  }

  imageMode(CENTER);
  image(myCursor, mouseX, mouseY, 35, 35);
}

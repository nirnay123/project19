var badJet, jet, badJetImg, jetImg, bullet;
var skyImg;
var gamestate="start";
var start, startImg;
var missile, missileImg;
var score, cloud, cloudImg, cloudsGroup;

function preload(){
    badJetImg = loadImage("badJet.png");
    jetImg = loadImage("jet.png");
    sceneImg = loadImage("sky.png");
    startImg = loadImage("start.png");
    missileImg=loadImage("missile.png");
    cloudImg=loadImage("cloud.png")
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    score=0;
    cloudsGroup= new Group();
    //start
    start=createSprite(width/2,height/3);
    start.addAnimation("startbutton", startImg);
    start.scale=0.2;
    //jet
    jet=createSprite(width/2,height/2,10,10);
    jet.addAnimation("jetFlying", jetImg);
    jet.scale=0.5;
    jet.setCollider("rectangle", 0,0,500,110);
    //badJet
    badJet=createSprite(100,height/2,10,10);
    badJet.addAnimation("badJetFlying", badJetImg);
    badJet.scale=0.5;
    //missile creation
    missile=createSprite(width+100,Math.round(random(0,height)));
    missile.addAnimation("missileFlying", missileImg);
    missile.scale=0.3;
    missile.setCollider("rectangle",0,0,400,120);
    bullet=createSprite(jet.x,jet.y,5,5);
    bullet.shapeColor="black";
    bullet.visible=false;
    badJet.setCollider("rectangle",0,0,400,120);
}
function draw() {
    background(sceneImg);
    if(gamestate==="start" || gamestate==="end"){
        stroke("green");
        fill("black");
        textSize(10);
        text("Insructions: Space to shoot, arrow Keys to navigate", 10, 20);
    }
    spawnClouds();
    fill("black");
    text("Score: "+ score, width-100,50);
    badJet.depth=jet.depth;
    if(gamestate=="play"){
        missileMove();
        start.visible=false;
        if(jet.isTouching(missile)){
            jet.velocityX-=10;
        }
        jetMove();
        shootBullet();
        if(frameCount%30===0){
            score+=1;
        }
    }
    if(jet.isTouching(badJet)){
        gamestate==="end";
    }
    if(gamestate==="end"){
        jet.x=width/2;
        jet.y=height/2;
        jet.rotation=0;
        jet.velocityX=0;
        jet.velocityY=0;
        start.visible=true;
        missile.y=Math.round(random(0,height));
        missile.x=width+100;
        stroke("green");
        fill("black");
        textSize(30);
        text("You got caught! Play again?", width/3, height/4);
    }
    if(missile.isTouching(bullet) || missile.x<(jet.x-50)){
        missile.y=Math.round(random(0,height));
        missile.x=width+100;
    }
    if(mousePressedOver(start)){
        gamestate="play";
        jet.x=width/2;
        jet.y=height/2;
        jet.rotation=0;
        jet.velocityX=0;
        jet.velocityY=0;
        missile.velocityX=-4;
        score=0;
    }
    jet.rotation=jet.velocityY*3.5;
    badJet.y=jet.y;
    //ending game if caught
    if(jet.isTouching(badJet)){
        gamestate="end";
    }
    drawSprites();
}

function jetMove(){
    if(jet.y<0 || jet.y>height){
        gamestate="end";
        jet.rotation=0;
    }
    if(keyDown("DOWN_ARROW")){
        jet.velocityY+=0.2;
    }
    else if(keyDown("UP_ARROW")){
        jet.velocityY-=0.2;
    }
    else{
        if(jet.velocityY<0){
            jet.velocityY+=0.2;
        }
        if(jet.velocityY>0){
        jet.velocityY-=0.2;
        }
    }
    if(jet.velocityX<0){
        jet.velocityX+=1;
    }
    else{
        jet.velocityX=0;
    }
}

function missileMove(){
    if(jet.y<missile.y){
        missile.y-=2;
    }
    else if(jet.y>missile.y){
        missile.y+=2;
    }
}
function shootBullet(){
    if(keyDown("space") && gamestate==="play"){
      bullet=createSprite(jet.x,jet.y,5,5);
      bullet.shapeColor="black";
      bullet.x=jet.x;
      bullet.y=jet.y;
      bullet.velocityX=3;
      bullet.visible=true;
      bullet.depth=jet.depth;
      jet.depth+=1;
      bullet.lifetime=100;
    }
  }

function spawnClouds() {
  //code to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+50,Math.round(random(70,height-70)),40,10);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 450;

    start.depth=cloud.depth;
    start.depth+=1;
  }
}
var START=0;
var PLAY=1;
var END=2;

var score=0;
var life=3;


var gameState = START;

var restart;

function preload(){
  back1Img = loadImage("back1.png");
  playImg = loadImage("play_button.png");
  back2Img = loadImage("space1.jpg");
  m1Img=loadImage("meteoroid1.png");
  m2Img=loadImage("m2.png");
  A1Img=loadImage("A1.png");
  A2Img=loadImage("A2.png");
  fireBallIMG=loadImage("fireBall.png")
  jetimg=loadImage("jet.png")
  restartImg=loadImage("restart.png")
  
  themeSound=loadSound("theme.mp3")
  shootingSound=loadSound("shooting.mp3")
  winSound=loadSound("win.mp3")
  dieSound=loadSound("die.mp3")
}



function setup() {
  createCanvas(windowWidth , windowHeight);
  back1 = createSprite(windowWidth/2,windowHeight/2);
  back1.addImage(back1Img)
  
  playBtn = createSprite(windowWidth/2-530, windowHeight/2+120)
 playBtn.addImage(playImg)
 playBtn.scale = 0.1

  back2 = createSprite(windowWidth/2, windowHeight/2);
  back2.addImage( "b1",back2Img);
  back2.visible=false
  
  player=createSprite(width/2, height-50,30,30)
  player.addImage(jetimg)
  player.scale=0.5;
  player.visible=false
  
  restart=createSprite(windowWidth/2, windowHeight/2)
  restart.addImage(restartImg)
  restart.scale= 0.7;  
  restart.visible=false
  
  m1group=createGroup();
  m2group=createGroup();
  a1group=createGroup();
  a2group=createGroup();
  
  fireBallGroup=createGroup();
  
  themeSound.loop()
}



function draw() {
  background(0);
  drawSprites();
  fill("yellow");
  textSize(20)
  text("Score: "+score,width-200,80);
  text("Lives: "+life,width-200,100);
   
  if(gameState===START){
    restart.visible=false
     if(mousePressedOver(playBtn)){
       gameState = PLAY
     }
   }
  if(gameState===PLAY){
    //restart.visible=false
    
    back1.visible=false;
    playBtn.visible=false;
    back2.visible= true;
    back2.velocityY=5;
    player.visible=true;
    
    
    
    if(back2.y>windowHeight){
      back2.y=windowHeight/2
    }
    
    player.x=mouseX;
    
    
    var select1= Math.round(random(1,2))
    if(frameCount%160===0){
      if(select1===1){
        spawnMeteoriod1();
      }
        if(select1===2){
        spawnAliens1();
      }
    }
    
    
     var select2= Math.round(random(1,2))
    if(frameCount%180===0){
      if(select2===1){
        spawnMeteoriod2();
      }
        if(select2===2){
        spawnAliens2();
      }
    }
  
    if(keyWentDown("space")){
    createfireballs();
    shootingSound.play();
  }
    
    //destroying a1 by fireball
        for(var fb = 0; fb < fireBallGroup.length; fb++){
          for(var al=0;al<a1group.length;al++){
            if(fireBallGroup.isTouching(a1group)){
              a1group.get(al).remove();
              fireBallGroup.get(fb).lifetime=0;
              score = score + 50;
            }
          }
        }
    
   //destroying a2 by fireball
        for(var fb1 = 0; fb1 < fireBallGroup.length; fb1++){
          for(var a2=0;a2<a2group.length;a2++){
            if(fireBallGroup.isTouching(a2group)){
              a2group.get(a2).remove();
              fireBallGroup.get(fb1).lifetime=0;
              score = score + 50;
            }
          }
        }
    
    //destroying m1 by fireball
        for(var fb2 = 0; fb2 < fireBallGroup.length; fb2++){
          for(var ml=0;ml<m1group.length;ml++){
            if(fireBallGroup.isTouching(m1group)){
              m1group.get(ml).remove();
              fireBallGroup.get(fb2).lifetime=0;
              score = score + 50;
            }
          }
        }
    
    
    //destroying m2 by fireball
        for(var fb3 = 0; fb3 < fireBallGroup.length; fb3++){
          for(var m2=0;m2<m2group.length;m2++){
            if(fireBallGroup.isTouching(m2group)){
              m2group.get(m2).remove();
              fireBallGroup.get(fb3).lifetime=0;
              score = score + 50;
            }
          }
        }
    if(m1group.isTouching(player)||m2group.isTouching(player)||a1group.isTouching(player)||a2group.isTouching(player)){
      life=life-1;
      dieSound.play();
      gameState=END;
    }
    
  }
  
  else if(gameState===END) {
    
    back2.velocityY=0
    a1group.destroyEach();
    a2group.destroyEach();
    m1group.destroyEach();
    m2group.destroyEach();
    
    player.destroy();
    
    
    if (life>=1) {
      restart=createSprite(windowWidth/2, windowHeight/2)
      restart.addImage(restartImg)
      restart.scale= 0.7;  
      restart.visible=true;
      //restart.visible=true;
          textSize(20)
          fill("cyan")
          text("TRY AGAIN...",windowWidth/2-50,windowHeight/2+100)
          if (mousePressedOver(restart)){
          
          reset();
        }
    }
      else{
      restart.visible=false;
      textSize(30)
      fill("red")
      stroke("yellow")
      strokeWeight(3);
      text("Sorry!!! You LOSE",windowWidth/2-50,windowHeight/2)
    }
      
    }
    
    
    
   
    
    
  
  
  if(score===1500 && gameState===PLAY){
      winSound.play();
      gameState=START
      score=0;
      life=3;
    }
  
  
}

function reset(){
  //restart.visible = true;
  
  gameState=PLAY
  
  
  back2 = createSprite(windowWidth/2, windowHeight/2);
  back2.addImage( "b1",back2Img);
  
  player=createSprite(width/2, height-50,30,30)
  player.addImage(jetimg)
  player.scale=0.5;
  player.x=mouseX
  
 //preload();
  
}

function spawnMeteoriod1(){
    var m1 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    m1.addImage(m1Img);
    m1.scale=0.1;
    m1.velocityY=8+score/200;
    m1.lifetime=800;
    m1group.add(m1)
  }  
  
  


function spawnMeteoriod2(){
  
    var m2 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    m2.addImage(m2Img);
    m2.scale=0.2;
    m2.velocityY=8+score/200;
    m2.rotation=180;
    m2.lifetime=800;
    m2group.add(m2)
    
  }  
  
function spawnAliens1(){
  
    var A1 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    A1.addImage(A1Img);
    A1.scale=0.5;
    A1.velocityY=8+score/200;
   // A1.rotation=180;
    A1.lifetime=800;
    a1group.add(A1)
  }  
  


function spawnAliens2(){
 
    var A2 = createSprite(random(windowWidth/2-600,windowWidth/2+600),20,50 , 50 )
    A2.addImage(A2Img);
    A2.scale=0.5;
    A2.velocityY=8+score/200;
   // A2.rotation=180;
    A2.lifetime=800;
    a2group.add(A2)
  }  
  
  
function createfireballs(){
          var fireBall= createSprite(200,500,20, 20);
          fireBall.addImage(fireBallIMG);
          fireBall.x=player.x;
          fireBall.velocityY = -8 ;
          fireBall.lifetime = 800;
          fireBall.scale = 0.1;
          fireBallGroup.add(fireBall);
          //ShootSound.play()
}
    




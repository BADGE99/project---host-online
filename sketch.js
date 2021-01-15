var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState;
var PLAY = 1;
var END = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(455, 355);
  
   monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.scale = -4;
  console.log(ground.x)
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {

   background(255);
     
  
if(gameState === PLAY){
     
  score = score + Math.round(getFrameRate()/60);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && monkey.y>= 100){
    
    monkey.velocityY = -12;
    
  } 
  if(invisible.x<0){
    invisible.x = invisible.width/2;
  }
  
  invisible.velocityX = -5;
  
  
     
  if(obstaclesGroup.isTouching(monkey)){
      
    gameState = END;
   
   }
}
else if (gameState === END) {
  
  ground.velocityX = 0;
  monkey.velocityY = 0;
  
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0)
  
}
     
     
  spawnfood();
  spawnObstacles();
  
     
  
   stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time: "+survivalTime,100,50);
   
   monkey.velocity.Y = monkey.velocityY + 0.8;
  monkey.collide(ground);
    
  
  drawSprites();
}

function spawnfood() {
  
if(frameCount%80 === 0){
  var banana = createSprite(600,250,40,10);
  banana.y = random(120,200);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 100;
  FoodGroup.add(banana);

  }
} 

function spawnObstacles(){
  if(frameCount%300 === 0){
    var obstacle = createSprite(500,365,23,32);
    obstacle.y = random(120,200);
    obstacle.addImage(obstacleImage); 
    obstacle.velocityX = -(5 + score/100);
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
   
  }
}





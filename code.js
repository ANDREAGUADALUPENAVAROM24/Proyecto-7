var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("rgb(70,52,175)");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("rgb(70,52,175)");


var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "blue";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "blue";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "blue";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "blue";



var pelota = createSprite(200,200,13,13);
pelota.shapeColor="rgb(22,104,175)";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "purple";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "purple";

var campScore=0;
var playerScore=0;

var gameState="serve";


function draw() {
  //clear the screen
  background("lightblue");
  
if(gameState=="serve")
  {
         //display text
      textSize(22);
      fill ("rgb(12,0,158)");
      text("Para iniciar presiona space",80,170);
      
      //serve the striker when space is pressed
      if (keyDown("space")) {
        serve();
         gameState="play";
      }
      
     
  }    

   
playSound("", true);
  
   
  //make the player paddle move with the Arrow keys
  if (keyDown("RIGHT")) {
     playerMallet.x=playerMallet.x+8;
   }
   
   if (keyDown("left")) {
     playerMallet.x=playerMallet.x-8;
   }
   
   textSize(20);
   fill("rgb(101,0,238)");
   text(campScore, 25, 225);
   text(playerScore, 25, 185);
    
  
   if (pelota.isTouching(goal1)) {
    campScore= campScore +1;
        pelota.x=200;
        pelota.y=200;
        pelota.velocityX=0;
        pelota.velocityY=0;
     
     
   }
  
   if (pelota.isTouching(goal2)) {
    playerScore= playerScore +1;
        pelota.x=200;
        pelota.y=200;
        pelota.velocityX=0;
        pelota.velocityY=0;
     
  }
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = pelota.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  if (playerScore==5) {
    textFont("Arial");
    textSize(25);
    fill("rgb(18,150,139)");
    text("Game over", 150,160 );
     pelota.velocityX = 0;
     pelota.velocityY = 0;
    
  }
  
  if (campScore==5) {
    textFont("Arial");
    textSize(25);
    fill("rgb(18,150,139)");
    text("Game over", 150, 160);
    pelota.velocityX = 0;
    pelota.velocityY = 0;
    
  }
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  pelota.bounceOff(edges);
  pelota.bounceOff(playerMallet);
  pelota.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  

 
  
  //serve the striker when space is pressed
  if (keyDown("space")) {
    serve();
  }
  
 
  drawSprites();
}

function serve() 
{
  pelota.velocityX = 12;
  pelota.velocityY = 8;
  
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;
var boat
function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.gif');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  boat = loadImage('boat.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
   bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

 

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(1000,800);
  frameRate(100);
  engine = Engine.create();
  world = engine.world;
  bk_song.play();
  bk_song.setVolume(0.5);

mute_btn = createImg('mute.png');
  mute_btn .position(490,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  blower = createImg('balloon.png');
  blower.position(100,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  blower2= createImg('balloon.png');
  blower2.position(350,250);
  blower2.size(150,100);
  blower2.mouseClicked(airblow);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);


  bunny2 = createSprite(480,130,100,100);
  bunny2.addImage(rabbit);
  bunny2.scale = 0.1;
  higherground2 =new Ground(270,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  bunny2.addAnimation('blinking',blink);
  bunny2.addAnimation('eating',eat);
  bunny2.addAnimation('crying',sad);
  bunny2.changeAnimation('blinking');


  bunny3 = createSprite(320,200,30,30);
  bunny3.addImage(rabbit);
  bunny3.scale = 0.2;


  bunny3.addAnimation('blinking',blink);
  bunny3.addAnimation('eating',eat);
  bunny3.addAnimation('crying',sad);
  bunny3.changeAnimation('blinking');

  bunny4= createSprite(150,130,150,10);
  bunny4.addImage(rabbit);
  bunny4.scale = 0.35;


  bunny4.addAnimation('blinking',blink);
  bunny4.addAnimation('eating',eat);
  bunny4.addAnimation('crying',sad);
  bunny4.changeAnimation('blinking');
























  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);


  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);


  button2.mouseClicked(drop);
 
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    

    bunny.changeAnimation('eating');

    
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }

  drawSprites();

}

function drop()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  air.play()

}
function mute(){
if(bk_song.isPlaying()){
bk_song.stop()
}
else{
bk_song.play()
}
}
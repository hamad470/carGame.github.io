const startSecreen=document.querySelector(".startSecreen");
const gameArea=document.querySelector(".gameArea");


const score=document.querySelector(".score");
const keys ={ArrowUp:false,
    ArrowDown:false,
    ArrowLeft : false,
    ArrowRight:false
   }
document.addEventListener("keydown",keyDown);
function keyDown(e){
e.preventDefault();

keys[e.key]=true;
// console.log(keys);

}
document.addEventListener("keyup",keyUp);
function keyUp(e){
e.preventDefault();
keys[e.key]=false;
// console.log(keys);

}
//start
const player={
    speed : 5
}
function moveLines(){
    let lines=document.querySelectorAll(".lines");
    lines.forEach((moving)=>{
     if(moving.y>700){
         moving.y=-50; 
        }
        moving.y+=player.speed;
        moving.style.top=moving.y + "px";
      
        
    })
  
}
function moveEnemy(car){
    let enemy=document.querySelectorAll(".enemyCars");
    enemy.forEach((moving)=>{
        if(isCollide(car,moving)){
            startSecreen.innerHTML=`your score was : ${player.score+1} click here to start again`;
player.start=false;
player.speed=5;
startSecreen.classList.remove("hide");

        }
     if(moving.y>700){
         moving.y=-300; 
         moving.style.left=Math.ceil(Math.random()*350) +  "px";
        }
      
        moving.y+=player.speed;
        moving.style.top=moving.y + "px";
      
        
    })
  
}
function isCollide(a,b){
    let  aRect=a.getBoundingClientRect();
    let bRect =b.getBoundingClientRect();
    // console.log(aRect.top);
    // console.log(bRect.bottom);
    return !((aRect.top>bRect.bottom)||(aRect.bottom<bRect.top)||(aRect.left>bRect.right)||aRect.right<bRect.left)


}
startSecreen.addEventListener("click",start);
function gamePlay(){

 let road=gameArea.getBoundingClientRect();
//  console.log(road);  
 if(player.start){
    let car = document.querySelector(".car");
    let carSize=car.getBoundingClientRect();
    
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    if(keys.ArrowUp && player.y>road.top+carSize.height){
        player.y-=player.speed;
    }
    if(keys.ArrowDown && player.y<(road.height-carSize.height)){
        player.y+=player.speed;
    }
    if(keys.ArrowLeft && player.x>0){
        player.x-=player.speed;
    }
    if(keys.ArrowRight && player.x<(road.width-carSize.width)){
        player.x+=player.speed;
    }
    car.style.left = player.x + "px";
    
    car.style.top= player.y + "px";
  moveLines();
  moveEnemy(car);
  player.score++;
  score.innerHTML=`score : ${player.score}`
    player.speed+=0.01;
    window.requestAnimationFrame(gamePlay); 
 }
   
}
function start(){
    player.start=true;
    player.score=0;
    startSecreen.classList.add("hide");
    // gameArea.classList.remove("hide");
    gameArea.innerHTML="";
    const car = document.createElement("div");
car.setAttribute("class","car");

gameArea.appendChild(car);
for(let i=0;i<5;i++){
    let roadLines=document.createElement("div");
roadLines.setAttribute("class","lines");
roadLines.y=(i*150);
roadLines.style.top=roadLines.y + "px";
gameArea.appendChild(roadLines); 
}
for(let i=0;i<4;i++){
    let enemy=document.createElement("div");
enemy.setAttribute("class","enemyCars");
enemy.style.backgroundColor=randomColors();

enemy.y=((i+1)*(250))*-1;

enemy.style.top=enemy.y + "px";
enemy.style.left=Math.ceil(Math.random()*350) +  "px";
gameArea.appendChild(enemy); 
}
window.requestAnimationFrame(gamePlay);
}
function randomColors(){
function c(){
    let hex= Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2);


}
    return "#"+c()+c()+c();
}
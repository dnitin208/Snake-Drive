// game constants

// document

let inputDir={x:0, y:0};
const foodsound=new Audio("food.mp3");
const gameoversound=new Audio("gameover.mp3");
const movesound=new Audio("move.mp3");
const musicsound=new Audio("music.mp3");
let speed=10;
let score=0;
let lastpainttime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:6, y:7};

// document.querySelector(".btn1").click(function(){
    
//     speed=20;
// });
// document.querySelector(".btn2").click(function(){
//     speed=10;
// });
// document.querySelector(".btn3").click(function(){
//     speed=15;
// });


// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;

    gameengine();
}

function iscollide(snake){
    //  return false;
    // if snake touch himshelf;
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }   
    }
    // if u bump in wall;
    if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
        return true;
    }
}

function gameengine(){
    // 1. Updating the snake array and food;
    // scorebox.innerHTML="Score: 0";
    
 
    musicsound.play();
    if(iscollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Hurrey !!! Game Over, Press Any Button");
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;
        scorebox.innerHTML="Score: 0";
    }

    // if u had eaten the food increment the score and degenerate the food;

    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        // unshift is use to add a snake part--> increase the size of snake;
        foodsound.play();
        score+=1;
        scorebox.innerHTML="Score: "+score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x, y:snakearr[0].y+inputDir.y});
        let a=1;
        let b=19;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    }
    // moving the snake;


    for(let i=snakearr.length-2;i>=0;i--){
        // const element=array[i+1];
        // snakearr[i+1]=snakearr[i];
        // reference problem;
        snakearr[i+1]={...snakearr[i]};
    }

    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;


    // 2. Display tha snake and food;
    
    // Display the snake;
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement("div");
        snakeelement.style.gridRowStart= e.y;
        snakeelement.style.gridColumnStart= e.x;
        
        if(index===0){
            snakeelement.classList.add("head");
        }
        else{
            snakeelement.classList.add("snake");   
        }
        board.appendChild(snakeelement);    
    });

    // Display the food;
        foodelement=document.createElement("div");
        foodelement.style.gridRowStart= food.y;
        foodelement.style.gridColumnStart= food.x;
        foodelement.classList.add("food");
        board.appendChild(foodelement);  

}




// logic starts here
window.requestAnimationFrame(main);

window.addEventListener("keydown",function(event){
    inputDir={x:0,y:1};   //Start the game
    movesound.play();
    switch(event.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0
            inputDir.y=1;
            break;
         case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

         case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});




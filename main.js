////////////////Init game data ///////////////////////

let gameLayout = document.getElementById("gameLayout");

//score
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;

let currentScoreCtx = gameLayout.getContext("2d");
let highScoreCtx = gameLayout.getContext("2d");
highScoreCtx.font = "80px Arial";

//define height and width and color of layout
let w = 1350;
let h = 657;
gameLayout.height = h;
gameLayout.width = w;
gameLayout.style.backgroundColor = "rgb(40, 40, 41)";

//Surface 
let surfaceCtx = gameLayout.getContext('2d');
let surface = {
    x_position: 0,
    y_position: 657 - 100,
    width: 1350,
    height: 100
}

//Cowboy
let cowBoyCtx = gameLayout.getContext('2d');
let cowBoy = {
    x_position: 120,
    y_position: 657 - 180,
    width: 80,
    height: 80
}

let cowBoyRunning = ["Run__000.png", "Run__001.png", "Run__002.png", "Run__003.png", "Run__004.png", "Run__005.png", "Run__006.png", "Run__007.png", "Run__008.png", "Run__009.png"];
let cowBoyJumping = ["Jump__000.png", "Jump__001.png", "Jump__002.png", "Jump__003.png", "Jump__004.png", "Jump__005.png", "Jump__006.png", "Jump__007.png", "Jump__008.png", "Jump__009.png"]
let cowBoyImg = new Image;
let srcIndex = 0;

// Crismas tree
let CrismastreeCtx = gameLayout.getContext("2d")
let c_tree = {
    x_position: 1280,
    y_position: 477,
    width: 80,
    height: 80
}

let CrismastreeImg = new Image;
CrismastreeImg.src = "Assets/Trees/cristmas.png";

//moon
let moonCtx = gameLayout.getContext('2d');
let moonVal = {
    x_position: 900,
    y_position: 50,
    width: 80,
    height: 80
}

let moonImg = new Image;
moonImg.src = "Assets/moon.png"

//Cloud
let cloudCtx = gameLayout.getContext('2d');
let cloudVal = {
    x_position: 300,
    y_position: 5,
    width: 500,
    height: 120
}

let cloudOneImg = new Image;
cloudOneImg.src = "Assets/sky_objects/cloud_1.png"


///////////////////player movements//////////////////////

//jump player
let isJumping = false;
addEventListener('keydown',function (e){
    if((e.key == "ArrowUp" || e.key == " " || e.key == "w") && (cowBoy.y_position >= 476)){
        isJumping  = true
    }
}) 

////////////////////////Game loop/////////////////////////

let miliSecond = 35

let loop = setInterval(() => {

    cowBoyCtx.clearRect(0, 0, w, h)

    //score
    currentScore++
    currentScoreCtx.font = "26px Arial";
    currentScoreCtx.fillText(`score : ${currentScore}`, 20, 50);
    highScoreCtx.fillText(`High Score : ${highScore}`, 20, 80);

    //draw moon
    moonCtx.drawImage(moonImg, moonVal.x_position, moonVal.y_position, moonVal.width, moonVal.height);
    
    //draw cloud
    if (cloudVal.x_position <= -500) {
        cloudVal.x_position = 1360
    } else {
        cloudVal.x_position -= 0.7
    }
    cloudCtx.drawImage(cloudOneImg, cloudVal.x_position, cloudVal.y_position, cloudVal.width, cloudVal.height)

    //draw surface
    surfaceCtx.fillRect(surface.x_position, surface.y_position, surface.width, surface.height)
    surfaceCtx.fillStyle = "green"

    //Tree
    if (c_tree.x_position <= 0) {
        c_tree.x_position = 1280
    } else {
        c_tree.x_position -= 30
    }

    CrismastreeCtx.drawImage(CrismastreeImg, c_tree.x_position, c_tree.y_position, c_tree.width, c_tree.height)

    //Loop cowboy
    if(isJumping == true){
        //jump cowboy
        if(cowBoy.y_position >= 320){
            cowBoy.y_position-=15
        }else{
            isJumping = false
        }
        cowBoyImg.src = `Assets/Monkey/Jumping/${cowBoyJumping[srcIndex]}`
        cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
        if (srcIndex == 8) {
            srcIndex = 0
        } else {
            srcIndex++
        }
    }else{
        if(cowBoy.y_position < 477){
            cowBoy.y_position+=15
        }
        cowBoyImg.src = `Assets/Monkey/Running/${cowBoyRunning[srcIndex]}`
        cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
        if (srcIndex == 8) {
            srcIndex = 0
        } else {
            srcIndex++
        }
    }

    //defeat check (collision between player and tree)
    if((cowBoy.x_position >= c_tree.x_position ) && (cowBoy.y_position >= c_tree.y_position)){
        alert("You lost")
        //stop game loop
        clearInterval(loop)
        if(currentScore > highScore){
            localStorage.setItem('highScore', currentScore)
        }
    }

}, miliSecond);

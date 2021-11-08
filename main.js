///////////////////Play Guide /////////////////////////
let countDown = document.querySelector('.countDown');
let modal = document.querySelector('.modal')

let ruleBox = document.querySelector('.rules-guide');
let ruleNextBtn = document.getElementById('rules-next-btn');

let controlBox = document.querySelector('.control-guide')
let ctrlNextBtn = document.getElementById('ctrl-next-btn');
let ctrlBackBtn = document.getElementById('ctrl-back-btn');

let scoreBox = document.querySelector('.score-guide')
let scoreStartBtn = document.getElementById('score-start-btn');
let scoreBackBtn = document.getElementById('score-back-btn');

controlBox.style.display = 'none'
scoreBox.style.display = 'none'

ruleNextBtn.addEventListener('click',()=>{
    controlBox.style.display = 'block';
    ruleBox.style.display = 'none';
})

ctrlNextBtn.addEventListener('click',()=>{
    controlBox.style.display = 'none';
    scoreBox.style.display = 'block';
})


ctrlBackBtn.addEventListener('click',()=>{
    controlBox.style.display = 'none';
    ruleBox.style.display = 'block';
})

scoreBackBtn.addEventListener('click',()=>{
    controlBox.style.display = 'block';
    scoreBox.style.display = 'none';
})

scoreStartBtn.addEventListener('click',()=>{
    scoreBox.style.display = 'none';
    let counter = 3
    let countdown = setInterval(()=>{
        countDown.innerHTML = counter
        counter--
        console.log(counter)
        if(counter == -1) {
            clearInterval(countdown)
            modal.style.display = 'none'
            //start game after coundown is 0
            start()
        }
    },1000)
    //desktopGuid.style.display = 'block';
})

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
    height: 80,
    speed : 30
}

let CrismastreeImg = new Image;
CrismastreeImg.src = "Assets/Trees/cristmas.png";

//bird
let birdCtx = gameLayout.getContext('2d');
let angryBird = {
    x_position: 1680,
    y_position: 360,
    width: 50,
    height: 50,
    speed : 30
}
let birdsImgArr = ['bird-1.png', 'bird-2.png', 'bird-3.png', 'bird-4.png'];
let angryBirdImg = new Image
let birdSrcIndex = 0;

//moon
let moonCtx = gameLayout.getContext('2d');
let moonVal = {
    x_position: 900,
    y_position: 50,
    width: 80,
    height: 80
}

let moonImg = new Image;
moonImg.src = "Assets/sky_objects/moon.png"

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
addEventListener('keydown', function (e) {
    if ((e.key == "ArrowUp" || e.key == " " || e.key == "w") && (cowBoy.y_position >= 476)) {
        isJumping = true
    }
})

////////////////////////Game loop/////////////////////////

function start(){
      //loop speed
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

    /////////////////Draw random obstacles //////////////////
    let randObstacle = Math.floor(Math.random() * 3) + 1

    //Tree
    if (c_tree.x_position <= 0) {
        c_tree.x_position = 1280
    } else {
        c_tree.x_position -= c_tree.speed
    }

    CrismastreeCtx.drawImage(CrismastreeImg, c_tree.x_position, c_tree.y_position, c_tree.width, c_tree.height)

    //Draw Bird
    if (angryBird.x_position <= 0) {
        if (c_tree.x_position <= 1280 && c_tree.x_position >= 100) {
            //draw after tree in any random value 
            angryBird.x_position = 1280 + c_tree.x_position + Math.floor(Math.random()*(1000-200+1)+200)
            // console.log(Math.floor(Math.random * 800) + 200)
        } else {
            angryBird.x_position = 1280
        }
    } else {
        angryBird.x_position -= angryBird.speed
    }

    angryBirdImg.src = `Assets/angryBird/${birdsImgArr[birdSrcIndex]}`
    birdCtx.drawImage(angryBirdImg, angryBird.x_position, angryBird.y_position, angryBird.width, angryBird.height);
    if (birdSrcIndex == 3) {
        birdSrcIndex = 0
    } else {
        birdSrcIndex++
    }

    //Loop cowboy
    if (isJumping == true) {
        //jump cowboy
        if (cowBoy.y_position >= 320) {
            cowBoy.y_position -= 15
        } else {
            isJumping = false
        }
        cowBoyImg.src = `Assets/Monkey/Jumping/${cowBoyJumping[srcIndex]}`
        cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
        if (srcIndex == 8) {
            srcIndex = 0
        } else {
            srcIndex++
        }
    } else {
        if (cowBoy.y_position < 477) {
            cowBoy.y_position += 15
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
    if ((cowBoy.x_position >= c_tree.x_position) && (cowBoy.y_position >= c_tree.y_position)) {
        alert("You lost")
        //stop game loop
        clearInterval(loop)
        if (currentScore > highScore) {
            localStorage.setItem('highScore', currentScore)
        }
    }else if((cowBoy.x_position >= angryBird.x_position) && (cowBoy.y_position <= angryBird.y_position)){
        alert("You lost")
        //stop game loop
        clearInterval(loop)
        if (currentScore > highScore) {
            localStorage.setItem('highScore', currentScore)
        }
    }

    //Increase speed of obstacles to increse level of difficulties
    if(currentScore % 500 == 0){
        angryBird.speed += 2.5
        c_tree.speed += 2.5
    }


}, miliSecond);

}

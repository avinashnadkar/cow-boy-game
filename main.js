///////////////////Play Guide /////////////////////////
let countDown = document.querySelector('.countDown');
let modal = document.querySelector('.modal')

let deskTopGuid = document.querySelector('.desktop-guide')

let ruleBox = document.querySelector('.rules-guide');
let ruleNextBtn = document.getElementById('rules-next-btn');

let controlBox = document.querySelector('.control-guide')
let ctrlNextBtn = document.getElementById('ctrl-next-btn');
let ctrlBackBtn = document.getElementById('ctrl-back-btn');

let scoreBox = document.querySelector('.score-guide')
let scoreStartBtn = document.getElementById('score-start-btn');
let scoreBackBtn = document.getElementById('score-back-btn');

let finalScoreBox = document.querySelector('.final-score');
let finalScore = document.querySelector('.finalScore');
let high_score = document.querySelector('.highScore');
let playAgainBtn = document.getElementById('play-again-btn');

controlBox.style.display = 'none'
scoreBox.style.display = 'none'
finalScoreBox.style.display = 'none'

ruleNextBtn.addEventListener('click', () => {
    controlBox.style.display = 'block';
    ruleBox.style.display = 'none';
})

ctrlNextBtn.addEventListener('click', () => {
    controlBox.style.display = 'none';
    scoreBox.style.display = 'block';
})


ctrlBackBtn.addEventListener('click', () => {
    controlBox.style.display = 'none';
    ruleBox.style.display = 'block';
})

scoreBackBtn.addEventListener('click', () => {
    controlBox.style.display = 'block';
    scoreBox.style.display = 'none';
})

scoreStartBtn.addEventListener('click', () => {
    scoreBox.style.display = 'none';
    let counter = 3
    let countdown = setInterval(() => {
        countDown.innerHTML = counter
        counter--
        if (counter == -1) {
            clearInterval(countdown)
            modal.style.display = 'none'
            deskTopGuid.style.display = "none"
            countDown.style.display = 'none'
            //start game after coundown is 0
            start()
        }
    }, 1000)
    //desktopGuid.style.display = 'block';
})

//Show final score after loose
function showFinalScore(interval) {
    high_score.innerHTML = highScore;
    finalScore.innerHTML = currentScore;
    modal.style.display = "flex"
    finalScoreBox.style.display = 'block';
    //stop game loop
    clearInterval(interval)
    if (currentScore > highScore) {
        localStorage.setItem('highScore', currentScore)
    }
}

//play again
playAgainBtn.addEventListener('click', () => {
    finalScoreBox.style.display = 'none'
    window.location.reload()
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
    y_position: 477,
    width: 80,
    height: 80,
    speed: 7
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
    speed: 26
}

let CrismastreeImg = new Image;
CrismastreeImg.src = "Assets/Trees/cristmas.png";

//wall
let wallCtx = gameLayout.getContext('2d');
let wall = {
    x_position: 1680,
    y_position: 360,
    width: 140,
    height: 140,
    speed: 27
}

let wallImg = new Image
wallImg.src = "Assets/Wall/wall.jpg"

//Tunnel
let tunnelCtx = gameLayout.getContext('2d')
let tunnel = {
    x_position: 1180,
    y_position: 505,
    width: 130,
    height: 60,
    speed: 26
}
let tunnelImg = new Image;
tunnelImg.src = "Assets/Tunnel/tunnel.png";

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
        isJumping = true;
        isSlideing = false;
        cowBoy.height = 80;
        cowBoy.y_position = 477;
    }
})

//Slide player
let isSlideing = false;
//set time to 0 to count the time till player need to be slide
let cowBoySlideTime = 0;
addEventListener('keydown', (e) => {
    if ((e.key == "ArrowDown" || e.key == "s") && (cowBoy.y_position >= 476)) {
        isSlideing = true;
    }
})

////////////////////////Game loop/////////////////////////

function start() {

    //timer counter for genrating random obstacles
    let timer = 1280
    //random obstacles 1=tree, 2=wall, 3= tunnel
    let randObstacle = Math.floor(Math.random() * 3) + 1
    //loop speed
    let miliSecond = 1000 / 20

    let loop = setInterval(() => {

        moonCtx.clearRect(0, 0, w, h)

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

        ///////////////////Draw Cowboy ///////////////////////

        //Loop cowboy
        if (isJumping == true) {
            //jump cowboy
            if (cowBoy.y_position >= 320) {
                cowBoy.y_position -= (10 + cowBoy.speed)
            } else {
                isJumping = false
            }
            cowBoyImg.src = `Assets/Monkey/Jumping/${cowBoyJumping[srcIndex]}`
            cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
            //increase src index number to change image src
            if (srcIndex == 8) {
                srcIndex = 0
            } else {
                srcIndex++
            }
        } else if (isSlideing == true) {
            //Slide cowboy
            cowBoyImg.src = `Assets/Monkey/Sliding/Slide__000.png`
            cowBoy.height = 50;
            cowBoy.y_position = 510;
            cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
            if (cowBoySlideTime >= 20) {
                cowBoySlideTime = 0
                isSlideing = false
                cowBoy.height = 80;
                cowBoy.y_position = 477;
            } else {
                cowBoySlideTime++
            }
        } else {
            //keep running cowboy
            if (cowBoy.y_position < 477) {
                cowBoy.y_position += (10 + cowBoy.speed)
            }
            cowBoyImg.src = `Assets/Monkey/Running/${cowBoyRunning[srcIndex]}`
            cowBoyCtx.drawImage(cowBoyImg, cowBoy.x_position, cowBoy.y_position, cowBoy.width, cowBoy.height);
            //increase src index number to change image src
            if (srcIndex == 8) {
                srcIndex = 0
            } else {
                srcIndex++
            }
        }

        /////////////////Draw random obstacles //////////////////

        if (randObstacle == 1) {
            //Tree
            if (c_tree.x_position <= 0) {
                //random obstacles 1=tree, 2=wall, 3= tunnel
                randObstacle = Math.floor(Math.random() * 3) + 1;
                c_tree.x_position = 1380
            } else {
                c_tree.x_position -= c_tree.speed
            }
            CrismastreeCtx.drawImage(CrismastreeImg, c_tree.x_position, c_tree.y_position, c_tree.width, c_tree.height)
        } else if (randObstacle == 2) {
            //Draw wall
            if (wall.x_position <= 0) {
                //random obstacles 1=tree, 2=wall, 3= tunnel
                randObstacle = Math.floor(Math.random() * 3) + 1;
                wall.x_position = 1380
            } else {
                wall.x_position -= wall.speed
            }

            //wallCtx.fillRect(wall.x_position, wall.y_position, wall.width, wall.height)
            wallCtx.drawImage(wallImg, wall.x_position, wall.y_position, wall.width, wall.height);

        } else if (randObstacle == 3) {
            //Draw tunnel
            if (tunnel.x_position <= -50) {
                //random obstacles 1=tree, 2=wall, 3= tunnel
                randObstacle = Math.floor(Math.random() * 3) + 1;
                tunnel.x_position = 1380
            } else {
                tunnel.x_position -= tunnel.speed
            }
            tunnelCtx.drawImage(tunnelImg, tunnel.x_position, tunnel.y_position, tunnel.width, tunnel.height);
        }

        //defeat check (collision between player and tree)
        if (((cowBoy.x_position + (cowBoy.width / 2)) >= c_tree.x_position) && (cowBoy.y_position >= c_tree.y_position)) {
            showFinalScore(loop)
        } else if ((cowBoy.x_position + cowBoy.width) >= wall.x_position && cowBoy.y_position <= (wall.y_position + wall.height)) {
            showFinalScore(loop)
        }else if(!isSlideing  && ((cowBoy.x_position + cowBoy.width) >= tunnel.x_position) && ((cowBoy.y_position + cowBoy.height) >= tunnel.y_position)){
            showFinalScore(loop)
        }

        //Increase speed of obstacles to increse level of difficulties
        if (currentScore % 250 == 0) {
            wall.speed += 6
            c_tree.speed += 6
            tunnel.speed += 6
            cowBoy.speed += 1
        }


    }, miliSecond);

}

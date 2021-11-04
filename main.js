let gameLayout = document.getElementById("gameLayout");

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

let cowBoyArr = ["Run__000.png","Run__001.png","Run__007.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png"];
let cowBoyImg = new Image;
let srcIndex = 0;

// Crismas tree
let  CrismastreeCtx = gameLayout.getContext("2d")
let c_tree = {
    x_position: 1280,
    y_position: 478,
    width: 80,
    height: 80
}

let  CrismastreeImg = new Image;
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



let loop = setInterval(() => {

    cowBoyCtx.clearRect(0, 0, w, h)

    moonCtx.drawImage(moonImg, moonVal.x_position, moonVal.y_position, moonVal.width, moonVal.height);
    surfaceCtx.fillRect(surface.x_position,surface.y_position,surface.width,surface.height)
    surfaceCtx.fillStyle = "green"

    //Tree
    CrismastreeCtx.drawImage(CrismastreeImg, c_tree.x_position,c_tree.y_position,c_tree.width,c_tree.height)

    //Loop cowboy
    cowBoyImg.src =  `Assets/Monkey/Running/${cowBoyArr[srcIndex]}`
    cowBoyCtx.drawImage(cowBoyImg,cowBoy.x_position,cowBoy.y_position,cowBoy.width,cowBoy.height);
    if(srcIndex == 8){
        srcIndex = 0
    }else{
        srcIndex++
    }

}, 35);





    // moonCtx.clearRect(0, 0, w, h)
    // if(moonVal.y_position == 100) {
    //     flag = true;
    // }
    // if(flag){
    //     moonCtx.drawImage(moonImg, moonVal.x_position, moonVal.y_position++, moonVal.width, moonVal.height);
    // }else{
    //     moonCtx.drawImage(moonImg, moonVal.x_position, moonVal.y_position--, moonVal.width, moonVal.height);
    // }
    // if(moonVal.y_position == h-100){
    //     flag = false
    // }
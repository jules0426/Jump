//Canvas
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");

//Canvas size
cnv.width = 900;
cnv.height = 600;

//Img
let tPlayerImg = document.getElementById("truePlayerImg");
let playerImg = document.getElementById("playerImg");
let playerFImg = document.getElementById("playerFImg");
let cloud = document.getElementById("cloudImg");
let brick = document.getElementById("brickImg");
let finish = document.getElementById("finishImg");

let playerY = 410;
let playerX = 10;

let jump = false;
let down = true;
let right = false;
let left = false;
let finished = false;

let frameCount = 0;

requestAnimationFrame (game);
function game () {
    //Background
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    //Grass
    ctx.fillStyle = "green";
    ctx.fillRect(0, 530, cnv.width, 70);
    
    //Cloud Img
    ctx.drawImage(cloud, 100, 50, 80, 60);
    ctx.drawImage(cloud, 200, 90, 80, 60);
    ctx.drawImage(cloud, 250, 50, 80, 60);
    ctx.drawImage(cloud, 400, 80, 80, 60);
    ctx.drawImage(cloud, 600, 30, 80, 60);
    ctx.drawImage(cloud, 800, 50, 80, 60);

    //Sun
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(900, 0, 50, 0, 2 * Math.PI);
    ctx.fill();

    //Obstacle
    ctx.drawImage(brick, 300, 450, 80, 80);
    ctx.drawImage(brick, 480, 370, 80, 80);
    ctx.drawImage(brick, 560, 290, 80, 80);
    ctx.drawImage(brick, 740, 250, 80, 80);
    ctx.drawImage(brick, 820, 250, 80, 80);
    
    //Finish
    ctx.drawImage(finish, 850, 200, 50, 50);
    if(playerY <= 250 && playerX >= 900) {
        finished = true
    }

    if(playerY >= 250 && playerX >= 800) {
        right = false;
    }
    
    //Go right
    if(right) {
        playerX += 6;
        tPlayerImg.src = "img/player.png";
    }

    //Go left
    if(left) {
        playerX += -6;
        tPlayerImg.src = "img/playerF.png";
    }
    
    
    //Jump
    if(jump) {
        playerY += -11;
    }

    //Gravity
    if(down) {
        playerY += 4;
    }
    if(playerY >= 410) {
        playerY = 410;
    } else if(playerY < 410) {
        down = true;
    }
    
    //First obstacle
    if(playerX >= 201 && playerX <= 379) {
        if(playerY >= 330) {
            down = false;
        }
    }

    //Second obstacle
    if(playerX >= 381 && playerX <= 559) {
        if(playerY >= 250 && playerY <= 330) {
            down = false;
        }
    }

    //Third obstacle
    if(playerX >= 461 && playerX <= 639) {
        if(playerY >= 170 && playerY <= 185) {
            down = false;
        }
    }
    
    if(playerX >= 461 && playerX <= 639) {
        if(playerY <= 370) {
            jump = false;
        }
    }
    //Fourth and fifth obstacle
    if(playerX >= 641) {
        if(playerY >= 130 && playerY <= 145) {
            down = false;
        }
    }

    
    
    //Player Img
    ctx.drawImage(tPlayerImg, playerX, playerY, 100, 120);
    

    requestAnimationFrame (game);
}

//Event listener
document.addEventListener("keydown", player);
document.addEventListener("keyup", still);
document.getElementById("again").addEventListener("click", pAgain);

function player (event) {
    //Go right
    console.log(playerX);
    if(event.code === "ArrowRight") {
        right = true;
    }
    //Go left
    if(event.code === "ArrowLeft") {
        left = true;
        tPlayerImg.src = "img/playerF.png";
    }
    //Jump
    if(event.code === "Space") {
        jump = true;
    }
    //Cleared
    if(finished) {
        alert("Great job! You've finished the map!");
    }

    //First obstacle
    if(playerX >= 185 && playerX <= 200) {
        if(playerY >= 331) {
            right = false;
        }
    }

    if(playerX >= 375 && playerX <= 390) {
        if(playerY >= 331) {
            left = false;
        }
    }

    //Second obstacle
    if(playerX >= 365 && playerX <= 395) {
        if(playerY >= 251) {
            right = false;
        }
    }

    if(playerX >= 560 && playerX <= 575) {
        if(playerY >= 370 && playerY <= 450) {
            left = false;
        }
    }

    //Third obstacle
    if(playerX <= 475 && playerX >= 445) {
        if(playerY >= 130 && playerY <= 250) {
            right = false;
        }
    } 

    //Fourth and fifth obstacle
    if(playerX >= 641) {
        if(playerY <= 330) {
            jump = false;
        }
    }
    //Boudary
    if(playerX <= 0) {
        left = false;
    }
    if(playerY <= 0) {
        jump = false;
    }
}



function still () {
    right = false;
    left = false;
    jump = false;
}

function pAgain () {
    playerX = 10;
    playerY = 410;
    finished = false;
    tPlayerImg.src = "img/player.png";
}
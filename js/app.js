'use strict';
// Enemies our player must avoid
class Enemy {
    constructor(x, y, dv) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
        this.vel = dv;
        this.startpos = x;
        this.currentpos = 0;
    }
    update(dt) {
        if(player.y === -20 || player.lives === 0) {
            dt = 0;
            this.x = this.currentpos;
        }
        // Loop objects
        if(this.x > 500) {
            this.x = Math.floor(Math.random()*200 + 100) * (-1);
        } else {
            this.currentpos = this.x;
            this.x = this.x + this.vel * dt;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
        this.stepsXAxis = 0;    // Units per move on the X-axis
        this.stepsYAxis = 0;    // Units per move on the Y-axis
        this.posX = 0;          // Store last position on the X-axis
        this.posY = 0;          // Store last position on the X-axis
        this.lives = 3;
        this.stars = 0;
        this.gems = 0;
        this.collided = false;
    }
    handleInput(dir) {
        if(dir === 'up' && this.y !== -20 && player.lives > 0) {
            this.stepsYAxis = -80;
        } else if(dir === 'down' && this.y !== -20 && player.lives > 0) {
            this.stepsYAxis = 80;
        } else if(dir === 'right' && this.y !== -20 && player.lives > 0) {
            this.stepsXAxis = 100;
        } else if( dir === 'left' && this.y !== -20 && player.lives > 0) {
            this.stepsXAxis = -100;
        }
    }
    update() {
        this.posX = this.x;
        this.posY = this.y;
        this.x = this.x + this.stepsXAxis;
        this.stepsXAxis = 0;
        this.y = this.y + this.stepsYAxis;
        this.stepsYAxis = 0;
    }
    render() {
        let canvas = document.querySelector('canvas');
        let stars = '';
        let gems = '';

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // Display game win or loss
        if(this.y === -20) {
            ctx.font = 'normal 50pt Fredoka One';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText('You win!', canvas.width/2, canvas.height/2);
            ctx.strokeStyle = 'black';
            ctx.strokeText('You win!', canvas.width/2, canvas.height/2);

            ctx.font = 'normal 18pt Fredoka One';
            ctx.lineWidth = 1;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (player.stars === 1 && player.gems === 1) {
                stars = 'star';
                gems = 'gem';
            } else if (player.stars === 1) {
                stars = 'star';
                gems = 'gems';
            } else if (player.gems === 1) {
                stars = 'stars';
                gems = 'gem';
            } else {
                stars = 'stars';
                gems = 'gems';
            }
            ctx.fillStyle = 'white';
            ctx.fillText(`You have collected ${player.stars} ${stars} and ${player.gems} ${gems}!`, canvas.width/2, canvas.height/2 + 55);
            ctx.strokeStyle = 'grey';
            ctx.strokeText(`You have collected ${player.stars} ${stars} and ${player.gems} ${gems}!`, canvas.width/2, canvas.height/2 + 55);

        } else if(this.lives === 0) {
            ctx.font = 'normal 50pt Fredoka One';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText('You lose!', canvas.width/2, canvas.height/2);
            ctx.strokeStyle = 'black';
            ctx.strokeText('You lose!', canvas.width/2, canvas.height/2);
        }
    }
}

// Player's life to display on canvas
class Life {
    constructor(x, y) {
        this.sprite = 'images/Heart.png';
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
}
// To represent lives lost
class Greyedheart extends Life {
    constructor(x, y) {
        super(x, y);
        this.sprite = 'images/Heart-gray.png';
    }
}

// Collectibles
class Collectibles {
    constructor(xValues = [30, 130, 230, 330, 430], yValues = [135, 215, 295, 375, 455], w = 40, h = 60) {
        this.xValues = xValues;
        this.yValues = yValues;
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
    }
    getPosition() {     // Get random values from an array or get the provided value
        let pos = [];
        while((pos[0] === 2 && pos[1] === 4) || pos.length < 2) {
            pos = [];
            for(let i = 0; i < 2; i++) {
                let index = Math.floor(Math.random()*5);
                pos.push(index);
            }
        }
        this.x = this.xValues[pos[0]] || this.xValues;
        this.y = this.yValues[pos[1]] || this.yValues;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
}
class Star extends Collectibles {
    constructor(xValues, yValues, w, h) {
        super(xValues, yValues, w, h);
        this.getPosition();
        this.sprite = 'images/Star.png';
    }
}
class Gem extends Collectibles {
    constructor(xValues, yValues, w, h) {
        super(xValues, yValues, w, h);
        this.time = Date.now();
        this.getPosition();
        this.sprite = 'images/Gem Orange.png';
    }
    timed() {   // Timing function to change position of gem after a set amount of time
        let timeNow = Date.now() - this.time;
        if(player.lives > 0 && timeNow > 6000 && player.y !== -20) {
            this.posX = this.x;
            this.posY = this.y;
            // Get random position from array
            let pos = [];
            while((pos[0] === 2 && pos[1] === 4) || pos.length < 2) {
                pos = [];
                for(let i = 0; i < 2; i++) {
                    let index = Math.floor(Math.random()*5);
                    pos.push(index);
                }
            }
            this.x = this.xValues[pos[0]];
            this.y = this.yValues[pos[1]];
            this.time = Date.now();
        }
    }
}

// Button to restart game
class Restartbtn {
    constructor(x, y, text, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.text = text;
        this.canvasWidth = function() {
            let canvas = document.querySelector('canvas');
            return canvas.width;
        };
        this.canvasObj = function() {
            let canvas = document.querySelector('canvas');
            return canvas;
        };
    }
    render() {
        ctx.font = 'bold 12pt Calibri';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText(this.text, this.canvasWidth() - this.x, this.y);
    }
}
class starScore extends Restartbtn {    // Display total stars collected
    constructor(x, y, text, w) {
        super(x, y, text, w);
        this.canvasWidth = function() {
            return this.w;
        };
    }
    update() {
        this.text = player.stars.toString();
    }
}
class gemScore extends Restartbtn {     // Display total gems collected
    constructor(x, y, text, w) {
        super(x, y, text, w);
        this.canvasWidth = function() {
            return this.w;
        };
    }
    update() {
        this.text = player.gems.toString();
    }
}

// Load fonts using Web Font Loader
WebFont.load({
    google: {
      families: ['Fredoka One']
    }
  });

//  Instantiate all objects
//  All enemies
let enemy1 = new Enemy(Math.floor(Math.random()*200 + 100) * (-1), 60, Math.floor(Math.random() * 50 + 30));
let enemy2 = new Enemy(Math.floor(Math.random()*200 + 250) * (-1), 60, Math.floor(Math.random() * 50 + 30));
let enemy3 = new Enemy(Math.floor(Math.random()*200 + 200) * (-1), 140, Math.floor(Math.random() * 50 + 30));
let enemy4 = new Enemy(Math.floor(Math.random()*200 + 350) * (-1), 140, Math.floor(Math.random() * 50 + 50));
let enemy5 = new Enemy(Math.floor(Math.random()*200 + 300) * (-1), 225, Math.floor(Math.random() * 50 + 30));
let enemy6 = new Enemy(Math.floor(Math.random()*200 + 450) * (-1), 225, Math.floor(Math.random() * 50 + 40));
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

let player = new Player(200, 380);  // Player

let restartBtn = new Restartbtn(10, 555, 'Restart');  // Restart

//  All lives
let life1 = new Life(10, 550);
let life2 = new Life(30, 550);
let life3 = new Life(50, 550);
let allLives = [life1, life2, life3];

let greyedHeart1 = new Greyedheart(10, 550);
let greyedHeart2 = new Greyedheart(30, 550);
let greyedHeart3 = new Greyedheart(50, 550);
let allGreyedHearts = [greyedHeart1, greyedHeart2, greyedHeart3];

// All collectibles
let star1 = new Star();
let star2 = new Star();
let star3 = new Star();
let star4 = new Star();
let star5 = new Star();
let allStars = [star1, star2, star3, star4, star5];

let gem1 = new Gem();
let gem2 = new Gem();
let gem3 = new Gem();
let gem4 = new Gem();
let gem5 = new Gem();
let allGems = [gem1, gem2, gem3, gem4, gem5];

// Score elements
let scorePanelStar = new Star(85, 540, 28, 45);
let scorePanelGem = new Gem(140, 548, 20, 30);
let totalStars = new starScore(0, 557, player.stars, 123);
let totalGems = new gemScore(0, 557, player.gems, 173);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

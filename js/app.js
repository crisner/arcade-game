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

class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
        this.stepsXAxis = 0;
        this.stepsYAxis = 0;
        this.posX = 0;
        this.posY = 0;
        this.lives = 3;
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

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        if(this.y === -20) {
            ctx.font = 'normal 50pt Fredoka One';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText('You win!', canvas.width/2, canvas.height/2);
            ctx.strokeStyle = 'black';
            ctx.strokeText('You win!', canvas.width/2, canvas.height/2);
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

WebFont.load({
    google: {
      families: ['Fredoka One']
    }
  });

// class Results {
//     constructor() {

//     }
// }

// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// let enemy1 = new Enemy(170, 60, Math.floor(Math.random() * 50 + 30));
let enemy1 = new Enemy(Math.floor(Math.random()*200 + 100) * (-1), 60, Math.floor(Math.random() * 50 + 30));
let enemy2 = new Enemy(Math.floor(Math.random()*200 + 250) * (-1), 60, Math.floor(Math.random() * 50 + 30));
let enemy3 = new Enemy(Math.floor(Math.random()*200 + 200) * (-1), 140, Math.floor(Math.random() * 50 + 30));
let enemy4 = new Enemy(Math.floor(Math.random()*200 + 350) * (-1), 140, Math.floor(Math.random() * 50 + 50));
let enemy5 = new Enemy(Math.floor(Math.random()*200 + 300) * (-1), 225, Math.floor(Math.random() * 50 + 30));
let enemy6 = new Enemy(Math.floor(Math.random()*200 + 450) * (-1), 225, Math.floor(Math.random() * 50 + 40));
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

let player = new Player(200, 380);


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

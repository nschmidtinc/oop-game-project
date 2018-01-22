

// This section contains some game constants. It is not super interesting
var GAME_WIDTH = 750;
var GAME_HEIGHT = 500;

var ENEMY_WIDTH = 50;
var ENEMY_HEIGHT = 50;
var MAX_ENEMIES = 5;

var HEALTH_WIDTH = 50;
var HEALTH_HEIGHT = 50;
var MAX_HEALTH = 4;

var PLAYER_WIDTH = 25;
var PLAYER_HEIGHT = 25;
var healthX = ""
var healthY = ""
// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var UP_ARROW_CODE = 38;
var DOWN_ARROW_CODE = 40;
var SHOOT_CODE =  32;
// These two constants allow us to DRY
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';
var MOVE_UP = 'up';
var MOVE_DOWN = 'down';
var SHOOT = 'shoot';
var lives = ""
// Preload game images
var images = {};
['enemy.png', 'stars.png', 'player.png', 'enemy2.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});


var playerX = "";
var playerY = "";

function setupMissle() {
    
        
    function launchIt() {
        

this.missle = new Missle(playerX, playerY);
return this.missle
}
} 
// This section is where you will be doing most of your coding
class Enemy {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['enemy.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 4 + 0.75;
    }

    update(timeDiff) {
        
            this.y = this.y + timeDiff * this.speed;
       
        //this.x = this.x + timeDiff * this.speed  * Math.random();
    }

    render(ctx) {
        if (this.speed > 0.9) {
        
        this.sprite = images['enemy2.png'];
        ctx.drawImage(this.sprite, this.x, this.y);
        
        }
        else {
            this.sprite = images['enemy.png'];
        ctx.drawImage(this.sprite, this.x, this.y);
        

        }
    }
}
    class Health {
        constructor(Xpos, Ypos) {
            this.x = Xpos;
            this.y = Ypos;
            this.sprite = images['player.png'];
        }
            update(timeDiff){
            /*    
            if (Math.random() % 2 === 0) { 
                this.x = this.x  - 0.8,
                this.y = this.y - 0.8;
            } else if (timeDiff % 3 === 0) {this.x = this.x - 0.8;
                this.y = this.y + 0.8;
                
            } else  {
                this.x = this.x + 0.8;
                this.y = this.y - 0.8;
            }
            */
            healthX = this.x;
            healthY = this.y;

            this.x = this.x
            this.y = this.y - timeDiff -2;   
            console.log("ufo", this.y, this.x )
        }
    
            render(ctx) {
            ctx.drawImage(this.sprite, this.x, this.y);
               
        }
    }
    class Missle {
        constructor(Xpos, Ypos) {
            this.x = playerX;
            this.y = playerY;
            this.sprite = images['player.png'];
        }
            update(timeDiff){
                
             
                this.x = this.x,
                this.y = this.y + timeDiff + 2;
            }

        
            render(ctx) {
                healthX = this.x;
                healthY = this.y;
            ctx.drawImage(this.sprite, this.x, this.y);
               
        }
    }

    
class Player {
    constructor() {
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT -50; //initial offset
        
        this.sprite = images['enemy.png'];
        
    }

    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        else if (direction === MOVE_UP && this.y > 0) {
            this.y = this.y - PLAYER_HEIGHT
        }
        else if (direction === MOVE_DOWN && this.y < GAME_HEIGHT - PLAYER_HEIGHT * 2) {
            this.y = this.y + PLAYER_HEIGHT
        }
        else if (direction === SHOOT) { 
            new Health(playerX, PlayerY);
        };

    
        
    }

    render(ctx) {
        playerX = this.x;
        playerY = this.y;
        if (this.lives < 50) {
            this.sprite = images['player.png']
            ctx.drawImage(this.sprite, this.x, this.y);
    } else {

        ctx.drawImage(this.sprite, this.x, this.y);
    }
    }
}


//this.playerX.bind(SHOOT);
//this.playerY.bind(SHOOT);


/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {

    constructor(element) {
        this.lives = 10;

        // Setup the player
        this.player = new Player();
        console.log("new player", this.Player);
        // Setup enemies, making sure there are always three
        this.setupEnemies();
        console.log("I set up enemies", this.addEnemy())
        
        setupMissle();
        this.setupHealth();
        console.log("i set up health", this.setupHealth())
        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }
    
    
    resetGame() {
    console.log("is it running");
        if (this.dead || this.healthy) {
            console.log("reset game");
            this.score = 0;
            this.dead = false;
            this.lives = 10; //this is where lives are kept!
            this.lastFrame = Date.now();
            this.enemies = [];
            this.isHealth = [];
            this.player = new Player();
            this.setupHealth();
            
            this.gameLoop();
            

        }
    }
    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }

        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        var enemySpots = (GAME_WIDTH / ENEMY_WIDTH);

        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (enemySpot === undefined || this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }
        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_WIDTH);
    }

    setupMissle() {
    
        
        function launchIt() {
            
    
    this.missle = new Missle(playerX, playerY);
    return this.missle
    }
    } 
        
    setupHealth() {
    
        var HealthX = "";
        var HealthY = "";
            function addHealthX() {
                
                    HealthX = Math.floor(Math.random() * 200 *2)
                     while (HealthX > 750) {HealthX = Math.floor(Math.random()*1000)}
                
                }
                
            function addHealthY() {
                HealthY = Math.floor(Math.random() * 200 * 2)
                while (HealthY > 500) {HealthY = Math.floor(Math.random()*100)} 
                }
        addHealthX();
        addHealthY();
        
        this.health = new Health(playerX, playerY);
        
     }
       

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();
        this.lives = 10;
        this.dead = false;
        
        
        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', e => {
            if (e.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            }
            else if (e.keyCode === UP_ARROW_CODE) { 
                this.player.move(MOVE_UP);
            }
            else if (e.keyCode === DOWN_ARROW_CODE) { 
                this.player.move(MOVE_DOWN);
            }
            else if (e.keyCode === SHOOT_CODE) {
                this.setupHealth();
            }
            else if (e.keyCode === 82) {
                this.resetGame();
            }
        
        });

        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill

    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;
        
        // Increase the score!
        this.score += timeDiff;

        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));

        // Draw everything!
        this.ctx.drawImage(images['stars.png'], 0, 0); // draw the star bg
        
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        this.lives = this.lives
        this.health.update(timeDiff);
        this.health.render(this.ctx);
         // draw the enemies
        this.player.render(this.ctx); // draw the player
       // this.missle.render(this.ctx);
        //this.update(timeDiff);
       // this.health.render(this.ctx);

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (this.dead === true || enemy.y > GAME_HEIGHT || enemy.x === healthX && enemy.y === healthY) {
                
                delete this.enemies[enemyIdx];
                this.dead = false;
            }
        });

        this.setupEnemies();

        
console.log(playerX, playerY)        
    
        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
        
            //this.ctx.fillText(this.score + ' Game Over', 5, 30);
            //this.ctx.fillText("reset game by pressing spacebar",100,200);
            
            this.ctx.fillText(this.lives -1, 5, 70);
            this.lives = this.lives -1;
            this.lastFrame = Date.now();
            
            requestAnimationFrame(this.gameLoop);

            
            
            
        }
        else if (this.lives <= 0) {
            this.ctx.fillText(this.score + ' Game Over', 5, 30);
            this.ctx.fillText("reset game by pressing spacebar",100,200);
            this.dead = true;
            return true;
         } 
         else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score, 5, 30);
            this.ctx.fillText(this.lives, 5, 70);

            
            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    } 


    setupMissle() {
    
        
        function launchIt() {
            
    
    this.missle = new Missle(playerX, playerY);
    return this.missle
 }
} 
 
       
    newMethod(timeDiff) {
        this.missle.update(timeDiff);
    }

    isPlayerDead() {
        var enemyHit = (enemy) => {
            
            if (enemy.x === this.player.x && (enemy.y + ENEMY_HEIGHT) >= this.player.y) {
                this.dead = true; //this part is added by luke understand what is going on
                
               return true
               
 
        }
     };
     return this.enemies.some(enemyHit);
 
     
         
     
     
     }
     
 }

// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();
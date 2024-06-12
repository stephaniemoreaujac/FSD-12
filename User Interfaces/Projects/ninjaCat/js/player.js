/**
 * Create the player and animate it.
 * @author Tamara Plante
 */
const SPEED = 250;

player = new GameAnimatedObject();


/**
 * Initialize the player.
 */
player.init = function() 
{
    this.setContext(playerContext);

    this.sprite = document.getElementById("player");
    this.direction = "right";
    this.speed = SPEED;
    this.width = 66;
    this.height = 81;
    this.x = 30;
    this.y = canvas.height - this.height;

    // Update the spritesheet
    this.updateSheetFrames(4, 2, 66, 81);

    // Add the animations
    this.animation.animations = {
        idleLeft: [{col:0, row:0, delay:600}, {col:1, row:0, delay:300}],
        idleRight: [{col:0, row:1, delay:600}, {col:1, row:1, delay:300}],
        movingLeft: [{col:2, row:0}, {col:3, row:0}],
        movingRight: [{col:2, row:1}, {col:3, row:1}]
    };

    // (Re)set the special effects
    player.damage.active = false;
    player.powerUp.active = false;
    player.stun.active = false;
    player.slow.active = false;

    // Start the animation
    this.animation.play();
}

/**
 * Verify if an item (item.x and item.y) is colliding with the player.
 * @param {object} item the object collision to validate
 * @returns true if the item is colliding the player.
 * @author Iana Setrakova, Tamara Plante
 */
player.isColliding = function(item) 
{
    // Add padding to collision so the character has to overlap more visually to count as a collision.
    let padding = 10;
    return (
        item.y <= (this.y + this.height) - padding &&
        this.y <= (item.y + item.height) - padding &&
        item.x <= (this.x + this.width) - padding &&
        this.x <= (item.x + item.width) - padding
    );
}

/**
 * Update the player position and animation. 
 * If the player is moving, adjust the movement to the frame rate.
 * @param {number} secondsPassed the number of seconds passed since the last frame redraw
 */
player.update = function(secondsPassed) 
{    
    if (rightPressed || leftPressed) {
        
        let distance = this.speed * secondsPassed;
        let posX;

        // Set the new x, while accounting for canvas boundary.
        if (rightPressed) {
            posX = Math.min(this.x + distance, canvas.width - this.sheet.frameWidth);
            this.direction = "right";
            this.animation.update("movingRight");
        }
        // leftPressed
        else {
            posX = Math.max(this.x - distance, 0);
            this.direction = "left";
            this.animation.update("movingLeft");
        }
        // Round to nearest int.
        this.x = Math.floor(posX);
    }
    // Set the idle state based on the player.direction
    else {
        this.animation.update((this.direction == "right") ? "idleRight" : "idleLeft");
    }
}

player._draw = player.draw; // original draw method preserved
/**
 * Draw the player, with special effects if needed.
 */
player.draw = function() {
    this._draw(); // Call the original draw method, no super?!

    let specials = [this.stun, this.powerUp, this.damage];

    for (let special of specials) {
        if (special.active) {
            this.shader(special.shader);
        }
    }
}

/**
 * Slow the player, they just ate a big donut!
 * Do nothing if player is stunned or powered up.
 */
player.slow = new Effect
(
    function() { // Activate trigger function
        if (player.powerUp.active || player.stun.active) return;

        if (!this.active) {
            this.active = true;
            player.speed = 100;
            this.timer = setTimeout(() => this.cancel(), 2000);
        }
    },
    function() { // Cancel function
        player.speed = SPEED;
        this.active = false;

        clearTimeout(this.timer);
        this.timer = null;
    }
)

/**
 * When the player takes damage, ouch!
 */
player.damage = new ShaderEffect
(   
    function(i, data) { // Shader callback function
        // The area that is not transparent, make white.
        if (data[i + 3] != 0) {
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
        }
    },
    function() { // Activate trigger function
        this.active = true;
        audioDamage.play();
        this.timer = setTimeout(() => this.cancel(), 100);
    },
    function() { // Cancel
        this.active = false;

        clearTimeout(this.timer);
        this.timer = null;
    }
)

/**
 * Stun the player for a little bit.
 * They just ate a hot pepper, ouch!
 * Lose power up. Lose the slow.
 */
player.stun = new ShaderEffect
(
    function(i, data) { // Shader callback function
        // The area that is not transparent, make red.
        if (data[i + 3] != 0) {
            data[i] = 255
        }
    },
    function() { // Active callback function
        if (player.powerUp.active) player.powerUp.cancel();
        if (player.slow.active) player.slow.cancel();

        player.speed = 0;
        if (!this.active) {
            this.active = true;
            audioStun.play();
            this.timer = setTimeout(() => this.cancel(), 800)
        }
    },
    function() { // Cancel
        player.speed = SPEED;
        this.active = false;

        clearTimeout(this.timer);
        this.timer = null;
    }
)

/**
 * When the player should power up,
 * Effect can be renewed.
 */
player.powerUp = new ShaderEffect
(
    function(i, data) { // Shader callback function
        // Blue fur convert to orange.
        if (data[i] == 95 && data[i + 1] == 205 && data[i + 2] == 228) {
            data[i] = 255
            data[i + 1] = 151
            data[i + 2] = 87
        }
        // Highlight in fur.
        else if (data[i] == 91 && data[i + 1] == 110 && data[i + 2] == 225) {
            data[i] = 255
            data[i + 1] = 97
            data[i + 2] = 35
        }
        // Dark border of the fur.
        else if (data[i] == 48 && data[i + 1] == 96 && data[i + 2] == 130) {
            data[i] = 251
            data[i + 1] = 218
            data[i + 2] = 61
        }
        /*
        else if (data[i] == 222) {
            // red belt
        }*/
    },
    function() { // Activate trigger function
        if (player.stun.active) return; // Do nothing when stunned
        if (player.slow.active) player.slow.cancel(); // Disable slow

        if (this.active) this.cancel(); // Renew the effect

        this.active = true;
        player.speed = 500
        this.timer = setTimeout(() => this.cancel(), 3000);
    },
    function() { // Cancel
        player.speed = SPEED;
        this.active = false;

        clearTimeout(this.timer);
        this.timer = null;
    }
)

/**
 * Manipulate pixels to make cool effects.
 * Pass a callback function that will take 
 * the index and data of the individual pixel
 * 
 * values between 0-255
 * data[i] = red, data[i+1] = green, 
 * data[i+2] = blue, data[i+3] = alpha
 * @param {function} aCallback 
 */
player.shader = function(aCallback) 
{
    const imageData = this.context.getImageData(0, 0, canvas.width, canvas.height); // Canvas imageData
    const data = imageData.data; // Each pixel (array of arrays)

    for (let i = 0; i < data.length; i += 4) {
        aCallback(i, data);
    }
    
    this.context.putImageData(imageData, 0, 0);
}

/**
 * Cancel the animation setInterval 
 * and all other setTimeouts for special effects.
 */
player.cancelAnimationsAndEffects = function() {
    this.slow.cancel();
    this.stun.cancel();
    this.powerUp.cancel();
    this.damage.cancel();
    this.animation.stop();
}

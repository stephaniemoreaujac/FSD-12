/**
 * Where we generate fancy nuggets (and more) or damaging items!
 * @author Tamara Plante, Alexie Lagarde
 */
const ITEMS = [
    {name: "nugget", coord_x:0, coord_y:0, fwidth:48, fheight:51, width:32, height:34, points:50},
    {name: "pepper", coord_x:426, coord_y:0, fwidth:96, fheight:96, width:40, height:40, points:-75},
    {name: "fish", coord_x:48, coord_y:0, fwidth:90, fheight:96, width:45, height:48},
    {name: "donut", coord_x:138, coord_y:0, fwidth:96, fheight:93, width:36, height:36, points:20}
    /*{name: "steak", coord_x:234, coord_y:0, fwidth:96, fheight:93, width:40, height:38}*/
    /*{name: "salmon", coord_x:330, coord_y:0, fwidth:96, fheight:84, width:40, height:35}*/
]
const ITEMS_SPR = document.getElementById("items");
const WATER_SPR = document.getElementById("water");


/**
 * Get a random item.
 * @returns a random entry from ITEMS
 */
function randomizer() 
{
    let random = Math.floor(Math.random() * (ITEMS.length - 2) + 2); // to start at a specific index
    return ITEMS[random];
}


/**
 * Generate good static items.
 */
class Item extends GameObject
{
    constructor(anItem, aSpeed)
    {
        super();
        // Fill in optional parameters
        if (!isNumber(anItem.points)) anItem.points = 10;
        if (!isNumber(anItem.fwidth)) anItem.fwidth = anItem.width;
        if (!isNumber(anItem.fheight)) anItem.fheight = anItem.height;

        this.sprite = ITEMS_SPR;
        this.name = anItem.name;
        this.speed = aSpeed;
        this.width = anItem.width;
        this.height = anItem.height;
        this.points = anItem.points;

        // Setup where the image should be clipped at.
        this.updateSheetCoords(anItem.coord_x, anItem.coord_y, anItem.fwidth, anItem.fheight);
    }
}

/**
 * Generate animated water drops.
 */
class Water extends GameAnimatedObject
{
    constructor(aSpeed) 
    {
        super();
        
        this.sprite = WATER_SPR;
        this.width = 42;
        this.height = 54;
        this.speed = aSpeed;

        // Setup the spritesheet
        this.updateSheetFrames(7, 1, 63, 81);

        // Set up the animations
        this.animation.currentAnim = "idle";
        this.animation.animations = {
            idle: [{col:0, row:0}, {col:1, row:0}, {col:0, row:0}, {col:2, row:0}],
            splash: [{col:4, row:0}, {col:5, row:0, delay:200}, {col:6, row:0, delay:200}]
        }

        // Start the animation
        this.animation.play();
    }

    /**
     * Play out the death animation and flag for removal.
     */
    destroy() 
    {
        this.animation.update("splash");
        // Setup flag so it can be removed from the game.items.destroy array
        setTimeout(() => {// Arrow allows this to be preserved.
            this.animation.stop();
            this.destroyed = true;
        }, 400) 
    }
}


/**
 * Function to randomly create new items that start at a random x position and above the canvas
 * that start from the start at a random x position
 * Add New item to the active items array.
 * @author Alexie Lagarde, Tamara Plante
 */
game.items.generate = function() 
{
    let randomSpeed = Math.floor((Math.random() * 300) + 100);
    let item;

    // Try to spawn a water drop
    if (Math.random() < 0.01) {
        item = new Water(randomSpeed);
    }
    else {
        let spawn;
        // Try to spawn a nugget powerup
        if (Math.random() < 0.005) {
            spawn = ITEMS[0];
        }
        // Add new items randomly
        else if (Math.random() < 0.035)  { 
            // Try to spawn a hot pepper
            spawn = (Math.random() < 0.07) ? ITEMS[1] : randomizer();
        }
        // No spawn this time
        else return;
        
        item = new Item(spawn, randomSpeed);
    }

    // Random position on the x axis.
    item.x = Math.floor(Math.random() * (canvas.width - item.width));

    // Add to the active array
    this.active.push(item);
}

/**
 * Draw the items in the active and destroyed array.
 */
game.items.draw = function()
{
    for (let item of this.active) {
        item.draw();
    }
    for (let item of this.destroy) {
        item.draw();
    }
}

/**
 * Reset the array of active and destroyed items.
 */
game.items.clear = function()
{
    game.items.active = [];
    game.items.destroy = [];
}

/**
 * Destroy the items when they are ready to be destroyed 
 * (after item.destroyed=true)
 */
game.items.clearDestroyed = function()
{
    for (let i in this.destroy) {
        let item = this.destroy[i];

        // Item is ready to be destroyed.
        if (item.destroyed) {
            this.destroy.splice(i, 1);
        }
    }
}

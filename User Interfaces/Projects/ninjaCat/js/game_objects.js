/**
 * Create a game object which includes a position, size including a sprite.
 * @author Tamara Plante
 */
class GameObject
{
    constructor() 
    {
        this.sprite = null;
        this.speed = 0;
        this.x = 0; // position on the canvas
        this.y = 0;
        this.width = 10; // used as scaling when drawing image
        this.height = 10;
        this.sheet = {
            coordX: null,
            coordY: null,
            frameWidth: 10, // actual size in the spritesheet
            frameHeight: 10
        }
    }

    /**
     * Set a different canvas context to draw to.
     * @param {object} aContext the canvas context
     */
    setContext(aContext) 
    {
        this.context = aContext;
    }

    /**
     * If we want to clip a sprite sheet, give the coordinates.
     * @param {number} aCoordX 
     * @param {number} aCoordY
     * @param {number} frameWidth spritesheet frame width
     * @param {number} frameHeight spritesheet frame height
     */
    updateSheetCoords(aCoordX, aCoordY, frameWidth, frameHeight) 
    {
        this.sheet.coordX = aCoordX;
        this.sheet.coordY = aCoordY;
        this.sheet.frameWidth = frameWidth;
        this.sheet.frameHeight = frameHeight;
    }

    /**
     * Update the position of the update based on the speed * secondsPassed
     * since the last game loop.
     * @param {number} secondsPassed the seconds since the last game loop
     */
    update(secondsPassed) 
    {
        this.y += this.speed * secondsPassed; // distance
    }

    /**
     * Draw the object to the canvas
     */
    draw() 
    {
        let ctx = this.context || context;

        let coordX = this.sheet.coordX;
        let coordY = this.sheet.coordY;

        if (isNumber(coordX) && isNumber(coordY)) {
            ctx.drawImage
            (
                this.sprite, 
                coordX, coordY, // clip sprite at
                this.sheet.frameWidth, this.sheet.frameHeight,  // how big is the clip
                this.x, this.y, // position
                this.width, this.height // scaling
            );
        }
        else {
            ctx.drawImage(this.sprite, this.x, this.y);
        }
    }
}

/**
 * Create a Game Animated Object that is set up for animations.
 */
class GameAnimatedObject extends GameObject 
{
    constructor() 
    {
        super();

        this.updateSheetFrames(0, 0, 10, 10); // Default spritesheet values
        this.animation = {
            timerAnim: null, // setInterval of 100ms that controls animations, should run forever.
            timerFrame: null, // setTimeout to control the frame delay value if it exists.
            currentFrame: 0,
            currentAnim: "",// "idleLeft"
            animations: {}, // {idleLeft: [{col:0, row:0, delay:600}, {col:1, row:0, delay:300}]},
            
            /**
             * Start the animation setInterval 100s or a custom value.
             * @param {number} [anInterval] the interval speed
             */
            play: function(anInterval=100) 
            {
                this.timerAnim = setInterval(() => this.animate(), anInterval); // be able to pass this to animate
            },

            /**
             * Stop the timer that keeps the animation going infinitely.
             */
            stop: function() 
            {
                clearInterval(this.timerAnim);
                this.cancel();
            },
            
            /**
             * Change the playing animation and reset state.
             * @param {string} anAnimation the animation key-name
             */
            update: function(anAnimation) 
            {
                // If the new animation is different from the current one...
                if (this.currentAnim != anAnimation) {
                    this.cancel();
                    this.currentAnim = anAnimation;
                    this.currentFrame = -1 // Initialize with -1
                    this.animate();
                }
            },

            /**
             * Stop the timer for the current animation frame.
             */
            cancel: function() 
            {
                clearTimeout(this.timerFrame);
                this.timerFrame = null;
            },

            /**
             * setInterval function to animate every 100ms.
             */
            animate: function() 
            {
                // If there's no delayed frame in progress...
                if (!this.timerFrame) {
                    
                    // Pick a new frame and account for frame loop
                    if (++this.currentFrame > this.animations[this.currentAnim].length - 1) {
                        this.currentFrame = 0;
                    }
                    // Get the animation frame and set a delay if there is one.
                    let frame = this.getFrame();
                    if (frame.delay) {
                        this.timerFrame = setTimeout(() => this.cancel(), frame.delay); // be able to pass this to cancel
                    }
                }
            },

            /**
             * Get the current frame parameters.
             * @returns the current frame parameters
             */
            getFrame: function()
            {
                return this.animations[this.currentAnim][this.currentFrame];
            }
        }
        return; // required for class that extends
    }

    /**
     * Update the spritesheet parameters.
     * @param {number} columns spritesheet total columns
     * @param {number} rows spritesheet total rows
     * @param {number} frameWidth spritesheet frame width
     * @param {number} frameHeight spritesheet frame height
     */
    updateSheetFrames(columns, rows, frameWidth, frameHeight) 
    {
        this.sheet.columns = columns;
        this.sheet.rows = rows;
        super.updateSheetCoords(this.sheet.coordX, this.sheet.coordY, frameWidth, frameHeight);
    }


    /**
     * Draw the game object to canvas based on it's position and animation frame.
     */
    draw()
    {   
        let ctx = this.context || context;

        let frameWidth = this.sheet.frameWidth;
        let frameHeight = this.sheet.frameHeight;
        let frame = this.animation.getFrame();

        ctx.drawImage
        (
            this.sprite, 
            frame.col * frameWidth, frame.row * frameHeight, // clip sprite at
            frameWidth, frameHeight,  // how big is the clip
            this.x, this.y, // position
            this.width, this.height // scaling
        );
    }
}


/**
 * A basic effect class.
 */
class Effect {
    /**
     * The effect object.
     * @param {function} aTriggerF the trigger function to activate the effect, by setting this.active = true;
     * @param {function} aCancelF the cancel function for the effect
     */
    constructor(aTriggerF, aCancelF) {
        this.activate = aTriggerF;
        this.active = false;
        this.timer = null;
        this.cancel = aCancelF;
    }
}

/**
 * A shader effect based on the effect class.
 */
class ShaderEffect extends Effect {
    /**
     * Shader effect factory.
     * @param {function} aShaderF the shader callback function that takes an index, data
     * @param {function} aTriggerF the trigger function to activate the effect
     * @param {function} aCancelF the cancel function for the shader
     * @returns a shader effect object

    * new ShaderEffect
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
            this.timer = setTimeout(() => this.cancel(), 100);
        },
        function() { // Cancel
            this.active = false;

            clearTimeout(this.timer);
            this.timer = null;
        }
    )
    */
    constructor(aShaderF, aTriggerF, aCancelF) {
        super(aTriggerF, aCancelF);
        this.shader = aShaderF;
    }
}

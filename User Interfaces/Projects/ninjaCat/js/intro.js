/**
 * Intro - Ninja cat designed by 
 * @author Alexie Lagarde
 */
function intro() {

    let splash = document.getElementById("splash");
    let intro = document.getElementById("intro");
    let startButton = document.getElementById("start");

    animation();

    // Hide splash when start is clicked
    startButton.addEventListener("click", function() {

        // Fade out the splash element
        [logo, splash].forEach(function(elem) {
            intro.style.transition = "opacity 0.8s ease";
            intro.style.opacity = "0";
        });
        
        // Start the game after fade out
        setTimeout(function() {
            splash.style.display = "none"; 
        }, 600); 
    });
};

/**
 * Function that animate the intro
 * @param {string} elemId = id of the element in html
 * @param {number} startPos = the starting position of the element
 * @param {number} maxPos = where the element should stop moving
 * @param {number} speed = the speed of the animation
 * @param {string} direction = the direction in which the animation is happening (x or y)
 */
function animateElement(elemId, startPos, maxPos, speed, direction) {
    const elem = document.getElementById(elemId);
    let pos = startPos;

    function frame() {
        if (pos >= maxPos) {
            clearInterval(id);
        } else {
            pos += speed;
            if (direction === "y") {
                elem.style.top = pos + "px";
            } else {
                elem.style.left = pos + "px";
            }
        }
    }

    //animate
    let id = setInterval(frame, 10);
}

/**
 * Function the make the animateElement function apply to one element
 */
function animation() {
    animateElement("logo", 0, 140, 3, "y");
    animateElement("cat", 0, 330, 3, "x");
}


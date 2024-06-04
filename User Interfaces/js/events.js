console.log("events");
/*
Add 3 radio buttons to your HTML page
Long hair
Short hair
Both
Once an item is selected create an image element and show the appropriate image according to their selection.
You cannot user innerHTML to complete this exersice
*/

generateRadioButtons("Long Hair", "https://limelitesalonandspa.com/wp-content/uploads/2022/12/image-22-890x1024.png");
generateRadioButtons("Short Hair", "https://media.glamourmagazine.co.uk/photos/65e1feb9c1ec7dffb942d27e/1:1/w_986,h_986,c_limit/SHORT%20HAIR%20010324%20@salsalhair-.jpg");
generateRadioButtons("Both", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Modern_Mullet.jpg/1200px-Modern_Mullet.jpg");

/**
 * Create Radio Buttons for the hairstyles
 * @param {string} radioName unique name for radio
 * @param {string} radioSrc Image to show when radio selected
 */
function generateRadioButtons(radioName, radioSrc){
    let elemId = "rdHair_" + Math.random();
    let newRadio = document.createElement('input');
    newRadio.type = "radio";
    newRadio.value = radioName;
    newRadio.name = "hairstyle";
    newRadio.id = elemId;
    newRadio.addEventListener("change", function(){
        document.getElementById('image1').src = radioSrc;
    })

    document.getElementById('formStuff').appendChild(newRadio);
    
    let newLabel = document.createElement('label');
    newLabel.setAttribute("for", elemId);

    newLabel.appendChild( document.createTextNode(radioName));
    document.getElementById('formStuff').appendChild(newLabel);
}

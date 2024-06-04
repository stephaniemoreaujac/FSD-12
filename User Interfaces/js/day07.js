// CREATE DOM ELEMENTS
let newImg = document.createElement("img"); // <img>
newImg["src"] = "https://moderncat.com/wp-content/uploads/2021/09/NinjaCats-10-1.jpg"; // <img src="https://moderncat.com/wp-content/uploads/2021/09/NinjaCats-10-1.jpg">
newImg.alt = "Ninja Cat kicking in the air"; // <img src="https://moderncat.com/wp-content/uploads/2021/09/NinjaCats-10-1.jpg" alt="Ninja Cat kicking in the air">
newImg.style.cssText = "width: 150px; border: 2px solid orange;";
// newImg.id = "ninjaCat";
newImg.setAttribute("id", "ninjaKitty");

// both will append (ADD AT THE END) of the parent (#random) element
// document.getElementById('random').appendChild( newImg );
let imgParent = document.getElementById('random');
imgParent.appendChild( newImg );

document.querySelector("#random img").id; //'ninjaKitty'
document.querySelector("#random img").getAttribute("id"); //'ninjaKitty'

// create node with text content
let newAnchor = document.createElement("a");
newAnchor.href = "http://google.ca";
newAnchor.target = "_blank";

let newText = document.createTextNode("New Menu Item");
newAnchor.appendChild( newText );

document.getElementById("nav").appendChild( newAnchor );


/**
 * Mouse over event test
 */
function mouseOverEvent(){
	console.log("I got moused over");
}
/**
 * Swith all the images for new random images
 */
function doImageSwap(){
	console.log("I got clicked");
	
	document.getElementById('image1').src = "https://picsum.photos/120/120?" + Math.random();
	document.getElementById('image2').src = "https://picsum.photos/120/120?" + Math.random();
	document.getElementById('image3').src = "https://picsum.photos/120/120?" + Math.random();
	document.getElementById('image4').src = "https://picsum.photos/120/120?" + Math.random();
}

// EVENT LISTENING
document.getElementById('image1').addEventListener("click", doImageSwap);

document.getElementById('txtFirstName').addEventListener("blur", function (){
    console.log("blurred");
    document.getElementById("txtLastName").value = "Moreau";
    document.getElementById("txtEmail").value = "user@domain.ext";
});

document.getElementById('txtLastName').addEventListener("keyup", function (e){
    console.log("key up from keyboard");
    // console.log(e);
    if (e.code == "Escape" ){
        document.getElementById('btnSwapImage').click();
        this.blur();
    }

})

// PREVENT DEAFULT

let links = document.querySelectorAll("a.homeLink");

for (let i = 0; i< links.length; i++){
    links[i].addEventListener("click", function(event){ event.preventDefault(); });
}

//    document.querySelector('form').preventDefault();
// IN HTML  onsubmit="return isFormValid();"

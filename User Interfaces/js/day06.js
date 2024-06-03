// Accessing the DOM

// via the id
document.getElementById("home");

let homeElement = document.getElementById('home');

document.getElementById("home").href = "http://google.ca";
document.getElementById("home").target = "_blank";
console.log(homeElement);

document.getElementById("image1").alt = "This is the alternative text";
document.getElementById("image2").src = "https://static.tvtropes.org/pmwiki/pub/images/28789896_17182_1.png";

document.querySelector("section h2").style.color = "green";

// multiple nodes returned
let allAnchors = document.getElementsByTagName("a");
for( let i =0; i < allAnchors.length; i++){

    allAnchors[i].style.backgroundColor = "lightblue";
}

allClasses = document.getElementsByClassName("homeLink")
for( let i =0; i < allClasses.length; i++){

    allClasses[i].style.backgroundColor = "purple";
}
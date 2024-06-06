/*
 Using the provided API connect and show chuck norros jokes and allow filtering by cateogries
*/
const chuckEndPoint = "https://api.chucknorris.io/jokes/";

// add listener
document.getElementById("btnNewJoke").addEventListener("click", loadJoke);
window.addEventListener("load", jQueryCategories);

/**
 * Load the categories using vanilla javascript
 */
function fetchCategories(){

    let xhr = new XMLHttpRequest(); // create object
    xhr.open("GET", chuckEndPoint + "categories");    // open the request
    xhr.send(); // send the request

    // wait for response
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){ // success
            let categories = JSON.parse(xhr.responseText); // parse the string into object
            
            // loop each returned data and create a button
            for (let c of categories){
                let input = document.createElement("input");
                input.value = c.toUpperCase();
                input.type = "button";
                input.classList.add("btn","btn-info", "m-1");
                input.addEventListener("click", loadJoke);
                input.dataset.category = c;
                document.getElementById('categories').appendChild( input );
            }

        }
    }

}

/**
 * Load a new chuck norris joke
 */
function loadJoke(e){
    let xhr = new XMLHttpRequest(); // create request

    let api_url = chuckEndPoint + "random";

    /* to fix issues between event coming from javascript event listeners and jQuery event listeners
        We check that the given key is actually part of the (e)vent that called the function
        it allows us to use a variable to retrieve the data from the HTML element */
    // check if the srcElement is a key of e 
    let curElement = ("srcElement" in e) ? e.srcElement : curElement = e.currentTarget;

    // if data-category found, we use that category to fetch a joke
    if (curElement.dataset.category != undefined)
        api_url += "?category=" + curElement.dataset.category;

    xhr.open("GET", api_url);  // open request
    xhr.send(); // send request

    // handle response
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){ // success!!
            let resp = JSON.parse(xhr.responseText);
            document.getElementById('theJoke').innerText = resp.value;

            /*
            // API provide image is broken
            // let img = document.createElement('img');
            // img.src = resp.icon_url;
            // document.getElementById('chuckImage').appendChild(img);
            */
        }
    }
}

/**
 * Load the categories using jquerys
 */
function jQueryCategories(){

    // use GET method to fetch jokes from url
    $.get(chuckEndPoint + "categories", function(data){
        // loop each returned data and create a button
        $(data).each(function(i, category){
            $("<input>")
                .attr("type", "button")
                .attr("value", category)
                .addClass(["btn", "btn-danger", "m-1"])
                .attr("data-category", category)
                .on("click", loadJoke).appendTo("#categories");
        })

    })
}
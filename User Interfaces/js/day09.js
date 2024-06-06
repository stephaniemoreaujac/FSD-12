/* AJAX REQUEST */

let deck_id = "new";
const DRAW_COUNT = 2;

/**
 * Sample function to show XMLHttpRequest
 */
function ajaxReqestOriginal(){
    // create xml http object
    let xhr = new XMLHttpRequest();

    // open the rquest
    xhr.open("GET", "ninja.html");

    // send the request
    xhr.send();

    // handle the response
    xhr.onreadystatechange = function(){
        console.log("readyState : " + xhr.readyState);
        console.log("status : " + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200){ // request is complete and successful
            console.log( xhr.responseText );
            document.getElementById("table").innerText = xhr.responseText;
        }
    }
}

/**
 * Request a card from API in vanilla Javascript
 */
function requestCards(){
    // create object
    let xhr = new XMLHttpRequest();

    // open the request
    let api_url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=" + DRAW_COUNT;
    xhr.open("GET", api_url);

    // send request
    xhr.send();

    // wait for response
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
        
            let resp = JSON.parse(xhr.responseText); // string in JSON
            if (resp.success){
                checkDeck(resp); // update deck id
                for (let c of resp.cards){
                    let img = document.createElement("img");
                    img.style.height = "50px";
                    img.src = c.image;
                    img.dataset.code = c.code;
                    document.getElementById('table').appendChild( img );
                }
                updateMessage(resp.remaining + " cards left in the deck");
            } else{
                clearInterval(timer); // stop timer if no more cards left
                clearInterval(timerJquery); // stop timer if no more cards left
    
                updateMessage(resp.error);
                // send request to shuffle deck
            }

        }
    }

}

let timer, timerJquery; // global timer variable;
$('document').ready(function(){
    // show all the cards
    timerJquery = setInterval(requestCardsJquery, 100);
    timer = setInterval(requestCards, 100);

    // Create button to shuffle the deck
    $("<input>")
        .attr("type", "button")
        .attr("value", "Shuffle Deck")
        .on("click", (e)=>{
            if (deck_id != "new"){
                updateMessage("Deck Shuffled");
                $.get("https://deckofcardsapi.com/api/deck/" + deck_id + "/shuffle/");
            }
        })
        .prependTo('#table');

});

/**
 * Draw cards from API using jquery
 */
function requestCardsJquery(){
    // url to connect to
    let api_url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=" + DRAW_COUNT;

    $.get(api_url, function(data){
        checkDeck(data); // update deck id
        if (data.remaining == 0){
            clearInterval(timer); // stop timer if no more cards left
            clearInterval(timerJquery); // stop timer if no more cards left
            updateMessage(data.error);
        } else{
            updateMessage(data.remaining + " cards left in the deck");

            // loop each card and show their image
            $(data.cards).each(function(i, card){
                $("<img>")
                    .attr("src", card.image)
                    .css("height", "50")
                    .attr("data-code", card.code)
                    .appendTo("#table");
            });
        }
    });
}

/**
 * Configure the deck_id if none is already in place
 * @param {object} d deck of card object
 */
function checkDeck(d){
    // if value is new, then save the deck id provided by the API
    if (deck_id == "new") deck_id = d.deck_id;
}

/**
 * Update the message shown to the user
 * @param {string} txt message to show the user
 */
function updateMessage(txt){
    document.querySelector("h1").innerHTML = txt;
}
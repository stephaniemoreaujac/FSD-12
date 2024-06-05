// MANIPULATION OF CLASSES


let elem = document.querySelector('h1');
elem.classList.remove("txtGreen"); // remove a class from the element
elem.classList.remove("txtGreensss");   // no errors or warning if class does not exists
elem.classList.add("txtBlue"); // add a class to the element
elem.classList.remove("txtGreen", "borderThin"); // remove multiple classes
elem.classList.add("txtGreen", "borderThin");   // add multiple classes

// if class is present, remove it. if class not present, add it - returns boolean true if class was added 
    elem.classList.toggle("txtGreen");
    elem.classList.toggle("txtGreen");

// save the classListing in a variable for easier use and access
let elemClasses = elem.classList;
elemClasses;    //DOMTokenList(2) ['borderThin', 'txtGreen', value: 'borderThin txtGreen']
elemClasses.remove("txtGreen");
elemClasses.contains("txtGreen"); // boolean is class is present
elemClasses.contains("borderThin"); // boolean is class is present

elem.classList.add("txtGreen", "borderThin");
elemClasses.toString(); // return text value of all classes (space seperator) - // 'borderThin txtGreen'
elem.classList.add("txtGreen", "borderThin");   // does not duplicate existing classes
elemClasses.toString(); // 'borderThin txtGreen'


// JQUERY


$(document).ready(function(){
    console.log("Hello jQuery!");


    $("h1, em").css("border", "3px solid purple");

    $("h2").on("click", changeBorder );

    $("p").on("mouseenter", function(){
        changeBgBlue(this);
        $("input[type='email']").css("borderColor", "yellow");
    }).on("mouseleave", function(){
        $(this).css("background", "white");
    }).on("click", function(){
        $("input[type='email']").css("borderColor", "violet");
    });
    changeStyle();

});

function changeBgBlue(elem){
    $(elem).css("background", "lightblue");
}

function changeStyle(){
    $("h1").css("color", "red");
}

function changeBorder(){
    console.log( $(this).text() );
    document.querySelector("h1").style.borderColor = "yellow";
}

function jQueryIteration(){
    $("span").each(function(i){
        if ($(this).text() == "something wrong")
            $(this).html("<br>" + i + " An Error Occured")
        
        console.log( $(this).text() );
         console.log( $(this).html() );
    });
}

function showAllImages(){
    $("#image1, #image2, #image3, #image4").show(2000, showConsole);
}

function hideAllImages(){
    $("#image1, #image2, #image3, #image4").fadeOut(500, showConsole);
}

function showConsole(){
    console.log("effect complete");
}
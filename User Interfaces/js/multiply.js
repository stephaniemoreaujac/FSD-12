console.log("multiply");

/**
 * Create the multiplication table based on given rows and columns
 * @param {number} rows Number of rows
 * @param {number} cols Number of columns
 */
function showTable(rows, cols){

    // create table
    let newTable = document.createElement("table");
    newTable.style.border = "1px solid black";
    newTable.style.borderCollapse = "collapse";

    // create X rows
    for( let r = 1; r <= rows; r++){
        let newRow = document.createElement("tr");
        // create y cols per row
        for (let c = 1; c <= cols; c++){
            let newCol = document.createElement("td");
            newCol.style.border = "1px solid black";

            // show multiplication result in col
            // let product = document.createTextNode( r * c );
            // newCol.appendChild( product );
            newCol.innerText = r*c;

            // add col to row
            newRow.appendChild( newCol );
        }
        // add row to table
        newTable.appendChild( newRow );
    }
    // add table to document
    document.querySelector("#table").innerHTML = "";
    document.querySelector("#table").appendChild( newTable );

}

/**
 * Create inputs once the DOM has finished loading
 */
window.addEventListener("load", (e)=> {

    createInputs('Rows');
    createInputs('Cols');

});

/**
 * Create text inputs for rows or columns
 * @param {string} inputName Name for the text input to create
 */
function createInputs (inputName){

    let inputRows = document.createElement("input");
    inputRows.placeholder = inputName;
    inputRows.type = 'number';
    inputRows.id = "num" + inputName;
    inputRows.addEventListener('keyup', function(e){
        let r = document.getElementById('numRows').value;
        let c = document.getElementById('numCols').value;
       if (parseInt(r) == r && parseInt(c) == c)
            showTable(r, c);
    });

    document.querySelector("body").appendChild( inputRows );

}
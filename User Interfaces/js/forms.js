let isFormValid = true; // keeps track of invalid form data

/**
 * Validate the form 
 * @param {object} event event listener object 
 */
function validateForm(event){
	//prevent form from submitting
	event.preventDefault();

	// reset isFormValid
	isFormValid = true;

	// validate name - required
	formNameValidation();
/*  MOVED TO SEPERATE FUNCTION TO ALLOW ON BLUR VALIDATION
	if ( !validateRequired("txtName") ){
		showError("txtName", "Name is required");
	} else {
		showSuccess("txtName");
	} */

	// validate email - required + email
	formEmailValidation()
/*	MOVED TO SEPERATE FUNCTION TO ALLOW ON BLUR VALIDATION
	if ( !validateRequired("txtEmail") ) {
		showError("txtEmail", "Email is required");
	} else if ( !validateEmail( document.getElementById("txtEmail").value ) ){
		showError("txtEmail", "Email is not valid");
	} else {
		showSuccess("txtEmail");
	} */

	/* WE COULD ALSO MOVE ALL THESE SO SEPERATE FUNCTION ON SETUP EVENT LISTENERS */
	// validate password - required + 6 to 12 characters
	if ( !validateRequired("txtPw1") ) {
		showError("txtPw1", "Password is required");
	} else if ( !validateLength( document.getElementById("txtPw1").value, 6, 12) ){
		showError("txtPw1", "Password must be between 6 and 12 characters");
	} else {
		showSuccess("txtPw1");
	}
	// validate passwor confirm - required + matches password
	if ( !validateRequired("txtPw2") ){
		showError("txtPw2", "Password confirmation is required");
	} else if ( !validateCompare( document.getElementById("txtPw1").value, document.getElementById("txtPw2").value ) ){
		showError("txtPw2", "Passwords do not match");
	} else{
		showSuccess("txtPw2");
	}

	// validate city - required
	if (!validateRequired("selCity", "-1")){
		showError("selCity", "Must select a city");
	} else {
		showSuccess("selCity");
	}

	// validate checkbox - required
	if ( !validateChecked("chkCondition")){
		showError("chkCondition", "You must agree");
	} else {
		showSuccess("chkCondition");
	}

	// if all if valid then submit form
	if (isFormValid){
		this.submit();
	}
}

/**
 * Validates that given element is not empty
 * @param {string} elemID Element ID that we are validating
 * @param {string} [requiredString=""] String to copmare a valid match
 * @returns {boolean} Return true if element is not empty
 */
function validateRequired (elemID, requiredString = "" ){
	return document.getElementById( elemID ).value != requiredString;
}

/**
 * Validate the given argument is a valid email address as per HTML5 Specification
 * @param {string} stringToCheck 
 * @returns {boolean} True return is parameter is valid email
 */
 function validateEmail(stringToCheck){
	// As per HTML5 Specification
	const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	return emailRegExp.test(stringToCheck);
}

/**
 * Validates that the given string is between a min and max length
 * @param {string} stringToCheck String to check the lenght
 * @param {integer} minLength minimun number of characters required
 * @param {integer} maxLength maximum number of characters required 
 * @returns {boolean} Returns true is string length is correct length
 */
function validateLength( stringToCheck, minLength, maxLength ){
	return (stringToCheck.length >= minLength && stringToCheck.length <= maxLength);
}

/**
 * Validates that the two provided strings are the same data type and value
 * @param {string} string1 first string to compare
 * @param {string} string2 second string to compare
 * @returns {boolean} Returns true is strings are same data type and value
 */
function validateCompare(string1, string2){
	return string1 === string2;
}

/**
 * Validates that element is checked
 * @param {string} elemID Element ID that we are validating 
 * @returns {boolean} Returns true if element is checked
 */
function validateChecked(elemID){
	return document.getElementById(elemID).checked;
}

/**
 * Validate the txtName field in our form
 */
function formNameValidation(){
	if ( !validateRequired("txtName") ){
		showError("txtName", "Name is required");
	} else {
		showSuccess("txtName");
	}
}

/**
 * Validate the txtEmail field in our form
 */
function formEmailValidation(){
	if ( !validateRequired("txtEmail") ) {
		showError("txtEmail", "Email is required");
	} else if ( !validateEmail( document.getElementById("txtEmail").value ) ){
		showError("txtEmail", "Email is not valid");
	} else {
		showSuccess("txtEmail");
	}
}

/**
 * Show an error message for a given element
 * @param {string} elemID Element ID that caused the error
 * @param {string} message Messages to display due to error
 */
function showError(elemID, message){
	isFormValid = false;

	// show error message in small element
	document.querySelector("#" + elemID + " ~ small").innerText = message;

	// add error class to small, and elemID
	document.querySelector("#" + elemID + " ~ small").classList.add("invalid-feedback", "d-block");
	document.getElementById( elemID ).classList.add("border-danger");
	document.getElementById( elemID ).classList.remove("border-success");
}

/**
 * Show a successful validation for a given element
 * @param {string} elemID Element ID that caused the success (no error)
 */
function showSuccess(elemID){
	// remove error class to small, and elemID
	document.querySelector("#" + elemID + " ~ small").classList.remove("invalid-feedback", "d-block");
	document.getElementById( elemID ).classList.remove("border-danger");
	document.getElementById( elemID ).classList.add("border-success");

	// remove small innerText
	document.querySelector("#" + elemID + " ~ small").innerText = "";
}

/* event listener */
// form submit event
document.getElementById("formJS").addEventListener("submit", validateForm );

// element blur (lose focus) event
document.getElementById("txtName").addEventListener("blur", formNameValidation);
document.getElementById("txtEmail").addEventListener("blur", formEmailValidation);
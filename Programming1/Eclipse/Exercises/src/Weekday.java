
public class Weekday {
	/*
	 * write a program that will convert the given argument 
	 * into the associated day of the week
	 * using a switch statement.
	 * validate argument is between 1= and 7
	 */
	public static void main(String[] args) {
		
		// retrieve value from user arguments
		int userInput = Integer.parseInt( args[0] );
		
		String day= "";
		
//		if ( userInput >= 1 && userInput <=7 ) { // check if the number is valid
		if (userInput < 1 || userInput > 7) {
			System.out.println("Unknown day!");
		} else {// day is between 1 and 7 inclusively
			
			switch (userInput) {
			case 1: 
				day = "Monday";
				break;
			case 2:
				day = "Tuesday";
				break;
			case 3: 
				day = "Wednesday";
				break;
			case 4:
				day = "thursday";
				break;
			case 5:
				day = "Friday";
				break;
			case 6: 
				day = "Saturday";
				break;
			case 7: 
				day = "Sunday";
				
			
			}
			
			
			// output the day to the user
			System.out.println("The day is " + day);	
		}
		

	}

}

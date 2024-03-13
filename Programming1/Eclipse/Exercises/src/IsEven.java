
public class IsEven {

	/*
	 * Write a prgram that will take an input argument 
	 * and display to console if it is even or odd
	 */
	public static void main(String[] args) {
		// get input from the user
//		String userInput = args[0];
//		int userInputInt = Integer.parseInt( userInput ); 
		
		// single line to convert argument into int
		int userInt = Integer.parseInt( args[0] );
		
		// calculate if even or odd
		/*
		int remainder = userInt % 2; // remainder
		boolean numberIsEven;
		
		if (remainder == 0) {
			numberIsEven = true;
		} else {
			numberIsEven = false;
		}
		*/
		boolean numberIsEven = ( ( userInt % 2 ) == 0 );
		String results;
		
		if( numberIsEven ) {
			results = "even";
		} else {
			results = "odd";
		}
		
		System.out.println( "The number " + userInt + " is " + results );
			
		
		// OPTION 2
		
		System.out.print("The number " + userInt + " is ");
		if ( ( userInt % 2 ) == 0 ) {
			System.out.println( "even");
		}else {
			System.out.println( "odd");
		}
		
		
// TODO add comments
	}

}

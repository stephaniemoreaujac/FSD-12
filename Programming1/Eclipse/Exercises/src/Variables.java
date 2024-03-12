
public class Variables {

	// Replicate the output, using accurate variable declaration and initialization.
	public static void main(String[] args) {

		// declare variables
		String firstName;
		int birthYear;
		
		// initialize variables
		firstName = "Alain";
		birthYear = 1988;
		
		// output to the screen
		String output;
//		output = "My Name is " + firstName + " and I was born in " + birthYear;
		
		output = "My Name is ";
		
//		output = output + firstName; // My Name is ...
		//previous line is equivalent to next line
		output += firstName; // My Name is ...
		output += " and I was born in " + birthYear;
		
		System.out.println( output );
	}

}

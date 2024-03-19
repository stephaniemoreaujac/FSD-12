
public class Day7 {
	
	// global scope;
	public static final int RANDOM_MAX = 10;
	public static final int RANDOM_MIN = 1;
	public static String myName = "Pete";
	
	public static void main(String[] args) {
		
		helpSomebody();
		helpMe();
		
		// ARGUMENTS
		multiplyByTwo(5);
		multiplyByTwo(7);
		multiplyByTwo(7-5);
//		multiplyByTwo(); // error = needs an argument
//		multiplyByTwo("22"); // error = needs an int (could convert to int Integer.parseInt("22")
		
		// MULTIPLE ARGUMENTS
		multiplyTwoNumbers(10, 20);
		multiplyTwoNumbers((2+5), 20);
//		multiplyTwoNumbers(6); // error = needs two argument
//		multiplyTwoNumbers("Two", 5);
		
		int a = 2; // int a belongs only to this method and no one else
		multiplyByTwo( a );
		multiplyTwoNumbers(a, a);
		System.out.println(a); // value does not change
		
		smallest(2, 5, 10);
		smallest(5, 10, 2);
		smallest(10, 3, 5);
		
		calcAverage(2, 5, 10);
		
		subtractByTwo(2);	// automatic typecast into to double
		
		int returnedValue;
		
		returnedValue = addTwoNumbers(2,50);	// returnedValue = 52;
		
		System.out.println("rv = " + returnedValue);
		
		
		System.out.println("getStart = " + getStart("NinjaCat") );
		System.out.println("getStart = " + getStart("Programming1") );
		
		System.out.println("withSubstring = " + getStartUsingSubstring("NinjaCat"));
		System.out.println("withSubstring = " + getStartUsingSubstring("Programming1"));
		
		
		// overloading methods
	
		addNum(2, 5); 		// addNum(int, int)
		addNum(2, 5, 4);	// addNum(int, int, int)
		addNum(3.0, 5.5);	// addNum(double, double)
		addNum(5.5, 1);		// addNum(double, int)
		
		
		// Variable Scope  - global scope so we can access anywhere within file
		System.out.println(myName);
		myName = "Steph";
		System.out.println(myName);
		helpMe();
		System.out.println(myName);
		
	}
	
	/* OVERLOAD randomNumber */
	/**
	 * Returns a random number.
	 * Maximum value for random number defined by global constant.
	 * Minimum value for random number defined by global constant.
	 * @return A random number
	 */
	public static int randomNumber() {	
//		final int min0 = 1; // replaced by global constant instead
//		final int max0 =10; // reaplce by global constant instead
		
		return randomNumber(RANDOM_MAX, RANDOM_MIN);
	}
	
	/**
	 * Returns a random number with a given maximum.
	 * Minimum value for random number defined by global constant
	 * @param max maximum value of random number
	 * @return A random number
	 */
	public static int randomNumber(int max1) {
		final int min1 = 1;
		// return (int) ((Math.random() * (max-min))+min);
		
		return randomNumber(max1, min1);
	}
	
	/**
	 * Returns a random number between a given maximum and minimum
	 * @param max maximum value of random number
	 * @param min minimum value of random number
	 * @return A random number
	 */
	public static int randomNumber(int max, int min) {
		return (int) ((Math.random() * (max-min))+min);
	}
	
	/* OVERLOAD addNum */
	/**
	 * Calculated and outputs the sum of 2 arguments
	 * @param numA an argument
	 * @param numB another argument
	 */
	public static void addNum(int numA, int numB) {
		System.out.println("2 arguments = " + (numA + numB ) );
	}
	
	/**
	 * Calculated and outputs the sum of 3 arguments
	 * @param numA an argument
	 * @param numB another argument
	 * @param numC another argument
	 */
	public static void addNum(int numA, int numB, int numC) {
		System.out.println( "3 arguments = " + (numA + numB + numC) );
	}
	
	/**
	 * Calculated and outputs the sum of 2 arguments
	 * @param numA an argument
	 * @param numB another argument
	 */
	public static void addNum(double numA, double numB) {
		System.out.println("2 doubles = " + (numA+numB));
	}

	/**
	 * Calculated and outputs the sum of 2 arguments
	 * @param numA an argument
	 * @param numB another argument
	 */
	public static void addNum(double numA, int numB) {
		System.out.println("double int = " + (numA+numB));
	}
	
	/* RETURN */
	/**
 	 * Determine and return the first half of given string using substring
 	 * @param myStr string to be evaluated
 	 * @return the first half of the string provided
	 */
 	public static String getStartUsingSubstring(String myStr) {
		
		return myStr.substring(0, ( myStr.length() / 2 ) ) ;
		
	}

 	/**
 	 * Determine and return the first half of given string
 	 * @param myStr string to be evaluated
 	 * @return the first half of the string provided
 	 */
	public static String getStart(String myStr) {
		
		String returnStr = ""; // return string
		int midpoint = myStr.length() / 2; // midpoint of my word
		
		for ( int i = 0; i < midpoint; i++) {
			returnStr += myStr.charAt(i);
		}
		
		return returnStr;
		
	}
	
	/**
	 * Calculate the sum of 2 given arguments
	 * @param numA an argument
	 * @param numB another argument
	 * @return
	 */
	public static int addTwoNumbers(int numA, int numB) {
		System.out.println("numA is "+numA);
		 int total = numA + numB;
		 if (total > 50) {
			 return total;
		 } 
		return total;
		// when return value set, we must return something for every possible outcome
		 
		 // System.out.println("UhOh"); // Unreachable = DEAD CODE
	}
	
	/* ARGUMENTS */
	/**
	 * Calculate the average of 3 given arguments
	 * @param numA an argument
	 * @param numB another argument
	 * @param numC another argument
	 */
	public static void calcAverage(int numA, int numB, int numC) {
		// option 1
		double avg1 = (numA + numB + numC) / 3.0	;
		//without .0 the value is calculated as an integer
		
		// option 2
		double avg2 = numA + numB + numC;
		avg2 = avg2 / 3;
		// no need for .0 on the 3 because avg2 is already a double
		
		System.out.println(avg1 + " - " + avg2);
	}
	
	/**
	 *  Calculate the smallest of 3 provided arguments
	 * @param numA an argument
	 * @param numB another argument
	 * @param numC another argument
	 */
	public static void smallest(int numA, int numB, int numC) {
		//option 1 - nested math.min
		int smallest1 = Math.min(numA, Math.min(numB, numC) );

		//option 2 - seperate math.min
		int smallest2 = Math.min(numB, numC);
		smallest2 = Math.min(numA, smallest2);
		
		// option 3 - conditional statements
		int smallest3;
		
		if (numA < numB && numA < numC) {
			smallest3 = numA;
		} else if (numB < numC) {
			smallest3 = numB;
		} else { 
			smallest3 = numC;
		}
		
		System.out.println(smallest1 + " - " + smallest2 + " - " + smallest3);
		
		
	}
	
	/**
	 * Calculate the product of 2 given arguments
	 * @param numberA an argument
	 * @param numberB another argument
	 */
 	public static void multiplyTwoNumbers(int numberA, int numberB) {
		System.out.println("Multiply 2 Numbers: " + (numberA * numberB));	
	}
	
 	/**
 	 * Subtract the given argument by 2
 	 * @param number Number to be subtracted by 2
 	 */
	public static void subtractByTwo(double number) {
		double newNumber = number * 2;
		System.out.println("Difference is: " + newNumber);
	}
	
	/**
	 * Multiply the given argument by 2
	 * @param number Number to be multiplied by 2
	 */
	public static void multiplyByTwo(int number) {
		int newNumber = number * 2; 
		System.out.println("The answer is: " + newNumber);
	}
	
	/* METHODS */
	/**
	 * Output lyrics to Beatles Help song
	 */
	public static void helpSomebody() {
		System.out.println("Help, I need Somebody");
		System.out.println("Help! Not just anybody");
		System.out.println("Help! You know I need someone");
		System.out.println("Help!");
		
		helpMe();
		
	}
	
	/**
	 * Output song title and artist for Help!
	 * And modification of global scope variable
	 */
	private static void helpMe() {
		System.out.println(myName);
		myName = "Ringo";
		System.out.println("Help! By: The Beatles");
	}

	/**
	 * Example of method that is static
	 * usage example in Day7Access
	 */
	public static void thisIsStatic() {
		System.out.println("Static Method");
	}
	
	/**
	 * Example of method that is NOT static
	 * usage example in Day7Access
	 */
	public void notStatic() {
		System.out.println("Not Static");
	}
	
}

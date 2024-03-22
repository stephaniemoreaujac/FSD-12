import java.util.Arrays;

public class Day8 {

	public static void main(String[] args) {
	
		// declare and initialize in one line
		String[] days = {"Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday" };
		
		// declare and initialize in two lines
		String[] days_short;
		days_short =  new String[] {"Sun", "Mon"};
		
		// declare and initialize individually
		String[] days_single = new String[7];
		// assign values to the array
		days_single[0] = "D";
		days_single[3] = "R";
		days_single[1] = "M";
		
		// access individual array elements
		System.out.println(days[5]);
		
		String oneDay = "Sunday"; // same value as days[0];
		
		// array of ints
		int[] hours = { 12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11 };
		
		// access and assign (or reassign) element values
		System.out.println(hours[21]);
		hours[21] = 205;
		System.out.println(hours[21]);
//		System.out.println(hours[24]); // error - index out of bounds
		
//		String[] days_singles = new String[]; // ERROR must provide length or data
		
		// Declare array of doubles named grades and initialize with 5 grades
		//-- options 1 
//		double[] grades = {15.5, 20.5, 26.9, 28, 45};
		//-- option 2
		double[] grades = new double[6];
		grades[0] = 55.0;
		grades[1] = 75.66;
		grades[2] = 45.11;
		grades[3] = 23;
		grades[4] = 99;
		grades[5] = 59;
//		
		// Calculate the average without loops
		double gradeData = grades[0] + grades[1] + grades[2] + grades[3] + grades[4] + grades[5];
		 
		gradeData = gradeData / 5;
		System.out.println("Grade Average without loops: " + gradeData);
		// this is problematic if we change the number of elements in our array.
		// everything is hardcoded (literal values)
		
		double[] gradeLoop = {15.5, 99,86, 20.5, 28, 45, 59, 48, 28,64};
		double gradeLoopData = 0;
		
		// get the number of elements in the array - length
		System.out.println("Grade Loop has " + gradeLoop.length + " elements");
		for (int i = 0; i < gradeLoop.length; i++) {
			// show each element and its index
			System.out.println("At index " + i + " element is " + gradeLoop[i]);
			// calculate the sum of all the grades
			gradeLoopData += gradeLoop[i]; // gradeLoopData = gradeLoopData + gradeLoop[0]
		}
		
		gradeLoopData = gradeLoopData / gradeLoop.length;
		
		System.out.println("Grade Average with loops: " + gradeLoopData);
		
		// output the element value in the console
		System.out.println( gradeLoop  ); // this will show the reference address - not the values
		System.out.println( Arrays.toString( gradeLoop ) );
		
		System.out.println( Arrays.toString( days ) );
		
		
		// For Loop and For each Loop
		for (int i = 0; i < days.length; i++) {
			System.out.println("index: " + i + " has value " + days[i]);
		}
		
		// FOR EACH d in days - no index available, must declare proper data type
		for (String d : days) { // assume ( d = days[i] )
			System.out.println("the value " + d );
		}
		
		for (double g : gradeLoop) {
			System.out.println("Grade is: " + g);
		}
		
		
		// array return from method
		int[] dataReturned = arrayReturns();
//		System.out.println( "Returned data: " + Arrays.toString( dataReturned ) );
		
		int[] dataArgument = {5, 10, 200};
		arrayArguments( dataArgument );
//		arrayArguments( new int[] {6, 60, 600} );
//		intArguments(2);
//		arrayVariableArguments( dataArgument );
		arrayVariableArguments(5, 45, 15, 64, 20);
	}
	
	/**
	 * Example for argument of a variable length of ints with additional arguments
	 * @param newInt dummy data
	 * @param arguments dummy data
	 */
	public static void arrayVariableArguments(int newInt, int ... arguments) {
		System.out.println("Single value int: " + newInt);
		for (int x : arguments) {
			System.out.print(x + ":" + arguments[x] + " -- ");
		}
		System.out.println();
	}
	
	/**
	 * Example for argument of a variable legnth array of ints
	 * @param argument dummy data
	 */
	public static void arrayVariableArguments(int ... arguments) {
//		for (int x : arguments) {
		for (int x = 0; x < arguments.length; x++) {
			System.out.print(x + ":" + arguments[x] + " -- ");
		}
		System.out.println();
	}
	/**
	 * Example for argument of array of ints
	 * @param arguments dummy data
	 */
	public static void arrayArguments(int[] arguments) {
//		for (int x : arguments) {
		for (int x = 0; x < arguments.length; x++) {
			System.out.print(x + ":" + arguments[x] + " -- ");
		}
		System.out.println();
	}
	
	/**
	 * Example for argument of a single int
	 * @param argument dummy data
	 */
	public static void intArguments(int argument) {
		System.out.println(argument);
	}
	
	/**
	 * Example for returning a single int
	 * @return dummy data
	 */
	public static int intReturns() {
		int i = 9;
		return i;
	}

	/**
	 * Example for returning array of ints
	 * @return dummy data
	 */
	public static int[] arrayReturns() {
		int[] data = {1, 5, 10};
		
		return data;
	}
	
	/**
	 * Practice exercise: create array with 20 random ints and
	 * calculate different values therein
	 */
	public static void arrayPractice1() {

		// create array with 20 elements
		int countElements = 50;
		int maxNumber = 50;
		int minNumber = -50;
		int[] randInts = new int[ countElements ];
		
		// populate array with random numbers 1 -50
		for(int i=0; i<randInts.length; i++) {
			randInts[i] = randomNumber(maxNumber, minNumber);
		}
		
		// loop and calculate
		int posNumbers=0, negNumbers=0, oddNumbers=0, evenNumbers=0, over25Numbers=0;
		for( int n : randInts) {
			// positive of negative
			if( n >= 0) {
				posNumbers++;
			}else {
				negNumbers++;
			}
			
			// even or odd
			if ( (n%2) == 0 ) {
				evenNumbers++;
			}else {
				oddNumbers++;
			}
			
			// over 25
			if (n > 25) {
				over25Numbers++;
			}
		}
		System.out.println( Arrays.toString(randInts) );
		System.out.println("Number of positive numbers: " + posNumbers);
		System.out.println("Number of negative numbers: " + negNumbers);
		System.out.println("Number of odd numbers: " + oddNumbers);
		System.out.println("Number of even numbers: " + evenNumbers);
		System.out.println("Number of numbers over 25: " + over25Numbers);
		
	}
	
	/**
	 * Practice exercise Advanced: create array with 20 random ints and
	 * calculate different values therein using array for total counts
	 */
	public static void arrayPratice1_advanced() {

		// create array with 20 elements
		int countElements = 50;
		int maxNumber = 50;
		int minNumber = -50;
		int[] randInts = new int[ countElements ];
		
		// populate array with random numbers 1 -50
		for(int i=0; i<randInts.length; i++) {
			randInts[i] = randomNumber(maxNumber, minNumber);
		}
		
		// loop and calculate
		int[] counters = new int[6];
		// 0:positive; 1:negative; 2:odds, 3:even, 4:over25; 5:under 25
		String[] counterWords = {"positive numbers", "negative numbers", "odd numbers", "even numbers", "numbers over 25", "numbers under 25"};
		
		
		for( int n : randInts) {
			// positive of negative
			if( n >= 0) counters[0]++;
			else counters[1]++;
			
			// even or odd
			if ( (n%2) == 0 ) counters[3]++;
			else counters[2]++;
			
			// over 25
			if (n > 25)	counters[4]++;
			else if ( n < 25 ) counters[5]++;
		}
		System.out.println( Arrays.toString(randInts) );
		for(int x = 0; x< counterWords.length; x++) {
			System.out.println("Number of " + counterWords[x] + ": " + counters[x]);
		}
//		System.out.println("Number of positive numbers: " + counters[0]);
//		System.out.println("Number of negative numbers: " + counters[1]);
//		System.out.println("Number of odd numbers: " + counters[2]);
//		System.out.println("Number of even numbers: " + counters[3]);
//		System.out.println("Number of numbers over 25: " + counters[4]);
		
		
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

}

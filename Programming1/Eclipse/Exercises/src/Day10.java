import java.util.Arrays;

public class Day10 {
	// TODO fix notes
	public static void main(String[] args) {
		int[] arr1 = {10, 20, 30, 30, 31};
		int[] arr2 = {1, 2, 3, 4, 5};
		/*
		System.out.println( findSmallestInt(arr1) );
		System.out.println( findSmallestInt(arr2) );

		System.out.println( findLargestInt(arr1) );
		System.out.println( findLargestInt(arr2) );
		System.out.println( findLargestInt(1,20,5,99,14));
		
		double[] arr3 = {1.0, 3.5, 5.5};
//		System.out.println( findAverage(arr2) ); // ERROR - cannot cast an array
		System.out.println( findAverage(arr3) );
		System.out.println( findAverage(1,20,5,99,14));

		String name = "Hello";
		name.length();
		
//		Arrays.toString( arr1 );
		Arrays.toString( arr2 );
		
		String[] arr4 = {"1", "11", "100", "4", "12"};
//		System.out.println( Arrays.toString( arr4 ) );
//		Arrays.sort( arr4 );
//		System.out.println( Arrays.toString( arr4 ) );
//		System.out.println( Arrays.toString( arr1 ) );
//		Arrays.sort( arr1 );
//		System.out.println( Arrays.toString( arr1 ) );
		
		String username = "Johnny";
		
		char[] userNameCharArray = username.toCharArray();
		for (int i = 0; i<userNameCharArray.length; i++) {
			System.out.println("index: " + i + " has character " + userNameCharArray[i]);
		}
		*/
		
		combineArrays(arr1, arr2);
	
	
	}
	
	/**
	 * Combine the 2 arrays provided into 1 new array
	 * @param a1 first array to combine
	 * @param a2 second array to combine
	 */
	public static void combineArrays(int[] a1, int[] a2) {
		// define my new array (aNew) of size (a1.legnth + a2.lenght)
		int[] aNew = new int[a1.length + a2.length];
		// loop a1 and add to aNew
		System.out.println( Arrays.toString( aNew ) );

		for (int i=0; i<a1.length;i++)
			aNew[i] = a1[i];
		System.out.println( Arrays.toString( aNew ) );

		// loop a2 and add to aNew
		for (int i=0; i<a2.length;i++)	{
			// aNew[i] = a2[i]; //overwriting previous loop
			
//			aNew[ (aNew.length-1)-i ] = a2[i];
			aNew[ a1.length + i ] = a2[i];
		}		
		System.out.println( Arrays.toString( aNew ) );
	}
	
	/**
	 * Remove null values from array
	 * @param arr the array to clean up
	 */
	public static void trimArray(String[] arr) {
		// setup counter
		// loop to count not null values
		// create new array of size counter
		// loop to populate new array
		
		// only end of null values
		// loop backwards until not null value and keep index
		// create new array of size index
		// loop to populate new array
	}
	
	/**
	 * Find the smallest integer from a given array of integers
	 * @param arr the array to search through
	 * @return the smallest integer found
	 */
	public static int findSmallestInt(int[] arr) {
		
		// track smallest value;
		int smallestInt = arr[0];
		// loop array find smallest;
		for(int elemValue : arr) {
			if (elemValue < smallestInt) {
				smallestInt = elemValue;
			}	
		}
		return smallestInt;
	}
	
	/**
	 * Find the largest interger 
	 * for a given array of integers
	 * @param arr the array to search
	 * @return the largest integer
	 */
	public static int findLargestInt(int ... arr) {
		// track largest
		int largestInt = arr[0];
		//loop to find largest
		for(int elemIndex = 1; elemIndex<arr.length; elemIndex++) {
			if (arr[elemIndex] > largestInt) {
				largestInt = arr[elemIndex];
			}
		}
		return largestInt;
	}

	/**
	 * Find the average of an array of doubles
	 * @param arr the array to sum
	 * @return the average value
	 */
	public static double findAverage(double ... arr) {
		double total = 0; // track my sum
		// loop to increase the sum
		for (double d : arr) {
			total += d;
		}
		return (total / arr.length); // return average
	}
}

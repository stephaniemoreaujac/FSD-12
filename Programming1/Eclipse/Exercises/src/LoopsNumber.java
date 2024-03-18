
public class LoopsNumber {

	// calculate the sum of numbers using while loop
	
	public static void main(String[] args) {
		
		// calculate the sum between 0 and 20
		
		
		// setup up while loop
		int sum = 0; // track the total of my additions;
		int count = 0; // iterator used in loop
		int maxCount = 20; // maximum value to add up to 
		
		while (count <= maxCount) { // condition verify that count is less or equal to maxCount
			sum += count; //sum = sum + count;
			count++; // increase iterator
		}
		
		// output results
		System.out.println("The sum of 0 to " + maxCount + " is " + sum);
		
		// Write another loop to calculate 0 to 100
		/* OPTION A  (use a method - class #7) */
		
		/* OPTION B - use previous data */
		// sum = previous sum
		// count = previous count
		maxCount = 100;
		while( count <= maxCount) {
			sum += count;
			count++;
		}
		System.out.println("The sum of 0 to " + maxCount + " is " + sum);
		
		
		/* OPTION C - reiterate entire loop */
		sum = 0;
		count = 0;
		maxCount = 100;
		while (count <= maxCount) {
			sum+= count;
			count++;
		}
		System.out.println("The sum of 0 to " + maxCount + " is " + sum);
		
		
	}

}

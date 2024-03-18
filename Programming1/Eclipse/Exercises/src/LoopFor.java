
public class LoopFor {

	/*
	 * Write a program that will take 2 argument
	 * args[0] will be the maximum count
	 * args[1] will be the step count
	 * use a for loop
	 */
	public static void main(String[] args) {
		
		// gets value from args
		int maxCount = Integer.parseInt( args[0] );
		int stepCount = Integer.parseInt( args[1] );
		
		System.out.println("I am counting to " + maxCount + " with a step size of " + stepCount);
		
		// loop and output values
		for (int i = 1; i <= maxCount; i+=stepCount) {
			System.out.print(i + " ");
		}
		
		System.out.println("\nWith a while");
		int i = 1;
		while (i <= maxCount) {
			System.out.print(i + " ");
			i += stepCount;
		}

		
	}

}

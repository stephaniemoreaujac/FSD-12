import java.util.Arrays;
import java.util.Scanner;

public class GetUserInput {

	public static void main(String[] args) {
		scannerAverage();
	}
	
	/**
	 * FIND THE AVERAGE OF THE INTEGERS PROVIDED BY SCANNER
	 * UNTIL THE USER INPUTS A NON INTEGER VALUE
	 */
	public static void scannerAverage() {
		Scanner scannerInput = new Scanner(System.in);
		int total = 0;
		int numInputs = 0;
		boolean validInput = true;
		
		do { 
			System.out.println("Input an integer value: ");
			if (scannerInput.hasNextInt()) {
				total += scannerInput.nextInt();
				numInputs++;
			}else
				validInput = false;
		} while (validInput);
		
		System.out.println("The average is " + (total/numInputs) );
	}
	
	public static void practiceScanner() {
		// TODO CLEAN UP
	
		// using run configuration
		// System.out.println( "User said: " + args[0] );

		
		System.out.println("hello");
		
		// USING SCANNER
		// 1. import scanner class
		// 2. create scanner variable
		Scanner scannerInput = new Scanner(System.in);
		/*
		System.out.println("What is your name? ");
		String userName = scannerInput.nextLine();
		
		System.out.println("Nice to meet you " + userName);
		
		System.out.println("What year were born? ");
		int userBirthYear = scannerInput.nextInt();

		*/
		int userAge;
		boolean validInput = false;
		
		do { 
			System.out.println("How old are you? ");
			if (scannerInput.hasNextInt())
				validInput = true;
			else
				scannerInput.next();
		} while (!validInput);
		
		userAge = scannerInput.nextInt();
		
				
		do { 
			System.out.println("How old Am I?");
			if (scannerInput.hasNextInt())
				validInput = true;
			else
				scannerInput.next();
		} while (!validInput);
	
		
		//System.out.println("You were born in the year " + userBirthYear + " and you are " + userAge + " years/old");
		
		System.out.println("Goodbye ");
		
		
	}

}

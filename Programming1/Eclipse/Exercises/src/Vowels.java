
public class Vowels {

	/*
	 * Write a program that takes a string as an input argument
	 * output if the character at a randomly generated index in a vowel.
	 * 
	 */
	public static void main(String[] args) {

		char charValue;
		int charIndex, maxRandom;
		String userInput;
		
		// user given argument
		userInput = args[0];
		
		// highest possible random value
		maxRandom = userInput.length(); 
		
		// randomly generated index
		charIndex = (int)(Math.random() * maxRandom);
		
		// saves from having to check upper and lower case letters
//		userInput = userInput.toLowerCase();
		charValue = userInput.charAt( charIndex );
		
		System.out.print("Is the character " + charValue + " at index " + charIndex + " a vowel? ");

		
//		if (charValue=='a' || charValue=='e' || charValue=='i' || charValue=='o' || charValue=='u') {
//			System.out.print("Yes, it is!");
//		}else {
//			System.out.print("No, it is not a vowel");
//		}	
		
		switch (charValue) {
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u':
			case 'A':
			case 'E':
			case 'I':
			case 'O':
			case 'U':
				System.out.println("Yes it is!!");
				break;
			default:
				System.out.println("No, it is not a vowel!");
		
		}
	}

}

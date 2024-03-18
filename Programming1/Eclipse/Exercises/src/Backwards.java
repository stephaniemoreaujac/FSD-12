
public class Backwards {

	/*
	 * Write a program that will take a string as an argument
	 * and output the string backwards
	 */
	public static void main(String[] args) {

		// setup variable
		String myStr = args[0];
		int strLength = myStr.length(); // length of the myStr variable 
		
		// loop and output
		
		// FOR loop - max to 0 -  with index management in iterator and condition
		for (int i = strLength-1; i >= 0; i-- ) {
			char c = myStr.charAt(i); // because the string index starts at 0
			System.out.print(c);
		}
		System.out.println(); // new line in console
		
		// FOR loop - max to 0 - with index management in code block
		for (int i = strLength; i > 0; i-- ) {
			char c = myStr.charAt(i-1); // because the string index starts at 0
			System.out.print(c);
		}
		System.out.println(); // new line in console
		
		// FOR loop - 0 to max - with index management in code block
		for (int i=0; i<strLength; i++) {
			char c = myStr.charAt( (strLength-1) - i);
			System.out.print(c);
		}
		System.out.println(); // new line in console
		
		// FOR loop - 0 to max - with index management in iterator and condition
		for (int i=1; i<=strLength; i++) {
			char c = myStr.charAt( strLength - i );
			System.out.print(c);
		}
 

	}

}

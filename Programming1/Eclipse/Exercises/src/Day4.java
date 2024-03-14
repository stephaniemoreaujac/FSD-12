
public class Day4 {

	public static void main(String[] args) {
/*
		double i;
		// MATH
		
		i = Math.floor( Math.pow(3, Math.random() ) );
		//System.out.println(i);
		
		// char
		
		char letter = 'k';
		if (letter == 'z') {
			System.out.println("This is the correct letter");
		}
		System.out.println(letter);
		letter = 40;
		System.out.println(letter);
		
		letter = '[';
		
		// lowercase OR uppercase
		if ( (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z') ) {
			System.out.println("Lowercase or Uppercase letter!");
		} else {
			System.out.println("NOT a lowercase or uppercase");
		}
		
		// STRING
		String myStr = "hamster";
		
		System.out.println( myStr.length() );
		System.out.println( myStr.charAt(4) );
		
		System.out.println( myStr.toUpperCase() );
		System.out.println( myStr );
		
		char lastLetter = myStr.charAt( myStr.length()-1 ); // -1 to ensure last index
		
		System.out.println( "last letter is : " + lastLetter );

		
		System.out.println(myStr.substring(4, 4));
		
		*/
		
		// SINCE JANUARY 1st 1970 00:00:00.00 UTC
		
		long currentTime = System.currentTimeMillis();
		System.out.println( currentTime ); // current time in ms
		
		long seconds = currentTime / 1000;
		System.out.println( seconds );
		
		long minutes = seconds / 60;
		System.out.println( minutes );
		
		long hours = minutes / 60;
		System.out.println( hours );
		
	}

}

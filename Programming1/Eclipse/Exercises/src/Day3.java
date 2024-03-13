
// import java.util.Random; // if you wanted to use the Random class

public class Day3 {

	public static void main(String[] args) {
		
		// Input variable - Set in "Run Configuration"
		System.out.println( args[0] );
		
		int i = Integer.parseInt( args[0] );
		
		System.out.println( ++i );
		
		int momAge = 80;
		int dadAge = 68;
		
		boolean isMomYounger = momAge <= dadAge;
		System.out.println("Is Mom Younger? " + isMomYounger);
		
		
		// CONDITIONAL STATEMENTS
		if (isMomYounger) {
			System.out.println("Mom is younger!");
		}
		
		if (momAge > 65 && dadAge > 65) {
			System.out.println("They are old");
		}
		
		// NESTED CONDITIONALS
		if (momAge > 65) {
			if (dadAge > 65) {
				System.out.println("Mom should retire!");
			}
			System.out.println("And bring us to Disney Land");
			dadAge += 5;
		} else if (momAge <= 30) { // if the condition is true
			System.out.println("Mom is young!");
		}
		
		System.out.println("Dad is: " + dadAge);
		
		
		// SWITCH STATEMENTS
		String cutlery = "knife";
		int count = 0;
		
		switch(cutlery) {
			case "fork" :
				System.out.println("You have a fork");
				count += 3;
				break; // code leave block once a break is encountered
			case "spoon" : 
				System.out.println("Spoon over here");
				count++;
				break;
			case "knife" :
				System.out.println("cutting things with a knife");
				break;
//				System.out.println("More info here"); // ERROR - unreachable code!
			default:
				System.out.println("I do not know what " + cutlery + " is!");
		}
		
		// the SWITCH above and the IF-ELSE below execute the exact same result/output
		if (cutlery.equals("fork")) {
			System.out.println("You have a fork");
			count += 3;
		}else if (cutlery.equals("spoon")) {
			System.out.println("Spoon over here");
			count++;
		}else if (cutlery.equals("knife")) {
			System.out.println("cutting things with a knife");
		}else {
			System.out.println("I do not know what " + cutlery + " is!");
		}
		
		
		// GENERATE RANDOM NUMBER
		
		final int MAX_VALUE = 3;
			
		int randomNumber = (int)( (Math.random() * MAX_VALUE) + 1);
		// add 1 to ensure number between 1 and MAX_VALUE (inclusive)
		
		System.out.println( randomNumber );
		
	}

}

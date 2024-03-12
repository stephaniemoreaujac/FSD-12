
public class Day2 {

	public static void main(String[] args) {
		
		// declaration = name a variable
		int currentYear;
		
		// initializing = giving it an initial value
		currentYear = 2024;
		
		// manipulation
		System.out.println( currentYear );
		
		// change the value
		currentYear = 2023;
		System.out.println( currentYear );
		
		//declaration + initialization
		String username = "Steph"; 
		System.out.println( username.toUpperCase() );
		System.out.println( username );
		
		// change the value
		username = "Moreau";
		System.out.println( username );
		
		// ERROR = Type mismatch
		//username = 123;
		//System.out.println( username );
		
		username = "Steph Moreau";

		int nextYear = 2025;
		currentYear = nextYear;
		System.out.println( currentYear ); // 2025
		System.out.println( nextYear ); // 2025
		
		nextYear = 2026;
		System.out.println( currentYear ); // 2025
		System.out.println( nextYear ); // 2026
		
		nextYear = nextYear + currentYear;
		System.out.println( nextYear );
		
//		int nextYear = 2027 ;	// ERROR = duplicate local variable, variable already declared
		
//		System.out.println( nextyear ); // ERROR = cannot resolved to a variable - case sensitive nextyear IS NOT nextYear

		int lastYear;
//		System.out.println( lastYear );	// ERROR = local variable not initialized
		
		// declare multiple variables on 1 line
		boolean isDoorLocked, isDoorOpen, isDoorBroken;
		// declare and initialize variable on 1 line
		boolean isLightOn = false, isLightBroken = false;
		// declare and initialize some variables on 1 line
		boolean isItRaining, isItSunny = true, isItSnowing;
		
	
			// below is the same as: boolean isItRaining, isItSunny = true, isItSnowing;
//			boolean isItRaining;
//			boolean isItSunny = true;
//			boolean isItSnowing;
		 
		
		isDoorLocked = false;	
		System.out.println( isDoorLocked );
	
		// Strings must be double quote
		String school = "John Abbott";
		// char in single quotes
		char grade = 'a';
		
		System.out.println( grade );
		
		
		// Arithmetic Operators
		int a = 1, b = 2, c = 6;
		double mathOutput;
		double z = 6.0, y = 7.0, x = 3.0;
		
		// 14/3 = 4 remainder 2
		// y % x; // 1 
		// 8 / 3; // 2
		// 14 % 3; // 2
		// a + (b-c) * 3;
		// c / b; // 3 
		// b * 2; // 4
		// a - c; // -5
		// a + b + 5; //8
		
		
//		int a = 5;
//		int b = 10;
		String myStr;

		// int + int = arithmetic operation (int)
		System.out.println(a + b); 
		
		// string = sting 
		System.out.println("a + b");
		
		// string + string = string 
		System.out.println("a" + "b");
		
		// string + int = string 
		System.out.println("a" + b);
		
		// int + string = string
		System.out.println(a + "b");
		
		// int = int
		System.out.println(a);

		// assign to STRING c
		
		// int + int
//		myStr = a + b; // ERROR = type mismatch
		myStr = "a + b";  // string  a + b
		myStr = "a" + "b"; // string  ab
		myStr = "a" + b; // sting a10
		myStr = a + "b"; // string 5b
//		myStr = a; // ERROR type mismatch
		
		// NOT THE SAME - order of operations
		myStr = "1. a=" + a + b + "=b"; // a=510=b
		myStr = "2. a=" + (a + b) + "=b"; // a=15=b
		myStr = a + b + "=3."; // 15=3.
		
//		System.out.println( myStr );
		
//		int a = 5, b=10, c;
		
//		a += b; // a + b
//		 a -= b; // a - b
//		a *= b; // a * b
		
//		b /= a; // b /a
//		
//		b++;
//		System.out.println( "Before: " + b );
//		System.out.println( b-- );
//		++b;
//		System.out.println( "After: " + b );
//		System.out.println( ++b );
//		System.out.println( "After: " + b );
//	
		
		int half = 1/2;
		int one = 1 / 2 + 1 / 2; // 0
		
		double two = 0.5 + 0.5; // 1.0
		two = half + half; // 0
		
		
		System.out.println( two );
		
		// TYPE CASTING
		
		int k = (int)3.1459; // double into int
		System.out.println(k);
		
		double l = 3; // int into double
		System.out.println( l );
		
		String j;
		j = "" + k; // int into string
		System.out.println(j);
		j = l + ""; // double into string
		System.out.println(j);
		
//		k = "3"; // ERROR
		k = Integer.parseInt( "3" ); // string into int
		System.out.println( k );
		l = Double.parseDouble("3.1459" );	// string into double
		System.out.println( l );
		
		
		System.out.println( Math.PI ); // math class PI constant

	}


}

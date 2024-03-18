
public class Day5 {

	public static void main(String[] args) {
		
		// WHILE LOOP
		int a = 10;
		while (a <= 5) {
			a++; // increase value of x
			System.out.println(a);
		}
		System.out.println("All Done");
	
		int b = 10;
		while (b <= 5) {
			int i = 10;
			b++; // increase value of x
			System.out.println(b);
		}
//		System.out.println("All Done value of i=" + i); // ERROR variable not defined (only exists in while clock
		
		// DO WHILE LOOP
		int c = 10;
		do {
			c++;
			System.out.println(c);
		} while (c <= 5);
		System.out.println("Do While Done");
		
		
		// Difference between while and do while
		boolean boolWhile = false;
		while (boolWhile) {
			System.out.println("While Loop executed");
		}
		
		boolean boolDoWhile = false;
		do {
			System.out.println("Do While loop executed");
		} while (boolDoWhile);
		
		
		
		// FOR LOOP
		for ( int x=0; x<=5; x++) {
			System.out.println("x is now: " + x);
		}
		System.out.println("For Done");
		
		int x = 0;
		while (x <= 5) {
			System.out.println("while is now: " + x);
			x++;
		}
		System.out.println("While Done");
		
		boolean forLoop = true;
//		int i =0; // cannot use as loop iterator if already declared
		for (int i = 0; (i <= 5 || forLoop) ; i++) {
			System.out.println("Hello");
			forLoop = false;
		}
		
		for (int i = 0; (i <= 10) ; i=+2) {
			System.out.println("Hi " + i);
			forLoop = false;
		}
		
		
		
		// EXITING EARLY
		System.out.println("Start of for loop");
		for( int m = 0; m <= 10; m++) {
			
			if (m%2==0) { // even numbers
				continue; // exit current iteration
			}
			
			System.out.print(m);
			
			if ( m > 6) {
				System.out.println("\nExit the loop");
				break; // exits the loop
			}
			
			System.out.println("iteration done");
			
			
		}
		System.out.println("Foor loop is done");
		

	}

}

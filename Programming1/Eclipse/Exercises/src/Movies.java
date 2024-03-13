
public class Movies {

	/*
	 * Write a program that will calculate the movie ticket price
	 * based on customer age and movie show time
	 */
	public static void main(String[] args) {
		int age = 5;
		boolean isWeekend = true;
		int price = 0;
		/*
		if (age < 12) { // kids
			if (isWeekend==true) {
				price = 10;
			}else {
				price = 5;
			}
		} else if (age > 65) { // senior
			if (isWeekend==true) {
				price = 15;
			}else {
				price = 10;
			}
		} else { // adult between 12 and 65
			if (isWeekend==true) {
				price = 30;
			}else {
				price = 20;
			}
		}
*/
		
	// the following is equivalent to the above if-else statement.
		if (age < 12) { 
			price = isWeekend ? 10 : 5;		// kids
		} else if (age > 65) { 
			price = isWeekend ? 15 : 10;	// senior
		} else { 
			price = isWeekend ? 30 : 20;	// adult between 12 and 65
		}
		
		
		
		
		// output results
		System.out.println("Ticket for someone aged " + age + " is $"+price);

	}

}

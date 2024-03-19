
public class Day7Access {
	// EXAMPLES - beyond scope of class
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println("Day7 Access program...");
//		Day7.helpMe(); // not accessible if private
//		Day7.helpSomebody(); // not accessible if private
		
		// static vs non static
		
		int x = Day7.RANDOM_MAX;
		System.out.println("Max random of Day7 is :" + x);
		// using static method
		Day7.thisIsStatic();
		
		// without static keyword
		Day7 d7 = new Day7();
		d7.notStatic();
//		d7.RANDOM_MAX;
//		d7.helpSomebody();
		
		
	}

}

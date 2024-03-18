
public class LoopsDo {
	
	/*
	 *  take in a String argument and output it to the console
	 *  as many times as there are letters in the word
	 */
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String myStr = args[0];
		
		int maxCount = myStr.length(); // length of my string
		int i = 0;
		
		while (i < maxCount) {
			i++;
			System.out.println("WHILE: " + myStr);
		}
		
		// start at 1 because condition is <=
		i=1;
		do {
			System.out.println("DO WHILE: " + myStr);
			i++;
		} while(i <= maxCount);

	}

}

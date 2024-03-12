
public class VariableSwap {

	// swap the values of a and b
	public static void main(String[] args) {

		int a = 111;
		int b = 222;
//		int a = 111, b = 111;
		
		int temp = a;
		a = b;
		b = temp;
		
		System.out.println("The value of a is " + a + " and the value of b is " + b);
		
		// Swap the value without additional variable
		a = a + b;
		b = a - b;
		a = a - b;
		
		System.out.println("The original value of a is " + a + " and the value of b is " + b);
	}

}

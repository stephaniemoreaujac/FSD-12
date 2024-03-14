
public class Numbers {

	// practice using our MATH class
	public static void main(String[] args) {

		 int a = 15;
		 int b = 5;
		 int c = 20;
		 int smallest;
		 double area;
		 
		 // determine smallest of 3 numbers
		 // Math.min = gets the smallest number
		 smallest = Math.min(a, Math.min( b, c) );
		 
		 // calculate the area Pr2
		 // Math.PI = value of pi
		 area = Math.PI * Math.pow( smallest, 2);
		 
		 
		 // output
		 System.out.println("Between " + a +", " + b + ", " + c +". The smallest is " + smallest);
		 System.out.println("The area of the circle is : " + area );
		 // format number to 2 decimal places
//		 System.out.printf("The area of the circle is : %.2f", area );
	}

}

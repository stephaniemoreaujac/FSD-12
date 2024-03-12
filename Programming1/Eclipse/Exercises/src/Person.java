
public class Person {

	public static void main(String[] args) {
		
//		String name;
//		int height;
//		int weight;
//		String colorEyes;
//		String colorHair;
//		int age; 
		
		String name, colorEyes, colorHair;
		int height, weight;
		byte age; 
		String output;
		
		name = "Arthur";
		height = 75;
		weight = 150;
		colorEyes = "Blue";
		colorHair = "Brown";
		age = 54;

		
		output = "Let's talk about " + name + "\n"
				+ "He's " + height + " inches tall " + "\n"
				+ "He's " + weight + " pound heavy" + "\n"
				+ "He's got " + colorEyes + " eyes and " + colorHair + " hair " + "\n";
		output += "If I add " + age + ", " + height + ", " + weight + " I get " ;
		output += age + height + weight;
		
		System.out.println( output );
		
	}

}

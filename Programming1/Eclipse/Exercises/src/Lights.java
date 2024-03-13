
public class Lights {

	/*
	 *  Logic was flawed in this example!
	 *  Practice nested conditional and string comparison
	 */
	
	public static void main(String[] args) {
		// TODO add comments
		boolean lightYellow = false, lightGreen = false;
//		boolean locationQc = false, locationMtl = false;
		String location = "Montreal";
		
		if (lightGreen){
		    System.out.println("you can drive");
		} else if (lightYellow){
		    System.out.println("slow down");
		} else{
		    System.out.println("The light is red");
		    // string comparison
		    if (!location.equals( "Quebec" ) ) {
		    	System.out.println("You can turn");
		    } else if (location.equals( "Montreal" )) {
		    	System.out.println("You must wait");
		    } else {
		    	System.out.println("You drive");
		    }
		    /* 
		    // instead of boolean for the location
		    if (!locationQc){
		        System.out.println("You can turn");
		    }else if (locationMtl){
		        System.out.println("You must wait");
		    } else {
		    	System.out.println("You drive");
		    }
		    */
		}
		
	}

}

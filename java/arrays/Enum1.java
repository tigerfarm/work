/*
 * @author Stacy David Thurston, Sept.2016
 */
package arrays;

public class Enum1 {

    public enum Day {
        SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
    }

    public static void main(String[] args) {
        String theClassName = "enum1";
        System.out.println("+++ Start class: " + theClassName + "\n");

        System.out.println("++ Day.THURSDAY: " + Day.THURSDAY + "\n");

        System.out.println("++ List the Days:");
        for (Day aDay : Day.values()) {
            System.out.println("+ " + aDay);
        }
        System.out.println("+ End of list.");
            
        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

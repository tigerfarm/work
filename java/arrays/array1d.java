/*
 * Date: Sept.18,2011
 * @author Stacy David Thurston, Sept.2011
 */
package arrays;

public class array1d {

    public static void main(String[] args) {
        String theClassName = "array1d";
        System.out.println("+++ Start class: " + theClassName);

        int[] array1d = new int[2];
        System.out.println("\n++ Display the array data, array1d.length = " + array1d.length);
        for (int x = 0; x < array1d.length; x++) {
            System.out.print("x = " + x);
            array1d[x] = x;
            System.out.println(" --- x = " + array1d[x]);
        }

        System.out.println("\n++ Change and redisplay the data.");
        for (int x = 0; x < array1d.length; x++) {
            System.out.print("array index x = " + x);
            System.out.print(", current value = " + array1d[x]);
            array1d[x] = array1d[x] * 2;
            System.out.println(" --- new value ( previous value * 2) = " + array1d[x]);
        }

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

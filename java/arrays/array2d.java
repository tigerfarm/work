/*
 * Date: Sept.18,2011
 * @author Stacy David Thurston, Sept.2011
 */
package arrays;

public class array2d {

    public static void main(String[] args) {
        String theClassName = "array2d";
        System.out.println("+++ Start class: " + theClassName);

        int[][] array2d = new int[2][3];
        System.out.println("++ Display the row and column length.");
        System.out.println("X (rows)    array2d.length = " + array2d.length);
        System.out.println("Y (columns) array2d[0].length = " + array2d[0].length);

        System.out.println("\n++ Initialize the data.");
        for (int x = 0; x < array2d.length; x++) {
            for (int y = 0; y < array2d[0].length; y++) {
                System.out.print("x = " + x);
                System.out.print(" y = " + y);
                array2d[x][y] = x + y;
                System.out.println(" array2d["+x+"]["+y+"] = x + y = " + array2d[x][y]);
            }
        }

        System.out.println("\n++ Change and display the data.");
        for (int x = 0; x < array2d.length; x++) {
            for (int y = 0; y < array2d[0].length; y++) {
                System.out.print("x = " + x);
                System.out.print(" y = " + y);
                System.out.print(" array2d["+x+"]["+y+"] = " + array2d[x][y]);
                array2d[x][y] = array2d[x][y] * 2;
                System.out.println(" * 2 = " + array2d[x][y]);
            }
        }

        System.out.println("\n++ Display a data item.");
        System.out.println("What is the third element of the second row?");
        System.out.println("Answer: array2d[1][2] = "+array2d[1][2]);

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

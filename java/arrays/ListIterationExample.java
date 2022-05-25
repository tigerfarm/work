/*
 * Example from: http://stackoverflow.com/questions/18410035/ways-to-iterate-over-a-list-in-java
 */
package arrays;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class ListIterationExample {

    public static void printList(List<Integer> numbers) {
        StringBuilder sb = new StringBuilder();
        for (Integer number : numbers) {
            sb.append(number);
            sb.append(",");
        }
        sb.deleteCharAt(sb.length() - 1); // remove trailing comma
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        String theClassName = "ListIterationExample";
        System.out.println("+++ Start class: " + theClassName);

        List<Integer> numbers = new ArrayList<Integer>();

        // populates list with initial values
        for (Integer i : Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7)) {
            numbers.add(i);
        }
        printList(numbers);         // 0,1,2,3,4,5,6,7

        // replaces each element with twice its value
        for (int index = 0; index < numbers.size(); index++) {
            numbers.set(index, numbers.get(index) * 2);
        }
        printList(numbers);         // 0,2,4,6,8,10,12,14

        // does nothing because list is not being changed
        for (Integer number : numbers) {
            number++; // number = new Integer(number+1);
        }
        printList(numbers);         // 0,2,4,6,8,10,12,14  

        // same as above -- just different syntax
        for (Iterator<Integer> iter = numbers.iterator(); iter.hasNext();) {
            Integer number = iter.next();
            number++;
        }
        printList(numbers);         // 0,2,4,6,8,10,12,14

        // ListIterator<?> provides an "add" method to insert elements
        // between the current element and the cursor
        for (ListIterator<Integer> iter = numbers.listIterator(); iter.hasNext();) {
            Integer number = iter.next();
            iter.add(number + 1);     // insert a number right before this
        }
        printList(numbers);         // 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15

        // Iterator<?> provides a "remove" method to delete elements
        // between the current element and the cursor
        for (Iterator<Integer> iter = numbers.iterator(); iter.hasNext();) {
            Integer number = iter.next();
            if (number % 2 == 0) {
                 // if number is even, remove it from the collection
                iter.remove();
            }
        }
        printList(numbers);         // 1,3,5,7,9,11,13,15

        // ListIterator<?> provides a "set" method to replace elements
        for (ListIterator<Integer> iter = numbers.listIterator(); iter.hasNext();) {
            Integer number = iter.next();
            iter.set(number / 2);     // divide each element by 2
        }
        printList(numbers);         // 0,1,2,3,4,5,6,7

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }

}

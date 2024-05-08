package fileio;

import java.io.RandomAccessFile;

public class randomAccess {

    public static void main(String argv[]) {
        String theClassName = "randomAccess";
        System.out.println("+++ Start class: " + theClassName);
        System.out.println("+++ program needs work +++");
        if (argv.length != 2) {
            System.out.println("Syntax: randomAccess <outfile> <string to add to the end of the file>");
            System.exit(1);
        }
        RandomAccessFile output = null;
        try {
            // Open the file for reading and writing
            output = new RandomAccessFile(argv[0], "rw");
        } catch (Exception e) {
            System.out.println("Couldn't open " + argv[1]);
            System.exit(1);
        }
        try {
            // seek to the end of the file
            output.seek(output.length());
            // perform the write operation
            output.writeChars(argv[1] + "\n");
        } catch (Exception e) {
            System.out.println("Error appending to file");
            System.exit(1);
        }
    }
}

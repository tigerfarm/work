package fileio;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class compareFiles {

    public static void main(String[] args) {
        int issame = 1;
        int i = 0;

        String theClassName = "compareFiles";
        System.out.println("+++ Start class: " + theClassName);

        System.out.println("+++ This program needs work +++");

        if (args.length != 2) {
            System.out.println("+ Syntax: compareFiles <file1> <file2>");
            return;
        }
        System.out.println("++ Binary compare file1: " + args[0]);
        System.out.println("+  and            file2: " + args[1]);
        System.out.println("\n");
        try {

            // open args[0] for input
            FileInputStream in1 = new FileInputStream(args[0]);
            // add buffering
            BufferedInputStream bin1 = new BufferedInputStream(in1);

            FileInputStream in2 = new FileInputStream(args[1]);
            BufferedInputStream bin2 = new BufferedInputStream(in2);

            byte bArray1[] = new byte[256];
            byte bArray2[] = new byte[256];
            byte ch[] = new byte[1];
            int file1Bytes;
            int file2Bytes;

            System.out.println("Start read:");
            while (bin1.available() > 0 && issame == 1) {
                file1Bytes = bin1.read(bArray1);
                file2Bytes = bin2.read(bArray2);
                if (file1Bytes == file2Bytes) {
                    System.out.println("Bytes Read, File1 = " + file1Bytes + ", File2 = " + file2Bytes + ".");
                } else {
                    issame = 0;
                    System.out.println("*** Different byte count, File1 = " + file1Bytes + ", File2 = " + file2Bytes + ".");
                }
                for (i = 0; i < file1Bytes; i++) {
                    if (bArray1[i] != bArray2[i]) {
                        issame = 0;
                        System.out.print("\n*** Not same, byte# " + i);

                        System.out.print(", F1 <");
                        ch[0] = bArray1[i];
                        if (ch[0] == 10) {
                            System.out.print("LF");
                        } else if (ch[0] == 13) {
                            System.out.print("CR");
                        } else if (ch[0] == 7) {
                            System.out.print("BELL");
                        } else if (ch[0] == 12) {
                            System.out.print("FF");
                        } else if (ch[0] == 0) {
                            System.out.print("NULL");
                        } else {
                            String s = new String(ch, 0);
                            System.out.print(s);
                        }

                        System.out.print("> F2 <");
                        ch[0] = bArray2[i];
                        if (ch[0] == 10) {
                            System.out.print("LF");
                        } else if (ch[0] == 13) {
                            System.out.print("CR");
                        } else if (ch[0] == 7) {
                            System.out.print("BELL");
                        } else if (ch[0] == 12) {
                            System.out.print("FF");
                        } else if (ch[0] == 0) {
                            System.out.print("NULL");
                        } else {
                            String s = new String(ch, 0);
                            System.out.print(s);
                        }
                        System.out.println(">");
                    }

                }
                /* for i */

            }
            /* while reading lines */

            System.out.println("<--- eof");

        } /* try */ catch (IOException ioe) {
            System.out.print("IOException: ");
            System.out.println(ioe.toString());
        }

        if (issame != 1) {
            System.out.println("\n*** Not same...\n");
        } else {
            System.out.println("\n*** SAME...\n");
        }

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

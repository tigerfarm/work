package fileio;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class show {

    public static void main(String[] args) {
        String theClassName = "show";
        System.out.println("+++ Start class: " + theClassName);

        if (args.length != 1) {
            System.out.println("+ Syntax: show <read file>");
            return;
        }
        System.out.println("++ Read file into a byte array: " + args[0]);
        long theLength = 0;
        byte bArray[] = null;
        try {
            File theFile = new File(args[0]);
            theLength = theFile.length();
            bArray = new byte[(int) theLength];
            FileInputStream in = new FileInputStream(args[0]);
            in.read(bArray);
            in.close();
        } catch (IOException ioe) {
            System.out.print("IOException: ");
            System.out.println(ioe.toString());
        }
        System.out.println("+ Byte array loaded.");
        System.out.println("++ Display the byte array.");
        byte ch[] = new byte[1];
        int i = 0;
        while (i < theLength) {
            if (bArray[i] == 10) {
                // LF - line feed
                if (i < theLength - 1) {
                    if (bArray[i + 1] == 13) {
                        System.out.print("-\nLFCR-");
                        i++;
                    } else {
                        System.out.print("-\nLF-");
                    }
                } else {
                    System.out.print("-\nLF-");
                }
            } else if (bArray[i] == 13) {
                // CR - Carriage Return
                if (i < theLength - 1) {
                    if (bArray[i + 1] == 13) {
                        System.out.print("-\nCRLF-");
                        i++;
                    } else {
                        System.out.print("-\nCR-");
                    }
                } else {
                    System.out.print("-\nCR-");
                }
            } else if (bArray[i] == 7) {
                System.out.print("-BELL-");
            } else if (bArray[i] == 12) {
                System.out.print("\n-FF-\n");
            } else if (bArray[i] == 0) {
                System.out.print("-null-");
            } else if ((bArray[i] < 32) || (bArray[i] > 126)) {
                // Unprintable
                // “ left quote: &-30;&-128;&-100;
                // ” right quote: &-30;&-128;&-99;
                // — long bar: &-30;&-128;&-108;
                if ((bArray[i] != -30) && (i < theLength + 1)) {
                    System.out.print("&" + bArray[i] + ";");
                } else // bArray[i] == -30 && there are enough chars to test
                if (bArray[i + 1] == -128 && bArray[i + 2] == -100) {
                    System.out.print("-\":");
                    i++;
                    i++;
                } else if (bArray[i + 1] == -128 && bArray[i + 2] == -99) {
                    System.out.print(":\"-");
                    i++;
                    i++;
                    i++;
                } else if (bArray[i + 1] == -128 && bArray[i + 2] == -108) {
                    System.out.print("---");
                    i++;
                    i++;
                } else {
                    System.out.print("&" + bArray[i] + ";");
                }
            } else {
                // Normal character for printing.
                ch[0] = bArray[i];
                String s = new String(ch, 0);
                System.out.print(s);
            }
            i++;
        }
        /*
         * while
         */
        System.out.println("<--- eof, display completed.");

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

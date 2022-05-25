package fileio;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class copyFileTextEdit {

    public static void main(String args[]) {

        File readFile;
        FileInputStream fin;
        DataInputStream pin;

        File writeFile;
        FileOutputStream fout;
        PrintStream pout;

        String theClassName = "copyFileText";
        System.out.println("+++ Start class: " + theClassName);

        /*
        if (args.length != 2) {
            System.out.println("+ Copy a text file line by line.");
            System.out.println("+ Syntax: copyFileText <read filename> <write filename>");
            System.out.println("+ Example: java -cp dist/fileio.jar fileio.copyFileText /opt/data/fileioText.txt /opt/data/fileioTextOutput.txt");
            return;
        }
        String theReadFilename = args[0];
        String theWriteFilename = args[1];
        */
        String theReadFilename = "OscarWildeLadyW.txt";
        String theWriteFilename = "OscarWildeLadyW-out.txt";
        System.out.println("+ theReadFilename: " + theReadFilename);
        System.out.println("+ theWriteFilename: " + theWriteFilename);
        System.out.println("\n++ Copy the file line by line.");
        try {
            readFile = new File(theReadFilename);
            if ( !readFile.exists() ) {
                System.out.println("-- ** ERROR, theReadFilename does not exist.");
                return;
            }
            fin = new FileInputStream(readFile);
            pin = new DataInputStream(fin);

            writeFile = new File(theWriteFilename);
            fout = new FileOutputStream(writeFile);
            pout = new PrintStream(fout);

            String theLine = pin.readLine();
            int lineNum=0;
            while (theLine != null) {
                pout.println(theLine);
                System.out.println("+ " + lineNum++ + ":" + theLine + ":");
                theLine = pin.readLine();
            }
            pin.close();
            pout.close();

            System.out.println("++ File copied.");
        } catch (IOException ioe) {
            System.out.print("--- IOException: ");
            System.out.println(ioe.toString());
        }

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}

package fileio;

import java.io.*;

public class copyFileBinaryEdit {

    public static void main(String[] args) {
        String theClassName = "copyFileBinary";
        System.out.println("+++ Start class: " + theClassName);
        /*
        if (args.length != 2) {
            System.out.println("+ Syntax:  copyFileBinary <file from> <file to>");
            System.out.println("+ Example: java -cp dist/fileio.jar fileio.copyFileBinary /opt/data/copyBinary.jpg /opt/data/copyBinaryOut.jpg");
            return;
        }
        String theFileNameFrom = args[0];
        String theFileNameTo = args[1];
         */
        // String theFileNameFrom = "abc.txt";
        // String theFileNameFrom = "OscarWildeLadyW.txt";
        String theFileNameFrom = "OscarWildeLadyW.txt";
        String theFileNameTo = "OscarWildeLadyW-out.txt";
        System.out.println("+ theFileNameFrom:" + theFileNameFrom);
        System.out.println("+ theFileNameTo:  " + theFileNameTo);

        File dirFrom = new File(theFileNameFrom);
        File dirTo = new File(theFileNameTo);
        try {
            InputStream in = new FileInputStream(dirFrom);
            OutputStream out = new FileOutputStream(dirTo);
            byte[] buf = new byte[1];
            int len;
            int i = 0;
            boolean mtLine = false;
            while ((len = in.read(buf)) > 0) {
                // System.out.print("|" + buf[0] + ":");
                if (buf[0] == 10) {
                    // LF - line feed
                    System.out.print("\nLF-");
                    if (!mtLine) {
                        out.write(buf, 0, len);
                        mtLine = true;
                    } else {
                        mtLine = false;
                    }
                } else if (buf[0] == 13) {
                    // CR - Carriage Return
                    System.out.print("\nCR-");
                } else {
                    mtLine = false;
                    out.write(buf, 0, len);
                }
            }
            in.close();
            out.close();
        } catch (Exception e) {
            System.out.println("-- Error, readWriteCopy: " + e);
            System.exit(1);
        }

        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }

}

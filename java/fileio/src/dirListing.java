/*
 * File directory listing.
 */
package fileio;

import java.io.File;
import java.text.SimpleDateFormat;
import java.text.Format;
import java.util.Date;

//  Linklist processing classes
import java.util.List;
import java.util.ArrayList;

public class dirListing {

    public static void directoryListing(String subdirectoyName) {
        System.out.println("+ Directory listing for: " + subdirectoyName);
        //
        // Need to use the full directory name.
        String currentDirectory = System.getProperty("user.dir");
        // Subdirectory to the current directory.
        String theDirectoryName = currentDirectory + "/" + subdirectoyName;
        System.out.println("+ Current Directory = " + currentDirectory + ", subdirectory: " + subdirectoyName);
        File dir = new File(theDirectoryName);
        if (!dir.isDirectory()) {
            System.out.println("-- Error: " + theDirectoryName + " is not a directory...");
            return;
        }
        if (!dir.exists()) {
            System.out.println("-- Error: " + theDirectoryName + ", directory does not exist...");
            return;
        }
        // Get directory & file info into a list
        String[] children = dir.list();
        List fileDirList = new ArrayList();
        for (int i = 0; i < children.length; i++) {
            String filename = children[i];
            // System.out.println("++ filename: " + filename);
            File theName = new File(theDirectoryName + "/" + filename);
            if (!theName.isFile()) {
                // Process directories
                fileDirList.add(i, "+ Subdirectory: " + filename);
            } else {
                // fileDirList.add(i, "+ File: " + filename + " " + formatter.format(new Date(theName.lastModified())) + ", size: " + theName.length() + " bytes");
                fileDirList.add(i, "++ " + filename);
            }
        }
        // Print List: directories then files
        for (int i = 0; i < fileDirList.size(); i++) {
            String item = (String) fileDirList.get(i);
            if (item.startsWith("+")) {
                System.out.println(item);
            }
        }
        for (int i = 0; i < fileDirList.size(); i++) {
            String item = (String) fileDirList.get(i);
            if (item.startsWith("*")) {
                System.out.println("    " + item);
            }
        }
        System.out.println("+ End of list.");

    }

    public static void main(String[] args) {

        System.out.println("+++ Start.");

        Format formatter = new SimpleDateFormat("EEEE dd-MMM-yy HH:mm");
        Date date = new Date();
        System.out.println("+ Today's date: " + formatter.format(date));
        String subdirectoyName = "nbproject";
        directoryListing(subdirectoyName);

        System.out.println("\n+++ Exit.");
    }

}

// eof

package fileio;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class fileio {

    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    public static void main(String[] args) {
        System.out.println("fileio.main");
        fileio dataioObj = new fileio();
        dataioObj.run();
    }

    public void run() {
        String line = "";
        while (!(line.equals("q"))) {
            System.out.print("fileio.run (q to exit) > ");
            try {
                line = this.br.readLine();
            } catch (Exception e) {
                e.printStackTrace();
            }
            System.out.println("fileio.run echo > "+ line);
        }
        System.out.println("fileio.exit");
    }
}
